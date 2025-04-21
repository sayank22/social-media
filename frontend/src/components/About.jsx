import React from "react";

const About = () => {
  return (
    <div className="container mt-4">
      <h2>About SilentPost</h2>
      <p>
        SilentPost is a social media platform that allows users to connect, share their thoughts, and express themselves in a secure and engaging environment. With a focus on ease of use, SilentPost provides a seamless experience for posting Anonymously, reacting to content, and managing user profiles.
      </p>

      <h2>Technologies Used</h2>
      <p><strong>Frontend:</strong> React, HTML, CSS, Bootstrap</p>
      <p><strong>Backend:</strong> Node.js, Express</p>
      <p><strong>Database:</strong> MongoDB</p>
      <p><strong>Authentication:</strong> JWT (JSON Web Tokens)</p>

      <h2>About Me</h2>
      <p>
        Hi, I'm Sayan Kundu, a passionate Computer Science Engineering student from Netaji Subhash Engineering College. As a 23-year-old web developer, I have dedicated my final year to building real-world projects that showcase my skills and knowledge. One of my proudest creations is SilentPost – a social media platform designed with simplicity and user experience in mind.
      </p>

      <h2>Key Features</h2>
      <ul>
        <li>User Authentication: SilentPost offers secure login and signup features, ensuring that your data is protected with JWT-based authentication.</li>
        <li>Create and Share Posts: Users can create posts with titles, content, and images. These posts can be shared with friends or the community.</li>
        <li>Reactions System: A unique reaction system allows users to interact with posts, providing likes and feedback, making the platform more engaging.</li>
        <li>User Profiles: Each user has a personalized profile where they can manage their posts, see their interactions, and showcase their content.</li>
        <li>Responsive Design: SilentPost is built to be fully responsive, ensuring an optimal experience across all devices – whether you are on a desktop, tablet, or smartphone.</li>
      </ul>

    </div>
  );
};

export default About;
