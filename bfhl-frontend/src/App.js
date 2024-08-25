import React, { useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [jsonData, setJsonData] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const handleJsonInputChange = (e) => {
    setJsonData(e.target.value);
    setError('');
  };

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonData);

      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        throw new Error('Invalid JSON: "data" should be an array.');
      }

      const response = await fetch('https://bajaj-finance-1-ojse.onrender.com/post/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch the API. Please check the backend.');
      }

      const result = await response.json();
      setResponse(result);
      toast.success('Request was successful!');
    } catch (e) {
      setError(`Error: ${e.message}`);
      setResponse(null);
    }
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value && !selectedOptions.includes(value)) {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const handleRemoveOption = (optionToRemove) => {
    setSelectedOptions(
      selectedOptions.filter((option) => option !== optionToRemove)
    );
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    return (
      <div className="response-container">
        {selectedOptions.includes('numbers') && (
          <div>
            <strong>Numbers:</strong> {JSON.stringify(numbers)}
          </div>
        )}
        {selectedOptions.includes('alphabets') && (
          <div>
            <strong>Alphabets:</strong> {JSON.stringify(alphabets)}
          </div>
        )}
        {selectedOptions.includes('highest_lowercase_alphabet') && (
          <div>
            <strong>Highest Lowercase Alphabet:</strong>{' '}
            {JSON.stringify(highest_lowercase_alphabet)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <nav className="navbar">
        <h1>Bajaj Assignment </h1>
        <h2>Aditya Jain</h2>
        <h2>21BCY10190</h2>
      </nav>
      <div className="input-container">
        <textarea
          placeholder='Enter JSON e.g. { "data":["A","b","1"] }'
          value={jsonData}
          onChange={handleJsonInputChange}
          rows="5"
        />
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
      {error && <p className="error">{error}</p>}
      {response && (
        <div className="select-container">
          <select onChange={handleSelectChange}>
            <option value="">Select an option</option>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_lowercase_alphabet">
              Highest Lowercase Alphabet
            </option>
          </select>
        </div>
      )}
      <div className="selected-options">
        {selectedOptions.map((option) => (
          <div key={option} className="selected-option">
            {option} <span onClick={() => handleRemoveOption(option)}>&times;</span>
          </div>
        ))}
      </div>
      {renderResponse()}
      <ToastContainer />
    </div>
  );
}

export default App;
