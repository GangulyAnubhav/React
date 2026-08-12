function EmptyTickets() {
  return (
    <section className="tickets-empty-state" aria-live="polite">
      <h2>No Tickets Raised Yet</h2>
      <p>Click on create ticket button to raise a ticket</p>
    </section>
  )
}

export default EmptyTickets
