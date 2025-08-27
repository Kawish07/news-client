import React, { useEffect, useState } from 'react';
import NewsCard from '../components/NewsCard';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';

function Videos() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideosNews() {
      try {
        const res = await fetch('http://localhost:5000/api/news');
        const data = await res.json();
        // Filter news by category name 'Videos'
        const videosNews = data.filter(n => n.category && n.category.name === 'Videos');
        setNews(videosNews);
      } catch (err) {
        setNews([]);
      } finally {
        setLoading(false);
      }
    }
    fetchVideosNews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection 
        title="Videos" 
        description="Watch the latest news videos and documentaries."
        bgImage="https://images.unsplash.com/photo-1496559249665-c7e2874707ea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmlkZW9zfGVufDB8fDB8fHww"
      />
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6 text-blue-900">Videos</h2>
        {loading ? (
          <div>Loading...</div>
        ) : news.length === 0 ? (
          <div>No news found for Videos category.</div>
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

export default Videos;
