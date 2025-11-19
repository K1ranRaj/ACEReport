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
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];

  const FetchNews = async () => {
    try {
      const url = `https://newsapi.org/v2/everything?q=${props.category}&from=${yesterday}&to=${today}&pageSize=10&page=${page}&language=en&sortBy=popularity&searchIn=title,description&apiKey=${props.newsapikey}`;
      let data = await fetch(url);
      let jsondata = await data.json();
      if (jsondata.articles) {
        const filteredArticles = jsondata.articles.filter(article => article.title && article.description && article.urlToImage);
        setArticles(filteredArticles);
        setTotalResults(jsondata.totalResults || 0);
        if (filteredArticles.length < 10 || filteredArticles.length >= jsondata.totalResults) {
          setHasMore(false);
        }
      } else {
        console.error("No articles found");
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
    FetchNews();
    // eslint-disable-next-line
  }, [props.category]);

  const fetchMoreNews = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    try {
      const url = `https://newsapi.org/v2/everything?q=${props.category}&from=${yesterday}&to=${today}&pageSize=10&page=${nextPage}&language=en&sortBy=popularity&searchIn=title,description&apiKey=${props.newsapikey}`;
      let data = await fetch(url);
      let jsondata = await data.json();
      if (jsondata.articles) {
        const filteredArticles = jsondata.articles.filter(article => article.title && article.description && article.urlToImage);
        setArticles(articles.concat(filteredArticles));
        if (filteredArticles.length < 10 || articles.length + filteredArticles.length >= totalResults) {
          setHasMore(false);
        }
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
  const topStories = searchQuery ? articles.slice(0, 6) : articles.slice(0, 6);

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
              <img src={featured.urlToImage || '/placeholder.svg'} alt={featured.title} className="featured-image md:w-1/2 group-hover:!scale-[101%] !transition-transform !duration-700 !ease-out" />
              <div className="featured-content md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">{featured.title}</h2>
                <p className="text-white/75 mb-4">{featured.description}</p>
                <div className="flex items-center gap-5">
                  <button onClick={() => window.open(featured.url, '_blank')} className="py-2 rounded-md text-white font-semibold">Read full</button>
                  <div className="text-sm text-white/60">{featured.source ? featured.source.name : ''}</div>
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
                      imgUrl={e.urlToImage}
                      readm={e.url}
                      publishedAt={e.publishedAt}
                      source={e.source}
                    />
                  </div>
                )}
              </div>
            </InfiniteScroll>
          )}
        </section>

        <aside >
          <Sidebar topStories={topStories} />
        </aside>
      </div>

      <Footer />
    </main>
  );
}

export default NewsPage;