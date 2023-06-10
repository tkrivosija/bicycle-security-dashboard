import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBellSlash } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Buzzer = ({ active }) => {
  const [stanje_bicikla, setStanjeBicikla] = useState(active);

  useEffect(() => {
    setStanjeBicikla(active);
  }, [active]);

  useEffect(() => {
    const sendAlarmActivationStatus = async () => {
      try {
        const response = await axios.post('http://161.53.19.19:45080/api/v1/o9RB5Vx1JQ6SUU6dtfXl/attributes', { stanje_bicikla });
      } catch (error) {
        console.error('Error sending alarm activation status:', error);
      }
    };

    sendAlarmActivationStatus();
  }, [stanje_bicikla]);

  const handleIconClick = () => {
    setStanjeBicikla("false");
  };

  const icon = stanje_bicikla === "true" ? (
    <FontAwesomeIcon
      icon={faBell}
      style={{ width: '200px', height: '200px', cursor: 'pointer' }}
      onClick={handleIconClick}
    />
  ) : (
    <FontAwesomeIcon
      icon={faBellSlash}
      style={{ width: '200px', height: '200px', cursor: 'pointer' }}
      onClick={handleIconClick}
    />
  );

  return (
    <div>
      <h1>Alarm</h1>
      <div>{icon}</div>
    </div>
  );
};

export default Buzzer;