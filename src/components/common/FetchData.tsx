function FetchData(url: string){
    return Promise.all([fetchDataResponse(url)])
}

function fetchDataResponse(url: string) {
  
	return fetch(url , {

	}).then((response) => response.json())
  };

  export default FetchData;

