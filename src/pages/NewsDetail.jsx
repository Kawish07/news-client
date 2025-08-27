import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNewsDetail() {
      try {
        const res = await fetch(`http://localhost:5000/api/news/${id}`);
        const data = await res.json();
        setNews(data);
      } catch (err) {
        setNews(null);
      } finally {
        setLoading(false);
      }
    }
    fetchNewsDetail();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-gray-50"><Navbar /><div className="container mx-auto py-8">Loading...</div></div>;
  if (!news) return <div className="min-h-screen bg-gray-50"><Navbar /><div className="container mx-auto py-8">News not found.</div></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white py-16 mb-8">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-4">{news.title}</h1>
            <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-semibold">{news.category?.name}</span>
          </div>
          <div className="flex-1 flex justify-center">
            <img src={news.image} alt={news.title} className="rounded-xl shadow-2xl w-full max-w-md h-64 object-cover" />
          </div>
        </div>
      </section>
      <div className="container mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Full Story</h2>
        <p className="text-gray-800 text-lg leading-relaxed">{news.content}</p>
      </div>
    </div>
  );
}

export default NewsDetail;
