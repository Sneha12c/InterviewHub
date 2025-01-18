import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        
        <div className="text-lg font-bold">
          InterviewHub © {new Date().getFullYear()}
        </div>

        {/* Links */}
        <ul className="flex space-x-6">
          <li>
            <a
              href="/about"
              className="hover:text-yellow-400 transition-colors duration-200"
            >
              About Us
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="hover:text-yellow-400 transition-colors duration-200"
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href="/privacy"
              className="hover:text-yellow-400 transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="/terms"
              className="hover:text-yellow-400 transition-colors duration-200"
            >
              Terms of Service
            </a>
          </li>
        </ul>

        {/* Social Media Links */}
        <div className="flex space-x-4">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors duration-200"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
