import React, { useEffect, useState } from 'react';
import NewsCard from '../components/NewsCard';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';

function Sports() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSportsNews() {
      try {
        const res = await fetch('http://localhost:5000/api/news');
        const data = await res.json();
        const sportsNews = data.filter(n => n.category && n.category.name === 'Sports');
        setNews(sportsNews);
      } catch (err) {
        setNews([]);
      } finally {
        setLoading(false);
      }
    }
    fetchSportsNews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection 
        title="Sports News" 
        description="Latest sports updates, tournaments, and highlights."
        bgImage="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80"
      />
      <div className="py-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-blue-900">Sports News</h2>
          {loading ? (
            <div>Loading...</div>
          ) : news.length === 0 ? (
            <div>No news found for Sports category.</div>
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
// ...existing code removed...
}

export default Sports;
