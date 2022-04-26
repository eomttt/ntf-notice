import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <div className="flex justify-center px-5 md:px-0">
    <main className="w-full max-w-screen-lg mt-4">{children}</main>
  </div>
);
