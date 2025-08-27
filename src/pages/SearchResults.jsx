import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery().get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;
    fetch(`http://localhost:5000/api/news?search=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        setResults(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-12 min-h-screen bg-gray-50">
        <h2 className="text-2xl font-bold mb-6">Search Results for "{query}"</h2>
        {loading ? (
          <p>Loading...</p>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map(item => (
              <Link to={`/news/${item._id}`} key={item._id} style={{ textDecoration: 'none' }}>
                <NewsCard
                  image={item.imageUrl || item.image || item.img || 'https://via.placeholder.com/400x300?text=No+Image'}
                  title={item.title}
                  summary={item.summary}
                  category={typeof item.category === 'object' && item.category.name ? item.category.name : item.category}
                  time={item.createdAt ? new Date(item.createdAt).toLocaleTimeString() : ''}
                  views={item.views || '1.2k'}
                />
              </Link>
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default SearchResults;
