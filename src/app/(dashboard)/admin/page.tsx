"use client";
export default function AdminDashboard() {
  return (
    <>
        <h1 className="page-title">Admin Portal Dashboard</h1>

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
            <input type="text" className="search-bar" placeholder="Search activity..." />
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>User</th>
                            <th>Action</th>
                            <th>Details</th>
                            <th>IP Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>14:32 EST</td>
                            <td>John Doe (MS-INV-4872)</td>
                            <td>Login</td>
                            <td>Successful login</td>
                            <td>192.168.1.100</td>
                        </tr>
                        <tr>
                            <td>14:15 EST</td>
                            <td>Admin User</td>
                            <td>Approved KYC</td>
                            <td>Investor MS-INV-4865</td>
                            <td>10.0.0.50</td>
                        </tr>
                        <tr>
                            <td>13:45 EST</td>
                            <td>Jane Smith (MS-INV-4850)</td>
                            <td>Subscription</td>
                            <td>Real Estate Fund Tranche 3</td>
                            <td>203.0.113.78</td>
                        </tr>
                        <tr>
                            <td>12:20 EST</td>
                            <td>Admin User</td>
                            <td>Uploaded Document</td>
                            <td>Q4 2025 Investor Letter</td>
                            <td>10.0.0.50</td>
                        </tr>
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
