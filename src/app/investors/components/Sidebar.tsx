"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  name: string;
  href: string;
  match?: (pathname: string) => boolean;
};

const navItems: NavItem[] = [
  {
    name: "Verification",
    href: "/investors/kyc1",
    match: (pathname) => pathname.startsWith("/investors/kyc"),
  },
  { name: "Active Offerings", href: "/investors/activeofferings" },
  { name: "Syndications", href: "/investors/syndications" },
  { name: "Subscription Center", href: "/investors/subscriptioncenter" },
  { name: "My Investments", href: "/investors/myinvestments" },
  { name: "Portfolio Summary", href: "/investors/portfoliosummary" },
  { name: "Performance Analytics", href: "/investors/performanceanalytics" },
  { name: "Documents & Reports", href: "/investors/docsreports" },
  { name: "Distributions & Tax", href: "/investors/distributionstax" },
  { name: "Capital Calls", href: "/investors/capitalcalls" },
  { name: "Notifications", href: "/investors/notifications" },
  { name: "Secure Messaging", href: "/investors/securemessaging" },
  { name: "Webinars & Events", href: "/investors/events" },
  { name: "Resource Library", href: "/investors/resourcelibrary" },
  { name: "Support & FAQ", href: "/investors/supportfaq" },
];

type Props = {
  isSidebarOpen: boolean;
};

export function Sidebar({ isSidebarOpen }: Props) {
  const pathname = usePathname();

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "" : "collapsed"}`}
      id="sidebar"
    >
      <ul className="nav-menu">
        {navItems.map((item) => {
          const isActive = item.match
            ? item.match(pathname)
            : pathname === item.href;

          return (
            <li key={item.href}>
              <Link href={item.href} className={isActive ? "active" : ""}>
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
