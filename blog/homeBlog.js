import { useState, useEffect } from 'react';
import BlogList from './listBlog';
import useFetchDbData from '../fetch/useFetchDbData';
import Loading from '../loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

const HomeBlog = () => {
    const {data: blogs, isPending, dbError} = useFetchDbData('http://localhost:8000/blogs'); //pobierz blogi
    const {data: authors, isPending: isPendingAuthor, dbError: dbErrorAuthor} = useFetchDbData('http://localhost:8000/authors'); //pobierz autorów
    //stany do filtrowania i sortowania
    const [filter, setFilter] = useState('');
    const [listTitle, setListTitle] = useState("Wszystkie blogi");
    const [filterAuthor, setFilterAuthor] = useState(-1);
    const [sortOrder, setSortOrder] = useState(0);
    const [sortField, setSortField] = useState(-1);

    //wyczyszczenie filtrów
    const handleClear = (e) => {
        setFilterAuthor(-1);
        setFilter('');
        setListTitle("Wszystkie blogi");
    }

    //sprawdzenie czy są filtry przy każdej zmianie wartości filtrów
    useEffect(() => {
        if(filterAuthor !== -1 || filter !== '')
            setListTitle("Filtrowane blogi");
        else
            setListTitle("Wszystkie blogi");

    }, [filterAuthor, filter]);

    return (
        <div className="home">
            {(dbError || dbErrorAuthor) && <div>{dbError || dbErrorAuthor}</div> /* wyświetl błędy */}
            {(isPending || isPendingAuthor) && <div className="loading">
                <Loading />
                <p>Wczytywanie</p>
            </div> /* wyświetl informację o wczytywaniu */}
            {authors && <div className="filter-sort">
                <Link to="/blogs/create">
                    <div className="add-div">
                        <span className="list-icon"><FontAwesomeIcon icon={faPlus} /> Stwórz blog </span>
                    </div>
                </Link>
                <div className="filter">
                    <h3>Filtry</h3>
                    <label>Szukaj</label>
                    <input 
                        type="text"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <label>Autor</label>
                    <select
                        value={parseInt(filterAuthor)}
                        onChange={(e) => setFilterAuthor(parseInt(e.target.value))}
                    >
                        <option key={"authors" + 0} value={-1}>-- Brak --</option>
                        {authors.map((authorObj) => (
                        <option key={"authors" + authorObj.id} value={authorObj.id}>{authorObj.nick}</option>
                        ))}   
                    </select>
                    <button onClick={handleClear}>Wyczyść filtry</button>
                </div>
                <div className="sort">
                    <h3>Sortuj</h3>
                    <label>Pole</label>
                    <select
                        value={parseInt(sortField)} 
                        onChange={(e) => setSortField(parseInt(e.target.value))}   
                    >
                        <option key="field-1" value={-1}>-- Brak --</option>
                        <option key="field0" value={0}>Tytuł</option>
                        <option key="field1" value={1}>Treść</option>
                        <option key="field2" value={2}>Data utworzenia</option>   
                    </select> 
                    <label>Kolejność</label>
                    <select
                        value={parseInt(sortOrder)} 
                        onChange={(e) => setSortOrder(parseInt(e.target.value))}   
                    >
                        <option key="direction0" value={0}>Rosnąco</option>
                        <option key="direction1" value={1}>Malejąco</option>  
                    </select>            
                </div>   
            </div>}
            {blogs && <BlogList blogs={blogs.filter((blog) => {
                if (blog.title.toLowerCase().includes(filter.toLowerCase()) || 
                blog.content.toLowerCase().includes(filter.toLowerCase())) {
                    if (filterAuthor === -1)
                        return true;
                    else if (blog.authorId === filterAuthor)
                        return true;
                    else
                        return false;
                }
                return false; 
            }).sort((a, b) => {
                switch (sortField) {
                    case 0:
                        if (sortOrder === 0) {
                            if (a.title > b.title)
                                return 1;
                            else
                                return -1;
                        }       
                        else {
                            if (a.title < b.title)
                                return 1;
                            else
                                return -1;
                        }
        
                    case 1:
                        if (sortOrder === 0) {
                            if (a.content > b.content)
                                return 1;
                            else
                                return -1;
                        }       
                        else {
                            if (a.content < b.content)
                                return 1;
                            else
                                return -1;
                        }
        
                    case 2:
                        if (sortOrder === 0) {
                            if (a.date > b.date)
                                return 1;
                            else
                                return -1;
                        }       
                        else {
                            if (a.date < b.date)
                                return 1;
                            else
                                return -1;
                        }
        
                    default:
                        if (a.id > b.id)
                            return 1;
                        else
                            return -1;       
                }
            })} title={listTitle}/>}
        </div>
    );
}
 
export default HomeBlog;