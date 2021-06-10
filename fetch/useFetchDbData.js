import {useState, useEffect} from 'react';

const useFetchDbData = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [dbError, setDbError] = useState(null);

    useEffect(() => {
        const abort = new AbortController();
        setTimeout(() => {
            fetch(url, {signal: abort.signal})
            .then((response) => {
                if(!response.ok){
                    throw Error('Fetch error!');
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setIsPending(false);
                setDbError(null);
            })
            .catch((err) => {
                if(err.name === 'AbortError'){
                    //console.log('Abort!');
                }
                else {
                    setDbError(err.message);
                    setIsPending(false);
                }
                
            });
        }, 1000); //timeout aby symulować okres oczekiwania
        

        return () => abort.abort();
    }, [url]);
    return {data, isPending, dbError};
}

export default useFetchDbData;