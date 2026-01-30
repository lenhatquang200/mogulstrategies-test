import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Star from "@/components/Star";
import { SessionProvider } from "next-auth/react";
import "./admin.css";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <SessionProvider>
      <div >
          <Star />
          <Sidebar />
          <main >
              {children}
          </main>
          <Footer />
      </div>
    </SessionProvider>
  );
}
