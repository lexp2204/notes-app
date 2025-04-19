import React, { useState } from 'react';
import AuthForm from './components/AuthForm';
import Notes from './components/Notes';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div className="App">
      {token ? (
        <Notes token={token} />
      ) : (
        <AuthForm setToken={(token) => {
          setToken(token);
          localStorage.setItem('token', token);
        }} />
      )}
    </div>
  );
}

export default App;
