import React from 'react';

export default function AdminDashboardPage() {
    const recentActivities = [
        { time: '14:32 EST', user: 'John Doe (MS-INV-4872)', action: 'Login', details: 'Successful login', ip: '192.168.1.100' },
        { time: '14:15 EST', user: 'Admin User', action: 'Approved KYC', details: 'Investor MS-INV-4865', ip: '10.0.0.50' },
        { time: '13:45 EST', user: 'Jane Smith (MS-INV-4850)', action: 'Subscription', details: 'Real Estate Fund Tranche 3', ip: '203.0.113.78' },
        { time: '12:20 EST', user: 'Admin User', action: 'Uploaded Document', details: 'Q4 2025 Investor Letter', ip: '10.0.0.50' },
    ];

    return (
        <>
            <h1 className="section-title">Admin Portal Dashboard</h1>

            {/* Platform Overview */}
            <section className="stats-grid-portal">
                <div className="stat-card">
                    <div className="stat-value">1,248</div>
                    <div className="stat-label">Total Investors</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">842</div>
                    <div className="stat-label">Verified Users</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">$1.84B</div>
                    <div className="stat-label">Assets Under Management</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">6</div>
                    <div className="stat-label">Active Funds</div>
                </div>
            </section>

            {/* Main Action Grid */}
            <section className="top-row">
                <div className="top-card">
                    <h3>Pending Actions</h3>
                    <ul className="account-info-card">
                        <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>KYC Reviews Pending</span>
                            <span style={{ color: '#D4AF37', fontWeight: 'bold' }}>12</span>
                        </li>
                        <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Accreditation Submissions</span>
                            <span style={{ color: '#D4AF37', fontWeight: 'bold' }}>8</span>
                        </li>
                        <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Capital Call Responses</span>
                            <span style={{ color: '#D4AF37', fontWeight: 'bold' }}>23</span>
                        </li>
                        <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Support Tickets</span>
                            <span style={{ color: '#D4AF37', fontWeight: 'bold' }}>5</span>
                        </li>
                        <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Document Approvals</span>
                            <span style={{ color: '#D4AF37', fontWeight: 'bold' }}>3</span>
                        </li>
                    </ul>
                </div>

                <div className="top-card">
                    <h3>System Status</h3>
                    <ul className="account-info-card">
                        <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Portal Status</span>
                            <span style={{ color: '#00ffcc', fontWeight: 'bold' }}>Online</span>
                        </li>
                        <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Database Connection</span>
                            <span style={{ color: '#00ffcc', fontWeight: 'bold' }}>Healthy</span>
                        </li>
                        <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Email Service</span>
                            <span style={{ color: '#00ffcc', fontWeight: 'bold' }}>Active</span>
                        </li>
                        <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>API Latency</span>
                            <span style={{ color: '#00ffcc', fontWeight: 'bold' }}>24ms</span>
                        </li>
                        <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Last Backup</span>
                            <span style={{ color: '#AAAAAA' }}>2 hours ago</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Recent Activity Log */}
            <section className="lower-card">
                <h3>Recent Activity Log</h3>
                <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
                    <input type="text" placeholder="Search activity..." style={{
                        flex: 1, padding: '0.8rem', background: '#0A1A2F', border: '1px solid #D4AF37', borderRadius: '8px', color: '#E0E0E0'
                    }} />
                    <button style={{
                        padding: '0.8rem 1.5rem', background: '#D4AF37', color: '#0A1A2F', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'
                    }}>Filter</button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                        <thead>
                            <tr style={{ background: 'rgba(212, 175, 55, 0.1)', color: '#D4AF37' }}>
                                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>Time</th>
                                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>User</th>
                                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>Action</th>
                                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>Details</th>
                                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>IP Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentActivities.map((activity, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.1)' }}>
                                    <td style={{ padding: '1rem' }}>{activity.time}</td>
                                    <td style={{ padding: '1rem' }}>{activity.user}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.9rem',
                                            background: activity.action === 'Login' ? 'rgba(0, 255, 204, 0.1)' :
                                                activity.action === 'Approved KYC' ? 'rgba(212, 175, 55, 0.1)' :
                                                    'rgba(255, 255, 255, 0.1)',
                                            color: activity.action === 'Login' ? '#00ffcc' :
                                                activity.action === 'Approved KYC' ? '#D4AF37' : '#E0E0E0'
                                        }}>
                                            {activity.action}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', color: '#AAAAAA' }}>{activity.details}</td>
                                    <td style={{ padding: '1rem', fontFamily: 'monospace' }}>{activity.ip}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}

