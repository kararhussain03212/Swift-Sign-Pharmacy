import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getPrescriptionOrders } from "../../api/prescriptionOrderApi";

const STATUS_STYLES = {
  pending:    { bg: "bg-[rgba(234,251,252,0.15)]",  text: "text-[#0FAFB8]",  border: "border-[rgba(234,251,252,0.30)]",  label: "Pending" },
  contacted:  { bg: "bg-blue-500/15",   text: "text-blue-400",   border: "border-blue-500/30",   label: "Contacted" },
  processing: { bg: "bg-purple-500/15", text: "text-purple-400", border: "border-purple-500/30", label: "Processing" },
  delivered:  { bg: "bg-[rgba(15,175,184,0.15)]",  text: "text-[#0FAFB8]",  border: "border-[rgba(15,175,184,0.30)]",  label: "Delivered" },
  rejected:   { bg: "bg-red-500/15",    text: "text-red-400",    border: "border-red-500/30",    label: "Rejected" },
};

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.pending;
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${s.bg} ${s.text} ${s.border}`}>
      {s.label}
    </span>
  );
}

export default function PrescriptionSubmissionsList() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = { page, per_page: 20 };
      if (filter) params.status = filter;
      const res = await getPrescriptionOrders(params);
      const payload = res?.data?.data ?? res?.data ?? {};
      setOrders(Array.isArray(payload?.data) ? payload.data : []);
      setMeta(payload?.meta ?? null);
    } catch {
      setError("Failed to load prescription submissions.");
    } finally {
      setLoading(false);
    }
  }, [page, filter]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [filter]);

  return (
    <section className="space-y-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">Prescription Submissions</h2>
          <p className="mt-0.5 text-sm text-[var(--admin-muted)]">Prescriptions uploaded via the Order Medicines page.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {["", "pending", "contacted", "processing", "delivered", "rejected"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                filter === s
                  ? "border-[var(--admin-border-amber)] bg-[var(--admin-primary)] text-black"
                  : "border-[var(--admin-border)] bg-[var(--admin-card)] text-[var(--admin-muted)] hover:text-white"
              }`}
            >
              {s === "" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </header>

      {error && (
        <div className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)]">
        {loading ? (
          <div className="py-16 text-center text-sm text-[var(--admin-muted)]">Loading submissions…</div>
        ) : orders.length === 0 ? (
          <div className="py-16 text-center text-sm text-[var(--admin-muted)]">No submissions found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--admin-border)] text-left text-xs uppercase tracking-widest text-[var(--admin-muted)]">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3 hidden sm:table-cell">Phone</th>
                <th className="px-4 py-3 hidden md:table-cell">Submitted</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-[var(--admin-border)] transition hover:bg-[var(--admin-bg)]">
                  <td className="px-4 py-3 text-white">{o.customer_name}</td>
                  <td className="px-4 py-3 hidden text-[var(--admin-muted)] sm:table-cell">{o.phone_number}</td>
                  <td className="px-4 py-3 hidden text-[var(--admin-muted)] md:table-cell">
                    {o.created_at ? new Date(o.created_at).toLocaleString("en-PK") : "—"}
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => navigate(`/prescription-orders/submissions/${o.id}`)}
                      className="rounded-lg border border-[var(--admin-border-amber)] bg-[var(--admin-primary)] px-3 py-1.5 text-xs font-semibold text-black hover:bg-[var(--admin-amber)]"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {meta && meta.total_pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-lg border border-[var(--admin-border)] bg-[var(--admin-card)] px-3 py-1.5 text-sm text-[var(--admin-muted)] disabled:opacity-40 hover:text-white"
          >
            ← Prev
          </button>
          <span className="text-sm text-[var(--admin-muted)]">Page {page} of {meta.total_pages}</span>
          <button
            onClick={() => setPage((p) => Math.min(meta.total_pages, p + 1))}
            disabled={page === meta.total_pages}
            className="rounded-lg border border-[var(--admin-border)] bg-[var(--admin-card)] px-3 py-1.5 text-sm text-[var(--admin-muted)] disabled:opacity-40 hover:text-white"
          >
            Next →
          </button>
        </div>
      )}
    </section>
  );
}
