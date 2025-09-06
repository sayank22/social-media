import React from 'react';
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaShieldAlt,
  FaUser,
  FaMobileAlt,
  FaPaintBrush,
  FaCode,
} from 'react-icons/fa';

const About = () => {
  return (
    <div className="container py-4 py-md-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8">
          {/* Header Section */}
          <header className="text-center mb-4 mb-md-5">
            <h1 className="display-5 display-md-4 fw-bold gradient-text mb-3">
              About SilentPost
            </h1>
            <p className="lead text-muted">
              Connecting voices in a secure and engaging social space
            </p>
          </header>

          {/* Main Content */}
          <div className="card shadow-lg border-0 rounded-3 mb-4 mb-md-5">
            <div className="card-body p-3 p-md-5">
              {/* Introduction */}
              <section className="mb-4 mb-md-5">
                <h2 className="h4 h3-md fw-bold mb-3 accent-text">
                  Welcome to SilentPost
                </h2>
                <p className="text-secondary">
                  A modern social platform designed for authentic connections
                  and seamless expression. Share anonymously, engage
                  meaningfully, and explore diverse perspectives in a secure
                  digital environment.
                </p>
              </section>

              {/* Tech Stack */}
              <section className="mb-4 mb-md-5">
                <h2 className="h4 h3-md fw-bold mb-4 accent-text">
                  Tech Stack
                </h2>
                <div className="row g-3 g-md-4">
                  {[
                    {
                      icon: <FaReact />,
                      title: 'Frontend',
                      text: 'React, TypeScript, Bootstrap',
                      color: '#3B82F6',
                    },
                    {
                      icon: <FaNodeJs />,
                      title: 'Backend',
                      text: 'Node.js, Express',
                      color: '#3B82F6',
                    },
                    {
                      icon: <FaDatabase />,
                      title: 'Database',
                      text: 'MongoDB',
                      color: '#10B981',
                    },
                    {
                      icon: <FaShieldAlt />,
                      title: 'Auth',
                      text: 'JWT',
                      color: '#F59E0B',
                    },
                  ].map((tech, index) => (
                    <div key={index} className="col-12 col-md-6 col-lg-3">
                      <div className="tech-card p-3 text-center rounded-3 h-100">
                        <div
                          className="mb-2 self-center"
                          style={{ color: tech.color, fontSize: '2.25rem' }}
                        >
                          {tech.icon}
                        </div>
                        <h5 className="fw-bold mb-1">{tech.title}</h5>
                        <p className="small mb-0 text-muted">{tech.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Developer Section */}
              <section className="mb-4 mb-md-5">
                <h2 className="h4 h3-md fw-bold mb-3 accent-text">
                  About the Developer
                </h2>
                <div className="d-flex align-items-center mb-3">
                  <div className="accent-bg p-2 rounded-circle me-3">
                    <FaUser className="text-white" size="1.5em" />
                  </div>
                  <div>
                    <h4 className="fw-bold mb-0">Sayan Kundu</h4>
                    <p className="text-muted mb-0">Final Year CSE Student</p>
                  </div>
                </div>
                <p className="text-secondary border-start ps-3 accent-border">
                  Passionate full-stack developer focused on creating meaningful
                  digital experiences. Committed to building secure, scalable
                  solutions that prioritize user experience and technical
                  excellence.
                </p>
              </section>

              {/* Features */}
              <section>
                <h2 className="h4 h3-md fw-bold mb-4 accent-text">
                  Core Features
                </h2>
                <div className="row g-3 g-md-4">
                  {[
                    {
                      icon: <FaMobileAlt />,
                      title: 'Responsive Design',
                      text: 'Flawless experience across all devices',
                    },
                    {
                      icon: <FaPaintBrush />,
                      title: 'Modern UI',
                      text: 'Clean and intuitive interface',
                    },
                    {
                      icon: <FaShieldAlt />,
                      title: 'Secure Auth',
                      text: 'JWT-based authentication system',
                    },
                    {
                      icon: <FaCode />,
                      title: 'Realtime Interactions',
                      text: 'Instant reactions and updates',
                    },
                  ].map((feature, index) => (
                    <div key={index} className="col-12 col-md-6">
                      <div className="feature-card p-3 rounded-3 h-100">
                        <div
                          className="accent-text mb-2"
                          style={{ fontSize: '1.75rem' }}
                        >
                          {feature.icon}
                        </div>
                        <h5 className="fw-bold mb-2">{feature.title}</h5>
                        <p className="text-secondary small mb-0">
                          {feature.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-4">
            <button className="btn btn-lg px-5 rounded-pill gradient-btn">
              Get in Touch
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(45deg, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .tech-card,
        .feature-card {
          transition: all 0.3s ease;
          background: rgba(139, 92, 246, 0.03);
          border: 1px solid rgba(139, 92, 246, 0.1);
        }

        .tech-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 24px rgba(139, 92, 246, 0.1);
        }

        .gradient-btn {
          background: linear-gradient(45deg, #8b5cf6, #ec4899);
          border: none;
          color: white;
          transition: transform 0.3s ease;
        }

        .gradient-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2);
        }

        .accent-text {
          color: #8b5cf6 !important;
        }

        .accent-bg {
          background-color: #8b5cf6 !important;
        }

        .accent-border {
          border-color: #8b5cf6 !important;
        }

        @media (max-width: 768px) {
          .display-5 {
            font-size: 2.5rem;
          }
          .card-body {
            padding: 1.5rem;
          }
          .tech-card {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
