import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from '../context/ThemeContext';
import { useSearch } from '../context/SearchContext';

function Navbar() {

  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { searchQuery, setSearchQuery } = useSearch();
  const [localQuery, setLocalQuery] = useState(searchQuery || '');
  const debounceRef = useRef(null);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleSearch = (e) => {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSearchQuery(localQuery || '');
    setOpen(false);
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchQuery(localQuery || '');
    }, 600);
    return () => clearTimeout(debounceRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localQuery]);

  return (
    <header className="w-full sticky top-0 z-40 backdrop-blur-sm slide-down ">
      <nav className="w-full lg:px-12 py-4 border-b border-white/5 header">
        <div className="nav-container">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-0 lg:gap-1 no-underline">
              {theme === 'dark' ? (
                <img src="/AceLogo.svg" alt="ACE" className="h-11 w-11 mt-1 object-contain object-center" />
              ):(
                <img src="/AceLogoLight.svg" alt="ACE" className="h-11 w-11 mt-1 object-contain object-center" />
              )
              }
              <div>
                <div className="text-xl font-bold text-white">ACEReport</div>
                <div className="text-xs text-white/70">Your Daily Source of Truth</div>
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <Link className={`text-sm font-semibold ${isActive('/') && `underline underline-offset-8 ${theme === 'dark' ? 'decoration-white' : 'decoration-blue-950' }  decoration-1 `}`} to='/'>Politics</Link>

            <Link className={`text-sm font-semibold ${isActive('/Science') && `underline underline-offset-8 ${theme === 'dark' ? 'decoration-white' : 'decoration-blue-950' }  decoration-1 `}`} to='/Science'>Science</Link>

            <Link className={`text-sm font-semibold ${isActive('/Sports') && `underline underline-offset-8 ${theme === 'dark' ? 'decoration-white' : 'decoration-blue-950' }  decoration-1 `}`} to='/Sports'>Sports</Link>

            <Link className={`text-sm font-semibold ${isActive('/Technology') && `underline underline-offset-8 ${theme === 'dark' ? 'decoration-white' : 'decoration-blue-950' }  decoration-1 `}`} to='/Technology'>Technology</Link>

            <Link className={`text-sm font-semibold ${isActive('/Entertainment') && `underline underline-offset-8 ${theme === 'dark' ? 'decoration-white' : 'decoration-blue-950' }  decoration-1 `}`} to='/Entertainment'>Entertainment</Link>

            <Link className={`text-sm font-semibold ${isActive('/Health') && `underline underline-offset-8 ${theme === 'dark' ? 'decoration-white' : 'decoration-blue-950' }  decoration-1 `}`} to='/Health'>Health</Link>

            <Link className={`text-sm font-semibold ${isActive('/Business') && `underline underline-offset-8 ${theme === 'dark' ? 'decoration-white' : 'decoration-blue-950' }  decoration-1 `}`} to='/Business'>Business</Link>
          </div>

          <div className="flex items-center gap-3">
            <form onSubmit={handleSearch} className={`hidden lg:flex items-center bg-white/5 hover:bg-white/10 rounded-md px-3 py-2 gap-2 focus-within:bg-white/10 transition-colors duration-200 relative`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-1.85z" />
              </svg>
              <input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Search news"
                className={`bg-transparent text-sm text-white placeholder-white/50 outline-none w-30 max-xl:w-20 transition-colors duration-200`}
              />
              {localQuery && (
                <button type="button" onClick={() => { setLocalQuery(''); setSearchQuery(''); }} title="Clear search" className="absolute right-2 text-white/60 hover:text-white p-0.5 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 8.586l3.536-3.536a1 1 0 111.414 1.414L11.414 10l3.536 3.536a1 1 0 01-1.414 1.414L10 11.414l-3.536 3.536a1 1 0 01-1.414-1.414L8.586 10 5.05 6.464A1 1 0 016.464 5.05L10 8.586z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </form>

            <button aria-pressed={theme === 'light'} onClick={toggleTheme} title="Toggle theme" className={`p-2 rounded-md bg-white/5 hover:bg-white/10 `}>
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 116.707 2.707a7 7 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>

            <div className="lg:hidden">
              <button aria-label="Toggle menu" className="p-2 rounded-md bg-white/3" onClick={() => setOpen(!open)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden px-4 py-4 flex flex-col gap-3 bg-[#0F172A]/95 glass-card mx-[0.7rem] mt-3 rounded-lg">
          <form onSubmit={handleSearch} className="flex items-center bg-white/10 rounded-lg px-3 py-2 gap-2 focus-within:bg-white/20 transition-colors mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-1.85z" />
            </svg>
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Search news"
              className="bg-transparent text-sm text-white placeholder-white/40 outline-none flex-1"
            />
            {localQuery && (
              <button type="button" onClick={() => { setLocalQuery(''); setSearchQuery(''); }} title="Clear search" className="text-white/60 hover:text-white p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 8.586l3.536-3.536a1 1 0 111.414 1.414L11.414 10l3.536 3.536a1 1 0 01-1.414 1.414L10 11.414l-3.536 3.536a1 1 0 01-1.414-1.414L8.586 10 5.05 6.464A1 1 0 016.464 5.05L10 8.586z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </form>
          <Link className={`text-base font-medium no-underline transition-colors ${isActive('/') ? 'text-ace-cyan' : 'text-white'}`} to='/' onClick={() => setOpen(false)}>Politics</Link>
          <Link className={`text-base font-medium no-underline transition-colors ${isActive('/Science') ? 'text-ace-cyan' : 'text-white'}`} to='/Science' onClick={() => setOpen(false)}>Science</Link>
          <Link className={`text-base font-medium no-underline transition-colors ${isActive('/Sports') ? 'text-ace-cyan' : 'text-white'}`} to='/Sports' onClick={() => setOpen(false)}>Sports</Link>
          <Link className={`text-base font-medium no-underline transition-colors ${isActive('/Technology') ? 'text-ace-cyan' : 'text-white'}`} to='/Technology' onClick={() => setOpen(false)}>Technology</Link>
          <Link className={`text-base font-medium no-underline transition-colors ${isActive('/Entertainment') ? 'text-ace-cyan' : 'text-white'}`} to='/Entertainment' onClick={() => setOpen(false)}>Entertainment</Link>
          <Link className={`text-base font-medium no-underline transition-colors ${isActive('/Health') ? 'text-ace-cyan' : 'text-white'}`} to='/Health' onClick={() => setOpen(false)}>Health</Link>
          <Link className={`text-base font-medium no-underline transition-colors ${isActive('/Business') ? 'text-ace-cyan' : 'text-white'}`} to='/Business' onClick={() => setOpen(false)}>Business</Link>
        </div>
      )}
    </header>
  );
}

export default Navbar;