import { NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const code = body.code ?? '';

    const filename = `/tmp/python-run-${Date.now()}-${Math.random().toString(36).slice(2)}.py`;
    await writeFile(filename, code, 'utf8');

    try {
      const { stdout, stderr } = await execAsync(`python3 ${filename}`, {
        timeout: 5000,
        maxBuffer: 1024 * 1024,
      });
      await unlink(filename).catch(() => {});
      return NextResponse.json({ stdout, stderr });
    } catch (execErr: any) {
      const stderr = execErr.stderr || execErr.message || String(execErr);
      await unlink(filename).catch(() => {});
      return NextResponse.json({ error: stderr, stderr }, { status: 500 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}
