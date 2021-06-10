import { useState } from "react";
import { useHistory } from 'react-router-dom';
import fetchPostPut from "../fetch/fetchPostPut";
import Loading from "../loading";

const CreateAuthor = () => {
    //stany do formularza
    const [nick, setNick] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [description, setDescription] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const author = {name, surname, nick, description};
        setIsPending(true);
        fetchPostPut({
            method: 'POST',
            url: 'http://localhost:8000/authors',
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
            {!isPending &&
            <div>
                <h2>Utwórz</h2>
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
                    <button>Utwórz autora</button>
                </form>
            </div>}
            
        </div>
      );
}
 
export default CreateAuthor;