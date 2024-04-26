import React, { useEffect, useState } from "react";
import { dataRef } from "../Firebase";
import "./Reminder.css";

const Reminder = () => {
  const [reminders, setReminders] = useState([]);
  const [newReminderText, setNewReminderText] = useState("");
  const [editingText, setEditingText] = useState({ id: null, text: "" });

  useEffect(() => {
    fetchReminders();
    const remindersRef = dataRef.ref("reminders");
    remindersRef.on("value", fetchReminders);
    return () => {
      remindersRef.off("value", fetchReminders);
    };
  }, []);

  const fetchReminders = async () => {
    try {
      const snapshot = await dataRef
        .ref("reminders")
        .orderByChild("timestamp")
        .once("value");
      if (snapshot.exists()) {
        const remindersData = snapshot.val();
        const sortedReminders = Object.values(remindersData).sort(
          (a, b) => b.id - a.id
        );
        setReminders(sortedReminders);
      }
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  const handleAddReminder = async () => {
    if (newReminderText.trim() === "") {
      alert("Please enter a reminder text.");
      return;
    }

    const remainderId = new Date().getTime();
    const newReminder = {
      id: remainderId,
      text: newReminderText.trim(),
      editing: false,
    };
    setReminders([...reminders, newReminder]);

    try {
      const newReminderRef = dataRef.ref("reminders").child(remainderId);
      await newReminderRef.set(newReminder);
    } catch (error) {
      console.error("Failed to save reminder to database ", error);
    }
    setNewReminderText("");
  };

  const handleEditReminder = (id, newText) => {
    setEditingText({ id, text: newText });
  };

  const handleSaveReminder = async (id) => {
    try {
      const reminderRef = dataRef.ref(`reminders/${id}`);
      await reminderRef.update({ text: editingText.text });
      const updatedReminders = reminders.map((reminder) =>
        reminder.id === id ? { ...reminder, text: editingText.text } : reminder
      );
      setReminders(updatedReminders);
      setEditingText({ id: null, text: "" });
    } catch (error) {
      console.error("Failed to update reminder in the database ", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingText({ id: null, text: "" });
  };

  const handleDeleteReminder = async (id) => {
    try {
      const reminderRef = dataRef.ref(`reminders/${id}`);
      await reminderRef.remove();
      const filteredReminders = reminders.filter((reminder) => reminder.id !== id);
      setReminders(filteredReminders);
    } catch (error) {
      console.error("Failed to remove reminder from the database ", error);
    }
  };

  return (
    <div className="reminder-container">
      <h2 className="reminder-header">Reminders</h2>
      <div className="reminder-form">
        <input
          type="text"
          value={newReminderText}
          onChange={(e) => setNewReminderText(e.target.value)}
          className="reminder-input"
          placeholder="Enter new reminder"
        />
        <button onClick={handleAddReminder} className="reminder-btn add-btn">
          Add Reminder
        </button>
      </div>
      <ul className="reminder-list">
        {reminders.map((reminder) => (
          <li key={reminder.id} className="reminder-item">
            {editingText.id === reminder.id ? (
              <input
                type="text"
                value={editingText.text}
                onChange={(e) => handleEditReminder(reminder.id, e.target.value)}
                className="reminder-input"
              />
            ) : (
              <span>{reminder.text}</span>
            )}
            {editingText.id === reminder.id ? (
              <>
                <button
                  onClick={() => handleSaveReminder(reminder.id)}
                  className="reminder-btn save-btn"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="reminder-btn cancel-btn"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditingText({ id: reminder.id, text: reminder.text })}
                className="reminder-btn edit-btn"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => handleDeleteReminder(reminder.id)}
              className="reminder-btn delete-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reminder;
