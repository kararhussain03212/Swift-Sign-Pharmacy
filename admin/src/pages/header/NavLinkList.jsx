import { useEffect, useState } from "react";
import { createNavLink, deleteNavLink, getNavLinks, updateNavLink } from "../../api/navLinkApi";

const extractErrorMessage = (error, fallback) =>
  error?.response?.data?.error || error?.response?.data?.message || fallback;

const blankRow = () => ({ label: "", url: "", is_active: true });

export default function NavLinkList() {
  const [rows, setRows] = useState([]);
  const [originalIds, setOriginalIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      const res = await getNavLinks();
      const items = Array.isArray(res.data?.data) ? res.data.data : [];
      const sorted = [...items].sort((a, b) => a.sort_order - b.sort_order);
      setRows(
        sorted.map((item) => ({
          id: item.id,
          label: item.label || "",
          url: item.url || "",
          is_active: item.is_active === 1 || item.is_active === true,
        })),
      );
      setOriginalIds(new Set(sorted.map((item) => item.id)));
    } catch {
      setError("Failed to load nav links.");
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

  const removeRow = (index) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const addRow = () => {
    setRows((prev) => [...prev, blankRow()]);
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");
    if (rows.some((row) => !row.label.trim() || !row.url.trim())) {
      setError("Every link needs a label and URL, or remove the empty row.");
      return;
    }

    try {
      setSaving(true);
      const currentIds = new Set(rows.filter((r) => r.id).map((r) => r.id));
      const toDelete = [...originalIds].filter((id) => !currentIds.has(id));
      await Promise.all(toDelete.map((id) => deleteNavLink(id)));

      for (let i = 0; i < rows.length; i += 1) {
        const row = rows[i];
        const payload = {
          label: row.label.trim(),
          url: row.url.trim(),
          is_active: row.is_active ? 1 : 0,
          sort_order: i + 1,
        };
        if (row.id) await updateNavLink(row.id, payload);
        else await createNavLink(payload);
      }

      setSuccess("Nav links saved.");
      load();
    } catch (err) {
      setError(extractErrorMessage(err, "Failed to save nav links."));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-white/70">Loading nav links...</p>;

  const inputCls =
    "rounded-lg border border-[var(--admin-border)] bg-[var(--admin-card-elevated)] px-3 py-2 text-[var(--admin-ink)] outline-none transition focus:border-[var(--admin-primary)]";

  return (
    <section className="space-y-4">
      <header className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)] px-4 py-4 shadow-sm">
        <h2 className="text-2xl font-bold text-white">Nav Links</h2>
      </header>

      {error ? <div className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-red-300">{error}</div> : null}
      {success ? <div className="rounded-xl border border-[rgba(15,175,184,0.25)] bg-[rgba(15,175,184,0.10)] px-4 py-3 text-[#0FAFB8]">{success}</div> : null}

      <article className="space-y-4 rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-4 shadow-sm md:p-5">
        <div className="space-y-3 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card-elevated)] p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-sm font-semibold text-[var(--admin-ink)]">Navbar Links</h4>
            <span className="text-xs text-[var(--admin-muted)]">Set Label, Path/URL and active state</span>
          </div>

          <div className="grid grid-cols-[1fr_1fr_100px_50px] gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--admin-muted)]">
            <span>Label</span>
            <span>Path / URL</span>
            <span>Active</span>
            <span>Delete</span>
          </div>

          {rows.map((row, index) => (
            <div
              key={row.id ?? `new-${index}`}
              className="grid grid-cols-[1fr_1fr_100px_50px] gap-2 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] p-2 items-center"
            >
              <input
                type="text"
                placeholder="Home"
                value={row.label}
                onChange={(e) => updateRow(index, "label", e.target.value)}
                className={inputCls}
              />
              <input
                type="text"
                placeholder="/about or https://example.com"
                value={row.url}
                onChange={(e) => updateRow(index, "url", e.target.value)}
                className={inputCls}
              />
              <label className="flex items-center gap-2 text-sm text-[var(--admin-muted)]">
                <input
                  type="checkbox"
                  checked={row.is_active}
                  onChange={(e) => updateRow(index, "is_active", e.target.checked)}
                  className="h-4 w-4"
                />
                Active
              </label>
              <button
                type="button"
                onClick={() => removeRow(index)}
                className="rounded-lg border border-red-500 bg-red-500/10 px-2 py-2 font-medium text-red-400 hover:bg-red-500/20 text-xs"
              >
                Delete
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addRow}
            className="rounded-lg bg-[var(--admin-accent)] px-3 py-2 text-sm font-semibold text-black hover:bg-[var(--admin-accent-strong)]"
          >
            + Add Link
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
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </section>
  );
}
