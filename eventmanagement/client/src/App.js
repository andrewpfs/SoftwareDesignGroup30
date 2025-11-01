import './App.css';
import { useState } from 'react';

function App() {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [urgency, setUrgency] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const toggleSkill = (skill) => {
    setRequiredSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (requiredSkills.length === 0 || !urgency) {
      alert('Please select at least one skill and an urgency level.');
      return;
    }

    const data = {
      eventName,
      eventDescription,
      eventLocation,
      requiredSkills,
      urgency,
      eventDate,
      startTime,
      endTime,
    };

    try {
      const res = await fetch('http://localhost:3001/create-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        alert(result.message || 'Event created successfully!');
        setEventName('');
        setEventDescription('');
        setEventLocation('');
        setRequiredSkills([]);
        setUrgency('');
        setEventDate('');
        setStartTime('');
        setEndTime('');
      } else {
        alert('Error: ' + (result.error || 'Failed to create event.'));
      }
    } catch (err) {
      console.error(err);
      alert('Server error. Please try again later.');
    }
  };

  const skillList = [
    'Communication',
    'Teamwork',
    'Organized',
    'Adaptability',
    'Driving',
    'English',
    'Spanish',
  ];

  const urgencyLevels = ['low', 'medium', 'high', 'critical'];

  return (
    <div className="App">
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <label>Event Name</label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />

        <label>Event Description</label>
        <textarea
          rows="4"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          required
        />

        <label>Location</label>
        <textarea
          rows="2"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
          required
        />

        <label>Required Skills</label>
        <div className="dropdown-content show">
          {skillList.map((skill) => (
            <label key={skill}>
              <input
                type="checkbox"
                value={skill}
                checked={requiredSkills.includes(skill)}
                onChange={() => toggleSkill(skill)}
              />{' '}
              {skill}
            </label>
          ))}
        </div>

        <label>Urgency</label>
        <select
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
          required
        >
          <option value="">Select Urgency</option>
          {urgencyLevels.map((u) => (
            <option key={u} value={u}>
              {u.charAt(0).toUpperCase() + u.slice(1)}
            </option>
          ))}
        </select>

        <label>Event Date</label>
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
        />

        <label>Event Start Time</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />

        <label>Event End Time</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default App;
