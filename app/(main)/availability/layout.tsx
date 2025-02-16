import { Suspense } from "react";

import { ReactNode } from "react";

export default async function AvailabilityLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto">
      <Suspense fallback={<div>Loading availability...</div>}>
        {children}
      </Suspense>
    </div>
  );
}