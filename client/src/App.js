import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');


  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3000/api/insert/'+name);
      fetchData(); 
      setName('');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div>
      <h1>API Fetch App</h1>
      <form>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <button onClick={fetchData}>Fetch Data</button>
      {data.length > 0 && (
        <ul>
          {data.map((item) => (
            <li key={item._id}>
              _id: {item._id}, name: {item.first_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
