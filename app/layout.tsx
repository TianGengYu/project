import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Python Learning MVP',
  description: 'Interactive Python learning prototype',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
