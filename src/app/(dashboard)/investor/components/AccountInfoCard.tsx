type AccountInfo = {
  name: string;
  email: string;
  investorType: string;
  accountId: string;
  joined: string;
  lastLogin: string;
};

export default function AccountInfoCard({
  name,
  email,
  investorType,
  accountId,
  joined,
  lastLogin,
}: AccountInfo) {
  return (
    <div className="top-card account-info-card">
      <h3>Account Information</h3>
      <ul>
        <li>
          <strong>Name:</strong> {name}
        </li>
        <li>
          <strong>Email:</strong> {email}
        </li>
        <li>
          <strong>Investor Type:</strong> {investorType}
        </li>
        <li>
          <strong>Account ID:</strong> {accountId}
        </li>
        <li>
          <strong>Joined:</strong> {joined}
        </li>
        <li>
          <strong>Last Login:</strong> {lastLogin}
        </li>
      </ul>
    </div>
  );
}
