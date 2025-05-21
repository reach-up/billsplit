"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface ClearStorageLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export default function ClearStorageLink({
  href,
  children,
  variant = "primary",
}: ClearStorageLinkProps) {
  const handleClick = () => {
    localStorage.removeItem("billFormData");
  };

  return (
    <Link href={href} onClick={handleClick}>
      <Button variant={variant} className="w-full">
        {children}
      </Button>
    </Link>
  );
}
