import React, { useState } from 'react';
import './Youtube.css';

const YouTubeLink = () => {
  const [links, setLinks] = useState([]);
  const [newLinkText, setNewLinkText] = useState('');
  const [editingText, setEditingText] = useState('');

  const handleAddLink = () => {
    if (newLinkText.trim() === '') {
      alert('Please enter a YouTube link.');
      return;
    }

    const newLink = {
      id: new Date().getTime(),
      text: newLinkText.trim(),
      editing: false
    };

    setLinks([...links, newLink]);
    setNewLinkText('');
  };

  const handleEditLink = (id) => {
    const updatedLinks = links.map((link) =>
      link.id === id ? { ...link, editing: true } : link
    );

    const editingLink = updatedLinks.find((link) => link.id === id);
    setEditingText(editingLink.text);

    setLinks(updatedLinks);
  };

  const handleSaveEdit = (id) => {
    const updatedLinks = links.map((link) =>
      link.id === id ? { ...link, text: editingText.trim(), editing: false } : link
    );

    setLinks(updatedLinks);
    setEditingText('');
  };

  const handleDeleteLink = (id) => {
    const updatedLinks = links.filter((link) => link.id !== id);
    setLinks(updatedLinks);
  };

  const handleChangeEditingText = (e) => {
    setEditingText(e.target.value);
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
              <a href={link.text} target="_blank" rel="noopener noreferrer">
                {link.text}
              </a>
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

export default YouTubeLink;
