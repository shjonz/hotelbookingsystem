import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  console.log(' inside use fetch '); 

  useEffect(() => {
    const fetchData = async () => {
      console.log(' use effect ');
      setLoading(true);
      try {
        console.log(' usefetch useeffet on header component ' );
        //const res = await axios.get(url);
        fetch(`/search?name=${url}`)
        .then(
            response => response.json()
        ).then(data => {
            console.log('inside use effect fetch ', data);
            setData(data);
        }).catch( error => {
          if(error.name === 'SyntaxError' && error.message.includes('Unexpected end of JSON input') ) {
            console.error('Truncated data: Not all of the JSON data was received');
          }
        })
        console.log(' use effect hook fetch data fn ');
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      //const res = await axios.get(url);
      console.log(' REFETCH on header component ' );
        fetch(`/search?name=${url}`)
        .then(
            response => response.json()
        ).then(data => {
            console.log('inside use effect REFETCH ', data);
            setData(data);
        }).catch( error => {
          if(error.name === 'SyntaxError' && error.message.includes('Unexpected end of JSON input') ) {
            console.error('Truncated data: Not all of the JSON data was received');
          }
        })
        console.log(' use effect hook REFETCH data fn ');
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;