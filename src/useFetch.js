import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useFetch = (url) => {
  
  const [done, setDone] = useState(false);
  const [data, setData] = useState({});

  const getData = useCallback(async () => {
    axios.get(url)
    .then((response) => {
        setData({data:response.data});
        setDone(true);    
    })
    .catch((error) => {
        setDone(false);
        setData({});
        console.error(error);
    })
  }, [url]);
  
  useEffect(() => {
    getData();
  }, [url, getData]);
  
  if(url === ""){
    return {done:true, data:null};
  }
  return { done, data };
};
