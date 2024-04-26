import React, { useEffect, useState } from "react";
import { dataRef } from "../Firebase";
import "./Reminder.css";

const Reminder = () => {
  const [reminders, setReminders] = useState([]);
  const [newReminderText, setNewReminderText] = useState("");

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
      console.error("Error fetching notifications:", error);
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
      console.error("Failed to save remainder to database ", error);
    }
    setNewReminderText("");
  };

  const handleEditReminder = (id, newText) => {
    const updatedReminders = reminders.map((reminder) =>
      reminder.id === id ? { ...reminder, text: newText } : reminder
    );

    setReminders(updatedReminders);
  };

  const handleDeleteReminder = async (id) => {
    try {
      const reminderRef = dataRef.ref("reminders").child(id);
      await reminderRef.remove();
    } catch (error) {
      console.error("Failed to remove remainder in the database ", error);
    }
  };

  const toggleEditMode = async (id) => {
    const updatedReminders = reminders.map((reminder) =>
      reminder.id === id
        ? { ...reminder, editing: !reminder.editing }
        : reminder
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
                onChange={(e) =>
                  handleEditReminder(reminder.id, e.target.value)
                }
                className="reminder-input"
              />
            ) : (
              <span>{reminder.text}</span>
            )}
            <button
              onClick={() => toggleEditMode(reminder.id)}
              className="reminder-btn edit-btn"
            >
              {reminder.editing ? "Save" : "Edit"}
            </button>
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
