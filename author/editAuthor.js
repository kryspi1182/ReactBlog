import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import fetchPostPut from "../fetch/fetchPostPut";
import useFetchDbData from "../fetch/useFetchDbData";
import { useParams } from "react-router";
import Loading from "../loading";

const EditAuthor = () => {
    const {id} = useParams();
    //stany do formularza
    const [nick, setNick] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [description, setDescription] = useState('');
    const [isPending, setIsPending] = useState(false);
    
    const {data: author, isPending: isPendingAuthor, dbError: dbErrorAuthor} = useFetchDbData('http://localhost:8000/authors/' + id); //pobierz
    const history = useHistory();

    useEffect(() => {
        if (author) {
            setNick(author.nick);
            setName(author.name);
            setSurname(author.surname);
            setDescription(author.description);
        }
    }, [author]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const author = {name, surname, nick, description};
        setIsPending(true);
        fetchPostPut({
            method: 'PUT',
            url: 'http://localhost:8000/authors/' + id,
            content: author
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
            {isPendingAuthor && <div className="loading">
                    <Loading />
                    <p>Wczytywanie</p>
                </div>}
            {dbErrorAuthor && <div>{dbErrorAuthor}</div>}
            {!isPending && author &&
            <div>
                <h2>Edytuj</h2>
                <form onSubmit={handleSubmit}>
                    <label>Imię:</label>
                    <input 
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label>Nazwisko:</label>
                    <input 
                        type="text"
                        required
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                    <label>Nick:</label>
                    <input 
                        type="text"
                        required
                        value={nick}
                        onChange={(e) => setNick(e.target.value)}
                    />
                    <label>Opis:</label>
                    <textarea 
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button>Edytuj autora</button>
                </form>
            </div>}
            
        </div>
      );
}
 
export default EditAuthor;