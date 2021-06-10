import { useParams } from "react-router";
import useFetchDbData from "../fetch/useFetchDbData";
import { Link } from "react-router-dom";
import Loading from "../loading";

const DetailsAuthor = () => {
    const {id} = useParams();
    const {data: author, isPending: isPendingBlog, dbError} = useFetchDbData('http://localhost:8000/authors/' + id);
    const {data: blogs, isPending: isPendingAuthor, dbError: dbErrorAuthor} = useFetchDbData('http://localhost:8000/blogs');

    return ( 
        <div className="details-author">
            {(isPendingBlog || isPendingAuthor) && <div className="loading">
                    <Loading />
                    <p>Wczytywanie</p>
                </div>}
            {(dbError || dbErrorAuthor) && <div>{dbError || dbErrorAuthor}</div>}
            {author && (
                <div className="details-author">
                    <article>
                        <h2>{author.nick}</h2>
                        <p>{author.description}</p>
                        <p>{author.name + ' ' + author.surname}</p>
                    </article>
                    {blogs && <div className="blog-list">
                        <h2>{author.nick + '\'s posts'}</h2>
                        {blogs.filter((blog) => blog.authorId === parseInt(id)).map((blog) => (
                            <div className="blog-preview" key={blog.id}>
                                {console.log(typeof(blog.authorId) + ' vs ' + typeof(id))}
                                <Link to={`/blogs/${blog.id}`}>
                                <h2>{ blog.title }</h2>
                                <p>{ blog.content.substring(0, 20) + '...' }</p>
                                </Link>
                            </div>
                        ))}
                        </div>}
                </div>
            )}
        </div>
     );
}
 
export default DetailsAuthor;