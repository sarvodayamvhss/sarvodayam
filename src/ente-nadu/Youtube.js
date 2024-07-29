import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useVerificationContext } from './reset/VerificationContext';  // Adjust the path as needed
import './Youtube.css';

const YouTubeLinkPage = () => {
  const [links, setLinks] = useState([]);
  const [newLinkText, setNewLinkText] = useState('');
  const [editingText, setEditingText] = useState('');
  const navigate = useNavigate();
  const { isAdminAuthenticated } = useVerificationContext(); // Get authentication status

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/entenadu/login'); // Redirect to login if not authenticated
    }
  }, [isAdminAuthenticated, navigate]);

  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

  const handleAddLink = async () => {
    if (newLinkText.trim() === '') {
      alert('Please enter a YouTube link.');
      return;
    }

    const videoId = extractVideoId(newLinkText);
    if (!videoId) {
      alert('Please enter a valid YouTube link.');
      return;
    }

    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${API_KEY}`);
      const videoData = response.data.items[0].snippet;

      const newLink = {
        id: new Date().getTime(),
        text: newLinkText.trim(),
        thumbnail: `https://img.youtube.com/vi/${videoId}/0.jpg`,
        description: truncateDescription(videoData.description, 20),
        editing: false,
      };

      setLinks([...links, newLink]);
      setNewLinkText('');
    } catch (error) {
      console.error('Error fetching video data:', error);
    }
  };

  const handleEditLink = (id) => {
    const updatedLinks = links.map((link) =>
      link.id === id ? { ...link, editing: true } : link
    );

    const editingLink = updatedLinks.find((link) => link.id === id);
    setEditingText(editingLink.text);

    setLinks(updatedLinks);
  };

  const handleSaveEdit = async (id) => {
    if (editingText.trim() === '') {
      alert('Please enter a YouTube link.');
      return;
    }

    const videoId = extractVideoId(editingText);
    if (!videoId) {
      alert('Please enter a valid YouTube link.');
      return;
    }

    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${API_KEY}`);
      const videoData = response.data.items[0].snippet;

      const updatedLinks = links.map((link) =>
        link.id === id ? { ...link, text: editingText.trim(), thumbnail: `https://img.youtube.com/vi/${videoId}/0.jpg`, description: truncateDescription(videoData.description, 20), editing: false } : link
      );

      setLinks(updatedLinks);
      setEditingText('');
    } catch (error) {
      console.error('Error fetching video data:', error);
    }
  };

  const handleDeleteLink = (id) => {
    const updatedLinks = links.filter((link) => link.id !== id);
    setLinks(updatedLinks);
  };

  const handleChangeEditingText = (e) => {
    setEditingText(e.target.value);
  };

  const extractVideoId = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length===11)? match[7] : false;
  };

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return description;
  };

  return (
    <div className="youtube-link-container">
      <h2 className="youtube-link-header">YouTube Links</h2>
      <div className="youtube-link-form">
        <input
          type="text"
          value={newLinkText}
          onChange={(e) => setNewLinkText(e.target.value)}
          className="youtube-link-input"
          placeholder="Enter YouTube link"
        />
        <button onClick={handleAddLink} className="youtube-link-btn add-btn">
          Add Link
        </button>
      </div>
      <ul className="youtube-link-list">
        {links.map((link) => (
          <li key={link.id} className="youtube-link-item">
            {link.editing ? (
              <input
                type="text"
                value={editingText}
                onChange={handleChangeEditingText}
                className="youtube-link-input"
              />
            ) : (
              <>
                <a href={link.text} target="_blank" rel="noopener noreferrer">
                  <img src={link.thumbnail} alt="YouTube Thumbnail" className="youtube-thumbnail" />
                </a>
                <a href={link.text} target="_blank" rel="noopener noreferrer">
                  {link.text}
                </a>
                <p className="youtube-description">{link.description}</p>
              </>
            )}
            {link.editing ? (
              <button onClick={() => handleSaveEdit(link.id)} className="youtube-link-btn save-btn">
                Save
              </button>
            ) : (
              <button onClick={() => handleEditLink(link.id)} className="youtube-link-btn edit-btn">
                Edit
              </button>
            )}
            <button onClick={() => handleDeleteLink(link.id)} className="youtube-link-btn delete-btn">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YouTubeLinkPage;
