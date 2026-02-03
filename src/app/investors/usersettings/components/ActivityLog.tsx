import type { ActivityLogItem } from '@/types/activity';

interface ActivityLogProps {
  logs: ActivityLogItem[];
  onViewAll?: () => void;
}

const ActivityLog = ({ logs, onViewAll }: ActivityLogProps) => {
  return (
    <div
      className="settings-card"
      style={{ background: '#112240', borderRadius: '16px', padding: '2.5rem' }}
    >
      <h3
        style={{
          fontSize: '2rem',
          color: '#D4AF37',
          marginBottom: '1.5rem',
          borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
          paddingBottom: '0.8rem',
        }}
      >
        Account Activity & Login History
      </h3>

      <p style={{ color: '#AAAAAA', marginBottom: '1.5rem' }}>
        Recent login and activity tracking (IP addresses logged for security)
      </p>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr
              style={{
                background: 'rgba(212, 175, 55, 0.1)',
                color: '#D4AF37',
              }}
            >
              <th style={{ padding: '1.2rem', textAlign: 'left' }}>
                Date & Time
              </th>
              <th style={{ padding: '1.2rem', textAlign: 'left' }}>
                Activity
              </th>
              <th style={{ padding: '1.2rem', textAlign: 'left' }}>
                IP Address
              </th>
              <th style={{ padding: '1.2rem', textAlign: 'left' }}>
                Location
              </th>
              <th style={{ padding: '1.2rem', textAlign: 'left' }}>
                Device
              </th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log, i) => (
              <tr
                key={i}
                style={{
                  borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                }}
              >
                <td style={{ padding: '1.2rem' }}>{log.date}</td>
                <td style={{ padding: '1.2rem' }}>{log.activity}</td>
                <td style={{ padding: '1.2rem' }}>{log.ip}</td>
                <td style={{ padding: '1.2rem' }}>{log.location}</td>
                <td style={{ padding: '1.2rem' }}>{log.device}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        style={{
          background: 'none',
          border: 'none',
          color: '#D4AF37',
          display: 'block',
          margin: '1.5rem auto 0',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
        onClick={onViewAll}
      >
        View Full Activity Log →
      </button>
    </div>
  );
};

export default ActivityLog;
