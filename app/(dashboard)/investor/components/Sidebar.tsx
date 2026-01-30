"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/investor") {
      return pathname === "/investor"
    }
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <nav className="sidebar" id="sidebar">
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
  )
}
