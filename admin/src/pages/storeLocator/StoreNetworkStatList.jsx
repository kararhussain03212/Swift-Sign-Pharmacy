import { useEffect, useState } from "react";
import {
  createStoreNetworkStat,
  deleteStoreNetworkStat,
  getStoreNetworkStats,
  updateStoreNetworkStat,
} from "../../api/storeNetworkStatApi";

const extractErrorMessage = (error, fallback) =>
  error?.response?.data?.error || error?.response?.data?.message || fallback;

const blankRow = () => ({ value: "", label: "" });

export default function StoreNetworkStatList() {
  const [rows, setRows] = useState([]);
  const [originalIds, setOriginalIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      const res = await getStoreNetworkStats();
      const items = Array.isArray(res.data?.data) ? res.data.data : [];
      const sorted = [...items].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
      setRows(sorted.map((item) => ({ id: item.id, value: item.value || "", label: item.label || "" })));
      setOriginalIds(new Set(sorted.map((item) => item.id)));
    } catch {
      setError("Failed to load network stats.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateRow = (index, key, value) => {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, [key]: value } : row)));
  };

  const removeRow = (index) => setRows((prev) => prev.filter((_, i) => i !== index));
  const addRow = () => setRows((prev) => [...prev, blankRow()]);

  const handleSave = async () => {
    setError("");
    setSuccess("");
    if (rows.some((row) => !row.value.trim() || !row.label.trim())) {
      setError("Every stat needs a value and a label, or remove the empty row.");
      return;
    }

    try {
      setSaving(true);
      const currentIds = new Set(rows.filter((r) => r.id).map((r) => r.id));
      const toDelete = [...originalIds].filter((id) => !currentIds.has(id));
      await Promise.all(toDelete.map((id) => deleteStoreNetworkStat(id)));

      for (let i = 0; i < rows.length; i += 1) {
        const row = rows[i];
        const payload = { value: row.value.trim(), label: row.label.trim(), sort_order: i + 1 };
        if (row.id) await updateStoreNetworkStat(row.id, payload);
        else await createStoreNetworkStat(payload);
      }

      setSuccess("Network stats saved.");
      load();
    } catch (err) {
      setError(extractErrorMessage(err, "Failed to save network stats."));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-white/70">Loading network stats...</p>;

  const inputCls =
    "rounded-lg border border-[var(--admin-border)] bg-[var(--admin-card-elevated)] px-3 py-2 text-[var(--admin-ink)] outline-none transition focus:border-[var(--admin-primary)]";

  return (
    <section className="space-y-4">
      <header className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)] px-4 py-4 shadow-sm">
        <h2 className="text-2xl font-bold text-white">Network Stats</h2>
        <p className="mt-1 text-sm text-white/65">The 4 stat cards shown in the "Our Network" section (e.g. 238 Retail Outlets).</p>
      </header>

      {error ? <div className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-red-300">{error}</div> : null}
      {success ? <div className="rounded-xl border border-[rgba(15,175,184,0.25)] bg-[rgba(15,175,184,0.10)] px-4 py-3 text-[#0FAFB8]">{success}</div> : null}

      <article className="space-y-4 rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-4 shadow-sm md:p-5">
        <div className="space-y-3 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card-elevated)] p-4">
          <div className="hidden grid-cols-[140px_2fr_auto] gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--admin-muted)] md:grid">
            <span>Value</span>
            <span>Label</span>
            <span>Action</span>
          </div>

          {rows.map((row, index) => (
            <div
              key={row.id ?? `new-${index}`}
              className="grid grid-cols-1 gap-2 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] p-2 md:grid-cols-[140px_2fr_auto] md:items-center"
            >
              <input type="text" placeholder="238" value={row.value} onChange={(e) => updateRow(index, "value", e.target.value)} className={inputCls} />
              <input type="text" placeholder="Retail Outlets" value={row.label} onChange={(e) => updateRow(index, "label", e.target.value)} className={inputCls} />
              <button
                type="button"
                onClick={() => removeRow(index)}
                className="rounded-lg border border-red-500 bg-red-500/10 px-3 py-2 font-medium text-red-400 hover:bg-red-500/20"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addRow}
            className="rounded-lg bg-[var(--admin-accent)] px-3 py-2 text-sm font-semibold text-black hover:bg-[var(--admin-accent-strong)]"
          >
            + Add Stat
          </button>
        </div>
      </article>

      <div className="sticky bottom-4 z-10 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-xl bg-[var(--admin-primary)] px-5 py-2.5 text-white shadow-sm hover:bg-[var(--admin-primary-strong)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Stats"}
        </button>
      </div>
    </section>
  );
}
