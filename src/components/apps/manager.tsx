import { useEffect, useState } from "react";
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from '@mui/x-charts/Gauge';
import Stack from '@mui/material/Stack';
import { Gauge } from '@mui/x-charts/Gauge';
import { APP_DATA_TYPE } from "@/data/const"
import { Window } from './window'
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';



const size = {
  width: 400,
  height: 200,
};


export function Manager({ data }: { data: APP_DATA_TYPE }) {
    const [browserMemoryUsage, setBrowserMemoryUsage] = useState<number>(512);
    const [websiteMemoryUsage, setWebsiteMemoryUsage] = useState<number>(0);
    const [ramUsage, setRAMUsage] = useState<Number | null>(null);
    const [cpuUsage, setCPUUsage] = useState<Number | null>(null);
    const [internetSpeed, setInternetSpeed] = useState<number>(0);
    const [ipAddress, setIPAddress] = useState<string>('');
    const [cpuData, setCpuData] = useState<number[]>([]);

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

        const getRAMUsage = () => {
            const memory = performance.memory;
            setRAMUsage(formatBytes(memory.usedJSHeapSize));//  / formatBytes(memory.totalJSHeapSize)
        };

        const getCPUUsage = () => {
            const cpu = performance.now();
            const cpuUsage = Number(Math.floor(cpu) / 100);
            setCpuData(prevData => [...prevData, cpuUsage]); 
            setCPUUsage(cpu);
        };
        
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

        const intervalIds = setInterval(() => {
            getBrowserMemoryUsage();
            getWebsiteMemoryUsage();
            getRAMUsage();
            getCPUUsage();
            getInternetSpeed();
            getIPAddress();
        }, 1000);

        return () => {
            clearInterval(intervalIds);
        };
    }, []);

    useEffect(() => {
        console.log(cpuData);
        if (cpuData.length >= 10) {
            setCpuData(prevData => prevData.slice(1)); 
        }
    }, [cpuData]);
    
    
    
    return (
        <Window data={data}>
          <div className="h-[95%] w-full p-4 ">
          <span className="mb-3 w-full  text-center">Your Current {ipAddress}</span>

          <div className="grid grid-cols-2 gap-4">

  <div className="col-span-2 flex flex-col  justify-center items-center   pr-5  border" w-full style={{  height: '300px' }}>
     
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.label} (${item.value})`,
            data: [
              { value: 5, label: 'Media' },
              { value: 10, label: 'Cache' },
              { value: 15, label: 'Photos' },
              
            ],
            innerRadius: 30,
            outerRadius: 120,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: -90,
            endAngle: 180,
            cx: 150,
            cy: 150,
          }
        ]}
      />
        <div>StoRAGE</div>

    </div>


  <div className="h-48 border p-2  flex flex-col  justify-center items-center ">
  <GaugeContainer
  
  width={200}
  height={200}
  startAngle={-110}
  endAngle={110}
  value={websiteMemoryUsage.toFixed(2) /10}
>
  
  <GaugeReferenceArc />
  <GaugeValueArc />
  <GaugePointer />
  <text x="-15" y="10">Start: {0} Mb</text>

  <text x="-15" y="30">Total Ram USED: {ramUsage} </text>

  <text  x="85" y="10">Current: {websiteMemoryUsage.toFixed(2) } Mb</text>
</GaugeContainer>
    
  <div>Website Memory Usage</div>
  </div>
  <div className="h-48 p-2 border flex flex-col  justify-center items-center ">

  <GaugeContainer
  
      width={200}
      height={200}
      startAngle={-110}
      endAngle={110}
      value={internetSpeed.toFixed(2)}
      
    >
      
      <GaugeReferenceArc />
      <GaugeValueArc />
      <GaugePointer />
      <text x="-15" y="10">Start: {0} Mb/s</text>
   
      <text x="-15" y="30">End: {220} Mb/s</text>
    
      <text  x="85" y="10">Current: {internetSpeed.toFixed(2)} Mb/s</text>
    </GaugeContainer>
  <div>Internet Speed</div>
  </div>
  <div className="col-span-2 ...">
  <div className="h-48 p-2 border flex flex-col  justify-center items-center ">
  <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
      
      <Gauge width={150} height={150} value={ cpuUsage} valueMin={0} valueMax={cpuUsage * 3} />
    </Stack>
    <div>CPU Usage: Per/milliseconds</div>
  </div>
  </div>
</div>
            {/* <div id="browserMemory">Browser Memory Usage: {browserMemoryUsage} MB</div>
            <div id="websiteMemory">Website Memory Usage: {websiteMemoryUsage.toFixed(2)} MB</div>
            <div id="ramUsage">rsm usage{ramUsage}</div>
            <div id="cpuUsage">{cpuUsage}</div>
            <div id="internetSpeed">Internet Speed: {internetSpeed.toFixed(2)} Mbps</div>
            <div id="ipAddress">{ipAddress}</div> */}
          </div>
           
        </Window>
    );
}
function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="red" />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="red"
        strokeWidth={3}
      />
    </g>
  );
}

