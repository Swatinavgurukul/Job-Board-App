import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobsPage from './pages/JobsPage';
import BookmarksPage from './pages/BookmarksPage';
import NotFound from './pages/NotFound';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
