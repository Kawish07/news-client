import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  // States for news, categories, form, etc.
  const [categories, setCategories] = useState([]);
  const [news, setNews] = useState([]);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ title: '', summary: '', content: '', image: '', category: '' });
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [categoryForm, setCategoryForm] = useState({ name: '' });
  const [editCategoryId, setEditCategoryId] = useState(null);

  // Fetch categories and news
  useEffect(() => {
    async function fetchData() {
      try {
        const catRes = await fetch('http://localhost:5000/api/categories');
        if (!catRes.ok) throw new Error('Failed to fetch categories');
        const cats = await catRes.json();
        setCategories(cats);
        const newsRes = await fetch('http://localhost:5000/api/news');
        if (!newsRes.ok) throw new Error('Failed to fetch news');
        const newsData = await newsRes.json();
        setNews(newsData);
      } catch (err) {
        setError('Could not fetch data from backend. Showing sample data.');
        // Fallback sample data for UI testing
        setCategories([
          { _id: '1', name: 'World' },
          { _id: '2', name: 'Technology' },
          { _id: '3', name: 'Sports' }
        ]);
        setNews([
          { _id: 'a', title: 'Sample World News', summary: 'This is a sample world news.', content: 'Sample content.', image: '', category: { _id: '1', name: 'World' } },
          { _id: 'b', title: 'Sample Tech News', summary: 'This is a sample tech news.', content: 'Sample content.', image: '', category: { _id: '2', name: 'Technology' } }
        ]);
      }
    }
    fetchData();
  }, []);

  // Handle form input
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleCategoryChange(e) {
    setCategoryForm({ ...categoryForm, [e.target.name]: e.target.value });
  }

  // Handle news submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    let updatedNews;
    if (editId) {
      await fetch(`http://localhost:5000/api/news/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      // Update news state locally
      updatedNews = news.map(n => n._id === editId ? { ...n, ...form, category: categories.find(c => c._id === form.category) } : n);
      setNews(updatedNews);
    } else {
      const res = await fetch('http://localhost:5000/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const newNews = await res.json();
      setNews([...news, { ...newNews, category: categories.find(c => c._id === newNews.category) }]);
    }
    setLoading(false);
    setEditId(null);
    setForm({ title: '', summary: '', content: '', image: '', category: '' });
  }

  // Edit news
  function handleEdit(newsItem) {
    setEditId(newsItem._id);
    setForm({
      title: newsItem.title,
      summary: newsItem.summary,
      content: newsItem.content,
      image: newsItem.image,
      category: newsItem.category?._id || ''
    });
  }

  // Delete news
  async function handleDelete(id) {
    setLoading(true);
    await fetch(`http://localhost:5000/api/news/${id}`, { method: 'DELETE' });
    setNews(news.filter(n => n._id !== id));
    setLoading(false);
  }

  // Add/Edit category
  async function handleCategorySubmit(e) {
    e.preventDefault();
    setLoading(true);
    let updatedCategories;
    if (editCategoryId) {
      await fetch(`http://localhost:5000/api/categories/${editCategoryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryForm)
      });
      updatedCategories = categories.map(c => c._id === editCategoryId ? { ...c, ...categoryForm } : c);
      setCategories(updatedCategories);
    } else {
      const res = await fetch('http://localhost:5000/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryForm)
      });
      const newCat = await res.json();
      setCategories([...categories, newCat]);
    }
    setLoading(false);
    setEditCategoryId(null);
    setCategoryForm({ name: '' });
  }

  // Edit category
  function handleEditCategory(cat) {
    setEditCategoryId(cat._id);
    setCategoryForm({ name: cat.name });
  }

  // Delete category
  async function handleDeleteCategory(id) {
    setLoading(true);
    await fetch(`http://localhost:5000/api/categories/${id}`, { method: 'DELETE' });
    setCategories(categories.filter(c => c._id !== id));
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>}
      {loading && <div className="bg-blue-100 text-blue-700 p-4 mb-4 rounded">Loading...</div>}

      {/* Category Management */}
      <form className="mb-8 bg-white p-6 rounded shadow" onSubmit={handleCategorySubmit}>
        <h2 className="text-xl font-semibold mb-4">{editCategoryId ? 'Edit Category' : 'Add Category'}</h2>
        <input name="name" value={categoryForm.name} onChange={handleCategoryChange} placeholder="Category Name" className="block mb-2 p-2 w-full border rounded" required />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded mr-2" disabled={loading}>{editCategoryId ? 'Update' : 'Add'}</button>
        {editCategoryId && <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => { setEditCategoryId(null); setCategoryForm({ name: '' }); }}>Cancel</button>}
      </form>
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">All Categories</h2>
        {categories.length === 0 ? (
          <div className="text-gray-500">No categories found.</div>
        ) : (
          <ul>
            {categories.map(cat => (
              <li key={cat._id} className="mb-2 flex justify-between items-center">
                <span>{cat.name}</span>
                <span>
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleEditCategory(cat)}>Edit</button>
                  <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleDeleteCategory(cat._id)}>Delete</button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* News Management */}
      <form className="mb-8 bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-4">{editId ? 'Edit News' : 'Add News'}</h2>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="block mb-2 p-2 w-full border rounded" required />
        <input name="summary" value={form.summary} onChange={handleChange} placeholder="Summary" className="block mb-2 p-2 w-full border rounded" required />
        <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" className="block mb-2 p-2 w-full border rounded" required />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="block mb-2 p-2 w-full border rounded" />
        <select name="category" value={form.category} onChange={handleChange} className="block mb-2 p-2 w-full border rounded" required>
          <option value="">Select Category</option>
          {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mr-2" disabled={loading}>{editId ? 'Update' : 'Add News'}</button>
        {editId && <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => { setEditId(null); setForm({ title: '', summary: '', content: '', image: '', category: '' }); }}>Cancel</button>}
      </form>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">All News</h2>
        {news.length === 0 ? (
          <div className="text-gray-500">No news found.</div>
        ) : (
          <ul>
            {news.map(n => (
              <li key={n._id} className="mb-4 border-b pb-2 flex justify-between items-center">
                <div>
                  <strong>{n.title}</strong> - {n.category?.name}
                  <div>{n.summary}</div>
                </div>
                <span>
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleEdit(n)}>Edit</button>
                  <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleDelete(n._id)}>Delete</button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
export default AdminDashboard;
