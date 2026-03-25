"use client";

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import LogViewer from './LogViewer';

export default function DebugLogViewer() {
  useEffect(() => {
    // Only render in development
    if (process.env.NODE_ENV !== 'development') return;

    const container = document.getElementById('debug-log-viewer');
    if (!container) return;

    // Render the LogViewer into the container
    const portal = createPortal(<LogViewer />, container);

    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;
}
