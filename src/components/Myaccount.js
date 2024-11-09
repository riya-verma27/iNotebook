
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const MyAccount = (props) => {
    const [userData, setUserData] = useState({ name: '', email: '', password: '' });
    const [initialData, setInitialData] = useState({ name: '', email: '', password: '' }); // For comparison
    const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
    const [isChanged, setIsChanged] = useState(false); // To enable/disable the update button
    const [passwordError, setPasswordError] = useState(''); // Error message for password mismatch
    const [showPassword, setShowPassword] = useState(false); // To toggle password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // To toggle confirm password visibility
    const navigate = useNavigate();

    // Fetch user details when component mounts
    useEffect(() => {
        const fetchUserDetails = async () => {
            const response = await fetch('http://localhost:3001/api/auth/getuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },
            });
            const json = await response.json();
            if (json) {
                setUserData({ name: json.name, email: json.email, password: '' });
                setInitialData({ name: json.name, email: json.email, password: '' }); // Set initial values
            }
        };

        if (!localStorage.getItem('token')) {
            navigate('/login');
        } else {
            fetchUserDetails();
        }
    }, [navigate]);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });

        // Check if any field is different from the initial data to enable the update button
        if (
            (name === 'name' && value !== initialData.name) ||
            (name === 'email' && value !== initialData.email) ||
            (name === 'password' && value !== initialData.password)
        ) {
            setIsChanged(true);
        } else {
            setIsChanged(false);
        }

        // If it's the password field, clear the password mismatch error
        if (name === 'password') {
            setPasswordError('');
        }
    };

    // Handle confirm password change
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);

        // Check if passwords match and set an error message if they don't
        if (userData.password && e.target.value !== userData.password) {
            setPasswordError("Passwords do not match");
        } else {
            setPasswordError('');
        }

        // Enable the button if there's a change and passwords match
        setIsChanged(e.target.value === userData.password);
    };

    // Handle form submission (updating user data)
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure that passwords match before submitting
        if (userData.password && userData.password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        const response = await fetch('http://localhost:3001/api/user/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
            body: JSON.stringify(userData),
        });
        const json = await response.json();
        if (json.errors) {
            props.showAlert("Failed to update account details", "danger");
        } else {
            props.showAlert("Account details updated successfully", "success");
            setIsChanged(false); // Disable the button again after update
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Toggle confirm password visibility
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="container mt-5">
            <h2>My Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Leave blank if you don't want to change"
                            value={userData.password}
                            onChange={handleChange}
                        />
                        <span className="input-group-text" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon */}
                        </span>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <div className="input-group">
                        <input
                            type={showConfirmPassword ? "text" : "password"} // Toggle input type based on showConfirmPassword state
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            placeholder="Confirm your new password"
                        />
                        <span className="input-group-text" onClick={toggleConfirmPasswordVisibility} style={{ cursor: 'pointer' }}>
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon */}
                        </span>
                    </div>
                    {passwordError && <small className="text-danger">{passwordError}</small>}
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!isChanged || !!passwordError} // Disable if no changes or password error
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default MyAccount;
