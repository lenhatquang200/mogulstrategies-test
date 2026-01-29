import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Star from "@/components/Star";
import "./investor.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
        <Star />
        <Header />
        <Sidebar />
        <main id="main-content">
            {children}
        </main>
        <Footer />
    </div>
  );
}
