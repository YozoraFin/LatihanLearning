import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="py-3 text-center text-white bg-dark">
            <div className="container">
                <p className="mb-1">© {new Date().getFullYear()} Beyond. All rights reserved.</p>
                <div className="social-links">
                    <Link to="#" className="mx-2 text-white">Privacy Policy</Link>
                    <Link to="#" className="mx-2 text-white">Terms of Service</Link>
                    <Link to="#" className="mx-2 text-white">Contact Us</Link>
                </div>
                <div className="mt-2 social-media">
                    <a href="https://web.facebook.com/beyondnime/" target="_blank" rel="noopener noreferrer" className="mx-2 text-white">
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href="https://x.com/beyond_ir" target="_blank" rel="noopener noreferrer" className="mx-2 text-white">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://www.instagram.com/irwinwiryawan/" target="_blank" rel="noopener noreferrer" className="mx-2 text-white">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;