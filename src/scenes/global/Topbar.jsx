import React from 'react';

const TopBar = () => {
    const topBarStyle = {
      backgroundColor: '#333',
      color: '#fff',
      padding: '10px',
      textAlign: 'left',
      fontSize: '24px',
      fontWeight: 'bold',
      marginLeft: '-2px',
      marginTop: '-2px'
    };
  
    const teamNameStyle = {
      textTransform: 'uppercase',
    };

    return (
        <div style={topBarStyle}>
          <span style={teamNameStyle}>Firma</span>
        </div>
      );
    };

export default TopBar;