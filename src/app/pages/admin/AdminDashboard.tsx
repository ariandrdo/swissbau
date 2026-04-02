import { MessageSquare, Package, Image, TrendingUp, Clock, ArrowUpRight, Home, Wrench, ExternalLink } from "lucide-react";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";

type RecentMsg = { id: number; name: string; subject: string; date: string; status: string };

export function AdminDashboard() {
  const [msgCount, setMsgCount] = useState(0);
  const [unread, setUnread] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [galleryCount, setGalleryCount] = useState(0);
  const [recentMessages, setRecentMessages] = useState<RecentMsg[]>([]);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    Promise.all([
      supabase.from("contact_messages").select("id, name, subject, status, created_at").order("created_at", { ascending: false }),
      supabase.from("admin_deleted_messages").select("message_id"),
      supabase.from("admin_read_messages").select("message_id"),
      supabase.from("products").select("id", { count: "exact" }),
      supabase.from("gallery_images").select("id", { count: "exact" }),
    ]).then(([{ data: msgs }, { data: deleted }, { data: read }, { count: products }, { count: gallery }]) => {
      const deletedIds = new Set([
        ...(deleted ?? []).map((d) => d.message_id),
        ...(() => { try { return JSON.parse(localStorage.getItem("jubea_deleted_msgs") || "[]"); } catch { return []; } })(),
      ]);
      const readIds = new Set([
        ...(read ?? []).map((r) => r.message_id),
        ...(() => { try { return JSON.parse(localStorage.getItem("jubea_read_msgs") || "[]"); } catch { return []; } })(),
      ]);
      const visible = (msgs ?? []).filter((m) => !deletedIds.has(m.id));
      setMsgCount(visible.length);
      setUnread(visible.filter((m) => m.status === "unread" && !readIds.has(m.id)).length);
      setProductCount(products ?? 0);
      setGalleryCount(gallery ?? 0);
      setRecentMessages(
        visible.slice(0, 5).map((m) => ({
          id: m.id,
          name: m.name,
          subject: m.subject,
          status: readIds.has(m.id) ? "read" : m.status,
          date: new Date(m.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        }))
      );
    });
  }, []);

  const stats = [
    {
      label: "Total Messages",
      value: String(msgCount),
      icon: MessageSquare,
      change: unread > 0 ? `${unread} unread` : "All read",
      color: "#2db5d5",
      bg: "rgba(45, 181, 213, 0.12)",
      link: "/admin/messages",
    },
    {
      label: "Products",
      value: String(productCount),
      icon: Package,
      change: "in catalog",
      color: "#3dc5e5",
      bg: "rgba(61, 197, 229, 0.12)",
      link: "/admin/products",
    },
    {
      label: "Gallery Photos",
      value: String(galleryCount),
      icon: Image,
      change: "uploaded",
      color: "#1a8ab4",
      bg: "rgba(26, 138, 180, 0.12)",
      link: "/admin/gallery",
    },
    {
      label: "Response Rate",
      value: "98%",
      icon: TrendingUp,
      change: "Excellent",
      color: "#4ade80",
      bg: "rgba(74, 222, 128, 0.12)",
      link: "/admin/messages",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "1.75rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          <h2 style={{ color: "#fff", fontSize: "1.75rem", fontWeight: 700, margin: 0 }}>
            Welcome back 👋
          </h2>
          <p style={{ color: "#7a9ba8", fontSize: "0.9375rem", marginTop: "0.25rem" }}>
            Here's what's happening with your website today.
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.6rem 1.25rem",
            background: "linear-gradient(135deg, #2db5d5, #3dc5e5)",
            border: "none",
            borderRadius: "12px",
            color: "#fff",
            fontSize: "0.875rem",
            fontWeight: 600,
            textDecoration: "none",
            boxShadow: "0 6px 18px rgba(45, 181, 213, 0.35)",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
        >
          <ExternalLink size={15} />
          View Website
        </a>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "1rem",
          marginBottom: "1.75rem",
        }}
      >
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.link}
            style={{
              background: "#0d2840",
              border: "1px solid rgba(45, 181, 213, 0.12)",
              borderRadius: "18px",
              padding: "1.375rem",
              position: "relative",
              overflow: "hidden",
              textDecoration: "none",
              display: "block",
              transition: "border-color 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "rgba(45, 181, 213, 0.3)";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "rgba(45, 181, 213, 0.12)";
              el.style.transform = "translateY(0)";
            }}
          >
            {/* Corner accent */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "80px",
                height: "80px",
                borderRadius: "0 18px 0 80px",
                background: stat.bg,
              }}
            />

            <div
              style={{
                width: "46px",
                height: "46px",
                borderRadius: "12px",
                background: stat.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <stat.icon size={22} color={stat.color} />
            </div>

            <div style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}>
              {stat.value}
            </div>
            <div style={{ color: "#7a9ba8", fontSize: "0.875rem", marginTop: "0.375rem" }}>
              {stat.label}
            </div>
            <div
              style={{
                color: stat.color,
                fontSize: "0.8125rem",
                marginTop: "0.625rem",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <ArrowUpRight size={12} /> {stat.change}
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom grid */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 320px", gap: "1rem" }}>
        {/* Recent Messages */}
        <div
          style={{
            background: "#0d2840",
            border: "1px solid rgba(45, 181, 213, 0.12)",
            borderRadius: "18px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "1.25rem 1.5rem",
              borderBottom: "1px solid rgba(45, 181, 213, 0.12)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ color: "#fff", fontWeight: 600, margin: 0, fontSize: "1rem" }}>
              Recent Messages
            </h3>
            <Link
              to="/admin/messages"
              style={{
                color: "#2db5d5",
                fontSize: "0.8125rem",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              View all <ArrowUpRight size={13} />
            </Link>
          </div>

          {recentMessages.map((msg, i) => (
            <div
              key={i}
              style={{
                padding: "1rem 1.5rem",
                borderBottom:
                  i < recentMessages.length - 1 ? "1px solid rgba(45, 181, 213, 0.07)" : "none",
                display: "flex",
                alignItems: "center",
                gap: "0.875rem",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #2db5d5, #3dc5e5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.8125rem",
                  flexShrink: 0,
                }}
              >
                {msg.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    color: "#fff",
                    fontSize: "0.875rem",
                    fontWeight: msg.status === "unread" ? 600 : 400,
                  }}
                >
                  {msg.name}
                </div>
                <div
                  style={{
                    color: "#7a9ba8",
                    fontSize: "0.8125rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {msg.subject}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  flexShrink: 0,
                }}
              >
                <span style={{ color: "#4a6670", fontSize: "0.75rem" }}>{msg.date}</span>
                {msg.status === "unread" ? (
                  <span
                    style={{
                      background: "rgba(45, 181, 213, 0.18)",
                      color: "#2db5d5",
                      fontSize: "0.6875rem",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "20px",
                      fontWeight: 700,
                    }}
                  >
                    New
                  </span>
                ) : (
                  <span
                    style={{
                      background: "rgba(74, 102, 112, 0.25)",
                      color: "#7a9ba8",
                      fontSize: "0.6875rem",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "20px",
                    }}
                  >
                    Read
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div
          style={{
            background: "#0d2840",
            border: "1px solid rgba(45, 181, 213, 0.12)",
            borderRadius: "18px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "1.25rem 1.5rem",
              borderBottom: "1px solid rgba(45, 181, 213, 0.12)",
            }}
          >
            <h3 style={{ color: "#fff", fontWeight: 600, margin: 0, fontSize: "1rem" }}>
              Quick Actions
            </h3>
          </div>

          <div style={{ padding: "1rem" }}>
            {[
              { label: "Edit Home", to: "/admin/home-editor", icon: Home, color: "#2db5d5" },
              { label: "Edit Services", to: "/admin/services-editor", icon: Wrench, color: "#8b5cf6" },
              { label: "Add New Product", to: "/admin/products", icon: Package, color: "#3dc5e5" },
              { label: "View Messages", to: "/admin/messages", icon: MessageSquare, color: "#1a8ab4" },
            ].map((action) => (
              <Link
                key={action.label}
                to={action.to}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.875rem",
                  padding: "0.875rem 1rem",
                  borderRadius: "12px",
                  marginBottom: "0.5rem",
                  textDecoration: "none",
                  background: "rgba(10, 42, 53, 0.5)",
                  border: "1px solid rgba(45, 181, 213, 0.1)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(45, 181, 213, 0.3)";
                  el.style.background = "rgba(45, 181, 213, 0.08)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(45, 181, 213, 0.1)";
                  el.style.background = "rgba(10, 42, 53, 0.5)";
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: `rgba(45, 181, 213, 0.15)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <action.icon size={17} color={action.color} />
                </div>
                <span style={{ color: "#fff", fontSize: "0.875rem", fontWeight: 500 }}>
                  {action.label}
                </span>
                <ArrowUpRight size={14} color="#4a6670" style={{ marginLeft: "auto" }} />
              </Link>
            ))}
          </div>

          {/* Activity summary */}
          <div
            style={{
              padding: "1rem 1.5rem",
              borderTop: "1px solid rgba(45, 181, 213, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "#7a9ba8",
                fontSize: "0.8125rem",
              }}
            >
              <Clock size={13} color="#2db5d5" />
              Admin Dashboard
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
