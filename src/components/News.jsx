function News(props) {
  const { title, desc, imgUrl, readm, publishedAt, source } = props;
  const fallback = '/placeholder.svg';
  const date = publishedAt ? new Date(publishedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';

  return (
    <article className="group slide-up h-full flex flex-col bg-linear-to-br from-white/3 to-white/1 border border-white/8 rounded-2xl overflow-hidden hover:border-white/20 shadow-lg hover:shadow-xl !transition-all !duration-700 !ease-out">

      <div className="relative h-52 md:h-56 overflow-hidden bg-linear-to-br from-gray-800 to-gray-900">
        <img src={imgUrl || fallback} alt={title} className="w-full h-full object-cover group-hover:!scale-[103%] !transition-transform !duration-700 !ease-out" />
        
        <div className="absolute left-3 top-3 px-3 py-1 rounded-full bg-linear-to-r from-ace-violet/80 to-ace-cyan/80 backdrop-blur-md text-xs font-semibold text-white">
          {source && source.name}
        </div>

      </div>

      <div className="p-4 md:p-5 flex-1 flex flex-col">
        <h3 className="text-base md:text-lg font-bold text-white mb-2 leading-tight line-clamp-2 group-hover:text-ace-cyan transition-colors">{title}</h3>
        <p className="text-sm text-white/70 mb-4 line-clamp-2 flex-1">{desc}</p>
        
        <div className="text-xs text-white/60 mb-4 font-medium">{date}</div>

        <div className="flex gap-2 mt-auto">
          <button onClick={() => window.open(readm, "_blank")} className="flex-1 px-3 py-2 rounded-lg bg-white/3 text-white text-sm font-semibold hover:bg-gray-400/10 transition-all duration-500 cursor-pointer">
            Read More
          </button>
        </div>
      </div>
    </article>
  );
}

export default News;