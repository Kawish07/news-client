import React from 'react';

import { Link } from 'react-router-dom';

function NewsCard({ _id, image, title, summary, category, content }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 p-4 flex flex-col justify-between border border-gray-200">
      <img src={image} alt={title} className="rounded-lg mb-3 w-full h-48 object-cover border border-gray-300" />
      <h3 className="font-bold text-lg text-blue-900 mb-2">{title}</h3>
  <p className="text-gray-700 mb-2 font-medium">{summary}</p>
      <span className="text-xs text-gold-600 font-semibold bg-blue-100 px-2 py-1 rounded-full self-start">{category}</span>
      <Link to={`/news/${_id}`} className="mt-3 text-blue-900 hover:text-gold-600 font-bold">Read More</Link>
    </div>
  );
}

export default NewsCard;
