// SignupPage.jsx
import React, { useState }
    from 'react';
import './Components.css'; // Import the CSS file
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
        {name === 'user' && <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></>}
        {name === 'mail' && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></>}
        {name === 'phone' && <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></>}
        {name === 'lock' && <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></>}
        {name === 'arrow-right' && <><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></>}
    </svg>
);


const SignupPage = () => {
    // State for form inputs
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '', // Optional for now, for OTP later
        password: '',
        confirmPassword: '',
    });

    // State for form errors
    const [errors, setErrors] = useState({});
    // State for successful submission
    const [isSubmitted, setIsSubmitted] = useState(false);

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
        // Clear confirmPassword error if password is changed
        if (name === 'password' && errors.confirmPassword) {
            setErrors(prevErrors => ({
                ...prevErrors,
                confirmPassword: null,
            }));
        }
    };

    // Validate form data
    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full Name is required.';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid.';
        }
        // Phone is optional for now, so no validation unless a value is entered
        if (formData.phone.trim() && !/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Phone number must be 10 digits.';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required.';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long.';
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirm Password is required.';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(false); // Reset submission status
        if (validateForm()) {
            // --- TODO: Implement actual signup logic here ---
            // For example, send data to a backend API
            console.log('Form submitted successfully:', formData);
            setIsSubmitted(true); // Set submission success
            // Reset form (optional)
            // setFormData({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' });
            // setErrors({});

            // Placeholder for actual submission feedback
            // In a real app, you'd likely redirect or show a more persistent success message
            alert(`Signup successful for ${formData.fullName}! Please check your email (simulated).`);
        } else {
            console.log('Form has errors:', errors);
        }
    };

    return (
        <div className="signup-page-container">
            <header className="minimal-header">
                <div className="container">
                    <div className="logo">
                        <a href="/">Service<span className="logo-accent">Hub</span></a>
                    </div>
                </div>
            </header>

            <main className="signup-main-content">
                <div className="signup-form-card">
                    <h2>Create Your Account</h2>
                    <p className="form-subtitle">Join us to find the best local services.</p>

                    {isSubmitted && (
                        <div className="success-message">
                            <p>Registration successful! You can now <a href="/login">login</a>.</p>
                        </div>
                    )}

                    {!isSubmitted && (
                        <form onSubmit={handleSubmit} noValidate>
                            {/* Full Name Field */}
                            <div className="form-group">
                                <label htmlFor="fullName">Full Name</label>
                                <div className="input-with-icon">
                                    <Icon name="user" />
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="e.g., John Doe"
                                        required
                                        aria-invalid={errors.fullName ? "true" : "false"}
                                        aria-describedby={errors.fullName ? "fullNameError" : null}
                                    />
                                </div>
                                {errors.fullName && <p id="fullNameError" className="error-text">{errors.fullName}</p>}
                            </div>

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

                            {/* Phone Number Field (Optional) */}
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number (Optional)</label>
                                <div className="input-with-icon">
                                    <Icon name="phone" />
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="e.g., 9876543210"
                                        aria-invalid={errors.phone ? "true" : "false"}
                                        aria-describedby={errors.phone ? "phoneError" : null}
                                    />
                                </div>
                                {errors.phone && <p id="phoneError" className="error-text">{errors.phone}</p>}
                            </div>

                            {/* Password Field */}
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div className="input-with-icon">
                                    <Icon name="lock" />
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Minimum 8 characters"
                                        required
                                        aria-invalid={errors.password ? "true" : "false"}
                                        aria-describedby={errors.password ? "passwordError" : null}
                                    />
                                </div>
                                {errors.password && <p id="passwordError" className="error-text">{errors.password}</p>}
                            </div>

                            {/* Confirm Password Field */}
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <div className="input-with-icon">
                                    <Icon name="lock" />
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Re-enter your password"
                                        required
                                        aria-invalid={errors.confirmPassword ? "true" : "false"}
                                        aria-describedby={errors.confirmPassword ? "confirmPasswordError" : null}
                                    />
                                </div>
                                {errors.confirmPassword && <p id="confirmPasswordError" className="error-text">{errors.confirmPassword}</p>}
                            </div>

                            <button type="submit" className="btn btn-primary btn-block">
                                Sign Up <Icon name="arrow-right" size={16} />
                            </button>
                        </form>
                    )}

                    <p className="form-footer-text">
                        Already have an account? <Link to="/login">Log In</Link>
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

export default SignupPage;
