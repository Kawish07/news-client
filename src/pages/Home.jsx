import React, { useEffect, useState } from 'react';
import { ChevronRight, Clock, User, Eye, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

// Professional NewsCard Component
function NewsCard({ image, title, summary, category, time = "2h ago", views = "1.2k" }) {
  const getCategoryColor = (cat) => {
    const colors = {
      'National': 'bg-red-500',
      'World': 'bg-blue-500',
      'Business': 'bg-emerald-500',
      'Sports': 'bg-orange-500',
      'Technology': 'bg-purple-500',
      'Latest': 'bg-pink-500',
      'Entertainment': 'bg-yellow-500',
      'Health': 'bg-teal-500'
    };
    return colors[cat] || 'bg-gray-500';
  };

  return (
    <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute top-3 left-3">
          <span className={`${getCategoryColor(category)} text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide`}>
            {category}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center text-white text-xs space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{time}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>{views}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">
          {summary}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">PK News</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </div>
      </div>
    </article>
  );
}



// Hero Section Component
function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-red-400" />
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
                Top Story
              </span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Rain batters <span className="text-red-400">Karachi</span> again, power cuts and flooding add to citizens' misery
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Several areas face prolonged power outages and submerged roads as authorities ask citizens to stay indoors during the severe weather conditions.
            </p>
            <div className="flex items-center space-x-6 mb-8">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">15.2k views</span>
              </div>
            </div>
            <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Read Full Story
            </button>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80" 
              alt="Karachi Flooding" 
              className="rounded-xl shadow-2xl w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
            <div className="absolute bottom-4 left-4">
              <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                Live Coverage
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Trending Topics Section
function TrendingTopics() {
  const topics = ['Karachi Weather', 'Internet Outage', 'Chinese Diplomacy', 'Senate Bills', 'Cricket News'];
  
  return (
    <div className="bg-white py-6 border-b border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-bold text-gray-900">Trending:</h3>
          <div className="flex items-center space-x-3 overflow-x-auto">
            {topics.map((topic, index) => (
              <span 
                key={index}
                className="bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition"
              >
                #{topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch news from backend (update URL to match your backend)
    fetch("http://localhost:5000/api/news")
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Select important news for homepage sections
  const topStories = news.slice(0, 4);
  const moreNews = news.slice(4, 7);
  const latestUpdates = news.slice(0, 4);
  const opinions = news.filter(n => {
    if (typeof n.category === 'object' && n.category.name) {
      return n.category.name.toLowerCase() === 'opinion';
    }
    if (typeof n.category === 'string') {
      return n.category.toLowerCase() === 'opinion';
    }
    return false;
  }).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection />
      <TrendingTopics />
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Latest Updates
              </h2>
              <div className="space-y-4">
                {loading ? (
                  <p>Loading...</p>
                ) : latestUpdates.map((item, index) => (
                  <Link to={`/news/${item._id}`} key={item._id} style={{ textDecoration: 'none' }}>
                    <article className="group cursor-pointer">
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition line-clamp-2">
                        {item.title}
                      </h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-blue-600 font-medium">{typeof item.category === 'object' && item.category.name ? item.category.name : item.category}</span>
                        <span className="text-xs text-gray-500">{item.createdAt ? new Date(item.createdAt).toLocaleTimeString() : ""}</span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-blue-600 to-red-500 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-3">Stay Informed</h3>
              <p className="text-sm text-blue-100 mb-4">Get breaking news delivered to your inbox</p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="w-full px-3 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <section className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-red-500 pl-4">
                Top Stories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading ? (
                  <p>Loading...</p>
                ) : topStories.length > 0 ? topStories.map((item) => (
                  <Link to={`/news/${item._id}`} key={item._id} style={{ textDecoration: 'none' }}>
                    <NewsCard
                      image={item.imageUrl || item.image || item.img || 'https://via.placeholder.com/400x300?text=No+Image'}
                      title={item.title}
                      summary={item.summary}
                      category={typeof item.category === 'object' && item.category.name ? item.category.name : item.category}
                      time={item.createdAt ? new Date(item.createdAt).toLocaleTimeString() : ""}
                      views={item.views || "1.2k"}
                    />
                  </Link>
                )) : <p>No news available.</p>}
              </div>
            </div>

            {/* More News Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {loading ? (
                <p>Loading...</p>
              ) : moreNews.length > 0 ? moreNews.map((item) => (
                <Link to={`/news/${item._id}`} key={item._id} style={{ textDecoration: 'none' }}>
                  <NewsCard
                    image={item.imageUrl || item.image || item.img || 'https://via.placeholder.com/400x300?text=No+Image'}
                    title={item.title}
                    summary={item.summary}
                    category={typeof item.category === 'object' && item.category.name ? item.category.name : item.category}
                    time={item.createdAt ? new Date(item.createdAt).toLocaleTimeString() : ""}
                    views={item.views || "1.2k"}
                  />
                </Link>
              )) : <p>No news available.</p>}
            </div>
          </section>

          {/* Right Sidebar */}
          <aside className="lg:col-span-1">
            {/* Opinion Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Opinion & Analysis
              </h3>
              <div className="space-y-4">
                {loading ? (
                  <p>Loading...</p>
                ) : opinions.length > 0 ? opinions.map((item) => (
                  <Link to={`/news/${item._id}`} key={item._id} style={{ textDecoration: 'none' }}>
                    <article className="group cursor-pointer">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500">By {item.author || 'PK News'}</p>
                    </article>
                  </Link>
                )) : <p>No opinions available.</p>}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition">
                  Facebook
                </button>
                <button className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-lg font-semibold transition">
                  Twitter
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition">
                  YouTube
                </button>
                <button className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg font-semibold transition">
                  Instagram
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Home;