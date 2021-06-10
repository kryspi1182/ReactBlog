import { useState } from "react";
import { useHistory } from 'react-router-dom';
import fetchPostPut from "../fetch/fetchPostPut";
import useFetchDbData from "../fetch/useFetchDbData";
import Loading from "../loading";

const CreateBlog = () => {
    //stany do formularza
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [authorId, setAuthorId] = useState(1);

    const [isPending, setIsPending] = useState(false);
    const {data: authors, isPending: isPendingAuthor, dbError: dbErrorAuthor} = useFetchDbData('http://localhost:8000/authors'); //pobranie autorów
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const date = Date.now();
        const blog = {title, content, authorId, date};
        setIsPending(true);
        fetchPostPut({
            method: 'POST',
            url: 'http://localhost:8000/blogs',
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
            {isPendingAuthor && <div>
                <Loading />
                <p>Wczytywanie</p>
            </div>}
            {dbErrorAuthor && <div>{dbErrorAuthor}</div>}
            {!isPending && authors && 
            <div>
                <h2>Utwórz</h2>
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
                            <option key={"blogauthor" + authorObj.id} value={authorObj.id}>{authorObj.nick}</option>
                        ))}   
                    </select>
                    <button>Utwórz blog</button>
                </form>
            </div>}
            
        </div>
      );
}
 
export default CreateBlog;