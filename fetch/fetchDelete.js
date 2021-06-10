const fetchDelete = (params) => {
        
    setTimeout(() => {
        fetch(params.url, {
            method: 'DELETE'
            }).then(() => {
                
            });
    }, 1000); //timeout aby symulować okres oczekiwania
    
}
 
export default fetchDelete;