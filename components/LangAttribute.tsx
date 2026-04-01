"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Client component to update html lang attribute dynamically
 * This fixes the hardcoded lang="es" issue for /en pages
 */
export default function LangAttribute() {
  const pathname = usePathname();
  
  useEffect(() => {
    const lang = pathname?.startsWith('/en') ? 'en' : 'es';
    document.documentElement.lang = lang;
  }, [pathname]);
  
  return null;
}
