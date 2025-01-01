


import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { BaseUrl, delet, get, patch } from '../services/Endpoint';
import toast from 'react-hot-toast';

export default function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loadedata, setLoadedata] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '' });

  // Fetch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await get('/blog/GetPosts');
        const data = response.data;
        console.log('Fetched posts:', data.posts); // Debugging: Log posts
        setPosts(data.posts);
        console.log('API Response:', data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [loadedata]);

  // Handle delete functionality
  const handleDelete = async (postId) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      try {
        const response = await delet(`/blog/delete/${postId}`);
        const data = response.data;

        if (data.success) {
          toast.success(data.message);
          setLoadedata((prev) => !prev);
        } else {
          toast.error('Failed to delete the post.');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error('An unexpected error occurred. Please try again.');
        }
      }
    }
  };

  // Handle update initiation
  const handleUpdate = (post) => {
    setEditingPostId(post._id);
    setFormData({ title: post.title, desc: post.desc });
  };

  // Handle update form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await patch(`/blog/update/${editingPostId}`, formData);
      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        setLoadedata((prev) => !prev);
        setEditingPostId(null);
      } else {
        toast.error('Failed to update the post.');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4 text-white">All Posts</h1>
      <div className="row">
        {posts.map((post) => (
          <div className="col-md-4 mb-4" key={post._id}>
            <div className="card h-100">
              <img
                src={`${BaseUrl}/images/${post.image}`}
                className="card-img-top"
                alt={post.title}
              />
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">
                  {post.desc || 'No description available.'}
                </p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(post._id)}
                >
                  <FaTrashAlt /> Delete
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => handleUpdate(post)}
                >
                  <FaEdit /> Update
                </button>
              </div>
            </div>

            {editingPostId === post._id && (
              <form onSubmit={handleFormSubmit} className="mt-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    id="description"
                    className="form-control"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => setEditingPostId(null)}
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}