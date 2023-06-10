import React from "react";

const NumberBox = ({ number }) => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100px',
          height: '100px',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        {number}
      </div>
    );
  };
  
  export default NumberBox;