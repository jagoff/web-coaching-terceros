"use client";

import { useState, useEffect } from 'react';
import { logger, LogEntry, LogLevel } from '@/lib/logger';
import { logReviewer } from '@/lib/logReviewer';

export default function LogViewer() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState<LogLevel | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [instantFixStatus, setInstantFixStatus] = useState<{
    enabled: boolean;
    currentlyFixing: string[];
    recentlyFixed: { message: string; timestamp: number; success: boolean }[];
  }>({
    enabled: false,
    currentlyFixing: [],
    recentlyFixed: []
  });

  useEffect(() => {
    // Update logs every second
    const interval = setInterval(() => {
      setLogs(logger.getLogs());
    }, 1000);

    // Listen for instant fix events
    const handleInstantFixEvent = (event: CustomEvent) => {
      const { type, message, success } = event.detail;
      
      if (type === 'start') {
        setInstantFixStatus(prev => ({
          ...prev,
          currentlyFixing: [...prev.currentlyFixing, message]
        }));
      } else if (type === 'complete') {
        setInstantFixStatus(prev => ({
          ...prev,
          currentlyFixing: prev.currentlyFixing.filter(m => m !== message),
          recentlyFixed: [...prev.recentlyFixed, { message, timestamp: Date.now(), success }]
        }));
        
        // Remove old fixed items (older than 10 seconds)
        setTimeout(() => {
          setInstantFixStatus(prev => ({
            ...prev,
            recentlyFixed: prev.recentlyFixed.filter(item => Date.now() - item.timestamp < 10000)
          }));
        }, 10000);
      }
    };

    window.addEventListener('instantFixEvent', handleInstantFixEvent as EventListener);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('instantFixEvent', handleInstantFixEvent as EventListener);
    };
  }, []);

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === 'ALL' || log.level === filter;
    const matchesSearch = searchTerm === '' || 
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.component && log.component.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  const getLevelColor = (level: LogLevel) => {
    switch (level) {
      case 'ERROR': return 'text-red-500';
      case 'WARN': return 'text-yellow-500';
      case 'INFO': return 'text-blue-500';
      case 'DEBUG': return 'text-gray-500';
    }
  };

  const getErrorSummary = () => {
    return logger.getErrorSummary();
  };

  if (!isVisible) {
    const errorCount = logs.filter(l => l.level === 'ERROR').length;
    const isFixing = instantFixStatus.currentlyFixing.length > 0;
    const recentlyFixed = instantFixStatus.recentlyFixed.length;
    
    return (
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        <button
          onClick={() => setIsVisible(true)}
          className={`${
            isFixing ? 'bg-yellow-600 animate-pulse' : 
            recentlyFixed > 0 ? 'bg-green-600' : 
            errorCount > 0 ? 'bg-red-600' : 'bg-gray-800'
          } text-white p-3 rounded-lg text-xs font-bold transition-all`}
          style={{ fontFamily: 'monospace' }}
        >
          <div className="flex flex-col items-center">
            <div>📊 Logs</div>
            <div className="text-lg">{errorCount}</div>
            {isFixing && <div className="text-xs animate-pulse">⚡ Fixing...</div>}
            {recentlyFixed > 0 && <div className="text-xs">✅ Fixed: {recentlyFixed}</div>}
          </div>
        </button>
        
        {/* Real-time notifications */}
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
          {instantFixStatus.currentlyFixing.map((message, index) => (
            <div key={`fixing-${index}`} className="bg-yellow-600 text-white p-3 rounded-lg animate-pulse">
              <div className="flex items-center gap-2">
                <span className="text-lg">⚡</span>
                <div>
                  <div className="font-bold text-xs">FIXING IN REAL-TIME</div>
                  <div className="text-xs opacity-90">{message}</div>
                </div>
              </div>
            </div>
          ))}
          
          {instantFixStatus.recentlyFixed.slice(-3).map((item, index) => (
            <div key={`fixed-${index}`} className={`${
              item.success ? 'bg-green-600' : 'bg-red-600'
            } text-white p-3 rounded-lg animate-in slide-in-from-right duration-300`}>
              <div className="flex items-center gap-2">
                <span className="text-lg">{item.success ? '✅' : '❌'}</span>
                <div>
                  <div className="font-bold text-xs">
                    {item.success ? 'FIXED' : 'FIX FAILED'}
                  </div>
                  <div className="text-xs opacity-90">{item.message}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 h-96 bg-gray-900 text-white rounded-lg shadow-xl overflow-hidden" style={{ fontFamily: 'monospace', fontSize: '12px' }}>
      {/* Header */}
      <div className="bg-gray-800 p-2 border-b border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-bold">Debug Logs</h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        {/* Controls */}
        <div className="flex gap-2 mb-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as LogLevel | 'ALL')}
            className="bg-gray-700 text-white text-xs p-1 rounded"
          >
            <option value="ALL">ALL</option>
            <option value="ERROR">ERROR</option>
            <option value="WARN">WARN</option>
            <option value="INFO">INFO</option>
            <option value="DEBUG">DEBUG</option>
          </select>
          
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-700 text-white text-xs p-1 rounded flex-1"
          />
        </div>

        {/* Auto-fix Status */}
        <div className="text-xs mt-2">
          <strong>Auto-Fix Status:</strong>
          <div className="bg-gray-700 p-1 rounded mt-1">
            <div className="flex justify-between">
              <span>Enabled:</span>
              <span className={logReviewer.isReviewing() ? 'text-green-400' : 'text-red-400'}>
                {logReviewer.isReviewing() ? '✅ Active' : '❌ Inactive'}
              </span>
            </div>
            <button
              onClick={() => logReviewer.forceReview()}
              className="mt-1 bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs w-full"
            >
              Force Review & Fix
            </button>
          </div>
        </div>

        {/* Error Summary */}
        <div className="text-xs mt-2">
          <strong>Errors by component:</strong>
          <div className="bg-gray-700 p-1 rounded mt-1">
            {Object.entries(getErrorSummary()).map(([component, count]) => (
              <div key={component} className="flex justify-between">
                <span>{component}:</span>
                <span className="text-red-400">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logs */}
      <div className="h-64 overflow-y-auto p-2">
        {filteredLogs.slice(-50).reverse().map((log, index) => (
          <div key={index} className="mb-2 pb-2 border-b border-gray-700">
            <div className="flex justify-between items-start">
              <span className={`text-xs ${getLevelColor(log.level)}`}>
                [{log.level}]
              </span>
              <span className="text-xs text-gray-400">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
            </div>
            {log.component && (
              <span className="text-xs text-blue-400">[{log.component}]</span>
            )}
            <div className="text-xs text-white mt-1">{log.message}</div>
            {log.details && (
              <details className="text-xs text-gray-400 mt-1">
                <summary className="cursor-pointer">Details</summary>
                <pre className="bg-gray-800 p-1 rounded mt-1 overflow-x-auto">
                  {JSON.stringify(log.details, null, 2)}
                </pre>
              </details>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 p-2 border-t border-gray-700 flex justify-between">
        <button
          onClick={() => logger.clear()}
          className="text-xs bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
        >
          Clear
        </button>
        <button
          onClick={() => {
            const blob = new Blob([logger.exportLogs()], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `logs-${new Date().toISOString()}.json`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
        >
          Export
        </button>
      </div>
    </div>
  );
}
