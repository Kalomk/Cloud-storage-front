import { Header } from '@/components/client';
import type { Metadata } from 'next';
import { SelectedFilesProvider } from '@/components/client';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'dashboard page',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="md:container md:mx-auto">
        <Header />
        <SelectedFilesProvider> {children}</SelectedFilesProvider>
      </body>
    </html>
  );
}
