function Sidebar({ topStories = [] }){

  return (
    <aside className="w-full">
      <div className={`glass-card p-5 max-md:px-[0.7rem] lg:p-3 xl:6 rounded-2xl space-y-4 slide-in-left`}>
        <div className="flex items-center justify-between">
          <h4 className="section-title flex items-center gap-2">
            <span className="text-base"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-no-axes-combined-icon lucide-chart-no-axes-combined"><path d="M12 16v5"/><path d="M16 14v7"/><path d="M20 10v11"/><path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"/><path d="M4 18v3"/><path d="M8 14v7"/></svg></span>
            Trending Now
          </h4>
        </div>

        <div className="space-y-3 mt-3 sidebar-list">
          {topStories.length > 0 ? (
            topStories.map((s, i) => (
              <a key={i} href={s.link} target="_blank" rel="noreferrer" className="group flex items-start gap-4 no-underline transition-all duration-300 p-0 py-3 rounded-lg hover:bg-white/5 cursor-pointer">
                <img src={s.image_url || '/placeholder.svg'} alt={s.title} className="w-16 h-12 object-cover rounded-md group-hover:scale-105 transition-transform duration-400" />
                <div className="flex-1 overflow-hidden">
                  <div className="text-sm font-semibold text-white group-hover:text-white transition-colors duration-300">{s.title.length > 70 ? s.title.slice(0,70) + '...' : s.title}</div>
                  <div className="text-xs text-white/60 mt-1">{s.source ? s.source.name : 'News'}</div>
                </div>
              </a>
            ))
          ) : (
            <div className="text-sm text-white/70 py-4">Loading trending stories...</div>
          )}
        </div>
      </div>

      <div className="glass-card p-5 max-md:px-[0.7rem] md:p-6 rounded-2xl space-y-4 slide-in-left mt-6">
        <h4 className="section-title flex items-center gap-2">
          <span className="text-base"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-bar-stacked-icon lucide-chart-bar-stacked"><path d="M11 13v4"/><path d="M15 5v4"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/><rect x="7" y="13" width="9" height="4" rx="1"/><rect x="7" y="5" width="12" height="4" rx="1"/></svg></span>
          Categories
        </h4>
        <div className="grid grid-cols-2 gap-4">
          {['Politics', 'Science', 'Sports', 'Technology', 'Entertainment', 'Health', 'Business'].map((cat) => (
            <a
              key={cat}
              href={`/${cat}`}
              className="px-3 py-3 rounded-lg bg-white/3 hover:bg-gray-300/10 text-white text-xs font-semibold text-center no-underline transition-all duration-300 hover:shadow-sm hover:shadow-ace-cyan/20 cursor-pointer"
            >
              {cat}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
