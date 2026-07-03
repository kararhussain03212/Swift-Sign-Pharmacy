import { useEffect, useState } from "react";
import api from "../../api/axios";
import { getBackendRoot } from "../../api/runtimeApi";
import { getFooterCompanyInfo, updateFooterCompanyInfo } from "../../api/footerApi";

const inputCls = "w-full rounded-lg border border-white/20 bg-[var(--admin-card)] px-3 py-2 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[var(--admin-primary)]";
const labelCls = "mb-1 block text-sm font-medium text-white/80";

const resolveImageUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${getBackendRoot()}${path.startsWith("/") ? "" : "/"}${path}`;
};

export default function FooterCompanyInfoForm() {
  const [form, setForm] = useState({
    logo_url: "",
    address: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getFooterCompanyInfo();
      if (res?.data?.data) {
        setForm(res.data.data);
      }
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to load company info");
    } finally {
      setLoading(false);
    }
  };

  const setField = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "settings");

      const res = await api.post("/admin/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const uploadedPath = res.data?.data?.path;
      if (uploadedPath) {
        setField("logo_url", uploadedPath);
        setMessage("Image uploaded successfully");
        setError("");
      } else {
        throw new Error("No path returned from upload");
      }
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateFooterCompanyInfo(form);
      setMessage("Company info saved successfully");
      setError("");
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to save company info");
      setMessage("");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-white/60">Loading…</p>;

  return (
    <section className="mx-auto max-w-2xl space-y-5">
      <header>
        <h2 className="text-3xl font-bold text-white">Footer Company Info</h2>
        <p className="text-sm text-white/65">Manage company details shown in the footer.</p>
      </header>

      {message ? <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">{message}</div> : null}
      {error ? <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div> : null}

      <form onSubmit={handleSave} className="space-y-4 rounded-2xl border border-white/10 bg-[var(--admin-bg)] p-6">
        <div>
          <label className={labelCls}>Logo Image (optional)</label>
          <div className="space-y-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="block w-full text-sm text-white/70 file:mr-3 file:rounded-lg file:border-0 file:bg-[var(--admin-primary)] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-black hover:file:bg-[var(--admin-primary-strong)] disabled:opacity-60"
            />
            {form.logo_url && (
              <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                <p className="mb-2 text-xs text-white/60">Current logo:</p>
                <img src={resolveImageUrl(form.logo_url)} alt="Company logo" className="h-16 w-auto rounded" />
                <p className="mt-2 truncate text-xs text-white/50">{form.logo_url}</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className={labelCls}>Address *</label>
          <input
            type="text"
            required
            className={inputCls}
            value={form.address || ""}
            onChange={(e) => setField("address", e.target.value)}
            placeholder="Street address, city, country"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Email *</label>
            <input
              type="email"
              required
              className={inputCls}
              value={form.email || ""}
              onChange={(e) => setField("email", e.target.value)}
              placeholder="contact@example.com"
            />
          </div>
          <div>
            <label className={labelCls}>Phone *</label>
            <input
              type="tel"
              required
              className={inputCls}
              value={form.phone || ""}
              onChange={(e) => setField("phone", e.target.value)}
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-[var(--admin-primary)] px-5 py-2 font-semibold text-black hover:bg-[var(--admin-primary-strong)] disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Company Info"}
          </button>
        </div>
      </form>
    </section>
  );
}
