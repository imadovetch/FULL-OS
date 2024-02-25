'use client';

import { APP_DATA_TYPE } from "@/data/const";
import { Window } from './window';
import { useState } from 'react';

export function Calculator({ data }: { data: APP_DATA_TYPE }) {
  const KEYS_LIST = [
    '7',
    '8',
    '9',
    '+',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    'x',
    '/',
    'DEL',
    '0',
    '.',
    'C',
    '=',
  ];

  const [result, setResult] = useState<string>('');

  const handleButtonClick = (key: string) => {
    switch (key) {
      case '=':
        calculateResult();
        break;
      case 'DEL':
        deleteLastChar();
        break;
      case 'C':
        clearResult();
        break;
      default:
        setResult((prevResult) => prevResult + key);
    }
  };

  const calculateResult = () => {
    try {
      const expression = result.replace(/x/g, '*').replace(/÷/g, '/');
      setResult(eval(expression).toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const deleteLastChar = () => {
    setResult((prevResult) => prevResult.slice(0, -1));
  };

  const clearResult = () => {
    setResult('');
  };

  return (
    <Window data={data}>
      <div className="w-full h-full flex flex-col gap-2 p-2">
        <div className="bg-dark-t p-2 rounded-md min-h-[100px] h-full">{result}</div>
        <div className="grid grid-cols-4 gap-2">
        {KEYS_LIST.map((key) => (
            <button
                key={key}
                className={`btn-dark ${key === 'C' ? 'col-span-3' : ''}`}
                onClick={() => handleButtonClick(key)}
            >
                {key}
            </button>
        ))}

        </div>
      </div>
    </Window>
  );
}
