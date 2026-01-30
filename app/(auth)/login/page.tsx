"use client";

import { useState } from "react";
import Star from "@/components/Star"; 
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "./login.css";

export default function PortalPage() {
    const [activeTab, setActiveTab] = useState<"login" | "register">("login");
    const router = useRouter();

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        const email = (form.email as HTMLInputElement).value;
        const password = (form.password as HTMLInputElement).value;

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            toast.error(data.message || "Login failed");
            return;
        }

        router.push(data.roleId === 2 ? "/admin" : "/investor");
    }

    return (
        <>
            <Star />
            <div style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "100px 2rem 2rem",
            }} >
            <div className="portal-container">
                <div className="auth-logo">Mogul Strategies</div>
                <p className="tagline">Secure Investors Portal</p>

                <div className="tab-buttons">
                    <button
                    className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
                    onClick={() => setActiveTab("login")}
                    >
                    Login
                    </button>
                    <button
                    className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
                    onClick={() => setActiveTab("register")}
                    >
                    Register
                    </button>
                </div>

                {/* Login Tab */}
                {activeTab === "login" && (
                    <div className="tab-content active">
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                        <label htmlFor="login-email">Email Address</label>
                        <input
                            type="email"
                            id="login-email"
                            name="email"
                            required
                            placeholder="your@email.com"
                        />
                        </div>

                        <div className="form-group">
                        <label htmlFor="login-password">Password</label>
                        <input
                            type="password"
                            id="login-password"
                            name="password"
                            required
                            placeholder="••••••••"
                        />
                        </div>

                        <button type="submit" className="submit-btn">
                        Secure Login
                        </button>
                    </form>

                    <a href="#" className="switch-link">
                        Forgot password?
                    </a>
                    </div>
                )}

                {/* Register Tab */}
                {activeTab === "register" && (
                    <div className="tab-content active">
                    <form method="POST">
                        <div className="form-group">
                        <label htmlFor="reg-name">Full Name</label>
                        <input
                            type="text"
                            id="reg-name"
                            name="name"
                            required
                            placeholder="John Doe"
                        />
                        </div>

                        <div className="form-group">
                        <label htmlFor="reg-email">Email Address</label>
                        <input
                            type="email"
                            id="reg-email"
                            name="email"
                            required
                            placeholder="your@email.com"
                        />
                        </div>

                        <div className="form-group">
                        <label htmlFor="reg-password">Password</label>
                        <input
                            type="password"
                            id="reg-password"
                            name="password"
                            required
                            placeholder="Create strong password"
                        />
                        </div>

                        <div className="form-group">
                        <label htmlFor="reg-confirm">Confirm Password</label>
                        <input
                            type="password"
                            id="reg-confirm"
                            name="confirm"
                            required
                            placeholder="Confirm password"
                        />
                        </div>

                        <div className="form-group">
                        <label htmlFor="reg-accredited">
                            Accreditation Status *
                        </label>
                        <select id="reg-accredited" name="accredited" required>
                            <option value="">Select your status...</option>
                            <option value="individual">
                            Accredited Individual Investor
                            </option>
                            <option value="family">Family Office</option>
                            <option value="institution">Institutional Investor</option>
                            <option value="advisor">
                            Registered Investment Advisor
                            </option>
                        </select>
                        </div>

                        <button type="submit" className="submit-btn">
                        Request Access
                        </button>
                    </form>

                    <p className="disclaimer">
                        Registration is subject to verification of accredited investor
                        status per SEC guidelines. You will receive an approval email upon
                        successful verification.
                    </p>
                    </div>
                )}

                <p className="disclaimer" style={{ marginTop: "3rem" }}>
                    For Accredited Investors Only
                    <br />
                    Investments involve risk. Past performance is not indicative of future
                    results.
                </p>
            </div>
            </div>
        </>
    );
}
