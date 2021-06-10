import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const AuthorList = ({authors, title}) => {

    return (
        <div className="author-list">
            <h2>{title}</h2>               
                {authors.map((author) => (
                    <div className="author-preview" key={author.id}>
                        <Link to={`/authors/${author.id}`}>
                        <h2>{ author.nick }</h2>
                        <p>Imię: {author.name}</p>
                        <p>Nazwisko: {author.surname}</p>
                        </Link>
                        <h3>
                        <Link to={`/authors/delete/${author.id}`}>
                            <span className="list-icon"><FontAwesomeIcon icon={faTrash}/></span>
                        </Link>
                        <Link to={`/authors/edit/${author.id}`}>
                            <span className="list-icon"><FontAwesomeIcon icon={faEdit}/></span>
                        </Link>
                        </h3>
                    </div>
                ))}
        </div>
      );
}
 
export default AuthorList;