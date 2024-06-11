import React, { useEffect, useState } from "react";
import axios from "axios";

const useFeatchPost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState([]);
  // https://jsonplaceholder.typicode.com/posts
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3001")
      .then((response) => {
        console.log("response: ", response);
        /*
        let modifiedResp = response?.data.map((obj) => {
          return {
            ...obj,
            status: "Open",
            description: obj.body,
          };
        });
        console.log("modified: ", modifiedResp);*/
        setData(response.data);
      })
      .catch((err) => setError("Failed to fetch the posts"))
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return { loading, error, data };
};

export default useFeatchPost;
