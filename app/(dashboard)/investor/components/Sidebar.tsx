import styles from "../admin.module.css";
import Link from "next/link";

export default function Sidebar() {
  return (
     <nav className="sidebar" id="sidebar">
        <ul className="nav-menu">
            <li><a href="#" className="active">KYC & Accreditation</a></li>
            <li><a href="#">Active Offerings</a></li>
            <li><a href="#">Syndications</a></li>
            <li><a href="#">Subscription Center</a></li>
            <li><a href="#">My Investments</a></li>
            <li><a href="#">Portfolio Summary</a></li>
            <li><a href="#">Performance Analytics</a></li>
            <li><a href="#">Documents & Reports</a></li>
            <li><a href="#">Distributions & Tax</a></li>
            <li><a href="#">Capital Calls</a></li>
            <li><a href="#">Notifications</a></li>
            <li><a href="#">Secure Messaging</a></li>
            <li><a href="#">Webinars & Events</a></li>
            <li><a href="#">Resource Library</a></li>
            <li><a href="#">Support & FAQ</a></li>
        </ul>
    </nav>
  );
}
