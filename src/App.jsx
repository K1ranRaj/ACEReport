import Navbar from './components/Navbar';
import NewsPage from './components/NewsPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  const apiKey = import.meta.env.VITE_ACEREPORT_API_KEY;

  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<NewsPage limit={30} category="Politics" newsapikey={apiKey} />} />
        <Route path="/Politics" element={<NewsPage limit={30} category="Politics" newsapikey={apiKey} />} />
        <Route path="/Science" element={<NewsPage limit={30} category="Science" newsapikey={apiKey} />} />
        <Route path="/Sports" element={<NewsPage limit={30} category="Sports" newsapikey={apiKey} />} />
        <Route path="/Entertainment" element={<NewsPage limit={30} category="Entertainment" newsapikey={apiKey} />} />
        <Route path="/Technology" element={<NewsPage limit={30} category="Technology" newsapikey={apiKey} />} />
        <Route path="/Health" element={<NewsPage limit={30} category="Health" newsapikey={apiKey} />} />
        <Route path="/Business" element={<NewsPage limit={30} category="Business" newsapikey={apiKey} />} />
      </Routes>
    </div>
  );
}

export default App;