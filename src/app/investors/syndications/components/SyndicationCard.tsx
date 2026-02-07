export type SyndicationTerm = {
  label: string
  value: string
  highlight?: boolean
}

export type SyndicationRaise = {
  min: string
  target: string
  committed: string
  progressPercent: number
}

export type SyndicationAction = {
  key: string
  label: string
}

export type Syndication = {
  id: string
  title: string
  subtitle: string
  status: string
  typeBadge: string
  raise: SyndicationRaise
  terms: SyndicationTerm[]
  actions: SyndicationAction[]
}


export default function SyndicationCard({ deal }: { deal: Syndication }) {
  return (
    <div className="syndication-card">
      <div className="card-header">
        <h2>{deal.title}</h2>
        <div className="subtitle">{deal.subtitle}</div>
        <div className="header-meta">
          <div className="status-pill">{deal.status}</div>
          <div className="type-badge">{deal.typeBadge}</div>
        </div>
      </div>

      <div className="progress-section">
        <div className="raise-targets">
          <span>Min Raise: {deal.raise.min}</span>
          <span>Target Raise: {deal.raise.target}</span>
        </div>

        <div className="progress-bar-container">
          <div
            className="syndication-progress-bar"
            style={{ width: `${deal.raise.progressPercent}%` }}
          />
        </div>

        <div className="progress-status">
          {deal.raise.committed} ({deal.raise.progressPercent}%)
        </div>
      </div>

      <div className="key-terms">
        {deal.terms.map((term, i) => (
          <div key={i} className="term-item">
            <div className="term-label">{term.label}</div>
            <div
              className={`term-value ${term.highlight ? "highlight" : ""}`}
            >
              {term.value}
            </div>
          </div>
        ))}
      </div>

      <div className="cta-section">
        {deal.actions.map((action, i) => (
          <button key={i} className={`cta-btn btn-${action.key}`}>
            {action.label}
          </button>
        ))}
      </div>
    </div>
  )
}
