import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import NewsCard from '../components/NewsCard';
import HeroSection from '../components/HeroSection';

function Business() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBusinessNews() {
      try {
        const res = await fetch('http://localhost:5000/api/news');
        const data = await res.json();
        const businessNews = data.filter(n => n.category && n.category.name === 'Business');
        setNews(businessNews);
      } catch (err) {
        setNews([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBusinessNews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection 
        title="Business News" 
        description="Market trends, startup stories, and economic updates."
        bgImage="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"
      />
      <main className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6 text-blue-900">Business News</h2>
        {loading ? (
          <div>Loading...</div>
        ) : news.length === 0 ? (
          <div>No news found for Business category.</div>
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
      </main>
    </div>
  );
}

  
export default Business;
