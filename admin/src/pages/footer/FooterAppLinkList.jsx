import { useEffect, useState } from "react";
import api from "../../api/axios";
import { getBackendRoot } from "../../api/runtimeApi";
import { getFooterAppLinks, updateFooterAppLink, deleteFooterAppLink } from "../../api/footerApi";

const inputCls = "w-full rounded-lg border border-white/20 bg-[var(--admin-card)] px-3 py-2 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[var(--admin-primary)]";
const labelCls = "mb-2 block text-sm font-medium text-white/80";

const resolveImageUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${getBackendRoot()}${path.startsWith("/") ? "" : "/"}${path}`;
};

export default function FooterAppLinkList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editForms, setEditForms] = useState({});
  const [savingIds, setSavingIds] = useState(new Set());
  const [uploadingIds, setUploadingIds] = useState(new Set());
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
      const res = await getFooterAppLinks();
      const data = Array.isArray(res?.data?.data) ? res.data.data : [];
      setItems(data);
      const forms = {};
      data.forEach((item) => {
        forms[item.id] = { ...item };
      });
      setEditForms(forms);
      setError("");
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to load app links");
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (id, field, value) => {
    setEditForms((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleImageUpload = async (id, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingIds((prev) => new Set([...prev, id]));
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "settings");

      const res = await api.post("/admin/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedPath = res.data?.data?.path;
      if (uploadedPath) {
        handleFieldChange(id, "badge_image_url", uploadedPath);
        setToast({ show: true, text: "Image uploaded — click Save to apply" });
      } else {
        throw new Error("No path returned from upload");
      }
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to upload image");
    } finally {
      setUploadingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const handleSave = async (id) => {
    try {
      setSavingIds((prev) => new Set([...prev, id]));
      await updateFooterAppLink(id, editForms[id]);
      setToast({ show: true, text: "App link saved successfully" });
      await loadItems();
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to save app link");
    } finally {
      setSavingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this app link?")) return;
    try {
      await deleteFooterAppLink(id);
      setToast({ show: true, text: "App link deleted successfully" });
      await loadItems();
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to delete app link");
    }
  };

  if (loading) return <p className="text-white/70">Loading app links…</p>;

  return (
    <section className="space-y-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Footer App Links</h2>
          <p className="text-sm text-white/65">Manage the app download badges shown in the footer.</p>
        </div>
      </header>

      {toast.show && (
        <div className="fixed right-5 top-5 z-[220] rounded-xl border border-[rgba(15,175,184,0.30)] bg-[#0998A0] px-4 py-2 text-sm font-medium text-white shadow-lg">
          {toast.text}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">{error}</div>
      )}

      {items.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[var(--admin-bg)] p-6 text-white/70">
          No app links found.
        </div>
      ) : (
        <div className="grid gap-3">
          {items.map((item) => {
            const form = editForms[item.id] || {};
            const isUploading = uploadingIds.has(item.id);
            const isSaving = savingIds.has(item.id);
            return (
              <article key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--admin-bg)]">
                <div className="p-4 sm:p-5">
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(item.id); }}>
                    <input
                      type="text"
                      value={form.label || ""}
                      onChange={(e) => handleFieldChange(item.id, "label", e.target.value)}
                      className={inputCls}
                      placeholder="Description, e.g. Download on the App Store"
                      required
                    />

                    <div className="space-y-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(item.id, e)}
                        disabled={isUploading}
                        className="block w-full text-sm text-white/70 file:mr-3 file:rounded-lg file:border-0 file:bg-[var(--admin-primary)] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-black hover:file:bg-[var(--admin-primary-strong)] disabled:opacity-60"
                      />
                      {isUploading && <p className="text-xs text-white/60">Uploading…</p>}
                      {form.badge_image_url && (
                        <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                          <img src={resolveImageUrl(form.badge_image_url)} alt="Badge preview" className="h-10 w-auto rounded" />
                          <p className="mt-2 truncate text-xs text-white/50">{form.badge_image_url}</p>
                        </div>
                      )}
                    </div>

                    <input
                      type="text"
                      value={form.url || ""}
                      onChange={(e) => handleFieldChange(item.id, "url", e.target.value)}
                      className={inputCls}
                      placeholder="Link URL, e.g. https://apps.apple.com/..."
                      required
                    />

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
      )}
    </section>
  );
}
