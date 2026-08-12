import { useMemo, useState } from 'react'
import TicketTabs from './TicketTabs'

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function getCalendarDays(date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const days = []

  for (let index = 0; index < firstDay.getDay(); index += 1) {
    days.push(null)
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    days.push(new Date(year, month, day))
  }

  return days
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

function TicketToolbar({ onCreateTicket }) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [calendarDate, setCalendarDate] = useState(() => new Date())
  const calendarDays = useMemo(() => getCalendarDays(calendarDate), [calendarDate])
  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: 11 }, (_, index) => currentYear - 5 + index)
  }, [])

  function updateCalendarMonth(month) {
    setCalendarDate(
      (currentDate) => new Date(currentDate.getFullYear(), Number(month), 1),
    )
  }

  function updateCalendarYear(year) {
    setCalendarDate(
      (currentDate) => new Date(Number(year), currentDate.getMonth(), 1),
    )
  }

  return (
    <header className="ticket-toolbar">
      <div className="ticket-toolbar-heading">
        <div className="title-row">
          <h2>My Tickets</h2>
          <button className="refresh-button" type="button" aria-label="Refresh tickets">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.65 6.35A7.95 7.95 0 0 0 12 4V1L7 6l5 5V6a6 6 0 1 1-5.18 3H4.68A8 8 0 1 0 17.65 6.35Z" />
            </svg>
          </button>
        </div>

        <label className="ticket-search" htmlFor="ticket-search">
          <input id="ticket-search" type="search" placeholder="Search here" />
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m20.31 18.9-4.25-4.25a6.9 6.9 0 1 0-1.41 1.41l4.25 4.25 1.41-1.41ZM5.5 10.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z" />
          </svg>
        </label>

        <TicketTabs />
      </div>

      <div className="ticket-actions">
        <div className="action-buttons">
          <button type="button">Create Cloud Request</button>
          <button type="button" onClick={onCreateTicket}>
            Create Ticket
          </button>
        </div>

        <div className="date-picker">
          <button
            className="date-button"
            type="button"
            aria-expanded={isCalendarOpen}
            aria-haspopup="dialog"
            onClick={() => setIsCalendarOpen((current) => !current)}
          >
            <span>{selectedDate ? formatDate(selectedDate) : 'Select Date'}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 2h2v2h6V2h2v2h3v18H4V4h3V2Zm11 8H6v10h12V10ZM6 8h12V6H6v2Zm2 4h2v2H8v-2Zm4 0h2v2h-2v-2Zm4 0h2v2h-2v-2Zm-8 4h2v2H8v-2Zm4 0h2v2h-2v-2Z" />
            </svg>
          </button>

          {isCalendarOpen && (
            <div className="calendar-popover" role="dialog" aria-label="Select ticket date">
              <div className="calendar-header">
                <label>
                  <span className="sr-only">Select month</span>
                  <select
                    value={calendarDate.getMonth()}
                    onChange={(event) => updateCalendarMonth(event.target.value)}
                  >
                    {monthNames.map((month, index) => (
                      <option key={month} value={index}>
                        {month}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span className="sr-only">Select year</span>
                  <select
                    value={calendarDate.getFullYear()}
                    onChange={(event) => updateCalendarYear(event.target.value)}
                  >
                    {yearOptions.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="calendar-weekdays" aria-hidden="true">
                {weekDays.map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
              <div className="calendar-grid">
                {calendarDays.map((day, index) =>
                  day ? (
                    <button
                      key={day.toISOString()}
                      type="button"
                      className={
                        selectedDate?.toDateString() === day.toDateString()
                          ? 'is-selected'
                          : ''
                      }
                      onClick={() => {
                        setSelectedDate(day)
                        setIsCalendarOpen(false)
                      }}
                    >
                      {day.getDate()}
                    </button>
                  ) : (
                    <span key={`empty-${index}`} />
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default TicketToolbar
