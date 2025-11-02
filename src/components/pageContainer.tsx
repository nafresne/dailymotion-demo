import type { ReactNode } from 'react';

export const PageContainer = ({ children }: { children: ReactNode }) => (
  <div className="p-2">{children}</div>
);
