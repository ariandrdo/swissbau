import { useState, useEffect } from "react";
import { Mail, Search, Trash2, Phone, X, MessageSquare } from "lucide-react";
import { supabase } from "../../../lib/supabase";

const ls = {
  getSet: (key: string): Set<number> => {
    try { return new Set(JSON.parse(localStorage.getItem(key) || "[]")); } catch { return new Set(); }
  },
  add: (key: string, id: number) => {
    const s = ls.getSet(key); s.add(id);
    localStorage.setItem(key, JSON.stringify([...s]));
  },
  remove: (key: string, id: number) => {
    const s = ls.getSet(key); s.delete(id);
    localStorage.setItem(key, JSON.stringify([...s]));
  },
};

type Message = {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: "unread" | "read";
};

export function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
      supabase.from("admin_deleted_messages").select("message_id"),
      supabase.from("admin_read_messages").select("message_id"),
    ]).then(([{ data: msgs }, { data: deletedData }, { data: readData }]) => {
      if (!msgs) { setLoading(false); return; }
      const deleted = new Set([
        ...(deletedData ?? []).map((d) => d.message_id),
        ...ls.getSet("jubea_deleted_msgs"),
      ]);
      const read = new Set([
        ...(readData ?? []).map((r) => r.message_id),
        ...ls.getSet("jubea_read_msgs"),
      ]);
      setMessages(
        msgs
          .filter((m) => !deleted.has(m.id))
          .map((m) => ({
            id: m.id,
            name: m.name,
            email: m.email,
            phone: m.phone,
            subject: m.subject,
            message: m.message,
            date: new Date(m.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            status: (read.has(m.id) ? "read" : m.status) as "unread" | "read",
          }))
      );
      setLoading(false);
    });
  }, []);

  const filtered = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  const selectedMsg = messages.find((m) => m.id === selected);
  const unreadCount = messages.filter((m) => m.status === "unread").length;

  const markAsRead = (id: number) => {
    const msg = messages.find((m) => m.id === id);
    if (!msg || msg.status === "read") return;
    ls.add("jubea_read_msgs", id);
    supabase.from("admin_read_messages").insert({ message_id: id }).then(() => {});
    supabase.from("contact_messages").update({ status: "read" }).eq("id", id).then(() => {});
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status: "read" } : m)));
    window.dispatchEvent(new Event("messages-read"));
  };

  const handleDelete = (id: number) => {
    ls.add("jubea_deleted_msgs", id);
    supabase.from("admin_deleted_messages").insert({ message_id: id }).then(() => {});
    supabase.from("contact_messages").delete().eq("id", id).then(() => {});
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected === id) setSelected(null);
    window.dispatchEvent(new CustomEvent("messages-deleted", { detail: { id } }));
  };

  const handleSelect = (id: number) => {
    setSelected(id === selected ? null : id);
    markAsRead(id);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "1.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <h2 style={{ color: "#fff", fontSize: "1.75rem", fontWeight: 700, margin: 0 }}>
            Messages
          </h2>
          {unreadCount > 0 && (
            <span
              style={{
                background: "linear-gradient(135deg, #2db5d5, #3dc5e5)",
                color: "#fff",
                fontSize: "0.75rem",
                fontWeight: 700,
                padding: "0.2rem 0.6rem",
                borderRadius: "20px",
              }}
            >
              {unreadCount} new
            </span>
          )}
        </div>
        <p style={{ color: "#7a9ba8", fontSize: "0.9375rem", marginTop: "0.25rem" }}>
          Customer inquiries and service requests
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: selected && !isMobile ? "1fr 420px" : "1fr",
          gap: "1rem",
          alignItems: "start",
        }}
      >
        {/* Messages list */}
        <div
          style={{
            background: "#0d2840",
            border: "1px solid rgba(45, 181, 213, 0.12)",
            borderRadius: "18px",
            overflow: "hidden",
          }}
        >
          {/* Search bar */}
          <div
            style={{
              padding: "1rem 1.25rem",
              borderBottom: "1px solid rgba(45, 181, 213, 0.12)",
            }}
          >
            <div style={{ position: "relative" }}>
              <Search
                size={15}
                style={{
                  position: "absolute",
                  left: "0.875rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#4a6670",
                }}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search messages..."
                style={{
                  width: "100%",
                  padding: "0.65rem 1rem 0.65rem 2.375rem",
                  background: "rgba(4, 33, 66, 0.5)",
                  border: "1px solid rgba(45, 181, 213, 0.18)",
                  borderRadius: "10px",
                  color: "#fff",
                  fontSize: "0.875rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* List */}
          {loading ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "#4a6670" }}>
              <p style={{ margin: 0 }}>Loading messages...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div
              style={{
                padding: "3rem",
                textAlign: "center",
                color: "#4a6670",
              }}
            >
              <MessageSquare size={32} style={{ margin: "0 auto 0.75rem", opacity: 0.5 }} />
              <p style={{ margin: 0 }}>No messages found</p>
            </div>
          ) : (
            filtered.map((msg, i) => (
              <div
                key={msg.id}
                onClick={() => handleSelect(msg.id)}
                style={{
                  padding: "1rem 1.25rem",
                  borderBottom:
                    i < filtered.length - 1
                      ? "1px solid rgba(45, 181, 213, 0.07)"
                      : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.875rem",
                  cursor: "pointer",
                  background:
                    selected === msg.id
                      ? "rgba(45, 181, 213, 0.07)"
                      : "transparent",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (selected !== msg.id)
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(45, 181, 213, 0.04)";
                }}
                onMouseLeave={(e) => {
                  if (selected !== msg.id)
                    (e.currentTarget as HTMLElement).style.background =
                      "transparent";
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #2db5d5, #3dc5e5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.875rem",
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
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.2rem",
                    }}
                  >
                    <span
                      style={{
                        color: "#fff",
                        fontSize: "0.9375rem",
                        fontWeight: msg.status === "unread" ? 700 : 500,
                      }}
                    >
                      {msg.name}
                    </span>
                    <span style={{ color: "#4a6670", fontSize: "0.75rem" }}>{msg.date}</span>
                  </div>
                  <div
                    style={{
                      color: msg.status === "unread" ? "#2db5d5" : "#7a9ba8",
                      fontSize: "0.875rem",
                      fontWeight: msg.status === "unread" ? 600 : 400,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {msg.subject}
                  </div>
                  <div
                    style={{
                      color: "#4a6670",
                      fontSize: "0.8125rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      marginTop: "0.15rem",
                    }}
                  >
                    {msg.message}
                  </div>
                </div>

                {msg.status === "unread" && (
                  <div
                    style={{
                      width: "9px",
                      height: "9px",
                      borderRadius: "50%",
                      background: "#2db5d5",
                      flexShrink: 0,
                      boxShadow: "0 0 8px rgba(45, 181, 213, 0.6)",
                    }}
                  />
                )}
              </div>
            ))
          )}
        </div>

        {/* Message detail panel */}
        {selectedMsg && (
          <div
            style={{
              background: "#0d2840",
              border: "1px solid rgba(45, 181, 213, 0.12)",
              borderRadius: "18px",
              overflow: "hidden",
              position: isMobile ? "relative" : "sticky",
              top: isMobile ? "auto" : "80px",
              order: isMobile ? -1 : 0,
            }}
          >
            {/* Detail header */}
            <div
              style={{
                padding: "1.25rem",
                borderBottom: "1px solid rgba(45, 181, 213, 0.12)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#7a9ba8", fontSize: "0.8125rem" }}>Message Detail</span>
              <button
                onClick={() => setSelected(null)}
                style={{
                  background: "rgba(45, 181, 213, 0.1)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#a0b4bc",
                  cursor: "pointer",
                  padding: "0.375rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <X size={15} />
              </button>
            </div>

            <div style={{ padding: "1.25rem" }}>
              {/* Sender info */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1.25rem" }}>
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #2db5d5, #3dc5e5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "1rem",
                    flexShrink: 0,
                  }}
                >
                  {selectedMsg.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "1rem" }}>
                    {selectedMsg.name}
                  </div>
                  <div style={{ color: "#7a9ba8", fontSize: "0.8125rem" }}>{selectedMsg.date}</div>
                </div>
              </div>

              {/* Subject */}
              <div
                style={{
                  background: "rgba(45, 181, 213, 0.08)",
                  border: "1px solid rgba(45, 181, 213, 0.18)",
                  borderRadius: "10px",
                  padding: "0.75rem 1rem",
                  marginBottom: "1rem",
                }}
              >
                <span style={{ color: "#2db5d5", fontSize: "0.8125rem", fontWeight: 600 }}>
                  Subject:
                </span>{" "}
                <span style={{ color: "#fff", fontSize: "0.9375rem" }}>{selectedMsg.subject}</span>
              </div>

              {/* Message body */}
              <p
                style={{
                  color: "#c8d8de",
                  lineHeight: 1.7,
                  margin: "0 0 1.25rem",
                  fontSize: "0.9375rem",
                }}
              >
                {selectedMsg.message}
              </p>

              {/* Contact info */}
              <div
                style={{
                  background: "rgba(4, 33, 66, 0.5)",
                  borderRadius: "12px",
                  padding: "0.875rem 1rem",
                  marginBottom: "1.25rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.625rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <Mail size={14} color="#2db5d5" />
                  <a
                    href={`mailto:${selectedMsg.email}`}
                    style={{ color: "#c8d8de", fontSize: "0.875rem", textDecoration: "none" }}
                  >
                    {selectedMsg.email}
                  </a>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                  <Phone size={14} color="#2db5d5" />
                  <a
                    href={`tel:${selectedMsg.phone}`}
                    style={{ color: "#c8d8de", fontSize: "0.875rem", textDecoration: "none" }}
                  >
                    {selectedMsg.phone}
                  </a>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <a
                  href={`mailto:${selectedMsg.email}`}
                  style={{
                    flex: 1,
                    padding: "0.8rem",
                    background: "linear-gradient(135deg, #2db5d5, #3dc5e5)",
                    border: "none",
                    borderRadius: "12px",
                    color: "white",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    textAlign: "center",
                    textDecoration: "none",
                    display: "block",
                    boxShadow: "0 5px 15px rgba(45, 181, 213, 0.3)",
                  }}
                >
                  Reply via Email
                </a>
                <button
                  onClick={() => handleDelete(selectedMsg.id)}
                  style={{
                    padding: "0.8rem 1rem",
                    background: "rgba(212, 24, 61, 0.1)",
                    border: "1px solid rgba(212, 24, 61, 0.25)",
                    borderRadius: "12px",
                    color: "#ff6b8a",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Trash2 size={15} /> Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
