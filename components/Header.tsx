import Link from "next/link";
import Star from "@/components/Star"; 

export default function Header() {
  return (
    <>
    <Star />
    <header>
      <div className="container">
        <nav>
          <Link href="/" className="logo">
            Mogul Strategies
          </Link>

          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/strategies">Strategies</Link>
            <Link href="/funds">Our Funds</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <Link href="/login" className="cta-button">
            Investors Portal
          </Link>
        </nav>
      </div>
    </header>
    </>
  );
}
