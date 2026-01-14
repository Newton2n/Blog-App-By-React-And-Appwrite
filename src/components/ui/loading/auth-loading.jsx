import React from 'react';
const AuthLoading = () => {
  return (
    <div className="fixed inset-0 w-full h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-950 transition-colors duration-500 overflow-hidden select-none z-50">
      
      {/* Background Decor: Masonry Grid 
          - Preserved on all sizes with responsive scaling
          - Adjusted columns for smaller vs larger screens
      */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] dark:opacity-[0.06] pointer-events-none">
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 rotate-12 scale-[1.3] sm:scale-[1.5] lg:scale-[2] xl:scale-[2.8]">
          {[...Array(18)].map((_, i) => (
            <div 
              key={i} 
              className="bg-zinc-900 dark:bg-white rounded-[15%] sm:rounded-3xl animate-pulse"
              style={{ 
                height: `${[60, 100, 80, 120, 90][i % 5]}px`,
                width: '100%',
                minWidth: '40px',
                animationDelay: `${i * 120}ms`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative flex flex-col items-center w-full max-w-[90vw] sm:max-w-sm px-4 text-center z-10">
        
        {/* Verification Icon Container */}
        <div className="relative mb-4 sm:mb-8 lg:mb-12">
          {/* Aura using brand color */}
          <div className="absolute inset-0 bg-[#FB2C36] opacity-20 blur-xl sm:blur-2xl rounded-full animate-pulse scale-125 sm:scale-150" />
          
          <div className="relative w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
            {/* Spinner Track */}
            <div className="absolute inset-0 rounded-full border-2 sm:border-[3px] border-zinc-100 dark:border-zinc-900" />
            
            {/* Spinning Arc using brand color */}
            <div className="absolute inset-0 rounded-full border-2 sm:border-[3px] border-t-[#FB2C36] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
            
            {/* Center Shield Icon using brand color */}
            <div className="absolute inset-1 sm:inset-2 bg-[#FB2C36] rounded-full flex items-center justify-center shadow-lg shadow-[#FB2C36]/20">
              <svg 
                viewBox="0 0 24 24" 
                className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white fill-current animate-pulse"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Textual Feedback */}
        <div className="space-y-1 sm:space-y-3">
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter uppercase sm:normal-case">
            Verifying
          </h2>
          <div className="flex flex-col items-center">
            <p className="text-zinc-500 dark:text-zinc-400 font-medium text-[10px] sm:text-sm lg:text-base max-w-[120px] sm:max-w-70">
              Securing your creative space...
            </p>
          </div>
        </div>

        {/* Bouncing Dots using brand color */}
        <div className="mt-4 sm:mt-10 flex space-x-1.5 sm:space-x-2.5">
          <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-[#FB2C36] rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-[#FB2C36] rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-[#FB2C36] rounded-full animate-bounce" />
        </div>
      </div>

      {/* Modern Scanline Effect using brand color */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#FB2C36]/40 to-transparent animate-[scan_3s_infinite_linear]" />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: -10%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
      `}} />
    </div>
  );
};

export default AuthLoading;