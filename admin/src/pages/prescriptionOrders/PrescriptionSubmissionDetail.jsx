import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPrescriptionOrder,
  updatePrescriptionOrder,
  fetchPrescriptionOrderFileBlob,
} from "../../api/prescriptionOrderApi";

const STATUSES = ["pending", "contacted", "processing", "delivered", "rejected"];

export default function PrescriptionSubmissionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("pending");
  const [notes, setNotes] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileMime, setFileMime] = useState("");
  const [fileError, setFileError] = useState("");
  const [showFullscreen, setShowFullscreen] = useState(false);
  const objectUrlRef = useRef(null);
  const fileBlobRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getPrescriptionOrder(id);
        const item = res.data?.data ?? {};
        setOrder(item);
        setStatus(item.status || "pending");
        setNotes(item.admin_notes || "");
      } catch {
        setError("Failed to load submission.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchPrescriptionOrderFileBlob(id);
        const blob = res.data;
        const url = URL.createObjectURL(blob);
        objectUrlRef.current = url;
        fileBlobRef.current = blob;
        setFileUrl(url);
        setFileMime(blob.type || "");
      } catch {
        setFileError("Unable to load the prescription file.");
      }
    })();
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setSaving(true);
      const res = await updatePrescriptionOrder(id, { status, admin_notes: notes });
      setOrder(res.data?.data ?? order);
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = () => {
    if (!fileBlobRef.current || !order) return;
    const url = URL.createObjectURL(fileBlobRef.current);
    const a = document.createElement("a");
    a.href = url;
    a.download = order.original_file_name || `prescription-${order.id}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="text-white/70">Loading…</div>;
  if (!order) return <div className="text-white/70">Submission not found.</div>;

  const inputCls = "w-full rounded-lg border border-white/20 bg-[var(--admin-card)] px-3 py-2 text-white";
  const labelCls = "mb-1 block text-sm text-white/80";

  return (
    <section className="mx-auto max-w-4xl space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Prescription Submission #{order.id}</h2>
          <p className="mt-0.5 text-sm text-[var(--admin-muted)]">
            Submitted {order.created_at ? new Date(order.created_at).toLocaleString("en-PK") : "—"}
          </p>
        </div>
        <button onClick={() => navigate("/prescription-orders/submissions")} className="rounded-xl border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/5">
          ← Back to list
        </button>
      </header>

      {error && <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">{error}</div>}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-white/10 bg-[var(--admin-bg)] p-6">
          <h3 className="font-semibold text-white">Patient Details</h3>
          <p className="text-sm text-[var(--admin-muted)]"><strong className="text-white">Name:</strong> {order.customer_name}</p>
          <p className="text-sm text-[var(--admin-muted)]"><strong className="text-white">Phone:</strong> {order.phone_number}</p>
          <p className="text-sm text-[var(--admin-muted)]"><strong className="text-white">Original filename:</strong> {order.original_file_name}</p>
          <p className="text-sm text-[var(--admin-muted)]"><strong className="text-white">File size:</strong> {(Number(order.file_size_bytes || 0) / 1024).toFixed(0)} KB</p>

          <div className="flex gap-2 pt-1">
            <a
              href={`tel:${order.phone_number}`}
              className="rounded-lg border border-[var(--admin-border-amber)] bg-[var(--admin-primary)] px-3 py-1.5 text-xs font-semibold text-black hover:bg-[var(--admin-amber)]"
            >
              Call Patient
            </a>
            <a
              href={`https://wa.me/${String(order.phone_number || "").replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[rgba(15,175,184,0.30)] bg-[rgba(15,175,184,0.10)] px-3 py-1.5 text-xs font-semibold text-[#0FAFB8] hover:bg-[rgba(15,175,184,0.20)]"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[var(--admin-bg)] p-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-white">Prescription File</h3>
            {!fileError && fileUrl && (
              <button
                onClick={handleDownload}
                className="rounded-lg bg-[var(--admin-primary)] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[var(--admin-primary-strong)]"
              >
                ↓ Download
              </button>
            )}
          </div>
          {fileError ? (
            <div className="text-sm text-red-400">{fileError}</div>
          ) : !fileUrl ? (
            <div className="text-sm text-[var(--admin-muted)]">Loading file…</div>
          ) : fileMime === "application/pdf" ? (
            <iframe src={fileUrl} title="Prescription file" className="h-96 w-full rounded-lg border border-white/10" />
          ) : (
            <button
              onClick={() => setShowFullscreen(true)}
              className="block w-full cursor-pointer rounded-lg border border-white/10 hover:border-white/30 transition"
            >
              <img src={fileUrl} alt="Uploaded prescription" className="max-h-96 w-full rounded-lg object-contain" />
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5 rounded-2xl border border-white/10 bg-[var(--admin-bg)] p-6">
        <h3 className="font-semibold text-white">Order Outcome</h3>

        <div>
          <label className={labelCls}>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputCls}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls}>Admin Notes</label>
          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={inputCls}
            placeholder="e.g. Called patient at 3:15pm, confirmed order, dispatching today."
          />
        </div>

        <button type="submit" disabled={saving} className="rounded-xl bg-[var(--admin-primary)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--admin-primary-strong)] disabled:opacity-60">
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </form>

      {showFullscreen && fileMime !== "application/pdf" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowFullscreen(false)}
        >
          <div className="relative max-h-[90vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowFullscreen(false)}
              className="absolute -top-10 right-0 text-white text-xl font-semibold hover:text-white/70"
            >
              ✕ Close
            </button>
            <img src={fileUrl} alt="Prescription fullscreen" className="max-h-[90vh] max-w-4xl rounded-lg object-contain" />
          </div>
        </div>
      )}
    </section>
  );
}
