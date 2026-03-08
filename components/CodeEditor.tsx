"use client";

export default function CodeEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="h-96">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full bg-[#0b1220] text-green-200 font-mono p-3 rounded-md outline-none resize-none"
        spellCheck={false}
      />
    </div>
  );
}
