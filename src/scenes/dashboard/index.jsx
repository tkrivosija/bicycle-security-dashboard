import NumberBox from "../../components/NumberBox";
import TopBar from "../global/Topbar";
import { useState, useEffect } from "react";
import axios from 'axios';
import Map from "../../components/Map"
import Buzzer from "../../components/Buzzer";

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const loginUrl = 'http://161.53.19.19:45080/api/auth/login';
          const loginHeaders = { 'Content-Type': 'application/json', Accept: 'application/json' };
          const loginData = { username: 'antun.weber@gmail.com', password: '123456' };
  
          const loginResponse = await axios.post(loginUrl, loginData, { headers: loginHeaders });
  
          if (loginResponse.status === 200) {
            const token = loginResponse.data.token;
            const telemetryUrl = 'http://161.53.19.19:45080/api/plugins/telemetry/DEVICE/197e7ec0-0471-11ee-993d-8d74c2abdddd/values/timeseries';
            const telemetryHeaders = {
              'Content-Type': 'application/json',
              'X-Authorization': `Bearer ${token}`,
            };
            const telemetryParams = { keys: 'GPS_lat,GPS_lon' };
  
            const telemetryResponse = await axios.get(telemetryUrl, {
              headers: telemetryHeaders,
              params: telemetryParams,
            });
  
            if (telemetryResponse.status === 200) {
              setData(telemetryResponse.data);
            } else {
              console.log('Failed to retrieve telemetry data. Response:', telemetryResponse.data);
            }

            const attributeUrl = 'http://161.53.19.19:45080/api/v1/o9RB5Vx1JQ6SUU6dtfXl/attributes';
            const attributeHeaders = {
              'Content-Type': 'application/json',
              'X-Authorization': `Bearer ${token}`,
            };
            const attributeParams = { keys: 'stanje_bicikla' };

            const attributeResponse = await axios.get(attributeUrl, {
              headers: attributeHeaders,
              params: attributeParams,
            });
            if (attributeResponse.status === 200) {
              setData1(attributeResponse.data.client.stanje_bicikla);
            } else {
              console.log('Failed to retrieve telemetry data. Response:', attributeResponse.data);
            }

          } else {
            console.log('Failed to obtain JWT token. Response:', loginResponse.data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, [data,data1]);
  
  return (
    <div>
      <TopBar />
      <div style={{ display: 'flex', justifyContent:"space-between", margin:'50px' }}>
        <div>
          <h1>Položaj bicikla</h1>
          {data.GPS_lat !== undefined ? (
            <Map latitude={data.GPS_lat[0].value} longitude={data.GPS_lon[0].value} />
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div>
          {data1.length > 0 ? (
            <Buzzer active={data1} /> 
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;