import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Star from "@/components/Star";
import "./admin.css";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div >
        <Star />
        <Sidebar />
        <main >
            {children}
        </main>
        <Footer />
    </div>
  );
}
