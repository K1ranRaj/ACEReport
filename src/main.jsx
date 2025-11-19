import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { SearchProvider } from './context/SearchContext'

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <SearchProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SearchProvider>
  </ThemeProvider>
)