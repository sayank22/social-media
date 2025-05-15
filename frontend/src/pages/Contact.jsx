import React from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'; // Importing Instagram icon

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Contact Me</h1>

      <p className="text-gray-600 mb-10 text-center max-w-md">
        Feel free to reach out for collaborations, questions, or just to say hi!
        🚀
      </p>

      {/* Email button */}
      <button
        onClick={() => {
          const gmailUrl = `https://mail.google.com/mail/?view=cm&to=sayank10023@gmail.com`;
          window.open(gmailUrl, '_blank', 'noopener,noreferrer');
        }}
        className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition mb-8"
      >
        <FaEnvelope />
      </button>

      {/* Social icons */}
      <div className="flex gap-8 text-3xl text-gray-700">
        <a
          href="https://github.com/sayank22"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black transition"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/sayan-kundu-70b5442b6/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-700 transition"
        >
          <FaLinkedin />
        </a>
        {/* Instagram icon */}
        <a
          href="https://www.instagram.com/sayankun22/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-600 transition"
        >
          <FaInstagram />
        </a>
      </div>
    </div>
  );
};

export default Contact;
