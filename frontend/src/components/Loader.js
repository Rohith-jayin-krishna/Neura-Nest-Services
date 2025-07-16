// src/components/Loader.jsx
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Loader = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="loader-overlay">
      <ClipLoader size={60} color="#ffc107" />
    </div>
  );
};

export default Loader;