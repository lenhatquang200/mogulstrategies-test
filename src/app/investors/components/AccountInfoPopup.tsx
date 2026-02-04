"use client"
import Link from "next/link";
import type { ProfileData } from "@/types/user";
import LoadingOverlay from "@/components/LoadingOverlay";

interface AccountInfoPopupProps {
  data?: ProfileData | null;
  loading?: boolean
  onClose: () => void;
}

const AccountInfoPopup = ({ data, loading, onClose }: AccountInfoPopupProps) => {
  return (
    <div className="top-card account-info-card">
      <LoadingOverlay show={loading} />
      <div className="flex items-start justify-between mb-4">
        <h3>Account Information</h3>

        <div className="flex gap-2">
          <Link onClick={onClose}
            href="/investors/usersettings#account-details"
            className="account-action-btn"
          >
            Edit
          </Link>

          <Link onClick={onClose}
            href="/investors/usersettings#user-preferences"
            className="account-action-btn"
          >
            Settings
          </Link>
        </div>
      </div>
      <ul>
        <li><strong>Name:</strong> {data?.name}</li>
        <li><strong>Email:</strong> {data?.email}</li>
        {/* <li><strong>Role:</strong> {data.role}</li> */}
        <li><strong>Account ID:</strong> {data?.userCode}</li>
        <li><strong>Investor Type:</strong> {data?.investorType}</li>
        <li><strong>Joined:</strong> {data?.joined}</li>
        <li><strong>Last Login:</strong> {data?.lastLogin ?? "-"}</li>
      </ul>
    </div>
  );
};

export default AccountInfoPopup;
