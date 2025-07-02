import React, { useState } from "react";

interface Event {
  id: number;
  title: string;
  image: string;
  description: string;
}

interface EventsData {
  [month: string]: {
    [day: number]: Event;
  };
}

const GridCalendar: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("May");

  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const events: EventsData = {
    May: {
      17: {
        id: 1,
        title: "THE BRIDGE 2025",
        image: "/api/placeholder/120/60",
        description: "Professional Learning Conference",
      },
      18: {
        id: 2,
        title: "THE BRIDGE 2025",
        image: "/api/placeholder/120/60",
        description: "Professional Learning Conference",
      },
    },
    June: {
      5: {
        id: 3,
        title: "Summer Workshop",
        image: "/api/placeholder/120/60",
        description: "Annual Summer Workshop",
      },
    },
  };

  const handleEventClick = (event: Event): void => {
    console.log("Navigating to event:", event);
    alert(`Navigating to: ${event.title}\n${event.description}`);
  };

  const getDaysInMonth = (monthName: string, year: number = 2025): number => {
    const monthIndex = months.indexOf(monthName);
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (
    monthName: string,
    year: number = 2025
  ): number => {
    const monthIndex = months.indexOf(monthName);
    return new Date(year, monthIndex, 1).getDay();
  };

  const renderCalendarDays = (): JSX.Element[] => {
    const daysInMonth = getDaysInMonth(selectedMonth);
    const firstDay = getFirstDayOfMonth(selectedMonth);
    const days: JSX.Element[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="calendar-day calendar-day--empty"
        ></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const hasEvent = events[selectedMonth] && events[selectedMonth][day];

      days.push(
        <div key={day} className="calendar-day">
          <div className="calendar-day__number">{day}</div>

          {hasEvent && (
            <div className="calendar-day__event-container">
              <div
                onClick={() => handleEventClick(hasEvent)}
                className="event-tile"
              >
                <div className="event-tile__year">2025</div>
                <div className="event-tile__title">THE BRIDGE</div>
              </div>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="grid-calendar">
      <div className="grid-calendar__header">
        <h1 className="grid-calendar__title">Events Calendar</h1>

        <div className="grid-calendar__dropdown-container">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="grid-calendar__dropdown"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="calendar-grid">
        <div className="calendar-grid__header">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="calendar-grid__day-header">
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-grid__days">{renderCalendarDays()}</div>
      </div>

      <div className="grid-calendar__legend">
        <p>Click on event tiles to view details</p>
      </div>
    </div>
  );
};

export default GridCalendar;

export { GridCalendar as CalendarView };
