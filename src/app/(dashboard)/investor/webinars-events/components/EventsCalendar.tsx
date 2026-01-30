"use client";

import { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ical from "ical-generator";

type EventType = "webinar" | "in-person";

interface CalendarEvent {
  title: string;
  start: string;
  end?: string;
  extendedProps: {
    type: EventType;
    location: string;
    description: string;
    rsvpLink?: string;
    rsvpText?: string;
  };
}

const EVENTS: CalendarEvent[] = [
  {
    title: "2026 Market Outlook with Daniel Fainman",
    start: "2026-01-08T14:00:00",
    end: "2026-01-08T15:30:00",
    extendedProps: {
      type: "webinar",
      location: "Virtual (Zoom)",
      description: "Annual outlook on alternative investments.",
      rsvpLink: "https://zoom.us/webinar/register/example",
      rsvpText: "RSVP Now",
    },
  },
  {
    title: "Investor Roundtable – Digital Assets",
    start: "2026-02-12T12:00:00",
    end: "2026-02-12T13:30:00",
    extendedProps: {
      type: "webinar",
      location: "Virtual",
      description: "Deep dive into blockchain strategy.",
      rsvpLink: "#",
      rsvpText: "Register",
    },
  },
  {
    title: "Annual Investor Dinner",
    start: "2026-03-20T18:30:00",
    extendedProps: {
      type: "in-person",
      location: "The Plaza Hotel, New York, NY",
      description: "Exclusive networking dinner.",
      rsvpLink: "#",
      rsvpText: "RSVP Required",
    },
  },
  {
    title: "Real Estate Market Update",
    start: "2026-04-15T13:00:00",
    end: "2026-04-15T14:00:00",
    extendedProps: {
      type: "webinar",
      location: "Virtual",
      description: "Gulf region real estate trends.",
      rsvpLink: "#",
      rsvpText: "RSVP",
    },
  },
  {
    title: "Creative Arts Fund Showcase",
    start: "2026-05-10T19:00:00",
    extendedProps: {
      type: "in-person",
      location: "Los Angeles, CA",
      description: "Film production preview event.",
      rsvpLink: "#",
      rsvpText: "RSVP",
    },
  },
  {
    title: "Mid-Year Portfolio Review",
    start: "2026-06-18T15:00:00",
    end: "2026-06-18T16:30:00",
    extendedProps: {
      type: "webinar",
      location: "Virtual",
      description: "H1 performance and forward guidance.",
      rsvpLink: "#",
      rsvpText: "Join Live",
    },
  },
  {
    title: "Sustainable Investing Forum",
    start: "2026-07-22T11:00:00",
    end: "2026-07-22T12:30:00",
    extendedProps: {
      type: "webinar",
      location: "Virtual",
      description: "Recycling and circular economy focus.",
      rsvpLink: "#",
      rsvpText: "Register",
    },
  },
  {
    title: "Technology Deep Dive",
    start: "2026-08-14T14:00:00",
    end: "2026-08-14T15:30:00",
    extendedProps: {
      type: "webinar",
      location: "Virtual",
      description: "AI and quantum computing opportunities.",
      rsvpLink: "#",
      rsvpText: "RSVP",
    },
  },
  {
    title: "Q3 2026 Investor Call",
    start: "2026-09-25T16:00:00",
    end: "2026-09-25T17:00:00",
    extendedProps: {
      type: "webinar",
      location: "Virtual",
      description: "Quarterly update and Q&A.",
      rsvpLink: "#",
      rsvpText: "Join",
    },
  },
  {
    title: "Bitcoin Strategy Session",
    start: "2026-10-08T13:00:00",
    end: "2026-10-08T14:00:00",
    extendedProps: {
      type: "webinar",
      location: "Virtual",
      description: "Portfolio hedging with Bitcoin.",
      rsvpLink: "#",
      rsvpText: "Register",
    },
  },
  {
    title: "Year-End Tax Planning Webinar",
    start: "2026-11-18T15:00:00",
    end: "2026-11-18T16:30:00",
    extendedProps: {
      type: "webinar",
      location: "Virtual",
      description: "Tax considerations for alternative investments.",
      rsvpLink: "#",
      rsvpText: "RSVP",
    },
  },
  {
    title: "Holiday Investor Reception",
    start: "2026-12-12T18:00:00",
    extendedProps: {
      type: "in-person",
      location: "Manhattan, NY",
      description: "Year-end celebration and networking.",
      rsvpLink: "#",
      rsvpText: "RSVP Required",
    },
  },
];


export default function EventsCalendar() {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [filter, setFilter] = useState<"all" | EventType>("all");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const filteredEvents =
    filter === "all"
      ? EVENTS
      : EVENTS.filter((e) => e.extendedProps.type === filter);

  const exportIcal = () => {
    const cal = ical({ name: "Mogul Strategies Events" });

    filteredEvents.forEach((event) => {
      cal.createEvent({
        start: new Date(event.start),
        end: new Date(event.end || event.start),
        summary: event.title,
        description: event.extendedProps.description,
        location: event.extendedProps.location,
        url: event.extendedProps.rsvpLink,
      });
    });

    const blob = new Blob([cal.toString()], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mogul-events.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* ===== Calendar Section ===== */}
      <section className="calendar-container">
        <div className="calendar-header">
          <h2>Upcoming Events Calendar</h2>

          <div className="calendar-controls">
            <div className="filter-group">
              <label>Filter by Type:</label>
              <select
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value as "all" | EventType)
                }
              >
                <option value="all">All Events</option>
                <option value="webinar">Webinars</option>
                <option value="in-person">In-Person</option>
              </select>
            </div>

            <button className="export-btn" onClick={exportIcal}>
              Export to iCal
            </button>
          </div>
        </div>

        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={filteredEvents}
          eventClick={(info) => setSelectedEvent(info.event)}
        />
      </section>

      {
        selectedEvent && (
            <div className="modal" id="eventModal">
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <span className="close-modal" id="closeModal" onClick={() => setSelectedEvent(null)}>×</span>
                    <h3 id="modalTitle">{selectedEvent.title}</h3>
                    <p><strong>Date & Time:</strong> <span id="modalDate">{selectedEvent.start?.toLocaleString()}</span></p>
                    <p><strong>Type:</strong> <span id="modalType">{selectedEvent.extendedProps.type}</span></p>
                    <p><strong>Location:</strong> <span id="modalLocation">{selectedEvent.extendedProps.location}</span></p>
                    <p id="modalDescription">{selectedEvent.extendedProps.description}</p>
                    <div className="modal-actions" id="modalActions">
                        <a
                            className="rsvp-btn"
                            href={selectedEvent.extendedProps.rsvpLink || "#"}
                            target="_blank"
                        >
                            {selectedEvent.extendedProps.rsvpText || "RSVP"}
                        </a>
                    </div>
                </div>
            </div>
        )
      }

    </>
  );
}
