// LandingPage.jsx
import React, { useState, useEffect } from 'react'; // Added useState and useEffect
import './LandingPage.css'; // Assuming this file exists and contains general styles
// Make sure landingpage_navbar_css_animated styles are also linked/imported in your project
import { Link } from 'react-router-dom';

// --- Helper Icon Component (can be moved to separate files later) ---
const Icon = ({ name, size = 24 }) => (
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
    >
        {name === 'search' && <><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></>}
        {name === 'user' && <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></>}
        {name === 'settings' && <><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></>}
        {name === 'tool' && <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>}
        {name === 'zap' && <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>}
        {name === 'smile' && <><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></>}
        {name === 'hammer' && <path d="M18 3L15 6H13L3 16V21H8L18 11V8H21V3H18ZM8 19H5V17L13 9H15L8 16V19Z" />}
        {name === 'truck' && (
            <>
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </>
        )}
    </svg>
);

const ServiceCategoryCard = ({ iconName, title, description }) => (
    <div className="service-category-card">
        <Icon name={iconName} size={48} />
        <h3>{title}</h3>
        <p>{description}</p>
        <button className="btn btn-secondary exploreButton">Explore</button>
    </div>
);

const HowItWorksStep = ({ number, title, description }) => (
    <div className="how-it-works-step">
        <div className="step-number">{number}</div>
        <h4>{title}</h4>
        <p>{description}</p>
    </div>
);

// --- Main Homepage Component ---
const LandingPage = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

    // Sample data
    const serviceCategories = [
        { id: 1, iconName: 'tool', title: 'Plumbing', description: 'Leaky faucets, clogged drains, and more.' },
        { id: 2, iconName: 'zap', title: 'Electrical', description: 'Wiring, fixture installation, and repairs.' },
        { id: 3, iconName: 'smile', title: 'Beauticians', description: 'Hair, nails, makeup, and spa services.' },
        { id: 4, iconName: 'settings', title: 'Appliance Repair', description: 'Fixing your home appliances quickly.' },
        { id: 5, iconName: 'hammer', title: 'Carpentry', description: 'Custom furniture, repairs, and installations.' }, // Corrected title
        { id: 6, iconName: 'truck', title: 'Packers & Movers', description: 'Shift your household chores in an instant.' },
    ];

    const howItWorksSteps = [
        { number: 1, title: 'Search for a Service', description: 'Enter your location and the service you need.' },
        { number: 2, title: 'Choose a Professional', description: 'Browse profiles, ratings, and reviews.' },
        { number: 3, title: 'Book & Pay Securely', description: 'Schedule your service and pay with ease.' },
        { number: 4, title: 'Get It Done!', description: 'Relax while our professionals handle the job.' },
    ];

    const handleSearch = (event) => {
        event.preventDefault();
        const searchTerm = event.target.elements.search.value;
        console.log('Searching for:', searchTerm);
        alert(`Searching for: ${searchTerm}`);
        // For actual navigation:
        // history.push(`/services?query=${encodeURIComponent(searchTerm)}`); // If using useHistory
        // navigate(`/services?query=${encodeURIComponent(searchTerm)}`); // If using useNavigate
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Optional: Close mobile menu when a link is clicked
    const handleMobileLinkClick = () => {
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    };

    // Optional: Add effect to handle body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        // Cleanup function to reset body overflow when component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMobileMenuOpen]);


    return (
        <div className="homepage-container">
            <header className="main-header">
                <div className="container">
                    <div className="logo">
                        <Link to="/" onClick={handleMobileLinkClick}>Service<span className="logo-accent">Hub</span></Link>
                    </div>
                    {/* Apply 'active' class to nav for mobile view based on state */}
                    <nav className={`main-nav LandingNav ${isMobileMenuOpen ? 'active' : ''}`}>
                        <ul>
                            <li><Link to="/browse-services" onClick={handleMobileLinkClick}>Services</Link></li>
                            <li><a href="#how-it-works" onClick={handleMobileLinkClick}>How It Works</a></li>
                            <li><Link to="/login" className='btn btn-primary' onClick={handleMobileLinkClick}>User Login</Link></li>
                            <li><Link to="/register" className="btn btn-primary" onClick={handleMobileLinkClick}>User Register</Link></li>
                            <li><Link to="/provider-register" className="btn btn-primary" onClick={handleMobileLinkClick}>Provider Register</Link></li> {/* Corrected path */}
                            <li><Link to="/provider-login" className="btn btn-primary" onClick={handleMobileLinkClick}>Provider Login</Link></li>
                        </ul>
                    </nav>
                    {/* Apply 'active' class to button for animation based on state */}
                    <button
                        className={`mobile-nav-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                        aria-label="Toggle navigation"
                        onClick={toggleMobileMenu} // Add onClick handler
                        aria-expanded={isMobileMenuOpen} // For accessibility
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </header>

            {/* --- Hero Section --- */}
            <section className="hero-section">
                <div className="container">
                    <h1>Find & Book Local Professionals Instantly</h1>
                    <p className="subtitle">Plumbers, electricians, beauticians, and more – all at your fingertips.</p>
                    <br /><br /><br /><br /><br /> {/* Consider using CSS for spacing */}
                    <form className="hero-search-form" onSubmit={handleSearch}>
                        <input type="text" name="search" placeholder="What service do you need? (e.g., plumber in Patna)" required />
                        <button type="submit" className="btn btn-primary">
                            <Icon name="search" size={20} /> Find Services
                        </button>
                    </form>
                </div>
            </section>

            {/* --- Service Categories Section --- */}
            <section id="services" className="service-categories-section">
                <div className="container">
                    <h2>Popular Services</h2>
                    <div className="service-categories-grid">
                        {serviceCategories.map(category => (
                            <ServiceCategoryCard
                                key={category.id}
                                iconName={category.iconName}
                                title={category.title}
                                description={category.description}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- How It Works Section --- */}
            <section id="how-it-works" className="how-it-works-section">
                <div className="container">
                    <h2>How It Works</h2>
                    <div className="how-it-works-grid">
                        {howItWorksSteps.map(step => (
                            <HowItWorksStep
                                key={step.number}
                                number={step.number}
                                title={step.title}
                                description={step.description}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Call to Action Section --- */}
            <section className="cta-section">
                <div className="container">
                    <h2>Ready to Get Started?</h2>
                    <p>Join thousands of satisfied customers and reliable service providers.</p>
                    <div className="cta-buttons">
                        <Link to="/register" className="btn btn-primary btn-large">Register as a User</Link>
                        <Link to="/provider-signup" className="btn btn-secondary btn-large">Become a Provider</Link> {/* Corrected path */}
                    </div>
                </div>
            </section>

            {/* --- Footer --- */}
            <footer className="main-footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-logo">
                            Service<span className="logo-accent">Hub</span>
                            <p>&copy; {new Date().getFullYear()} ServiceHub. All rights reserved.</p>
                        </div>
                        <div className="footer-links">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><a href="/about">About Us</a></li>
                                <li><a href="/contact">Contact</a></li>
                                <li><a href="/faq">FAQ</a></li>
                                <li><a href="/terms">Terms of Service</a></li>
                                <li><a href="/privacy">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div className="footer-social">
                            <h4>Connect With Us</h4>
                            <a href="#" aria-label="Facebook"><Icon name="user" /></a>
                            <a href="#" aria-label="Twitter"><Icon name="user" /></a>
                            <a href="#" aria-label="Instagram"><Icon name="user" /></a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
