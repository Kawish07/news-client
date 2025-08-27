import React, { useEffect, useState } from 'react';
import NewsCard from '../components/NewsCard';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';

function Opinion() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOpinionNews() {
      try {
        const res = await fetch('http://localhost:5000/api/news');
        const data = await res.json();
        const opinionNews = data.filter(n => n.category && n.category.name === 'Opinion');
        setNews(opinionNews);
      } catch (err) {
        setNews([]);
      } finally {
        setLoading(false);
      }
    }
    fetchOpinionNews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection 
        title="Opinion" 
        description="Expert analysis, editorials, and reader voices."
        bgImage="https://images.unsplash.com/photo-1522148543752-8cdaa654a796?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3BpbmlvbnxlbnwwfHwwfHx8MA%3D%3D"
      />
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6 text-blue-900">Opinion</h2>
        {loading ? (
          <div>Loading...</div>
        ) : news.length === 0 ? (
          <div>No news found for Opinion category.</div>
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

// ...existing code removed...

export default Opinion;
