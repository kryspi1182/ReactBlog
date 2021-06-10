const fetchPostPut = (params) => {

    setTimeout(() => {
        fetch(params.url, {
            method: params.method,
            headers: {"Content-Type": "application/json; charset=UTF-8"},
            body: JSON.stringify(params.content)
            });
    }, 1000); //timeout aby symulować okres oczekiwania
    
}
 
export default fetchPostPut;