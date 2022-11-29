import { useState } from "react";
import { useNavigate } from "react-router";

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleGoogle = async (response) => {
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({ credential: response.credential })
    })
      .then((res) => {
        console.log(res);
        setLoading(false);

        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data?.user) {
          localStorage.setItem("token", JSON.stringify(data?.token));
          localStorage.setItem("user", JSON.stringify(data?.user));
          navigate("/");
        }

        throw new Error(data?.message || data);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  return { loading, error, handleGoogle };
};

export default useFetch;
