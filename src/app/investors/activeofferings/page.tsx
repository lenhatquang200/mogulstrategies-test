'use client';
import "./offering.css";
import Countdown from './components/Countdown';

export default function ActiveOfferingsPage() {
    const offerings = [
        {
            title: 'Mogul Real Estate Fund – Tranche 3',
            status: 'Open',
            targetSize: '$50M',
            minCommitment: '$250,000',
            focus: 'Income-producing multifamily properties in premium Gulf regions',
            projectedIRR: '12–15%',
            closingDate: 'January 31, 2026',
            raised: '$28M (56%)',
            actions: ['View Deck', 'Read Memorandum', 'Subscribe Now', 'Wire Details', 'Deposit Funds'],
            analytics: [
                { label: 'Total Shares', value: '200,000' },
                { label: 'Price/Share', value: '$250' },
                { label: 'Subscriptions', value: '47' },
            ],
        },
        {
            title: 'Mogul Technologies Fund II',
            status: 'Open',
            targetSize: '$75M',
            minCommitment: '$500,000',
            focus: 'High-growth AI, quantum computing, and deep tech ventures',
            projectedIRR: '3–5x (Multiple)',
            closingDate: 'February 28, 2026',
            raised: '$42M (56%)',
            actions: ['View Deck', 'Read Memorandum', 'Subscribe Now', 'Wire Details'],
            analytics: [
                { label: 'Total Units', value: '150,000' },
                { label: 'Price/Unit', value: '$500' },
                { label: 'Subscriptions', value: '47' },
            ],
        },
        {
            title: 'Creative Arts Fund – Series B',
            status: 'Open',
            targetSize: '$30M',
            minCommitment: '$100,000',
            focus: 'Motion picture production and entertainment IP',
            projectedIRR: '18–25%',
            closingDate: 'March 15, 2026',
            raised: '$12M (40%)',
            actions: ['View Deck', 'Read Memorandum', 'Subscribe Now', 'Wire Details'],
            analytics: [
                { label: 'Total Shares', value: '300,000' },
                { label: 'Price/Share', value: '$100' },
                { label: 'Subscriptions', value: '64' },
            ],
        },
        {
            title: 'Mogul Digital Fund – Final Close',
            status: 'Closed',
            targetSize: '$100M',
            statusText: 'Fully subscribed and closed',
            closedDate: 'October 2025',
            actions: ['Archived Memorandum', 'Fund Stats'],
            analytics: [
                { label: 'Total Shares', value: '333,333' },
                { label: 'Price/Share', value: '$300' },
                { label: 'Subscriptions', value: '89' },
            ],
        }
    ];

    const handleAction = (offering: any, action: any) => {
        console.log(offering.title, action);
        alert('developing...');
    };

    const extractPercent = (raised?: string) => {
        if (!raised) return '0%';
        const match = raised.match(/(\d+)%/);
        return match ? `${match[1]}%` : '0%';
    };

    return (
        <>
            <h1 className="page-title">Active Offerings</h1>

            <section className="offerings-grid">

                {offerings.map((offering, idx) => (
                    <div
                        key={idx}
                        className="offering-card"
                        id={`card-${idx}`}
                    >
                        <div className="card-inner">

                        <div className="progress-section">
                            <div className="progress-labels">
                            <span>$0</span>
                            <span>{offering.raised}</span>
                            </div>

                            <div className="progress-bar-container">
                            <div
                                className="progress-bar"
                                style={{ width: extractPercent(offering.raised) }}
                            />
                            </div>

                            <div className="markers">
                            <div className="marker" style={{ left: '40%' }}>
                                Min {offering.minCommitment}
                            </div>
                            <div className="marker" style={{ left: '100%' }}>
                                Target {offering.targetSize}
                            </div>
                            </div>
                        </div>

                        {/* Header */}
                        <div className="header-row">
                            <div className="title-group">
                            <h2>{offering.title}</h2>
                            <div className="subtitle">{offering.focus}</div>
                            </div>

                            <span
                            className={`status-pill ${
                                offering.status === 'Open' ? 'status-open' : 'status-closed'
                            }`}
                            >
                            {offering.status}
                            </span>
                        </div>

                        {/* Details */}
                        <div className="details-grid">
                            <div className="detail-item">
                            <strong>Target Size</strong> {offering.targetSize}
                            </div>

                            <div className="detail-item">
                            <strong>Min Commitment</strong> {offering.minCommitment}
                            </div>

                            <div className="detail-item">
                            <strong>Focus</strong> {offering.focus}
                            </div>

                            {offering.projectedIRR && (
                            <div className="detail-item">
                                <strong>Projected IRR</strong>{' '}
                                <span style={{ color: '#d4af37' }}>
                                {offering.projectedIRR}
                                </span>
                            </div>
                            )}

                            {offering.closedDate ? (
                                <div className="detail-item">
                                    <strong>Closed</strong> {offering.closedDate}
                                    <span className="countdown closed">(Closed)</span>
                                </div>
                                ) : offering.closingDate && (
                                <div className="detail-item">
                                    <strong>Closing Date</strong> {offering.closingDate}
                                    <Countdown closingDate={offering.closingDate} />
                                </div>
                            )}
                            
                        </div>

                        {/* Analytics */}
                        {offering.analytics && (
                            <div className="analytics-grid">
                            {offering.analytics.map((a) => (
                                <div key={a.label} className="analytics-card">
                                <h4>{a.label}</h4>
                                <div className="value">{a.value}</div>
                                </div>
                            ))}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="actions-grid">
                            {offering.actions.map((action) => (
                            <button
                                key={action}
                                className={`btn ${
                                action.includes('Subscribe')
                                    ? 'btn-subscribe'
                                    : action.includes('Wire')
                                    ? 'btn-wire'
                                    : action.includes('Deposit')
                                    ? 'btn-deposit'
                                    : 'btn-view'
                                }`}
                                onClick={() => handleAction(offering, action)}
                            >
                                {action}
                            </button>
                            ))}
                        </div>

                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}
