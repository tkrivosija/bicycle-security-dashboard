import React, { useState, useEffect } from 'react';
import Dashboard from '../dashboard';
import TopBar from './Topbar';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginUrl = 'http://161.53.19.19:45080/api/auth/login';
        const loginHeaders = { 'Content-Type': 'application/json', Accept: 'application/json' };
        const loginData = { username: 'antun.weber@gmail.com', password: '123456' };

        const loginResponse = await axios.post(loginUrl, loginData, { headers: loginHeaders });

        if (loginResponse.status === 200) {
          const token = loginResponse.data.token;
          const telemetryUrl = 'http://161.53.19.19:45080/api/v1/rHB0XAaLb3Maq2aBkBNt/attributes';
          const telemetryHeaders = {
            'Content-Type': 'application/json',
            'X-Authorization': `Bearer ${token}`,
          };
          const telemetryParams = { keys: 'username,pw' };

          const telemetryResponse = await axios.get(telemetryUrl, {
            headers: telemetryHeaders,
            params: telemetryParams,
          });

          if (telemetryResponse.status === 200) {
            setData(telemetryResponse.data);
          } else {
            console.log('Failed to retrieve telemetry data. Response:', telemetryResponse.data);
          }
        } else {
          console.log('Failed to obtain JWT token. Response:', loginResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleLogin = () => {
    if (username === data.client.username && password === data.client.pw) {
      setLoggedIn(true);
    } else {
      alert('Neispravni podaci');
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (loggedIn) {
    return <Dashboard />;
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div>
      <TopBar />
      <div style={styles.container}>
        <h2>Login</h2>
        <div style={styles.formGroup}>
          <label style={styles.label}>Username</label>
          <input
            style={styles.input}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    overflow: 'hidden',
  },
  formGroup: {
    margin: '10px',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
    marginRight: '8px',
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '250px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  },
};