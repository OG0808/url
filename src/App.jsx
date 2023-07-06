import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [getUrl, setGetUrl] = useState("");
  // const [addUrl, setAddUrl] = useState([]);
  const [urlSought, setUrlSought] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    setGetUrl(e.target.inputValue.value.trim());
    e.target.inputValue.value = "";
  };

  useEffect(() => {
    axios
      .get(`https://api.shrtco.de/v2/shorten?url=${getUrl}`)
      .then((response) => {
        setUrlSought([...urlSought, response.data]);
      })
      .catch((error) => console.log(error));
  }, [getUrl]);

  return (
    <div className="main__container">
      <h1>Acortador de enlaces</h1>

      <form onSubmit={onSubmit}>
        <input type="text" name="inputValue" />
        <button>Get url</button>
      </form>

      <div className="ulr">
        <ul>
        {urlSought.map((url) => (
          <li>
            <h2 key={url.result?.code}>{url.result?.full_short_link}</h2>
            <h4>{url.result?.original_link}</h4>
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
