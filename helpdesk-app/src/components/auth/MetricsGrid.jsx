function MetricsGrid({ metrics }) {
  return (
    <div className="status-grid" aria-label="Service desk metrics">
      {metrics.map((metric) => (
        <article key={metric.label}>
          <span>{metric.value}</span>
          <p>{metric.label}</p>
        </article>
      ))}
    </div>
  )
}

export default MetricsGrid
