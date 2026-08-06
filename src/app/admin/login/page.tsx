"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

// ──────────────────────────────────────────────────────────────
// /admin/login  — Premium glassmorphism login page for admin
// ──────────────────────────────────────────────────────────────

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.replace("/admin");
      } else {
        const data = await res.json();
        setError(data.error ?? "Invalid password");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        .admin-login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #080b14;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Ambient glow orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
          pointer-events: none;
          animation: floatOrb 8s ease-in-out infinite alternate;
        }
        .orb-1 { width: 500px; height: 500px; background: #6366f1; top: -120px; left: -150px; animation-delay: 0s; }
        .orb-2 { width: 400px; height: 400px; background: #8b5cf6; bottom: -100px; right: -100px; animation-delay: -3s; }
        .orb-3 { width: 300px; height: 300px; background: #06b6d4; top: 50%; left: 60%; animation-delay: -5s; }

        @keyframes floatOrb {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(20px, -20px) scale(1.05); }
        }

        /* Glass card */
        .glass-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 420px;
          margin: 1.5rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 24px;
          padding: 2.5rem;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Logo/badge */
        .brand-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 2rem;
        }
        .brand-icon {
          width: 42px; height: 42px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
          box-shadow: 0 4px 15px rgba(99,102,241,0.4);
        }
        .brand-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.02em;
        }
        .brand-sub {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-top: 1px;
        }

        h1.login-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.03em;
          margin: 0 0 0.4rem;
        }
        .login-subtitle {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.4);
          margin: 0 0 2rem;
        }

        /* Form */
        .form-group { margin-bottom: 1.25rem; }
        .form-label {
          display: block;
          font-size: 0.78rem;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          margin-bottom: 0.5rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: #fff;
          font-size: 0.95rem;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .form-input:focus {
          border-color: rgba(99,102,241,0.7);
          background: rgba(99,102,241,0.08);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.2);
        }
        .form-input::placeholder { color: rgba(255,255,255,0.2); }

        /* Error */
        .error-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.3);
          border-radius: 10px;
          padding: 0.65rem 0.9rem;
          font-size: 0.83rem;
          color: #f87171;
          margin-bottom: 1.25rem;
          animation: shake 0.3s ease;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25%       { transform: translateX(-5px); }
          75%       { transform: translateX(5px); }
        }

        /* Submit button */
        .submit-btn {
          width: 100%;
          padding: 0.85rem;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-size: 0.95rem;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(99,102,241,0.4);
          position: relative;
          overflow: hidden;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 25px rgba(99,102,241,0.55);
        }
        .submit-btn:active:not(:disabled) { transform: translateY(1px); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .spinner {
          display: inline-block;
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .footer-note {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.2);
        }
      `}</style>

      <div className="admin-login-root">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="glass-card">
          <div className="brand-badge">
            <div className="brand-icon">📸</div>
            <div>
              <div className="brand-name">PixelCam</div>
              <div className="brand-sub">Admin Console</div>
            </div>
          </div>

          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">Enter your admin password to continue.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="admin-password">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                className="form-input"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="error-box" role="alert">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <button
              id="admin-login-submit"
              type="submit"
              className="submit-btn"
              disabled={loading || !password}
            >
              {loading && <span className="spinner" />}
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="footer-note">
            Access restricted to authorized personnel only.
          </p>
        </div>
      </div>
    </>
  );
}
