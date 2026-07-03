import { useEffect, useState } from "react";
import api from "../../api/axios";
import { getBackendRoot } from "../../api/runtimeApi";
import {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
  getCertificationCategories,
} from "../../api/certificationApi";

const inputCls = "w-full rounded-lg border border-white/20 bg-[var(--admin-card)] px-3 py-2 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[var(--admin-primary)]";

// Legacy certificate images (seeded from the pre-existing static component) live under
// public/certification/ on the main storefront app, not this admin app — resolve them
// against the storefront's own origin rather than the admin's or the backend's.
const getSiteRoot = () => {
  const envSiteUrl = String(import.meta.env.VITE_SITE_URL || "").replace(/\/+$/, "");
  if (envSiteUrl) return envSiteUrl;
  if (import.meta.env.DEV) return "http://localhost:5173";
  return typeof window !== "undefined" ? window.location.origin : "";
};

const resolveImageUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith("/uploads/")) return `${getBackendRoot()}${path}`;
  const encoded = path.split("/").map((seg, i) => (i === 0 ? seg : encodeURIComponent(seg))).join("/");
  return `${getSiteRoot()}${encoded}`;
};

const emptyForm = () => ({
  category_id: "",
  title: "",
  type_tag: "",
  certificate_image_url: "",
  is_primary_license: 0,
  is_active: 1,
  sort_order: 0,
});

export default function CertificationList() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [meta, setMeta] = useState({ page: 1, per_page: 12, total: 0, total_pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ show: false, text: "" });

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeTagFilter, setTypeTagFilter] = useState("");
  const [page, setPage] = useState(1);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(emptyForm());
  const [isAdding, setIsAdding] = useState(false);
  const [addForm, setAddForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!toast.show) return;
    const t = setTimeout(() => setToast({ show: false, text: "" }), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    getCertificationCategories()
      .then((res) => setCategories(Array.isArray(res?.data?.data) ? res.data.data : []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadItems();
  }, [page, search, categoryFilter, typeTagFilter]);

  const loadItems = async () => {
    try {
      setLoading(true);
      const res = await getCertifications({
        page,
        per_page: 12,
        search: search || undefined,
        category_id: categoryFilter || undefined,
        type_tag: typeTagFilter || undefined,
      });
      const body = res?.data?.data;
      setItems(Array.isArray(body?.data) ? body.data : []);
      setMeta(body?.meta || { page: 1, per_page: 12, total: 0, total_pages: 1 });
      setError("");
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to load certificates");
    } finally {
      setLoading(false);
    }
  };

  const categoryName = (id) => categories.find((c) => String(c.id) === String(id))?.name || "—";

  const handleImageUpload = async (e, target) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "certifications");
      const res = await api.post("/admin/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const path = res.data?.data?.path;
      if (!path) throw new Error("No path returned from upload");
      if (target === "add") setAddForm((p) => ({ ...p, certificate_image_url: path }));
      else setEditForm((p) => ({ ...p, certificate_image_url: path }));
      setToast({ show: true, text: "Image uploaded" });
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditForm({ ...item });
    setIsAdding(false);
  };

  const handleSave = async () => {
    if (!editForm.category_id || !editForm.title.trim() || !editForm.certificate_image_url) {
      setError("Category, title, and certificate image are required");
      return;
    }
    try {
      setSaving(true);
      await updateCertification(editingId, editForm);
      setEditingId(null);
      setToast({ show: true, text: "Certificate saved successfully" });
      await loadItems();
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to save certificate");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this certificate?")) return;
    try {
      await deleteCertification(id);
      setToast({ show: true, text: "Certificate deleted successfully" });
      await loadItems();
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to delete certificate");
    }
  };

  const handleCreate = async () => {
    if (!addForm.category_id || !addForm.title.trim() || !addForm.certificate_image_url) {
      setError("Category, title, and certificate image are required");
      return;
    }
    try {
      setSaving(true);
      await createCertification(addForm);
      setIsAdding(false);
      setAddForm(emptyForm());
      setToast({ show: true, text: "Certificate created successfully" });
      await loadItems();
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to create certificate");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="space-y-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Certificates</h2>
          <p className="text-sm text-white/65">Manage individual certificate records ({meta.total} total).</p>
        </div>
        <button
          type="button"
          onClick={() => { setIsAdding(true); setEditingId(null); setAddForm(emptyForm()); }}
          className="inline-flex w-fit rounded-xl bg-[var(--admin-primary)] px-5 py-2.5 font-semibold text-black hover:bg-[var(--admin-primary-strong)]"
        >
          + Add Certificate
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

      {/* Search / filter bar */}
      <div className="grid grid-cols-1 gap-3 rounded-2xl border border-white/10 bg-[var(--admin-bg)] p-4 sm:grid-cols-3">
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className={inputCls}
          placeholder="Search by title…"
        />
        <select
          value={categoryFilter}
          onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
          className={inputCls}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <input
          type="text"
          value={typeTagFilter}
          onChange={(e) => { setTypeTagFilter(e.target.value); setPage(1); }}
          className={inputCls}
          placeholder="Filter by type tag…"
        />
      </div>

      {isAdding && (
        <CertificateForm
          form={addForm}
          setForm={setAddForm}
          categories={categories}
          onSubmit={handleCreate}
          onCancel={() => setIsAdding(false)}
          onImageUpload={(e) => handleImageUpload(e, "add")}
          uploading={uploading}
          saving={saving}
          submitLabel="Create Certificate"
        />
      )}

      {loading ? (
        <p className="text-white/70">Loading certificates…</p>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[var(--admin-bg)] p-6 text-white/70">
          No certificates found.
        </div>
      ) : (
        <div className="grid gap-3">
          {items.map((item) =>
            editingId === item.id ? (
              <CertificateForm
                key={item.id}
                form={editForm}
                setForm={setEditForm}
                categories={categories}
                onSubmit={handleSave}
                onCancel={() => setEditingId(null)}
                onImageUpload={(e) => handleImageUpload(e, "edit")}
                uploading={uploading}
                saving={saving}
                submitLabel="Save"
              />
            ) : (
              <article key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--admin-bg)]">
                <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
                  <img
                    src={resolveImageUrl(item.certificate_image_url)}
                    alt={item.title}
                    className="h-16 w-24 flex-shrink-0 rounded-lg border border-white/10 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-sm text-white/65">{categoryName(item.category_id)}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-white/40">
                      {item.type_tag && <span>Tag: {item.type_tag}</span>}
                      <span>Sort: {item.sort_order}</span>
                      <span>{item.is_active ? "✓ Active" : "✗ Inactive"}</span>
                      {item.is_primary_license === 1 && <span className="text-[var(--admin-accent)]">★ Primary License</span>}
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
              </article>
            )
          )}
        </div>
      )}

      {meta.total_pages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/10 disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-sm text-white/60">Page {meta.page} of {meta.total_pages}</span>
          <button
            type="button"
            disabled={page >= meta.total_pages}
            onClick={() => setPage((p) => Math.min(meta.total_pages, p + 1))}
            className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/10 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}

function CertificateForm({ form, setForm, categories, onSubmit, onCancel, onImageUpload, uploading, saving, submitLabel }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--admin-bg)]">
      <div className="p-4 sm:p-5">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">Category *</label>
              <select
                value={form.category_id || ""}
                onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                className={inputCls}
                required
              >
                <option value="">Select a category…</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">Title *</label>
              <input
                type="text"
                value={form.title || ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={inputCls}
                placeholder="e.g., Academic Certification 1"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">Type Tag</label>
            <input
              type="text"
              value={form.type_tag || ""}
              onChange={(e) => setForm({ ...form, type_tag: e.target.value })}
              className={inputCls}
              placeholder="e.g., License, Diploma, Credential, Registration, Compliance"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">Certificate Image *</label>
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={onImageUpload}
                disabled={uploading}
                className="block w-full text-sm text-white/70 file:mr-3 file:rounded-lg file:border-0 file:bg-[var(--admin-primary)] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-black hover:file:bg-[var(--admin-primary-strong)] disabled:opacity-60"
              />
              {uploading && <p className="text-xs text-white/60">Uploading…</p>}
              {form.certificate_image_url && (
                <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                  <img src={resolveImageUrl(form.certificate_image_url)} alt="Certificate preview" className="h-24 w-auto rounded" />
                  <p className="mt-2 truncate text-xs text-white/50">{form.certificate_image_url}</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">Sort Order</label>
              <input
                type="number"
                value={form.sort_order || 0}
                onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                className={inputCls}
              />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-white/80">
                <input
                  type="checkbox"
                  checked={form.is_active === 1}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked ? 1 : 0 })}
                  className="h-4 w-4"
                />
                Active
              </label>
            </div>
            <div className="flex items-end pb-1">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-white/80">
                <input
                  type="checkbox"
                  checked={form.is_primary_license === 1}
                  onChange={(e) => setForm({ ...form, is_primary_license: e.target.checked ? 1 : 0 })}
                  className="h-4 w-4"
                />
                Primary License
              </label>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[var(--admin-primary)] px-4 py-2 text-sm font-semibold text-black hover:bg-[var(--admin-primary-strong)] disabled:opacity-60"
            >
              {saving ? "Saving…" : submitLabel}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </article>
  );
}
