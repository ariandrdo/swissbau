import { Outlet, Link, useNavigate, useLocation } from "react-router";
import { LayoutDashboard, Package, Image, LogOut, Zap, Menu, X, Wrench, Home, Users, Phone, MessageSquare, PanelTop, PanelBottom } from "lucide-react";
import { useState, useEffect } from "react";
import type { ElementType } from "react";
import { useContent } from "../../context/ContentContext";
import { supabase } from "../../../lib/supabase";

type NavItem = { path: string; tab?: string; icon: ElementType; label: string };

const navItems: NavItem[] = [
  { path: "/admin/dashboard",      icon: LayoutDashboard, label: "Dashboard" },
  { path: "/admin/header-editor",  icon: PanelTop,        label: "Header"    },
  { path: "/admin/home-editor",    icon: Home,            label: "Home"      },
  { path: "/admin/services-editor",icon: Wrench,          label: "Services"  },
  { path: "/admin/products",       icon: Package,         label: "Projects"  },
  { path: "/admin/about-editor",   icon: Users,           label: "About"     },
  { path: "/admin/contact-editor", icon: Phone,           label: "Contact"   },
  { path: "/admin/messages",       icon: MessageSquare,   label: "Messages"  },
  { path: "/admin/footer-editor",  icon: PanelBottom,     label: "Footer"    },
];


export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { content } = useContent();
  const logo = content.header.logo;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);
  const [unreadCount, setUnreadCount] = useState(0);
  const [adminEmail, setAdminEmail] = useState("admin@jubea.com");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user?.email) setAdminEmail(data.session.user.email);
    });
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [location.pathname, isMobile]);

  // Track viewport size
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getLocalSet = (key: string): Set<number> => {
    try { return new Set(JSON.parse(localStorage.getItem(key) || "[]")); } catch { return new Set(); }
  };

  const refreshUnread = () => {
    Promise.all([
      supabase.from("contact_messages").select("id").eq("status", "unread"),
      supabase.from("admin_deleted_messages").select("message_id"),
      supabase.from("admin_read_messages").select("message_id"),
    ]).then(([{ data: unread }, { data: deleted }, { data: read }]) => {
      if (!unread) return;
      const deletedIds = new Set([
        ...(deleted ?? []).map((d) => d.message_id),
        ...getLocalSet("jubea_deleted_msgs"),
      ]);
      const readIds = new Set([
        ...(read ?? []).map((r) => r.message_id),
        ...getLocalSet("jubea_read_msgs"),
      ]);
      setUnreadCount(unread.filter((m) => !deletedIds.has(m.id) && !readIds.has(m.id)).length);
    });
  };

  useEffect(() => {
    refreshUnread();
    const interval = setInterval(refreshUnread, 30000);
    const onRead = () => setUnreadCount((c) => Math.max(0, c - 1));
    const onDelete = () => refreshUnread();
    window.addEventListener("messages-read", onRead);
    window.addEventListener("messages-deleted", onDelete);
    return () => {
      clearInterval(interval);
      window.removeEventListener("messages-read", onRead);
      window.removeEventListener("messages-deleted", onDelete);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const searchParam = new URLSearchParams(location.search).get("tab");
  const currentTitle =
    navItems.find((item) =>
      item.tab
        ? location.pathname === item.path && searchParam === item.tab
        : location.pathname === item.path
    )?.label ?? "Admin";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "linear-gradient(135deg, #143348 0%, #143348 50%, #042142 100%)" }}>
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 90,
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: "260px",
          background: "#0d2a3e",
          borderRight: "1px solid rgba(45, 181, 213, 0.12)",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          left: isMobile ? (sidebarOpen ? "0" : "-260px") : "0",
          bottom: 0,
          zIndex: 100,
          transition: "left 0.3s ease",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "0.25rem 1.5rem",
            borderBottom: "1px solid rgba(45, 181, 213, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", minWidth: 0, flex: 1 }}>
            {logo ? (
              <img
                src={logo}
                alt="Logo"
                style={{ width: "38px", height: "auto", objectFit: "contain", display: "block" }}
              />
            ) : (
              <>
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "9px",
                    background: "linear-gradient(135deg, #2db5d5, #3dc5e5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 18px rgba(45, 181, 213, 0.4)",
                    flexShrink: 0,
                  }}
                >
                  <Zap size={17} color="white" fill="white" />
                </div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.9375rem", lineHeight: 1.2 }}>
                    Jubea Energy
                  </div>
                  <div style={{ color: "#2db5d5", fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Admin Panel
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile close button */}
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "#a0b4bc",
                cursor: "pointer",
                padding: "0.25rem",
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="admin-nav" style={{ flex: 1, padding: "1.25rem 0.75rem", overflowY: "auto" }}>
          <p
            style={{
              color: "#4a6670",
              fontSize: "0.6875rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "0.5rem",
              padding: "0 0.75rem",
            }}
          >
            Navigation
          </p>
          {navItems.map(({ path, tab, icon: Icon, label }) => {
            const to = tab ? `${path}?tab=${tab}` : path;
            const isActive = tab
              ? location.pathname === path && searchParam === tab
              : location.pathname === path;
            return (
              <Link
                key={to}
                to={to}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "12px",
                  marginBottom: "0.2rem",
                  textDecoration: "none",
                  color: isActive ? "#fff" : "#7a9ba8",
                  background: isActive
                    ? "linear-gradient(135deg, rgba(45, 181, 213, 0.18), rgba(45, 181, 213, 0.08))"
                    : "transparent",
                  border: isActive
                    ? "1px solid rgba(45, 181, 213, 0.28)"
                    : "1px solid transparent",
                  fontWeight: isActive ? 600 : 400,
                  fontSize: "0.9375rem",
                  transition: "all 0.2s ease",
                  boxShadow: isActive ? "0 2px 12px rgba(45, 181, 213, 0.12)" : "none",
                }}
              >
                <Icon size={18} color={isActive ? "#2db5d5" : "currentColor"} />
                <span style={{ flex: 1 }}>{label}</span>
                {label === "Messages" && unreadCount > 0 && (
                  <span style={{
                    background: "linear-gradient(135deg, #e53e3e, #fc8181)",
                    color: "#fff",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    padding: "0.15rem 0.45rem",
                    borderRadius: "20px",
                    minWidth: "20px",
                    textAlign: "center",
                    lineHeight: 1.4,
                    boxShadow: "0 2px 6px rgba(229,62,62,0.5)",
                  }}>
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Admin info + Logout */}
        <div style={{ padding: "0.75rem", borderTop: "1px solid rgba(45, 181, 213, 0.12)" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.75rem 1rem",
              background: "rgba(4, 33, 66, 0.5)",
              borderRadius: "12px",
              marginBottom: "0.5rem",
            }}
          >
            <div
              style={{
                width: "34px",
                height: "34px",
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
              SA
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ color: "#fff", fontSize: "0.8125rem", fontWeight: 600 }}>Super Admin</div>
              <div
                style={{
                  color: "#4a6670",
                  fontSize: "0.6875rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {adminEmail}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              width: "100%",
              padding: "0.7rem 1rem",
              borderRadius: "12px",
              background: "transparent",
              border: "1px solid transparent",
              color: "#7a9ba8",
              cursor: "pointer",
              fontSize: "0.9375rem",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget;
              btn.style.background = "rgba(212, 24, 61, 0.1)";
              btn.style.color = "#ff6b8a";
              btn.style.borderColor = "rgba(212, 24, 61, 0.25)";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget;
              btn.style.background = "transparent";
              btn.style.color = "#7a9ba8";
              btn.style.borderColor = "transparent";
            }}
          >
            <LogOut size={17} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ marginLeft: isMobile ? "0" : "260px", flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Topbar */}
        <header
          style={{
            background: "rgba(20, 51, 72, 0.95)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(45, 181, 213, 0.12)",
            padding: "0 1.25rem",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(true)}
                style={{
                  background: "rgba(45, 181, 213, 0.08)",
                  border: "1px solid rgba(45, 181, 213, 0.2)",
                  borderRadius: "10px",
                  color: "#a0b4bc",
                  cursor: "pointer",
                  padding: "0.45rem",
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <Menu size={20} />
              </button>
            )}
            <div>
              <h1 style={{ color: "#fff", fontWeight: 600, fontSize: "1.125rem", margin: 0 }}>
                {currentTitle}
              </h1>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#4ade80",
                boxShadow: "0 0 8px rgba(74, 222, 128, 0.6)",
              }}
            />
            <span style={{ color: "#7a9ba8", fontSize: "0.8125rem" }}>Online</span>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: isMobile ? "1rem" : "1.75rem" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
