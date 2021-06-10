import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import fetchDelete from "../fetch/fetchDelete";
import useFetchDbData from '../fetch/useFetchDbData';
import Loading from "../loading";

const DeleteBlog = () => {

    const {blogid, authorid} = useParams();
    const {data: blog, isPending: isPendingBlog, dbError: dbErrorBlog} = useFetchDbData('http://localhost:8000/blogs/' + blogid);
    const {data: author, isPending: isPendingAuthor, dbError: dbErrorAuthor} = useFetchDbData('http://localhost:8000/authors/' + authorid);
    const [isPending, setIsPending] = useState(false);
    
    const handleConfirm = (e) => {
        setIsPending(true);
        fetchDelete({
            url: 'http://localhost:8000/blogs/' + blogid
        });
        setIsPending(false);
    }
    return ( 
        <div className="confirm">
            {(isPendingBlog || isPendingAuthor) && <div className="loading">
                    <Loading />
                    <p>Wczytywanie</p>
                </div>}
            {isPending && <div className="loading">
                    <Loading />
                    <p>Wysyłanie</p>
                </div>}
            {(dbErrorBlog || dbErrorAuthor) && <div>{dbErrorAuthor || dbErrorBlog}</div>}
            {author && blog && 
                <div>
                    <h1>Czy na pewno chcesz usunąć ten blog?</h1>
                    <h2>Tytuł: </h2>
                    <p>{blog.title}</p>
                    <h2>Autor:</h2>
                    <p>{author.nick}</p>
                    <span>
                        <button onClick={handleConfirm}>Tak</button>
                        <Link to={`/blogs`}>
                            <button>Nie</button>
                        </Link>
                    </span>
                </div>}
            
        </div>
     );
}
 
export default DeleteBlog;