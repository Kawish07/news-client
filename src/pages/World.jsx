import React, { useEffect, useState } from 'react';
import NewsCard from '../components/NewsCard';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';

function World() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorldNews() {
      try {
        const res = await fetch('http://localhost:5000/api/news');
        const data = await res.json();
        // Filter news by category name 'World'
        const worldNews = data.filter(n => n.category && n.category.name === 'World');
        setNews(worldNews);
      } catch (err) {
        setNews([]);
      } finally {
        setLoading(false);
      }
    }
    fetchWorldNews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection 
        title="World News" 
        description="Global headlines and international stories."
        bgImage="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
      />
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6 text-blue-900">World News</h2>
        {loading ? (
          <div>Loading...</div>
        ) : news.length === 0 ? (
          <div>No news found for World category.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map(item => (
                <NewsCard
                  key={item._id}
                  _id={item._id}
                  image={item.image}
                  title={item.title}
                  summary={item.summary}
                  category={item.category.name}
                  content={item.content}
                />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default World;
