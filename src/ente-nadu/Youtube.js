import React, { useEffect, useState } from "react";
import "./Youtube.css";
import { useNavigate } from "react-router-dom";
import { useVerificationContext } from "./reset/VerificationContext";
import { dataRef } from "../Firebase";

const YouTubeLink = () => {
  const [links, setLinks] = useState([]);
  const [newLinkText, setNewLinkText] = useState("");
  const [newLinkDescription, setNewLinkDescription] = useState("");
  const [editingText, setEditingText] = useState("");
  const [editingDescription, setEditingDescription] = useState("");
  const navigate = useNavigate();
  const { isAdminAuthenticated } = useVerificationContext();

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate("/entenadu/login");
    }
  }, [isAdminAuthenticated, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await dataRef.ref("classroom").once("value");
      if (snapshot.exists()) {
        const data = snapshot.val();
        const linkList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setLinks(linkList);
      }
    };

    fetchData();
  }, []);

  const handleAddLink = async () => {
    if (newLinkText.trim() === "") {
      alert("Please enter a YouTube link.");
      return;
    }

    const videoId = extractVideoId(newLinkText);
    if (!videoId) {
      alert("Please enter a valid YouTube link.");
      return;
    }

    const descriptionWords = newLinkDescription.trim().split(/\s+/);
    if (descriptionWords.length > 15) {
      alert("Description cannot exceed 15 words.");
      return;
    }

    const newLink = {
      videoUrl: newLinkText.trim(),
      description: newLinkDescription.trim(),
      thumbnail: `https://img.youtube.com/vi/${videoId}/0.jpg`,
      editing: false,
    };

    try {
      const db = dataRef.ref("classroom/");
      await db.push(newLink);
    } catch (error) {
      console.error(error);
    }
    setLinks([...links, newLink]);
    setNewLinkText("");
    setNewLinkDescription("");
  };

  const handleEditLink = (id) => {
    const updatedLinks = links.map((link) =>
      link.id === id ? { ...link, editing: true } : link
    );

    const editingLink = updatedLinks.find((link) => link.id === id);
    setEditingText(editingLink.videoUrl);
    setEditingDescription(editingLink.description);

    setLinks(updatedLinks);
  };

  const handleSaveEdit = async (id) => {
    if (editingText.trim() === "") {
      alert("Please enter a YouTube link.");
      return;
    }

    const videoId = extractVideoId(editingText);
    if (!videoId) {
      alert("Please enter a valid YouTube link.");
      return;
    }

    const descriptionWords = editingDescription.trim().split(/\s+/);
    if (descriptionWords.length > 15) {
      alert("Description cannot exceed 15 words.");
      return;
    }

    const updatedLinks = links.map((link) =>
      link.id === id
        ? {
            ...link,
            videoUrl: editingText.trim(),
            description: editingDescription.trim(),
            thumbnail: `https://img.youtube.com/vi/${videoId}/0.jpg`,
            editing: false,
          }
        : link
    );

    try {
      const db = dataRef.ref(`classroom/${id}`);
      await db.update({
        videoUrl: editingText.trim(),
        description: editingDescription.trim(),
        thumbnail: `https://img.youtube.com/vi/${videoId}/0.jpg`,
      });
    } catch (error) {
      console.error(error);
    }
    setLinks(updatedLinks);
    setEditingText("");
    setEditingDescription("");
  };

  const handleDeleteLink = async (id) => {
    const updatedLinks = links.filter((link) => link.id !== id);
    try {
      const db = dataRef.ref(`classroom/${id}`);
      await db.remove();
    } catch (error) {
      console.error(error);
    }
    setLinks(updatedLinks);
  };

  const handleChangeEditingText = (e) => {
    setEditingText(e.target.value);
  };

  const handleChangeEditingDescription = (e) => {
    setEditingDescription(e.target.value);
  };

  const extractVideoId = (url) => {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
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
        <textarea
          value={newLinkDescription}
          onChange={(e) => setNewLinkDescription(e.target.value)}
          className="youtube-link-input"
          placeholder="Enter video description (max 15 words)"
        />
        <button onClick={handleAddLink} className="youtube-link-btn add-btn">
          Add Link
        </button>
      </div>
      <ul className="youtube-link-list">
        {links.map((link) => (
          <li key={link.id} className="youtube-link-item">
            {link.editing ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={handleChangeEditingText}
                  className="youtube-link-input"
                />
                <textarea
                  value={editingDescription}
                  onChange={handleChangeEditingDescription}
                  className="youtube-link-input"
                />
              </>
            ) : (
              <>
                <a href={link.text} target="_blank" rel="noopener noreferrer">
                  <img
                    src={link.thumbnail}
                    alt="YouTube Thumbnail"
                    className="youtube-thumbnail"
                  />
                </a>
                <a href={link.text} target="_blank" rel="noopener noreferrer">
                  {link.text}
                </a>
                <p>{link.description}</p>
              </>
            )}
            {link.editing ? (
              <button
                onClick={() => handleSaveEdit(link.id)}
                className="youtube-link-btn save-btn"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEditLink(link.id)}
                className="youtube-link-btn edit-btn"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => handleDeleteLink(link.id)}
              className="youtube-link-btn delete-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YouTubeLink;
