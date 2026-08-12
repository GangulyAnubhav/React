import BrandMark from './BrandMark'
import MetricsGrid from './MetricsGrid'

const metrics = [
  { value: '92%', label: 'SLA compliance' },
  { value: '18m', label: 'Median first response' },
  { value: '24/7', label: 'Queue monitoring' },
]

function BrandPanel({
  appName = 'Helpdesk',
  supportHref = 'mailto:support@helpdesk.com',
  eyebrow = 'Helpdesk operations',
  title = 'Support teams start their day here.',
  description = 'Manage tickets, SLAs, escalations, and customer conversations from a calm workspace built for fast-moving service desks.',
}) {
  return (
    <section className="brand-panel" aria-label="Helpdesk overview">
      <nav className="brand-nav" aria-label="Product">
        <BrandMark name={appName} />
        <a className="nav-link" href={supportHref}>
          Contact support
        </a>
      </nav>

      <div className="brand-content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="brand-copy">{description}</p>
      </div>

      <MetricsGrid metrics={metrics} />
    </section>
  )
}

export default BrandPanel
