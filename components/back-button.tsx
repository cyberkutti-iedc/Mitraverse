'use client';

import { Button } from "./ui/button";

interface BackButtonProps {
  className?: string;
}

export function BackButton({ className }: BackButtonProps) {
  return (
    <Button
      variant="default"
      onClick={() => window.history.back()}
      className={className}
    >
      Go Back
    </Button>
  );
}