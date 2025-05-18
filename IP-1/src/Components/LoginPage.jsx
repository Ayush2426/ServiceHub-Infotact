// LoginPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Simple Icon component (can be reused or replaced with a proper icon library)
const Icon = ({ name, size = 20 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`icon icon-${name}`}
    >
        {name === 'mail' && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></>}
        {name === 'lock' && <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></>}
        {name === 'arrow-right' && <><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></>}
    </svg>
);

const LoginPage = () => {
    // State for form inputs
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // State for form errors
    const [errors, setErrors] = useState({});
    // State for general login error (e.g., invalid credentials)
    const [loginError, setLoginError] = useState('');
    // State for successful submission
    const [isSubmitted, setIsSubmitted] = useState(false); // Or handle redirection

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
        // Clear error for the field being changed
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: null,
            }));
        }
        setLoginError(''); // Clear general login error on input change
    };

    // Validate form data
    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid.';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoginError(''); // Reset login error
        setIsSubmitted(false);

        if (validateForm()) {
            // --- TODO: Implement actual login logic here ---
            // For example, send data to a backend API
            console.log('Login attempt with:', formData);

            // Simulate API call
            if (formData.email === "user@example.com" && formData.password === "password123") {
                console.log('Login successful');
                setIsSubmitted(true); // Or redirect to dashboard
                alert('Login Successful! Redirecting...');
                // In a real app: history.push('/dashboard') or similar
            } else {
                setLoginError('Invalid email or password. Please try again.');
                console.log('Login failed: Invalid credentials');
            }
        } else {
            console.log('Form has errors:', errors);
        }
    };

    return (
        <div className="login-page-container">
            <header className="minimal-header">
                <div className="container">
                    <div className="logo">
                        <a href="/">Service<span className="logo-accent">Hub</span></a>
                    </div>
                </div>
            </header>

            <main className="login-main-content">
                <div className="login-form-card">
                    <h2>Welcome Back!</h2>
                    <p className="form-subtitle">Log in to access your account.</p>

                    {isSubmitted && ( // This is more for testing, usually you'd redirect
                        <div className="success-message">
                            <p>Login successful! Redirecting...</p>
                        </div>
                    )}

                    {loginError && (
                        <div className="error-message global-error-message">
                            <p>{loginError}</p>
                        </div>
                    )}

                    {!isSubmitted && (
                        <form onSubmit={handleSubmit} noValidate>
                            {/* Email Field */}
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <div className="input-with-icon">
                                    <Icon name="mail" />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="e.g., john.doe@example.com"
                                        required
                                        aria-invalid={errors.email ? "true" : "false"}
                                        aria-describedby={errors.email ? "emailError" : null}
                                    />
                                </div>
                                {errors.email && <p id="emailError" className="error-text">{errors.email}</p>}
                            </div>

                            {/* Password Field */}
                            <div className="form-group">
                                <div className="label-with-link">
                                    <label htmlFor="password">Password</label>
                                    <a href="/forgot-password" className="form-link">Forgot Password?</a>
                                </div>
                                <div className="input-with-icon">
                                    <Icon name="lock" />
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        required
                                        aria-invalid={errors.password ? "true" : "false"}
                                        aria-describedby={errors.password ? "passwordError" : null}
                                    />
                                </div>
                                {errors.password && <p id="passwordError" className="error-text">{errors.password}</p>}
                            </div>

                            <button type="submit" className="btn btn-primary btn-block">
                                Log In <Icon name="arrow-right" size={16} />
                            </button>
                        </form>
                    )}

                    <p className="form-footer-text">
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </div>
            </main>

            <footer className="minimal-footer">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} ServiceHub. All rights reserved.</p>
                    <p>
                        <a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LoginPage;
