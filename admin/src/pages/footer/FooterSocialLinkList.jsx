import { useEffect, useState } from "react";
import { getFooterSocialLinks, createFooterSocialLink, updateFooterSocialLink, deleteFooterSocialLink } from "../../api/footerApi";

const ICON_OPTIONS = ["facebook", "instagram", "x", "linkedin"];

export default function FooterSocialLinkList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [savingId, setSavingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [addForm, setAddForm] = useState({ platform: "", icon_key: "facebook", url: "", sort_order: 0, is_active: 1 });
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
      const res = await getFooterSocialLinks();
      setItems(Array.isArray(res?.data?.data) ? res.data.data : []);
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to load social links");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  const handleSave = async (id) => {
    try {
      setSavingId(id);
      await updateFooterSocialLink(id, editForm);
      setEditingId(null);
      setEditForm({});
      setToast({ show: true, text: "Link saved successfully" });
      await loadItems();
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to save social link");
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this link?")) return;
    try {
      await deleteFooterSocialLink(id);
      setToast({ show: true, text: "Link deleted successfully" });
      await loadItems();
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to delete social link");
    }
  };

  const handleCreate = async () => {
    if (!addForm.platform.trim() || !addForm.url.trim()) {
      setError("Platform and URL are required");
      return;
    }
    try {
      await createFooterSocialLink(addForm);
      setIsAdding(false);
      setAddForm({ platform: "", icon_key: "facebook", url: "", sort_order: 0, is_active: 1 });
      setToast({ show: true, text: "Social link created successfully" });
      await loadItems();
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to create social link");
    }
  };

  if (loading) return <p className="text-white/70">Loading social links…</p>;

  return (
    <section className="space-y-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Footer Social Links</h2>
          <p className="text-sm text-white/65">Manage the social media links shown in the footer.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="inline-flex w-fit rounded-xl bg-[var(--admin-primary)] px-5 py-2.5 font-semibold text-black hover:bg-[var(--admin-primary-strong)]"
        >
          + Add Account
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
                  <label className="mb-2 block text-sm font-medium text-white/80">Platform</label>
                  <input
                    type="text"
                    value={addForm.platform || ""}
                    onChange={(e) => setAddForm({ ...addForm, platform: e.target.value })}
                    className="w-full rounded-lg border border-white/20 bg-[var(--admin-card)] px-3 py-2 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[var(--admin-primary)]"
                    placeholder="e.g., YouTube"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80">Icon</label>
                  <select
                    value={addForm.icon_key}
                    onChange={(e) => setAddForm({ ...addForm, icon_key: e.target.value })}
                    className="w-full rounded-lg border border-white/20 bg-[var(--admin-card)] px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[var(--admin-primary)]"
                  >
                    {ICON_OPTIONS.map((key) => (
                      <option key={key} value={key}>{key}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">URL</label>
                <input
                  type="text"
                  value={addForm.url || ""}
                  onChange={(e) => setAddForm({ ...addForm, url: e.target.value })}
                  className="w-full rounded-lg border border-white/20 bg-[var(--admin-card)] px-3 py-2 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[var(--admin-primary)]"
                  placeholder="https://youtube.com/@yourchannel"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80">Sort Order</label>
                  <input
                    type="number"
                    value={addForm.sort_order || 0}
                    onChange={(e) => setAddForm({ ...addForm, sort_order: parseInt(e.target.value) })}
                    className="w-full rounded-lg border border-white/20 bg-[var(--admin-card)] px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[var(--admin-primary)]"
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
                <button
                  type="submit"
                  className="rounded-lg bg-[var(--admin-primary)] px-4 py-2 text-sm font-semibold text-black hover:bg-[var(--admin-primary-strong)]"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </article>
      )}

      {items.length === 0 && !isAdding ? (
        <div className="rounded-xl border border-white/10 bg-[var(--admin-bg)] p-6 text-white/70">
          No social links found.
        </div>
      ) : (
        <div className="grid gap-3">
          {items.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--admin-bg)]">
              <div className="p-4 sm:p-5">
                {editingId === item.id ? (
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(item.id); }}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-white/80">Platform</label>
                        <input
                          type="text"
                          value={editForm.platform || ""}
                          onChange={(e) => setEditForm({ ...editForm, platform: e.target.value })}
                          className="w-full rounded-lg border border-white/20 bg-[var(--admin-card)] px-3 py-2 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[var(--admin-primary)]"
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-white/80">Icon Key</label>
                        <input
                          type="text"
                          value={editForm.icon_key || ""}
                          onChange={(e) => setEditForm({ ...editForm, icon_key: e.target.value })}
                          className="w-full rounded-lg border border-white/20 bg-[var(--admin-card)] px-3 py-2 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[var(--admin-primary)]"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/80">URL</label>
                      <input
                        type="text"
                        value={editForm.url || ""}
                        onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                        className="w-full rounded-lg border border-white/20 bg-[var(--admin-card)] px-3 py-2 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[var(--admin-primary)]"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-white/80">Sort Order</label>
                        <input
                          type="number"
                          value={editForm.sort_order || 0}
                          onChange={(e) => setEditForm({ ...editForm, sort_order: parseInt(e.target.value) })}
                          className="w-full rounded-lg border border-white/20 bg-[var(--admin-card)] px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[var(--admin-primary)]"
                        />
                      </div>
                      <div className="flex items-end pb-1">
                        <label className="flex cursor-pointer items-center gap-2 text-sm text-white/80">
                          <input
                            type="checkbox"
                            checked={editForm.is_active === 1}
                            onChange={(e) => setEditForm({ ...editForm, is_active: e.target.checked ? 1 : 0 })}
                            className="h-4 w-4"
                          />
                          Active
                        </label>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        disabled={savingId === item.id}
                        className="rounded-lg bg-[var(--admin-primary)] px-4 py-2 text-sm font-semibold text-black hover:bg-[var(--admin-primary-strong)] disabled:opacity-60"
                      >
                        {savingId === item.id ? "Saving…" : "Save"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-white">{item.platform}</h3>
                      <p className="text-sm text-white/65">{item.url}</p>
                      <div className="mt-2 flex items-center gap-3 text-xs text-white/40">
                        <span>Icon: {item.icon_key}</span>
                        <span>Sort: {item.sort_order}</span>
                        <span>{item.is_active ? "✓ Active" : "✗ Inactive"}</span>
                      </div>
                    </div>
                    <div className="flex w-full flex-wrap gap-2 sm:w-auto">
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="rounded-lg bg-[#1f8b4c] px-4 py-2 text-sm text-white hover:bg-[var(--admin-primary-strong)]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
