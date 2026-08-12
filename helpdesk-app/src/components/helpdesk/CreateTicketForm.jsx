import { useState } from 'react'

function CreateTicketForm({ onBack }) {
  const [isForOthers, setIsForOthers] = useState(false)

  return (
    <div className="create-ticket-page">
      <header className="create-ticket-header">
        <div className="create-ticket-title">
          <button className="back-button" type="button" onClick={onBack} aria-label="Back to tickets">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14.7 5.3 8 12l6.7 6.7-1.4 1.4L5.2 12l8.1-8.1 1.4 1.4Z" />
            </svg>
          </button>
          <h2>Create Ticket</h2>
        </div>

        <label className="ticket-owner-toggle">
          <span>{isForOthers ? 'For Others' : 'For Myself'}</span>
          <input
            type="checkbox"
            checked={isForOthers}
            onChange={(event) => setIsForOthers(event.target.checked)}
          />
          <span className="toggle-track" aria-hidden="true" />
        </label>
      </header>

      <form className="create-ticket-form">
        <div className="ticket-form-grid">
          <div className="ticket-form-column">
            <label className="ticket-field" htmlFor="ticket-title">
              Title <span>*</span>
              <input
                id="ticket-title"
                name="title"
                type="text"
                placeholder="Highlight your issue in 4-5 words."
                required
              />
            </label>

            <label className="ticket-field" htmlFor="ticket-description">
              Description <span>*</span>
              <textarea
                id="ticket-description"
                name="description"
                placeholder="Write a short description of your issue."
                required
              />
            </label>

            <label className="ticket-field" htmlFor="ticket-priority">
              Priority Details <span>*</span>
              <select id="ticket-priority" name="priority" required defaultValue="">
                <option value="" disabled>
                  Select Priority
                </option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </label>

            {isForOthers && (
              <label className="ticket-field" htmlFor="ticket-member">
                Create on behalf <span>*</span>
                <select id="ticket-member" name="member" required defaultValue="">
                  <option value="" disabled>
                    Find Member
                  </option>
                  <option value="anubhav">Anubhav Ganguly</option>
                  <option value="support-agent">Support Agent</option>
                </select>
              </label>
            )}
          </div>

          <div className="ticket-form-column">
            <label className="ticket-field" htmlFor="ticket-team">
              Team Details <span>*</span>
              <select id="ticket-team" name="team" required defaultValue="technical-support">
                <option value="technical-support">Technical Support</option>
                <option value="it-operations">IT Operations</option>
                <option value="network">Network</option>
              </select>
            </label>

            <label className="ticket-field" htmlFor="ticket-category">
              Category Details <span>*</span>
              <select id="ticket-category" name="category" required defaultValue="">
                <option value="" disabled>
                  Select Category
                </option>
                <option value="hardware">Hardware</option>
                <option value="software">Software</option>
                <option value="access">Access Request</option>
                <option value="cloud">Cloud Services</option>
              </select>
            </label>
          </div>
        </div>

        <div className="ticket-form-footer">
          <label className="attachment-field" htmlFor="ticket-attachment">
            <span>Attachment Upload :</span>
            <span className="attachment-box">
              <span>There is no file.</span>
              <span className="upload-link">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 18.5A5 5 0 0 1 7 8.5h.55A6 6 0 0 1 19 10.9 4.05 4.05 0 0 1 18 19h-5v-2h5a2.05 2.05 0 0 0 .2-4.09l-1.05-.1-.13-1.05A4 4 0 0 0 9.18 10l-.32.66-.73-.09A3 3 0 0 0 7 16.5h3v2H7Zm6-6.09 3.3 3.3-1.42 1.41L14 16.24V21h-2v-4.76l-.88.88-1.42-1.41 3.3-3.3Z" />
                </svg>
                Upload file
              </span>
            </span>
            <input id="ticket-attachment" name="attachment" type="file" />
          </label>

          <button className="submit-ticket-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTicketForm
