import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Corrected named import

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const checkTokenExpiration = useCallback(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000; // in seconds
            if (decoded.exp < currentTime) {
                localStorage.removeItem('token'); // remove expired token
                props.showAlert("Session expired, please log in again", "warning");
                navigate('/login');
            }
        }
    }, [navigate, props]);

    useEffect(() => {
        checkTokenExpiration();
        const interval = setInterval(checkTokenExpiration, 60000); // check every 1 minute
        return () => clearInterval(interval);
    }, [checkTokenExpiration]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3001/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            props.showAlert("Logged In Successfully", "success");
            navigate('/');  // redirect to home or any other page
        } else {
            props.showAlert("Invalid Credentials", "danger");
        }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <div className="login-container" style={styles.container}>
            <h2 style={styles.header}>Welcome Back!</h2>
            <p style={styles.subHeader}>Sign in to continue to iNotebook</p>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div className="form-group" style={styles.formGroup}>
                    <label htmlFor="email" style={styles.label}>Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={credentials.email}
                        onChange={onChange}
                        placeholder="Enter your email"
                        name="email"
                        style={styles.input}
                    />
                </div>
                <div className="form-group" style={styles.formGroup}>
                    <label htmlFor="password" style={styles.label}>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={credentials.password}
                        onChange={onChange}
                        placeholder="Enter your password"
                        name="password"
                        style={styles.input}
                    />
                </div>
                <button type="submit" className="btn btn-primary" style={styles.button}>Log In</button>
                <p style={styles.footerText}>
                    Don't have an account? <Link to="/signup" style={styles.link}>Create an account</Link>
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

export default Login;
