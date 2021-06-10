import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom';
import fetchPostPut from "../fetch/fetchPostPut";
import useFetchDbData from "../fetch/useFetchDbData";
import Loading from "../loading";

const EditBlog = () => {
    const {id} = useParams();
    const {data: blog, isPending: isPendingBlog, dbError: dbErrorBlog} = useFetchDbData('http://localhost:8000/blogs/' + id); //pobranie blogów
    //stany do formularza
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [authorId, setAuthorId] = useState(1);
    const [isPending, setIsPending] = useState(false);
    
    const {data: authors, isPending: isPendingAuthor, dbError: dbErrorAuthor} = useFetchDbData('http://localhost:8000/authors'); //pobranie autorów
    const history = useHistory();

    //uzupełnij formularz danymi z blogu
    useEffect(() => {
        if(blog) {
            setTitle(blog.title);
            setContent(blog.content);
            setAuthorId(blog.authorId);
        }
        
    }, [blog]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title, content, authorId};
        setIsPending(true);
        fetchPostPut({
            method: 'PUT',
            url: 'http://localhost:8000/blogs/' + id,
            content: blog
        });
        setIsPending(false);
        setTimeout(() => {history.go(-1)}, 500); //przekierowanie
    }

    return (
        <div className="create-edit">
            {isPending && <div className="loading">
                    <Loading />
                    <p>Wysyłanie</p>
                </div>}
            {(isPendingBlog || isPendingAuthor) && <div className="loading">
                    <Loading />
                    <p>Wczytywanie</p>
                </div>}
            {(dbErrorBlog || dbErrorAuthor) && <div>{dbErrorBlog || dbErrorAuthor}</div>}
            {!isPending && authors && blog &&
            <div>
                <h2>Edytuj</h2>
                <form onSubmit={handleSubmit}>
                    <label>Tytuł:</label>
                    <input 
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>Treść:</label>
                    <textarea 
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <label>Autor:</label>
                    <select
                        value={parseInt(authorId)}
                        onChange={(e) => setAuthorId(parseInt(e.target.value))}
                    >
                        {authors.map((authorObj) => (
                            <option value={authorObj.id}>{authorObj.nick}</option>
                        ))}   
                    </select>
                    <button>Edytuj blog</button>
                </form>
            </div>}
            
        </div>
      );
}
 
export default EditBlog;