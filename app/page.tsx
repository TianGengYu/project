"use client";

import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import CodeEditor from '../../components/CodeEditor';
import Terminal from '../../components/Terminal';

const lessons = [
  { id: '1', title: 'Hello World', content: 'Print a greeting using print().', starter: "print('Hello, world!')\n" },
  { id: '2', title: 'Variables', content: 'Learn to assign and print variables.', starter: "name = 'Alice'\nprint('Hello', name)\n" },
  { id: '3', title: 'For Loops', content: 'Iterate with for loops.', starter: "for i in range(3):\n    print('Loop', i)\n" },
];

export default function Page() {
  const [active, setActive] = useState(lessons[0].id);
  const [output, setOutput] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(lessons[0].starter);

  function selectLesson(id: string) {
    const lesson = lessons.find(l => l.id === id);
    setActive(id);
    if (lesson) setCode(lesson.starter);
    setOutput('');
  }

  async function runCode() {
    setLoading(true);
    setOutput('');
    try {
      const res = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setOutput(String(data.error || data.stderr || 'Unknown error'));
      } else {
        setOutput((data.stdout || '') + (data.stderr ? '\n' + data.stderr : ''));
      }
    } catch (err:any) {
      setOutput(String(err?.message || err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-72 border-r border-gray-200 bg-white">
        <Sidebar lessons={lessons} activeId={active} onSelect={selectLesson} />
      </aside>

      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <h1 className="text-2xl font-semibold">{lessons.find(l => l.id === active)?.title}</h1>
            <p className="mt-2 text-gray-600">{lessons.find(l => l.id === active)?.content}</p>
          </section>

          <section className="flex-1 flex flex-col gap-4">
            <div className="flex-1 bg-[#0f172a] rounded-lg overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-4 py-2 bg-[#0b1220] border-b border-[#122031]">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="h-3 w-3 rounded-full bg-red-500 inline-block"></span>
                  <span className="h-3 w-3 rounded-full bg-yellow-400 inline-block"></span>
                  <span className="h-3 w-3 rounded-full bg-green-500 inline-block"></span>
                  <span className="ml-2">Interactive Code</span>
                </div>
                <div>
                  <button
                    onClick={runCode}
                    disabled={loading}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-sm"
                  >
                    {loading ? 'Running...' : 'Run Code'}
                  </button>
                </div>
              </div>

              <div className="flex-1 p-4">
                <CodeEditor value={code} onChange={setCode} />
              </div>

              <div className="h-40 bg-black/90 border-t border-[#122031]">
                <Terminal output={output} />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
