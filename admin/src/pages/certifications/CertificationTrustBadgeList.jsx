import { useEffect, useState } from "react";
import {
  getCertificationTrustBadges,
  createCertificationTrustBadge,
  updateCertificationTrustBadge,
  deleteCertificationTrustBadge,
} from "../../api/certificationApi";

const inputCls = "w-full rounded-lg border border-white/20 bg-[var(--admin-card)] px-3 py-2 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[var(--admin-primary)]";

export default function CertificationTrustBadgeList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editForms, setEditForms] = useState({});
  const [savingIds, setSavingIds] = useState(new Set());
  const [isAdding, setIsAdding] = useState(false);
  const [addForm, setAddForm] = useState({ label: "", icon_key: "check-circle", sort_order: 0, is_active: 1 });
  const [toast, setToast] = useState({ show: false, text: "" });

  useEffect(() => {
    if (!toast.show) return;
    const t = setTimeout(() => setToast({ show: false, text: "" }), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const res = await getCertificationTrustBadges();
      const data = Array.isArray(res?.data?.data) ? res.data.data : [];
      setItems(data);
      const forms = {};
      data.forEach((item) => { forms[item.id] = { ...item }; });
      setEditForms(forms);
      setError("");
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to load trust badges");
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (id, field, value) => {
    setEditForms((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  const handleSave = async (id) => {
    try {
      setSavingIds((prev) => new Set([...prev, id]));
      await updateCertificationTrustBadge(id, editForms[id]);
      setToast({ show: true, text: "Badge saved successfully" });
      await loadItems();
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to save badge");
    } finally {
      setSavingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this badge?")) return;
    try {
      await deleteCertificationTrustBadge(id);
      setToast({ show: true, text: "Badge deleted successfully" });
      await loadItems();
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to delete badge");
    }
  };

  const handleCreate = async () => {
    if (!addForm.label.trim()) {
      setError("Label is required");
      return;
    }
    try {
      await createCertificationTrustBadge(addForm);
      setIsAdding(false);
      setAddForm({ label: "", icon_key: "check-circle", sort_order: 0, is_active: 1 });
      setToast({ show: true, text: "Badge created successfully" });
      await loadItems();
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to create badge");
    }
  };

  if (loading) return <p className="text-white/70">Loading trust badges…</p>;

  return (
    <section className="space-y-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Certification Trust Badges</h2>
          <p className="text-sm text-white/65">Manage the badge pills shown in the "100% Verified & Licensed" section.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="inline-flex w-fit rounded-xl bg-[var(--admin-primary)] px-5 py-2.5 font-semibold text-black hover:bg-[var(--admin-primary-strong)]"
        >
          + Add Badge
        </button>
      </header>

      {toast.show && (
        <div className="fixed right-5 top-5 z-[220] rounded-xl border border-green-400/30 bg-green-500/90 px-4 py-2 text-sm font-medium text-white shadow-lg">
          {toast.text}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">{error}</div>
      )}

      {isAdding && (
        <article className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--admin-bg)]">
          <div className="p-4 sm:p-5">
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80">Label</label>
                  <input
                    type="text"
                    value={addForm.label || ""}
                    onChange={(e) => setAddForm({ ...addForm, label: e.target.value })}
                    className={inputCls}
                    placeholder="e.g., FDA Approved"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80">Icon Key</label>
                  <input
                    type="text"
                    value={addForm.icon_key || ""}
                    onChange={(e) => setAddForm({ ...addForm, icon_key: e.target.value })}
                    className={inputCls}
                    placeholder="check-circle"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80">Sort Order</label>
                  <input
                    type="number"
                    value={addForm.sort_order || 0}
                    onChange={(e) => setAddForm({ ...addForm, sort_order: parseInt(e.target.value) })}
                    className={inputCls}
                  />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-white/80">
                    <input
                      type="checkbox"
                      checked={addForm.is_active === 1}
                      onChange={(e) => setAddForm({ ...addForm, is_active: e.target.checked ? 1 : 0 })}
                      className="h-4 w-4"
                    />
                    Active
                  </label>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="rounded-lg bg-[var(--admin-primary)] px-4 py-2 text-sm font-semibold text-black hover:bg-[var(--admin-primary-strong)]">
                  Create
                </button>
                <button type="button" onClick={() => setIsAdding(false)} className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/10">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </article>
      )}

      {items.length > 0 ? (
        <div className="grid gap-3">
          {items.map((item) => {
            const form = editForms[item.id] || {};
            const isSaving = savingIds.has(item.id);
            return (
              <article key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--admin-bg)]">
                <div className="p-4 sm:p-5">
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(item.id); }}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-white/80">Label</label>
                        <input
                          type="text"
                          value={form.label || ""}
                          onChange={(e) => handleFieldChange(item.id, "label", e.target.value)}
                          className={inputCls}
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-white/80">Icon Key</label>
                        <input
                          type="text"
                          value={form.icon_key || ""}
                          onChange={(e) => handleFieldChange(item.id, "icon_key", e.target.value)}
                          className={inputCls}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-white/80">Sort Order</label>
                        <input
                          type="number"
                          value={form.sort_order || 0}
                          onChange={(e) => handleFieldChange(item.id, "sort_order", parseInt(e.target.value))}
                          className={inputCls}
                        />
                      </div>
                      <div className="flex items-end pb-1">
                        <label className="flex cursor-pointer items-center gap-2 text-sm text-white/80">
                          <input
                            type="checkbox"
                            checked={form.is_active === 1}
                            onChange={(e) => handleFieldChange(item.id, "is_active", e.target.checked ? 1 : 0)}
                            className="h-4 w-4"
                          />
                          Active
                        </label>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="rounded-lg bg-[var(--admin-primary)] px-4 py-2 text-sm font-semibold text-black hover:bg-[var(--admin-primary-strong)] disabled:opacity-60"
                      >
                        {isSaving ? "Saving…" : "Save"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </form>
                </div>
              </article>
            );
          })}
        </div>
      ) : !isAdding ? (
        <div className="rounded-xl border border-white/10 bg-[var(--admin-bg)] p-6 text-white/70">
          No trust badges found.
        </div>
      ) : null}
    </section>
  );
}
