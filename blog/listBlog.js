import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const BlogList = ({blogs, title}) => {

    const dateToString = (date) => {
        const result = new Date(date);
        return result.getDate() + '-' + (result.getMonth() + 1) + '-' + result.getFullYear();
    }

    return (
        <div className="blog-list">
            <h2>{title}</h2>
            {blogs.map((blog) => (
                <div className="blog-preview" key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                    <h2>{ blog.title }</h2>
                    <p className="blog-date">{ dateToString(blog.date) }</p>
                    <p className="blog-content">{ blog.content.substring(0, 20) + '...' }</p>
                    </Link>
                    <h3>
                    <Link to={`/blogs/delete/${blog.id}/${blog.authorId}`}>
                        <span className="list-icon"><FontAwesomeIcon icon={faTrash} /> </span>
                    </Link>
                    <Link to={`/blogs/edit/${blog.id}`}>
                        <span className="list-icon"><FontAwesomeIcon icon={faEdit} /></span>
                    </Link>
                    </h3>
                </div>
            ))}
        </div>
      );
}
 
export default BlogList;