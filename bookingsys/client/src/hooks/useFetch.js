import { useEffect, useState } from "react";
import axios from "axios";

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

        //const res = await axios.get(url);
        const res = await fetch('/search?name=Singapore');
        const jsonResult = await res.json();
        //fetch('http://localhost:8800/search?name=Singapore')
        //.then(res=> {
          //return res.json();
        //}).then(data => {
          //console.log(data);
        //})
        console.log(' use effect hook fetch data fn ', jsonResult);
        setData(res.data);
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
      const res = await fetch('/search?name=Singapore');
      const jsonResult = await res.json();
      console.log(' use effect hook refetch function ', jsonResult);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;