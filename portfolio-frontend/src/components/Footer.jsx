// src/components/Footer.jsx
import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-500 via-purple-500 to-green-500 text-white py-8 mt-10 shadow-inner">
      <div className="container mx-auto text-center flex flex-col items-center gap-4">
        {/* Copyright */}
        <p className="text-sm md:text-base text-white/80">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">Gerald Nyerere</span>. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex gap-6">
          <a
            href="https://github.com/gerald-nyerere"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-yellow-300 transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-yellow-300 transition-colors"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-yellow-300 transition-colors"
          >
            <FaTwitter />
          </a>
          <a
            href="mailto:gerald@example.com"
            className="text-2xl hover:text-yellow-300 transition-colors"
          >
            <FaEnvelope />
          </a>
        </div>

        {/* Decorative line */}
        <div className="w-20 border-t border-white/50 opacity-50 mt-4"></div>
      </div>
    </footer>
  );
};

export default Footer;
