"use client";

import { List } from 'lucide-react';

export default function Sidebar({
  lessons,
  activeId,
  onSelect,
}: {
  lessons: { id: string; title: string }[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="p-4">
      <div className="flex items-center gap-3 px-2 pb-4">
        <List className="w-6 h-6 text-indigo-600" />
        <h2 className="text-lg font-semibold">Python Course</h2>
      </div>

      <nav className="space-y-2">
        {lessons.map(lesson => (
          <button
            key={lesson.id}
            onClick={() => onSelect(lesson.id)}
            className={
              (lesson.id === activeId
                ? 'bg-indigo-50 border-indigo-400 text-indigo-700'
                : 'hover:bg-gray-50 text-gray-700') +
              ' w-full text-left px-3 py-2 rounded-md border'
            }
          >
            <div className="text-sm font-medium">Lesson {lesson.id}</div>
            <div className="text-xs text-gray-500">{lesson.title}</div>
          </button>
        ))}
      </nav>
    </div>
  );
}
