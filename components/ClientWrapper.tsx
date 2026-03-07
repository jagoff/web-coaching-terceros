"use client";

import { useState, useEffect, type ReactNode } from "react";

/**
 * Renders children only after hydration to prevent Framer Motion SSR mismatches.
 * Shows a static fallback on the server and during hydration.
 */
export default function ClientWrapper({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return <>{mounted ? children : fallback}</>;
}
