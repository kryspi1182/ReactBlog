import { useParams } from "react-router";
import useFetchDbData from "../fetch/useFetchDbData";
import Loading from "../loading";

const DetailsBlog = () => {
    const {id} = useParams();
    const {data: blog, isPending: isPendingBlog, dbError: dbErrorBlog} = useFetchDbData('http://localhost:8000/blogs/' + id);
    const {data: authors, isPending: isPendingAuthors, dbError: dbErrorAuthors} = useFetchDbData('http://localhost:8000/authors');

    return ( 
        <div className="blog-details">
            {(isPendingBlog || isPendingAuthors) && <div className="loading">
                    <Loading />
                    <p>Wczytywanie</p>
                </div>}
            {(dbErrorBlog || dbErrorAuthors) && <div>{dbErrorBlog || dbErrorAuthors}</div>}
            {blog && authors &&
                <article>
                    <h2>{blog.title}</h2>
                    <p>{blog.content}</p>
                    <p>{authors.filter((author) => author.id === blog.authorId)[0].nick}</p>
                </article>}
        </div>
     );
}
 
export default DetailsBlog;