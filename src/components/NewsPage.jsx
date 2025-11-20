import { useState, useEffect } from 'react';
import News from './News';
import LoadingSpinner from './LoadingSpinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useSearch } from '../context/SearchContext';

function NewsPage(props) {
  
  const { searchQuery } = useSearch();
  const [articles, setArticles] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(true);

  const FetchNews = async () => {
    setLoading(true);
    try {
      const url = `https://newsdata.io/api/1/latest?apikey=${props.newsapikey}&language=en&category=${props.category.toLowerCase()}&image=1&removeduplicate=1&country=in`;
      let res = await fetch(url);
      let data = await res.json();
      if (data.results) {
        const filteredArticles = data.results.filter(article => article.title && article.description && article.image_url);
        setArticles(filteredArticles);
        setNextPage(data.nextPage || null);
        setHasMore(!!data.nextPage);
      } else {
        console.error("No articles found");
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchNews();
    // eslint-disable-next-line
  }, [props.category]);

  const fetchMoreNews = async () => {
    if (!nextPage) return;
    try {
      const url = `https://newsdata.io/api/1/latest?apikey=${props.newsapikey}&language=en&category=${props.category.toLowerCase()}&page=${nextPage}&image=1&removeduplicate=1&country=in`;
      let res = await fetch(url);
      let data = await res.json();
      if (data.results) {
        const filteredArticles = data.results.filter(article => article.title && article.description && article.image_url);
        setArticles(prevArticles => prevArticles.concat(filteredArticles));
        setNextPage(data.nextPage || null);
        setHasMore(!!data.nextPage);
      } else {
        console.error("No articles found");
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setHasMore(false);
    }
  };

  const filteredArticles = searchQuery
    ? articles.filter(article => {
        const title = article.title ? article.title.toLowerCase() : '';
        const query = searchQuery.toLowerCase();
        return title.includes(query);
      })
    : articles;

  const featured = filteredArticles && filteredArticles.length ? filteredArticles[0] : null;
  const rest = filteredArticles && filteredArticles.length > 1 ? filteredArticles.slice(1) : [];
  const topStories = articles.slice(0, 6);

  if (loading) {
    return (
      <main className="app-container container-content mx-auto py-8 flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </main>
    );
  }

  return (
    <main className="app-container container-content mx-auto py-8 fade-in">
      <header className="mb-6 slide-down">
        <h1 className='text-3xl md:text-4xl font-bold text-white'>{props.category}</h1>
        <p className="text-sm text-white/70 mt-1">Latest stories and top headlines {searchQuery ? `for "${searchQuery}"` : `in ${props.category}`}</p>
        {searchQuery && <p className="text-xs text-ace-cyan mt-2">Found {filteredArticles.length} result{filteredArticles.length !== 1 ? 's' : ''}</p>}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-lg:gap-x-0">
        <section className="md:col-span-3 space-y-6">
          {featured && (
            <article className="featured-card group bg-linear-to-br from-white/2 to-white/1 border border-white/5 rounded-xl overflow-hidden md:flex">
              <img src={featured.image_url || '/placeholder.svg'} alt={featured.title} className="featured-image md:w-1/2 group-hover:!scale-[101%] !transition-transform !duration-700 !ease-out" />
              <div className="featured-content md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">{featured.title ? (featured.title.length > 120 ? featured.title.slice(0, 120) + '...' : featured.title) : 'Untitled'}</h2>
                <p className="text-white/75 mb-4">{featured.description ? (featured.description.length > 340 ? featured.description.slice(0, 340) + '...' : featured.description) : ''}</p>
                <div className="flex items-center gap-5">
                  <button onClick={() => window.open(featured.link, '_blank')} className="py-2 rounded-md text-white font-semibold cursor-pointer">Read full</button>
                  <div className="text-sm text-white/60">{featured.source_name || ''}</div>
                </div>
              </div>
            </article>
          )}

          {filteredArticles.length === 0 ? (
            <div className="glass-card p-6 text-center">
              <h3 className="text-xl font-semibold text-white">No results for "{searchQuery}"</h3>
              <p className="text-white/70 mt-2">Try different category or clear the search.</p>
            </div>
          ) : (
            <InfiniteScroll style={{ overflow: 'hidden' }}
              dataLength={rest.length}
              next={fetchMoreNews}
              hasMore={hasMore}
              loader={<LoadingSpinner />}
              endMessage={
                <p className="text-center text-white/70 text-sm mt-6">
                  <b>No More News</b>
                </p>
              }
            >
              <div className="card-grid">
                {rest.map((e, index) =>
                  <div key={index} className="slide-up">
                    <News
                      title={e.title ? (e.title.length > 120 ? e.title.slice(0, 120) + '...' : e.title) : 'Untitled'}
                      desc={e.description ? (e.description.length > 140 ? e.description.slice(0, 140) + '...' : e.description) : ''}
                      imgUrl={e.image_url}
                      readm={e.link}
                      publishedAt={e.pubDate}
                      source={e.source_name}
                    />
                  </div>
                )}
              </div>
            </InfiniteScroll>
          )}
        </section>

        <aside>
          <Sidebar topStories={topStories} />
        </aside>
      </div>

      <Footer />
    </main>
  );
}

export default NewsPage;
