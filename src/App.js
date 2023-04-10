import './App.css';
import { useState,useEffect } from 'react';
import Rflow from './components/Rflow'
import { Route, Routes } from 'react-router-dom';
import List from './components/List';


function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(' https://64307b10d4518cfb0e50e555.mockapi.io/workflow')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data)
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }
  , []);
  return (
    <>
      {/* <Container> */}
      <Routes>
      <Route
          path="/"
          element={<List loading={loading} error={error} data={data} />}
        />
        <Route
          path="/rflow/:id/:name"
          element={<Rflow />}
        />

      </Routes>
    </>
  );
}

export default App;
