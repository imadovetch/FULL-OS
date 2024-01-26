import React from 'react';

const Clock = () => {
  const [currentDateTime, setCurrentDateTime] = React.useState('');

  React.useEffect(() => {
    const updateCurrentDateTime = () => {
      const d = new Date();
      const time = `${d.getHours()} H:${d.getMinutes()} Min:${d.getSeconds()}s`;
      const date = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
      setCurrentDateTime({ time, date });
    };

    // Initial update
    updateCurrentDateTime();

    // Set up interval to update time every second
    const timer = setInterval(updateCurrentDateTime, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4 py-8 border w-fit font-mono border-gray-300 shadow-lg rounded-md text-2xl font-bold ">
      <div>{currentDateTime.time}</div>
      <div className="border-t text-center border-gray-300 mt-2  pt-2">{currentDateTime.date}</div>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <main>
        <Clock />
      </main>
    </>
  );
};

export default Home;
