import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;

    if (password === cpassword) {
      const response = await fetch(`http://localhost:3001/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem('token', json.authToken);
        navigate('/');
        props.showAlert("Account Created Successfully", "success");
      } else {
        props.showAlert("Invalid Details", "danger");
      }
    } else {
      props.showAlert("Passwords do not match", "danger");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="signup-container" style={styles.container}>
      <h2 style={styles.header}>Create an Account</h2>
      <p style={styles.subHeader}>Join iNotebook today</p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div className="form-group" style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Full Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            placeholder="Enter your full name"
            style={styles.input}
            required
          />
        </div>
        <div className="form-group" style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            placeholder="Enter your email"
            style={styles.input}
            required
          />
        </div>
        <div className="form-group" style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            minLength={5}
            placeholder="Create a password"
            style={styles.input}
            required
          />
        </div>
        <div className="form-group" style={styles.formGroup}>
          <label htmlFor="cpassword" style={styles.label}>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            minLength={5}
            placeholder="Confirm your password"
            style={styles.input}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" style={styles.button}>Sign Up</button>
        <p style={styles.footerText}>
          Already have an account? <Link to="/login" style={styles.link}>Log In</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    color: '#ffffff',
  },
  header: {
    fontSize: '2rem',
    color: '#007bff',
    marginBottom: '0.5rem',
  },
  subHeader: {
    fontSize: '1rem',
    color: '#bfbfbf',
    marginBottom: '2rem',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    backgroundColor: '#333',
    borderRadius: '8px',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    color: '#ffffff',
    marginBottom: '0.5rem',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #555',
    backgroundColor: '#444',
    color: '#ffffff',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    border: 'none',
    color: '#ffffff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  footerText: {
    marginTop: '1.5rem',
    color: '#bfbfbf',
  },
  link: {
    color: '#007bff',
    textDecoration: 'underline',
  },
};

export default Signup;
