import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-green-600 text-white p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">24HMoney Analyst</h1>
            <p className="text-xs text-slate-500 font-medium">Trợ lý phân tích kỹ thuật chứng khoán</p>
          </div>
        </div>
        <div className="hidden sm:block">
           <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100">
             Powered by Gemini 2.5
           </span>
        </div>
      </div>
    </header>
  );
};