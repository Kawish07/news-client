import React, { useEffect, useState } from 'react';
import NewsCard from '../components/NewsCard';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';

function Entertainment() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEntertainmentNews() {
      try {
        const res = await fetch('http://localhost:5000/api/news');
        const data = await res.json();
        const entertainmentNews = data.filter(n => n.category && n.category.name === 'Entertainment');
        setNews(entertainmentNews);
      } catch (err) {
        setNews([]);
      } finally {
        setLoading(false);
      }
    }
    fetchEntertainmentNews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection 
        title="Entertainment News" 
        description="Celebrity interviews, movie premieres, and music festivals."
        bgImage="https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZW50ZXJ0YWlubWVudCUyMGFjdG9ycyUyMHBhayUyMGZpbG18ZW58MHx8MHx8fDA%3D"
      />
      <div className="py-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-blue-900">Entertainment News</h2>
          {loading ? (
            <div>Loading...</div>
          ) : news.length === 0 ? (
            <div>No news found for Entertainment category.</div>
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

export default Entertainment;
