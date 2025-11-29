import React from 'react';
import { AnalysisResult } from '../types';

interface ReportDisplayProps {
  data: AnalysisResult;
}

export const ReportDisplay: React.FC<ReportDisplayProps> = ({ data }) => {
  // Function to safely process markdown-like text for display
  const formatText = (text: string) => {
    // Split by sections roughly based on the prompt structure
    const sections = text.split(/\*\*(?=[A-Z]\.)/); // Split on **A., **B., etc.
    
    return sections.map((section, index) => {
      const trimmed = section.trim();
      if (!trimmed) return null;

      // Check if this is the introduction or link section (before A.)
      if (!trimmed.match(/^[A-Z]\./)) {
         // Replace markdown links with actual anchors
         const linkRegex = /\[([^\]]+)\]\(([^)]+)\)|(https?:\/\/[^\s]+)/g;
         const parts = trimmed.split(linkRegex);
         
         // Simple render for header part
         return (
            <div key={`intro-${index}`} className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg text-blue-900">
                <div className="prose prose-blue max-w-none text-sm whitespace-pre-wrap font-medium">
                    {trimmed.replace(/\*\*/g, '')}
                </div>
            </div>
         );
      }

      // Handle main sections A, B, C, D
      const titleMatch = trimmed.match(/^([A-Z]\.\s*[^*]+)\*\*/);
      const title = titleMatch ? titleMatch[1] : trimmed.substring(0, 20) + '...';
      const content = titleMatch ? trimmed.substring(titleMatch[0].length) : trimmed;

      // Determine color based on section content keywords for visual flair
      let icon = "📊";
      if (title.includes("DÒNG TIỀN")) icon = "💰";
      if (title.includes("KỸ THUẬT")) icon = "📈";
      if (title.includes("TIN TỨC")) icon = "📰";
      if (title.includes("KẾT LUẬN")) icon = "🎯";

      return (
        <div key={`sec-${index}`} className="mb-6 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            <h3 className="font-bold text-slate-800 uppercase text-sm tracking-wide">{title.trim()}</h3>
          </div>
          <div className="p-5 text-slate-700 leading-relaxed text-sm sm:text-base whitespace-pre-wrap">
            {content.replace(/\*\*/g, '').trim()}
          </div>
        </div>
      );
    });
  };

  const sources = data.groundingChunks.filter(c => c.web?.uri && c.web?.title);

  return (
    <div className="animate-fade-in">
        {/* Render Text Content */}
        {formatText(data.text)}

        {/* Render Sources */}
        {sources.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-200">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Nguồn tham khảo (Google Search)</h4>
                <div className="grid gap-2 sm:grid-cols-2">
                    {sources.map((chunk, idx) => (
                        <a 
                            key={idx} 
                            href={chunk.web?.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-green-200 transition-all group"
                        >
                            <div className="mt-1 min-w-[16px]">
                                <img 
                                    src={`https://www.google.com/s2/favicons?domain=${chunk.web?.uri}&sz=32`} 
                                    alt="favicon" 
                                    className="w-4 h-4 opacity-70 group-hover:opacity-100"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-700 truncate group-hover:text-green-700">
                                    {chunk.web?.title || "Nguồn tin"}
                                </p>
                                <p className="text-xs text-slate-400 truncate">
                                    {chunk.web?.uri}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        )}
    </div>
  );
};