import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="#">About</Link>
            </li>
            <li>
              <Link to="#">Careers</Link>
            </li>
            <li>
              <Link to="#">Press</Link>
            </li>
            <li>
              <Link to="#">Policies</Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="#">Help Center</Link>
            </li>
            <li>
              <Link to="#">Safety Information</Link>
            </li>
            <li>
              <Link to="#">Cancellation Options</Link>
            </li>
            <li>
              <Link to="#">Neighborhood Support</Link>
            </li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Community</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="#">Nesto.org</Link>
            </li>
            <li>
              <Link to="#">Diversity & Belonging</Link>
            </li>
            <li>
              <Link to="#">Against Discrimination</Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect with Us</h3>
          <ul className="flex gap-4 text-xl">
            <li>
              <a href="/" target="_blank" rel="noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="/" target="_blank" rel="noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="/" target="_blank" rel="noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-300 py-4 text-center text-sm">
        © {new Date().getFullYear()} Nesto by Madhu. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
