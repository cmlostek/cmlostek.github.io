import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '4rem 2rem',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '4rem', margin: '0 0 1rem 0', color: '#678aaf' }}>404</h1>
      <h2 style={{ margin: '0 0 1rem 0', color: '#333' }}>Page Not Found</h2>
      <p style={{ margin: '0 0 2rem 0', color: '#666', fontSize: '1.1rem' }}>
        The page you're looking for doesn't exist.
      </p>
      <Link 
        to="/" 
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#678aaf',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          fontSize: '1rem',
          transition: 'background-color 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#5a7a9a'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#678aaf'}
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
