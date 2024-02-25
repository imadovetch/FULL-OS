import { APP_DATA_TYPE } from "@/data/const";
import { Window } from './window';
import { useState, useRef } from "react";

export function Browser({ data }: { data: APP_DATA_TYPE }) {
  const [link, setLink] = useState('https://www.imadovetch.tech');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleReload = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.location.reload();
    }
  };

  const handleGoBack = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.history.back();
    }
  };

  return (
    <Window data={data}>
      <div className="browser w-full h-full flex flex-col gap-2 p-2">
        <div className="flex items-center">
          <input
            className="bg-transparent flex-grow ring-2 ring-dark-t rounded-md p-1 px-2 focus:outline-none"
            onChange={(e) => setLink(e.target.value)}
            value={link}
          />
          <button
            className="ml-2 px-4 py-1 bg-dark-t text-white rounded-md"
            onClick={() => handleReload()}
          >
            Reload
          </button>
          <button
            className="ml-2 px-4 py-1 bg-dark-t text-white rounded-md"
            onClick={() => handleGoBack()}
          >
            Go Back
          </button>
        </div>
        <iframe
          className="bg-light w-full h-full rounded-md"
          src={link}
          ref={iframeRef}
        />
      </div>
    </Window>
  );
}
