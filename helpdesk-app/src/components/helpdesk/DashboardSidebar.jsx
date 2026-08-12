const navItems = [
  {
    label: 'Tickets',
    icon: (
      <path d="M12 3.5a4 4 0 0 0-4 4v1.1A5.52 5.52 0 0 0 5 13.5V16h2v-2.5a3.5 3.5 0 0 1 7 0V16h2v-2.5a5.52 5.52 0 0 0-3-4.9V7.5a4 4 0 0 0-4-4Zm0 2a2 2 0 0 1 2 2v.45a5.46 5.46 0 0 0-4 0V7.5a2 2 0 0 1 2-2ZM6 18h12v2H6v-2Z" />
    ),
    active: true,
  },
  {
    label: 'FAQ',
    icon: (
      <path d="M12 3.75a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5Zm0 2a6.25 6.25 0 1 1 0 12.5 6.25 6.25 0 0 1 0-12.5Zm-.15 8.3h1.8v1.8h-1.8v-1.8Zm.18-6.05c1.74 0 3.02.99 3.02 2.48 0 1.04-.55 1.67-1.35 2.18-.55.35-.79.58-.81 1.08h-1.65c.02-.95.38-1.44 1.13-1.94.64-.42.91-.71.91-1.23 0-.58-.48-.98-1.25-.98-.8 0-1.31.42-1.39 1.14H8.95C9.08 9.12 10.28 8 12.03 8Z" />
    ),
  },
  {
    label: 'About',
    icon: (
      <path d="M12 3.75a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5Zm0 2a6.25 6.25 0 1 1 0 12.5 6.25 6.25 0 0 1 0-12.5Zm-1 5.45h2v5.05h-2V11.2Zm0-3.15h2v1.9h-2v-1.9Z" />
    ),
  },
]

function DashboardSidebar() {
  return (
    <aside className="dashboard-sidebar" aria-label="Helpdesk navigation">
      <button className="sidebar-toggle" type="button" aria-label="Toggle navigation">
        <span />
        <span />
        <span />
      </button>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <a
            className={item.active ? 'sidebar-link is-active' : 'sidebar-link'}
            href="/"
            key={item.label}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {item.icon}
            </svg>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  )
}

export default DashboardSidebar
