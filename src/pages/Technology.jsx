import React, { useEffect, useState } from 'react';
import NewsCard from '../components/NewsCard';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';

function Technology() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTechNews() {
      try {
        const res = await fetch('http://localhost:5000/api/news');
        const data = await res.json();
        const techNews = data.filter(n => n.category && n.category.name === 'Technology');
        setNews(techNews);
      } catch (err) {
        setNews([]);
      } finally {
        setLoading(false);
      }
    }
    fetchTechNews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection 
        title="Technology News" 
        description="AI breakthroughs, gadgets, and tech event highlights."
        bgImage="https://images.unsplash.com/photo-1663770114127-4f61cb62b56d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBhayUyMEFJJTIwdGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D"
      />
      <div className="py-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-blue-900">Technology News</h2>
          {loading ? (
            <div>Loading...</div>
          ) : news.length === 0 ? (
            <div>No news found for Technology category.</div>
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

export default Technology;

