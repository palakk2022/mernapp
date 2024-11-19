import React from 'react';
import './Timeline.css';  // Add your CSS file for styling the timeline

export default function Timeline({ events }) {
  return (
    <div className="timeline">
      {events.map((event, index) => (
        <div key={index} className="timeline-event">
          <h3>{event.status}</h3>
          <p>{event.time}</p>
        </div>
      ))}
    </div>
  );
}
