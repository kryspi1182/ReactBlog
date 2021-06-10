import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import fetchDelete from "../fetch/fetchDelete";
import useFetchDbData from '../fetch/useFetchDbData';
import Loading from "../loading";

const DeleteAuthor = () => {

    const {id} = useParams();
    const {data: author, isPending: isPendingAuthor, dbError: dbErrorAuthor} = useFetchDbData('http://localhost:8000/authors/' + id);
    const [isPending, setIsPending] = useState(false);
    
    const handleConfirm = (e) => {
        setIsPending(true);
        fetchDelete({
            url: 'http://localhost:8000/authors/' + id
        });
        setIsPending(false);
    }
    return ( 
        <div className="confirm">
            {isPendingAuthor && <div className="loading">
                    <Loading />
                    <p>Wczytywanie</p>
                </div>}
            {isPending && <div className="loading">
                    <Loading />
                    <p>Wysyłanie</p>
                </div>}
            {dbErrorAuthor && <div>{dbErrorAuthor}</div>}
            {author&& 
                <div>
                    <h1>Czy na pewno chcesz usunąć tego autora? Spowoduje to usunięcie wszystkich jego blogów!</h1>
                    <h2>Imię i nazwisko: </h2>
                    <p>{author.name} {author.surname}</p>
                    <h2>Nick:</h2>
                    <p>{author.nick}</p>
                    <span>
                        <button onClick={handleConfirm}>Tak</button>
                        <Link to={`/authors`}>
                            <button>Nie</button>
                        </Link>
                    </span>
                </div>}
            
        </div>
     );
}
 
export default DeleteAuthor;