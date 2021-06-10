import { useState, useEffect } from 'react';
import AuthorList from './listAuthor';
import useFetchDbData from '../fetch/useFetchDbData';
import Loading from '../loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

const HomeAuthor = () => {
    const {data: authors, isPending, dbError} = useFetchDbData('http://localhost:8000/authors'); //pobieranie
    //stany do filtrowania i sortowania
    const [filter, setFilter] = useState('');
    const [listTitle, setListTitle] = useState("Wszyscy autorzy");
    const [sortOrder, setSortOrder] = useState(0);
    const [sortField, setSortField] = useState(-1);

    //wyczyść filtr
    const handleClear = (e) => {
        setFilter('');
    }

    //sprawdzenie czy jest filtr przy każdej zmianie wartości filtra
    useEffect(() => {
        if(filter !== '')
            setListTitle("Filtrowani autorzy");
        else
            setListTitle("Autorzy");
    }, [filter]);

    return (
        <div className="home">
            {dbError && <div>{dbError}</div>}
            {isPending && <div className="loading">
                    <Loading />
                    <p>Wczytywanie</p>
                </div>}
            {authors && <div className="filter-sort">
                <Link to="/authors/create">
                    <div className="add-div">
                        <span className="list-icon"><FontAwesomeIcon icon={faPlus} /> Stwórz autora </span>
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
                    <button onClick={handleClear}>Wyczyść filtr</button>
                </div>
                <div className="sort">
                    <h3>Sortuj</h3>
                    <label>Pole</label>
                    <select
                        value={parseInt(sortField)} 
                        onChange={(e) => setSortField(parseInt(e.target.value))}   
                    >
                        <option key="field-1" value={-1}>-- Brak --</option>
                        <option key="field0" value={0}>Nick</option>
                        <option key="field1" value={1}>Imię</option>
                        <option key="field2" value={2}>Nazwisko</option>   
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
            {authors && <AuthorList authors={authors.filter((author) => author.name.toLowerCase().includes(filter.toLowerCase()) ||
                author.surname.toLowerCase().includes(filter.toLowerCase()) ||
                author.nick.toLowerCase().includes(filter.toLowerCase()) ||
                author.description.toLowerCase().includes(filter.toLowerCase()))
                .sort((a, b) => {
                    switch (sortField) {
                        case 0:
                            if (sortOrder === 0) {
                                if (a.nick > b.nick)
                                    return 1;
                                else
                                    return -1;
                            }       
                            else {
                                if (a.nick < b.nick)
                                    return 1;
                                else
                                    return -1;
                            }
            
                        case 1:
                            if (sortOrder === 0) {
                                if (a.name > b.name)
                                    return 1;
                                else
                                    return -1;
                            }       
                            else {
                                if (a.name < b.name)
                                    return 1;
                                else
                                    return -1;
                            }
            
                        case 2:
                            if (sortOrder === 0) {
                                if (a.surname > b.surname)
                                    return 1;
                                else
                                    return -1;
                            }       
                            else {
                                if (a.surname < b.surname)
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
 
export default HomeAuthor;