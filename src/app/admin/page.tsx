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
            <h1 className="page-title" style={{ fontSize: '3.2rem', color: '#D4AF37', textAlign: 'center', margin: '2rem 0 3rem' }}>Admin Portal Dashboard</h1>

            <section className="admin-grid">
                <div className="admin-card">
                    <h3>Platform Overview</h3>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-value">1,248</div>
                            <div className="stat-label">Total Investors</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">842</div>
                            <div className="stat-label">Verified Users</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">$1.84B</div>
                            <div className="stat-label">AUM</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">6</div>
                            <div className="stat-label">Active Funds</div>
                        </div>
                    </div>
                </div>

                <div className="admin-card">
                    <h3>Pending Actions</h3>
                    <ul className="action-list">
                        <li><span>KYC Reviews Pending</span> <span className="action-btn">12</span></li>
                        <li><span>Accreditation Submissions</span> <span className="action-btn">8</span></li>
                        <li><span>Capital Call Responses</span> <span className="action-btn">23</span></li>
                        <li><span>Support Tickets</span> <span className="action-btn">5</span></li>
                        <li><span>Document Approvals</span> <span className="action-btn">3</span></li>
                    </ul>
                </div>
            </section>

            <section className="admin-card">
                <h3>Recent Activity Log</h3>
                <input type="text" className="search-bar" placeholder="Search activity..." style={{
                    width: '100%', padding: '1rem', background: '#0A1A2F', border: '1px solid #D4AF37', borderRadius: '8px', color: '#E0E0E0', marginBottom: '2rem'
                }} />
                <div className="table-container" style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
                                <tr key={idx}>
                                    <td style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>{activity.time}</td>
                                    <td style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>{activity.user}</td>
                                    <td style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>{activity.action}</td>
                                    <td style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>{activity.details}</td>
                                    <td style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>{activity.ip}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="admin-grid">
                <div className="admin-card">
                    <h3>Compliance Queue</h3>
                    <ul className="action-list">
                        <li><span>Pending Accreditation Reviews</span> <span className="action-btn">8</span></li>
                        <li><span>Suspicious Login Attempts</span> <span className="action-btn">2</span></li>
                        <li><span>Document Verification Needed</span> <span className="action-btn">5</span></li>
                        <li><span>AML Flags</span> <span className="action-btn">0</span></li>
                    </ul>
                </div>

                <div className="admin-card">
                    <h3>System Controls</h3>
                    <ul className="action-list">
                        <li><span>Portal Status</span> <span className="action-btn">Online</span></li>
                        <li><span>Maintenance Mode</span> <span className="action-btn">Off</span></li>
                        <li><span>Email Delivery</span> <span className="action-btn">Normal</span></li>
                        <li><span>API Status</span> <span className="action-btn">Healthy</span></li>
                    </ul>
                </div>
            </section>
        </>
    );
}
