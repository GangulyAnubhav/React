import { useState } from 'react'
import CreateTicketForm from './CreateTicketForm'
import DashboardSidebar from './DashboardSidebar'
import DashboardTopbar from './DashboardTopbar'
import EmptyTickets from './EmptyTickets'
import TicketToolbar from './TicketToolbar'

function HelpdeskDashboard() {
  const [currentView, setCurrentView] = useState('tickets')
  const isCreateTicketView = currentView === 'create-ticket'

  return (
    <main className="dashboard-shell">
      <DashboardTopbar userName="Anubhav Ganguly" />
      <div className="dashboard-body">
        <DashboardSidebar />
        <section
          className={isCreateTicketView ? 'tickets-workspace is-form-view' : 'tickets-workspace'}
          aria-label={isCreateTicketView ? 'Create ticket' : 'My tickets'}
        >
          {isCreateTicketView ? (
            <CreateTicketForm onBack={() => setCurrentView('tickets')} />
          ) : (
            <>
              <TicketToolbar onCreateTicket={() => setCurrentView('create-ticket')} />
              <EmptyTickets />
            </>
          )}
        </section>
      </div>
    </main>
  )
}

export default HelpdeskDashboard
