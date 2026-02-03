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
    name: "User Verification",
    href: "/investors/kyc1",
    match: (pathname) => pathname.startsWith("/investors/kyc"),
  },
  { name: "Performance Analytics", href: "/investors/performanceanalytics" },
  { name: "Active Offerings", href: "/investors/activeofferings" },
  { name: "Syndications", href: "/investors/syndications" },
  { name: "Mogul Financial AI", href: "/investors/financial" },
  { name: "Subscription Center", href: "/investors/subscriptioncenter" },
  // { name: "My Investments", href: "/investors/myinvestments" },
  // { name: "Portfolio Summary", href: "/investors/portfoliosummary" },
  // { name: "Documents & Reports", href: "/investors/docsreports" },
  // { name: "Distributions & Tax", href: "/investors/distributionstax" },
  // { name: "Capital Calls", href: "/investors/capitalcalls" },
  // { name: "Notifications", href: "/investors/notifications" },
  // { name: "Secure Messaging", href: "/investors/securemessaging" },
  // { name: "Webinars & Events", href: "/investors/events" },
  // { name: "Resource Library", href: "/investors/resourcelibrary" },
  { name: "Support & FAQ", href: "/investors/supportfaq" },
];

 const userMenuItems = [
        { label: "Portfolio Overview", href: "/investors/portfoliosummary" },
        { label: "My Calendar", href: "/investors/events" },
        { label: "My Investments", href: "/investors/myinvestments" },
        { label: "Capital Calls", href: "/investors/capitalcalls" },
        { label: "Statements & Reports", href: "/investors/docsreports" },
        { label: "Distributions & Tax", href: "/investors/distributionstax" },
        { label: "Files & Media", href: "/investors/resourcelibrary" },
        { label: "Account Settings", href: "/investors/usersettings" },
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
