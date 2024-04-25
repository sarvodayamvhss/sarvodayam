import React, { useState } from 'react';
import './Reminder.css';

const Reminder = () => {
  const [reminders, setReminders] = useState([]);
  const [newReminderText, setNewReminderText] = useState('');

  const handleAddReminder = () => {
    if (newReminderText.trim() === '') {
      alert('Please enter a reminder text.');
      return;
    }

    const newReminder = {
      id: new Date().getTime(),
      text: newReminderText.trim(),
      editing: false 
    };

    setReminders([...reminders, newReminder]);
    setNewReminderText('');
  };

  const handleEditReminder = (id, newText) => {
    const updatedReminders = reminders.map((reminder) =>
      reminder.id === id ? { ...reminder, text: newText } : reminder
    );
  
    setReminders(updatedReminders);
  };
  
  

  const handleDeleteReminder = (id) => {
    const updatedReminders = reminders.filter((reminder) => reminder.id !== id);
    setReminders(updatedReminders);
  };

  const toggleEditMode = (id) => {
    const updatedReminders = reminders.map((reminder) =>
      reminder.id === id ? { ...reminder, editing: !reminder.editing } : reminder
    );

    setReminders(updatedReminders);
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
    {reminder.editing ? (
      <input
        type="text"
        value={reminder.text} // Display current text of the reminder
        onChange={(e) => handleEditReminder(reminder.id, e.target.value)}
        className="reminder-input"
      />
    ) : (
      <span>{reminder.text}</span>
    )}
    <button onClick={() => toggleEditMode(reminder.id)} className="reminder-btn edit-btn">
      {reminder.editing ? 'Save' : 'Edit'}
    </button>
    <button onClick={() => handleDeleteReminder(reminder.id)} className="reminder-btn delete-btn">
      Delete
    </button>
  </li>
))}

      </ul>
    </div>
  );
};

export default Reminder;
