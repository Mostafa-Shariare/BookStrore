import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateBook = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const role = useSelector((state) => state.auth.role)
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

    const [formData, setFormData] = useState({
        url: '',
        title: '',
        author: '',
        price: '',
        desc: '',
        language: ''
    })

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ text: '', type: '' })

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id
    }

    // Redirect if not admin
    useEffect(() => {
        if (!isLoggedIn || role !== 'admin') {
            navigate('/')
        }
    }, [isLoggedIn, role, navigate])

    // Fetch book details
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/v1/get-book-by-id/${id}`
                )
                setFormData(response.data.data)
            } catch (error) {
                console.error("Error fetching book:", error)
                setMessage({ text: 'Failed to load book details.', type: 'error' })
            }
        }
        fetchBook()
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        if (message.text) setMessage({ text: '', type: '' })
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
        if (!formData.price || formData.price <= 0) {
            setMessage({ text: 'Please enter a valid price.', type: 'error' })
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
            const response = await axios.put(
                "http://localhost:3000/api/v1/update-book",
                {
                    ...formData,
                    price: parseFloat(formData.price)
                },
                { headers }
            )

            setMessage({
                text: response.data.message || 'Book updated successfully!',
                type: 'success'
            })

            // Navigate back to details page after short delay
            setTimeout(() => {
                navigate(`/view-book-details/${id}`)
            }, 1500)

        } catch (error) {
            console.error('Error updating book:', error)
            setMessage({
                text: error.response?.data?.message || 'Failed to update book. Please try again.',
                type: 'error'
            })
        } finally {
            setLoading(false)
        }
    }

    if (!isLoggedIn || role !== 'admin') {
        return null
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Update Book</h1>

                {message.text && (
                    <div style={{
                        ...styles.message,
                        backgroundColor: message.type === 'success' ? '#f0fdf4' : '#fef2f2',
                        color: message.type === 'success' ? '#166534' : '#991b1b',
                        borderColor: message.type === 'success' ? '#bbf7d0' : '#fecaca'
                    }}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGrid}>
                        <div style={styles.fieldGroup}>
                            <label style={styles.label} htmlFor="url">
                                Book Image URL *
                            </label>
                            <input
                                type="url"
                                id="url"
                                name="url"
                                value={formData.url}
                                onChange={handleChange}
                                placeholder="https://example.com/book-image.jpg"
                                style={styles.input}
                                disabled={loading}
                                required
                            />
                        </div>

                        <div style={styles.fieldGroup}>
                            <label style={styles.label} htmlFor="title">
                                Book Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter book title"
                                style={styles.input}
                                disabled={loading}
                                required
                            />
                        </div>

                        <div style={styles.fieldGroup}>
                            <label style={styles.label} htmlFor="author">
                                Author *
                            </label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                placeholder="Enter author name"
                                style={styles.input}
                                disabled={loading}
                                required
                            />
                        </div>

                        <div style={styles.fieldGroup}>
                            <label style={styles.label} htmlFor="price">
                                Price ($) *
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                style={styles.input}
                                disabled={loading}
                                required
                            />
                        </div>

                        <div style={styles.fieldGroup}>
                            <label style={styles.label} htmlFor="language">
                                Language *
                            </label>
                            <input
                                type="text"
                                id="language"
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                                placeholder="e.g., English, Spanish, French"
                                style={styles.input}
                                disabled={loading}
                                required
                            />
                        </div>

                        <div style={styles.fieldGroupFull}>
                            <label style={styles.label} htmlFor="desc">
                                Description *
                            </label>
                            <textarea
                                id="desc"
                                name="desc"
                                value={formData.desc}
                                onChange={handleChange}
                                placeholder="Enter book description..."
                                rows="4"
                                style={styles.textarea}
                                disabled={loading}
                                required
                            />
                        </div>
                    </div>

                    <div style={styles.buttonContainer}>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                ...styles.button,
                                opacity: loading ? 0.6 : 1,
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {loading ? (
                                <>
                                    <div style={styles.buttonSpinner}></div>
                                    Updating Book...
                                </>
                            ) : (
                                'Update Book'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

// Styles object (Reused from AddBook for consistency)
const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#fafafa',
        padding: '20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    card: {
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: '32px',
        border: '1px solid #e4e4e7'
    },
    title: {
        fontSize: '28px',
        fontWeight: '600',
        color: '#18181b',
        marginBottom: '24px',
        textAlign: 'center',
        borderBottom: '2px solid #71717a',
        paddingBottom: '12px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    },
    formGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
    },
    fieldGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    fieldGroupFull: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        gridColumn: '1 / -1'
    },
    label: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#3f3f46',
        marginBottom: '4px'
    },
    input: {
        padding: '12px 16px',
        border: '2px solid #e4e4e7',
        borderRadius: '8px',
        fontSize: '16px',
        fontFamily: 'inherit',
        transition: 'border-color 0.2s ease-in-out',
        outline: 'none',
        backgroundColor: '#ffffff',
        color: '#18181b',
        ':focus': {
            borderColor: '#71717a'
        },
        ':disabled': {
            backgroundColor: '#f4f4f5',
            cursor: 'not-allowed'
        }
    },
    textarea: {
        padding: '12px 16px',
        border: '2px solid #e4e4e7',
        borderRadius: '8px',
        fontSize: '16px',
        fontFamily: 'inherit',
        resize: 'vertical',
        minHeight: '100px',
        transition: 'border-color 0.2s ease-in-out',
        outline: 'none',
        backgroundColor: '#ffffff',
        color: '#18181b',
        ':focus': {
            borderColor: '#71717a'
        },
        ':disabled': {
            backgroundColor: '#f4f4f5',
            cursor: 'not-allowed'
        }
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '16px'
    },
    button: {
        backgroundColor: '#71717a',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 32px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        minWidth: '160px',
        justifyContent: 'center'
    },
    buttonSpinner: {
        width: '16px',
        height: '16px',
        border: '2px solid transparent',
        borderTop: '2px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    },
    message: {
        padding: '12px 16px',
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid',
        fontSize: '14px',
        fontWeight: '500'
    }
}

// Add CSS animation for spinner (Copied from AddBook)
const styleSheet = document.createElement('style')
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  input:focus, textarea:focus {
    border-color: #71717a !important;
    box-shadow: 0 0 0 3px rgba(113, 113, 122, 0.1);
  }
  
  button:hover:not(:disabled) {
    background-color: #52525b !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(113, 113, 122, 0.3);
  }
  
  button:active:not(:disabled) {
    transform: translateY(0) !important;
  }
`
document.head.appendChild(styleSheet)

export default UpdateBook
