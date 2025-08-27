import React, { useEffect, useState } from 'react';
import NewsCard from '../components/NewsCard';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';

function Health() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHealthNews() {
      try {
        const res = await fetch('http://localhost:5000/api/news');
        const data = await res.json();
        const healthNews = data.filter(n => n.category && n.category.name === 'Health');
        setNews(healthNews);
      } catch (err) {
        setNews([]);
      } finally {
        setLoading(false);
      }
    }
    fetchHealthNews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection 
        title="Health News" 
        description="Wellness tips, medical breakthroughs, and fitness trends."
        bgImage="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"
      />
      <div className="py-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-blue-900">Health News</h2>
          {loading ? (
            <div>Loading...</div>
          ) : news.length === 0 ? (
            <div>No news found for Health category.</div>
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
    </div>
  );
}

export default Health;
