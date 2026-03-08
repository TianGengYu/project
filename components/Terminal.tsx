"use client";

import { useEffect, useRef } from 'react';

export default function Terminal({ output }: { output: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [output]);

  return (
    <div ref={ref} className="h-full p-3 text-sm text-green-300 font-mono overflow-auto bg-black">
      {output ? (
        output.split('\n').map((line, i) => <div key={i}>{line}</div>)
      ) : (
        <div className="text-gray-500">No output. Click "Run Code" to execute.</div>
      )}
    </div>
  );
}
