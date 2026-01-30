"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
interface SidebarProps {
  collapsed: boolean;
}
export default function Sidebar({ collapsed }: SidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/investor") {
      return pathname === "/investor"
    }
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <nav  id="sidebar" className={collapsed ? "sidebar collapsed" : "sidebar"}>
      <ul className="nav-menu">
        <li>
          <Link href="/investor" className={isActive("/investor") ? "active" : ""}>
            KYC & Accreditation
          </Link>
        </li>

        <li>
          <Link
            href="/investor/active-offering"
            className={isActive("/investor/active-offering") ? "active" : ""}
          >
            Active Offerings
          </Link>
        </li>

        <li>
          <Link
            href="/investor/syndication"
            className={isActive("/investor/syndication") ? "active" : ""}
          >
            Syndications
          </Link>
        </li>

        <li>
          <Link
            href="/investor/subscription-center"
            className={isActive("/investor/subscription-center") ? "active" : ""}
          >
            Subscription Center
          </Link>
        </li>

        <li>
          <Link
            href="/investor/my-investment"
            className={isActive("/investor/my-investment") ? "active" : ""}
          >
            My Investments
          </Link>
        </li>

        <li>
          <Link
            href="/investor/portfolio-summary"
            className={isActive("/investor/portfolio-summary") ? "active" : ""}
          >
            Portfolio Summary
          </Link>
        </li>

        <li>
          <Link
            href="/investor/performance-analytics"
            className={isActive("/investor/performance-analytics") ? "active" : ""}
          >
            Performance Analytics
          </Link>
        </li>

        <li>
          <Link
            href="/investor/documents-reports"
            className={isActive("/investor/documents-reports") ? "active" : ""}
          >
            Documents & Reports
          </Link>
        </li>

        <li>
          <Link
            href="/investor/distributions-tax"
            className={isActive("/investor/distributions-tax") ? "active" : ""}
          >
            Distributions & Tax
          </Link>
        </li>

        <li>
          <Link
            href="/investor/capital-calls"
            className={isActive("/investor/capital-calls") ? "active" : ""}
          >
            Capital Calls
          </Link>
        </li>

        <li>
          <Link
            href="/investor/notifications"
            className={isActive("/investor/notifications") ? "active" : ""}
          >
            Notifications
          </Link>
        </li>

        <li>
          <Link
            href="/investor/secure-messaging"
            className={isActive("/investor/secure-messaging") ? "active" : ""}
          >
            Secure Messaging
          </Link>
        </li>

        <li>
          <Link
            href="/investor/webinars-events"
            className={isActive("/investor/webinars-events") ? "active" : ""}
          >
            Webinars & Events
          </Link>
        </li>

        <li>
          <Link
            href="/investor/resource-library"
            className={isActive("/investor/resource-library") ? "active" : ""}
          >
            Resource Library
          </Link>
        </li>

        <li>
          <Link
            href="/investor/support-faq"
            className={isActive("/investor/support-faq") ? "active" : ""}
          >
            Support & FAQ
          </Link>
        </li>
      </ul>
    </nav>
  )
}
