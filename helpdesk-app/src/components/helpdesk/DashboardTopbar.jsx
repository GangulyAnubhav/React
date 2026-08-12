function DashboardTopbar({ userName }) {
  return (
    <header className="dashboard-topbar">
      <a className="dashboard-logo" href="/" aria-label="DeskPilot">
        <span className="dashboard-logo-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" role="presentation">
            <path d="M5 11.4C5 7.86 8.13 5 12 5s7 2.86 7 6.4v1.85c0 1.08-.9 1.95-2 1.95h-1.15c-.43 1.65-1.94 2.85-3.72 2.85H11v-2h1.13c.86 0 1.59-.55 1.86-1.31a2 2 0 0 1-.99-1.72v-1.54a2 2 0 0 1 2-2h.35c.63 0 1.18.29 1.55.74C16.3 8.34 14.43 7 12 7s-4.3 1.34-4.9 3.22c.37-.45.92-.74 1.55-.74H9a2 2 0 0 1 2 2v1.54a2 2 0 0 1-2 2H7c-1.1 0-2-.87-2-1.95V11.4Z" />
          </svg>
        </span>
        {/*<span>
          Helpdesk
        </span>*/}
      </a>
      <h1>Help Desk</h1>
      <button className="user-menu" type="button">
        {userName}
      </button>
    </header>
  )
}

export default DashboardTopbar
