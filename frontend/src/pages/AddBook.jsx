import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AddBook = () => {
  const navigate = useNavigate()
  const role = useSelector((state) => state.auth.role)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    author: '',
    price: '',
    desc: '',
    language: '',
    type: 'Sell', // Sell or Donate
    condition: 'Good',
    class: '',
    subject: '',
    board: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })
  
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }

  // Redirect if not logged in (but allow all logged-in users, not just admin)
  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/Login')
    }
  }, [isLoggedIn, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    // Clear message when user starts typing
    if (message.text) setMessage({ text: '', type: '' })
    
    // If type changes to Donate, set price to 0
    if (name === 'type' && value === 'Donate') {
      setFormData(prev => ({ ...prev, type: 'Donate', price: '0' }))
    }
  }

  const validateForm = () => {
    if (!formData.url.trim()) {
      setMessage({ text: 'Please enter a book image URL.', type: 'error' })
      return false
    }
    if (!formData.title.trim()) {
      setMessage({ text: 'Please enter a book title.', type: 'error' })
      return false
    }
    if (!formData.author.trim()) {
      setMessage({ text: 'Please enter the author name.', type: 'error' })
      return false
    }
    if (formData.type === 'Sell' && (!formData.price || parseFloat(formData.price) <= 0)) {
      setMessage({ text: 'Please enter a valid price for selling.', type: 'error' })
      return false
    }
    if (!formData.desc.trim()) {
      setMessage({ text: 'Please enter a book description.', type: 'error' })
      return false
    }
    if (!formData.language.trim()) {
      setMessage({ text: 'Please enter the book language.', type: 'error' })
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      setLoading(true)
      const submitData = {
        ...formData,
        price: formData.type === 'Donate' ? 0 : parseFloat(formData.price),
        // Only include optional fields if they have values
        class: formData.class.trim() || undefined,
        subject: formData.subject.trim() || undefined,
        board: formData.board.trim() || undefined,
      }
      
      const response = await axios.post(
        "http://localhost:3000/api/v1/add-book",
        submitData,
        { headers }
      )
      
      setMessage({ 
        text: response.data.message || 'Book listed successfully!', 
        type: 'success' 
      })
      
      // Reset form after successful submission
      setFormData({
        url: '',
        title: '',
        author: '',
        price: '',
        desc: '',
        language: '',
        type: 'Sell',
        condition: 'Good',
        class: '',
        subject: '',
        board: ''
      })
      
      // Redirect to all books after 2 seconds
      setTimeout(() => {
        navigate('/all-books')
      }, 2000)
      
    } catch (error) {
      console.error('Error adding book:', error)
      setMessage({ 
        text: error.response?.data?.message || 'Failed to list book. Please try again.', 
        type: 'error' 
      })
    } finally {
      setLoading(false)
    }
  }

  if (!isLoggedIn) {
    return null
  }

  const isAdmin = role === 'admin'

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border-2 border-emerald-100 p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-emerald-700 text-center mb-2">
            List Your Book
          </h1>
          <p className="text-center text-slate-600 text-sm">
            {isAdmin 
              ? 'Add a book to the platform (auto-approved)' 
              : 'Your book will be reviewed by admin before going live'}
          </p>
        </div>
        
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg border-2 ${
            message.type === 'success' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
              : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image URL */}
            <div className="md:col-span-2">
              <label htmlFor="url" className="block text-sm font-semibold text-slate-700 mb-2">
                Book Image URL *
              </label>
              <input
                type="url"
                id="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="https://example.com/book-image.jpg"
                className="w-full px-4 py-2 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-700"
                disabled={loading}
                required
              />
            </div>

            {/* Title */}
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">
                Book Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter book title"
                className="w-full px-4 py-2 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-700"
                disabled={loading}
                required
              />
            </div>

            {/* Author */}
            <div>
              <label htmlFor="author" className="block text-sm font-semibold text-slate-700 mb-2">
                Author *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                className="w-full px-4 py-2 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-700"
                disabled={loading}
                required
              />
            </div>

            {/* Language */}
            <div>
              <label htmlFor="language" className="block text-sm font-semibold text-slate-700 mb-2">
                Language *
              </label>
              <input
                type="text"
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                placeholder="e.g., Bengali, English"
                className="w-full px-4 py-2 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-700"
                disabled={loading}
                required
              />
            </div>

            {/* Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-semibold text-slate-700 mb-2">
                Listing Type *
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-700"
                disabled={loading}
                required
              >
                <option value="Sell">💰 Sell</option>
                <option value="Donate">🎁 Donate (FREE)</option>
              </select>
            </div>

            {/* Price (only if selling) */}
            {formData.type === 'Sell' && (
              <div>
                <label htmlFor="price" className="block text-sm font-semibold text-slate-700 mb-2">
                  Price (৳) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  step="1"
                  className="w-full px-4 py-2 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-700"
                  disabled={loading || formData.type === 'Donate'}
                  required={formData.type === 'Sell'}
                />
              </div>
            )}

            {/* Condition */}
            <div>
              <label htmlFor="condition" className="block text-sm font-semibold text-slate-700 mb-2">
                Condition *
              </label>
              <select
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-700"
                disabled={loading}
                required
              >
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </div>

            {/* Class */}
            <div>
              <label htmlFor="class" className="block text-sm font-semibold text-slate-700 mb-2">
                Class (Optional)
              </label>
              <input
                type="text"
                id="class"
                name="class"
                value={formData.class}
                onChange={handleChange}
                placeholder="e.g., Class 10, HSC, SSC"
                className="w-full px-4 py-2 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-700"
                disabled={loading}
              />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">
                Subject (Optional)
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g., Mathematics, Physics"
                className="w-full px-4 py-2 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-700"
                disabled={loading}
              />
            </div>

            {/* Board */}
            <div>
              <label htmlFor="board" className="block text-sm font-semibold text-slate-700 mb-2">
                Board (Optional)
              </label>
              <input
                type="text"
                id="board"
                name="board"
                value={formData.board}
                onChange={handleChange}
                placeholder="e.g., Dhaka, Chittagong, National"
                className="w-full px-4 py-2 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-700"
                disabled={loading}
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="desc" className="block text-sm font-semibold text-slate-700 mb-2">
                Description *
              </label>
              <textarea
                id="desc"
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                placeholder="Enter book description..."
                rows="4"
                className="w-full px-4 py-2 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-700 resize-vertical"
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button 
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 flex items-center gap-2 ${
                loading 
                  ? 'bg-slate-400 cursor-not-allowed' 
                  : 'bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Listing Book...
                </>
              ) : (
                'List Book'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBook
