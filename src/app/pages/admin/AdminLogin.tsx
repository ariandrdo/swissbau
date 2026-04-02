import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Lock, Mail, Eye, EyeOff, Zap } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import { supabase } from "../../../lib/supabase";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { content } = useContent();
  const logo = content.header.logo;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Invalid email or password.");
    } else {
      navigate("/admin/dashboard");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #143348 0%, #143348 50%, #042142 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow blobs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(45, 181, 213, 0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(45, 181, 213, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          background: "rgba(10, 42, 53, 0.85)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(45, 181, 213, 0.25)",
          borderRadius: "24px",
          padding: "2.5rem",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(45, 181, 213, 0.05)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: "1rem" }}
        >
          {logo ? (
            <motion.a
              href="/"
              title="Go to website"
              style={{ display: "inline-block" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ width: "70px", height: "auto", objectFit: "contain", display: "inline-block", cursor: "pointer" }}
              />
            </motion.a>
          ) : (
            <>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "68px",
                  height: "68px",
                  borderRadius: "18px",
                  background: "linear-gradient(135deg, #2db5d5, #3dc5e5)",
                  marginBottom: "1rem",
                  boxShadow: "0 12px 32px rgba(45, 181, 213, 0.45)",
                }}
              >
                <Zap size={34} color="white" fill="white" />
              </div>
              <h1 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>
                Beqiri GmbH
              </h1>
              <p style={{ color: "#2db5d5", fontSize: "0.875rem", marginTop: "0.25rem", margin: "0.25rem 0 0" }}>
                Admin Panel
              </p>
            </>
          )}
        </motion.div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(45, 181, 213, 0.15)",
            marginBottom: "1.75rem",
          }}
        />

        {/* Form */}
        <form onSubmit={handleLogin}>
          {/* Email */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                color: "#a0b4bc",
                fontSize: "0.8125rem",
                fontWeight: 600,
                marginBottom: "0.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <Mail
                size={15}
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#2db5d5",
                }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@jubea.com"
                required
                style={{
                  width: "100%",
                  padding: "0.875rem 1rem 0.875rem 2.75rem",
                  background: "rgba(15, 58, 74, 0.7)",
                  border: "1px solid rgba(45, 181, 213, 0.25)",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "0.9375rem",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(45, 181, 213, 0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(45, 181, 213, 0.25)")}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                color: "#a0b4bc",
                fontSize: "0.8125rem",
                fontWeight: 600,
                marginBottom: "0.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={15}
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#2db5d5",
                }}
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: "100%",
                  padding: "0.875rem 3rem 0.875rem 2.75rem",
                  background: "rgba(15, 58, 74, 0.7)",
                  border: "1px solid rgba(45, 181, 213, 0.25)",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "0.9375rem",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(45, 181, 213, 0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(45, 181, 213, 0.25)")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#a0b4bc",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                background: "rgba(212, 24, 61, 0.12)",
                border: "1px solid rgba(212, 24, 61, 0.35)",
                borderRadius: "10px",
                padding: "0.75rem 1rem",
                color: "#ff6b8a",
                fontSize: "0.875rem",
                marginBottom: "1rem",
              }}
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            whileHover={!loading ? { scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 17 } } : {}}
            whileTap={!loading ? { scale: 0.98, transition: { type: "spring", stiffness: 400, damping: 17 } } : {}}
            style={{
              width: "100%",
              padding: "0.9375rem",
              background: loading
                ? "rgba(45, 181, 213, 0.45)"
                : "linear-gradient(135deg, #2db5d5, #3dc5e5)",
              border: "none",
              borderRadius: "12px",
              color: "white",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading ? "none" : "0 10px 30px rgba(45, 181, 213, 0.35)",
              transition: "all 0.3s ease",
              letterSpacing: "0.02em",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>

        <p
          style={{
            textAlign: "center",
            color: "#4a6670",
            fontSize: "0.75rem",
            marginTop: "1.75rem",
            marginBottom: 0,
          }}
        >
          Beqiri GmbH — Admin Access Only
        </p>
      </div>
    </div>
  );
}
