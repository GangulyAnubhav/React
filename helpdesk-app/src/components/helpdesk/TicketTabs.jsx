const tabs = ['Active', 'Resolved', 'Closed', 'Cancelled']

function TicketTabs() {
  return (
    <div className="ticket-tabs" role="tablist" aria-label="Ticket status">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          type="button"
          role="tab"
          aria-selected={index === 0}
          className={index === 0 ? 'is-active' : ''}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default TicketTabs
