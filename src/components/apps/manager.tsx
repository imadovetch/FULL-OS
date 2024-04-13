import { useEffect, useState } from "react";
import { LineChart } from '@mui/x-charts/LineChart';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { APP_DATA_TYPE } from "@/data/const"
import { Window } from './window'

export function Manager({ data }: { data: APP_DATA_TYPE }) {
    const [browserMemoryUsage, setBrowserMemoryUsage] = useState<number>(512);
    const [websiteMemoryUsage, setWebsiteMemoryUsage] = useState<number>(0);
    const [ramUsage, setRAMUsage] = useState<string>('');
    const [cpuUsage, setCPUUsage] = useState<string>('');
    const [internetSpeed, setInternetSpeed] = useState<number>(0);
    const [ipAddress, setIPAddress] = useState<string>('');
    var cpuvalues = []
    const [cpuData, setCpuData] = useState([]);
    var a = [13, 13, 54]
    // Function to format bytes into human-readable format
    const formatBytes = (bytes: number, decimals: number = 2): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    useEffect(() => {
        const getBrowserMemoryUsage = () => {
            setBrowserMemoryUsage(512);
        };

        const getWebsiteMemoryUsage = () => {
            const memory = performance.memory;
            const browserMemoryUsage = 512; 
            const websiteMemoryUsage = memory.usedJSHeapSize / (1024 * 1024) - browserMemoryUsage; 
            setWebsiteMemoryUsage(websiteMemoryUsage);
        };

        // Function to get RAM usage
        const getRAMUsage = () => {
            // Performance API provides detailed performance metrics
            const memory = performance.memory;
            setRAMUsage(`${formatBytes(memory.usedJSHeapSize)} / ${formatBytes(memory.totalJSHeapSize)}`);
        };

        // Function to get CPU usage
       

        const getCPUUsage = () => {
            const cpu = performance.now();
            const cpuUsage = Number(Math.floor(cpu) / 100);
            setCpuData(prevData => [...prevData, cpuUsage]); 
            setCPUUsage(`CPU Usage: ${cpu} milliseconds`);
        };
        

        // Function to get internet speed
        const getInternetSpeed = () => {
            const startTime = performance.now();
            fetch('https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py')
                .then(response => {
                    const endTime = performance.now();
                    const duration = (endTime - startTime) / 1000; // Convert to seconds
                    const sizeInBytes = parseInt(response.headers.get('Content-Length') || '0'); // Get file size from Content-Length header
                    const speedMbps = (sizeInBytes / duration) * 8 / 1000000; // Calculate speed in Mbps
                    setInternetSpeed(speedMbps);
                })
                .catch(error => {
                    console.error('Error fetching file:', error);
                });
        };

        // Function to get IP address
        const getIPAddress = () => {
            // Fetch IP address using a third-party service
            fetch('https://api.ipify.org?format=json')
                .then(response => response.json())
                .then(data => {
                    setIPAddress(`IP Address: ${data.ip}`);
                })
                .catch(error => {
                    console.error('Error fetching IP address:', error);
                });
        };

        // Call the functions to get resource usage
        
        
        setInterval(()=>{
            getBrowserMemoryUsage();
        getWebsiteMemoryUsage();
            getRAMUsage();
            getCPUUsage();
            getInternetSpeed();
            getIPAddress();
        },1000)

    }, []);
    useEffect(() => {
        console.log(cpuData);
        if (cpuData.length >= 10) {
            setCpuData(prevData => prevData.slice(1)); 
        }
    }, [cpuData]);
    
    const Tableau10 = [
        '#4e79a7',
        '#f28e2c',
        '#e15759',
      ];
      
      const chartsParams = {
        margin: { bottom: 20, left: 55, right: 5 },
        height: 300,
      };
      
        const [color, setColor] = useState('#4e79a7');
      
        const handleChange = (event: MouseEvent<HTMLElement>, nextColor: string) => {
          setColor(nextColor);
        };
    return (
        <Window data={data}>
            <div className="p-5 border">
                
                    <Stack direction="column" spacing={2} alignItems="center" sx={{ width: '100%' }}>
      <LineChart
        {...chartsParams}
        series={[
          {
            data: cpuData,
          
            color,
          },
        ]}
      />
      <ToggleButtonGroup
        orientation="vertical"
        value={color}
        exclusive
        onChange={handleChange}
      >
        <div className="flex">
        {Tableau10.map((value) => (
          <ToggleButton key={value} value={value} sx={{ p: 1 }}>
            <div
              style={{
                width: 15,
                height: 15,
                backgroundColor: value,
                display: 'inline-block',
              }}
            />
          </ToggleButton>
        ))}
        </div>
        
      </ToggleButtonGroup>
    </Stack>
                </div>
                <div id="browserMemory">Browser Memory Usage: {browserMemoryUsage} MB</div>
                <div id="websiteMemory">Website Memory Usage: {websiteMemoryUsage.toFixed(2)} MB</div>
                <div id="ramUsage">{ramUsage}</div>
                <div id="cpuUsage">{cpuUsage}</div>
                <div id="internetSpeed">Internet Speed: {internetSpeed.toFixed(2)} Mbps</div>
                <div id="ipAddress">{ipAddress}</div>
            
        </Window>
    );
}
