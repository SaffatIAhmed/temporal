import React, { useState, useEffect } from 'react';

function FetchData(url: string){
    const [fetchedData, setFetchedData] = useState(null);

	useEffect(() => {
	  const fetchDataAsync = async () => {
		const data = await fetchDataResponse();
		setFetchedData(data);
	  };
  
	  fetchDataAsync();
	}, []);

    return fetchedData
}

async function fetchDataResponse() {
	let jsondata;
  
	try {
	  const response = await fetch('http://localhost:3000/listings');
	  jsondata = await response.json();
	  //console.log(jsondata);
	  return jsondata

	} catch (error) {
	  console.error('Error fetching data:', error);
	}
  }

  export default FetchData;
