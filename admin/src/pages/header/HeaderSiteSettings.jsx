import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHeaderSiteSettings, updateHeaderSiteSettings } from "../../api/headerSiteSettingsApi";
import { uploadImage } from "../../api/uploadApi";
import ImageUpload from "../../components/ImageUpload";

const getInitialForm = () => ({
  site_name: "Arion Pharmacy",
  hot_deals_link: "/shop?deals=true",
  hot_deals_enabled: true,
  country: "",
  license_number: "",
  logoFile: null,
  logoPreview: "",
});

export default function HeaderSiteSettings() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState(getInitialForm);

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    (async () => {
      try {
        const res = await getHeaderSiteSettings();
        const item = res.data?.data ?? {};
        setForm({
          site_name: item.site_name || "Arion Pharmacy",
          hot_deals_link: item.hot_deals_link || "/shop?deals=true",
          hot_deals_enabled: item.hot_deals_enabled === 1 || item.hot_deals_enabled === true,
          country: item.country || "",
          license_number: item.license_number || "",
          logoFile: null,
          logoPreview: item.logo_url || "",
        });
      } catch {
        setError("Failed to load site settings.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaved(false);

    try {
      setSaving(true);
      const payload = {
        site_name: form.site_name.trim() || "Arion Pharmacy",
        hot_deals_link: form.hot_deals_link.trim(),
        hot_deals_enabled: form.hot_deals_enabled ? 1 : 0,
        country: form.country.trim(),
        license_number: form.license_number.trim(),
      };

      if (form.logoFile) {
        const oldPath = form.logoPreview ? form.logoPreview.replace(/^.*\/uploads\//, "") : "";
        payload.logo_url = await uploadImage(form.logoFile, "settings", oldPath);
      } else if (form.logoPreview) {
        payload.logo_url = form.logoPreview.replace(/.*\/uploads\//, "");
      }

      await updateHeaderSiteSettings(payload);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      if (err?.response?.status === 401) {
        navigate("/login", { replace: true });
        return;
      }
      setError(err?.response?.data?.error || err?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="arion-theme text-[var(--arion-muted)]">Loading…</div>;

  const inputCls =
    "w-full rounded-lg border border-[var(--arion-border)] bg-[var(--arion-card-solid)] px-3 py-2 text-[var(--arion-ink)] focus:border-[var(--arion-cyan)] focus:outline-none";
  const labelCls = "mb-1 block text-sm text-[var(--arion-muted)]";

  return (
    <section className="arion-theme mx-auto max-w-2xl space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-[var(--arion-ink)] sm:text-3xl">Site Settings</h2>
        <p className="text-sm text-[var(--arion-muted)]">Logo, site name, country, and license details shown in the header.</p>
      </div>

      {error && (
        <div className="arion-glass rounded-lg border border-red-500/40 px-4 py-3 text-red-300">{error}</div>
      )}
      {saved && (
        <div className="arion-glass rounded-lg border border-[var(--arion-border-strong)] px-4 py-3 text-[var(--arion-cyan)]">
          Settings saved.
        </div>
      )}

      <form onSubmit={handleSubmit} className="arion-glass space-y-5 rounded-2xl p-6">
        <ImageUpload
          value={form.logoPreview}
          onFileSelect={(file) => setField("logoFile", file)}
          label="Upload Logo"
          helperText="PNG, JPG, JPEG, WebP, SVG"
        />

        <div>
          <label className={labelCls}>Site Name</label>
          <input value={form.site_name} onChange={(e) => setField("site_name", e.target.value)} className={inputCls} placeholder="Arion Pharmacy" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Country</label>
            <input value={form.country} onChange={(e) => setField("country", e.target.value)} className={inputCls} placeholder="Pakistan" />
          </div>
          <div>
            <label className={labelCls}>License Number</label>
            <input value={form.license_number} onChange={(e) => setField("license_number", e.target.value)} className={inputCls} placeholder="2659-A/2014-PC" />
          </div>
        </div>

        <div>
          <label className={labelCls}>Hot Deals Link</label>
          <input value={form.hot_deals_link} onChange={(e) => setField("hot_deals_link", e.target.value)} className={inputCls} placeholder="/shop?deals=true" />
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--arion-muted)]">
          <input
            type="checkbox"
            checked={form.hot_deals_enabled}
            onChange={(e) => setField("hot_deals_enabled", e.target.checked)}
            className="h-4 w-4"
          />
          Show "Hot Deals" button in header
        </label>

        <div className="sticky bottom-4 flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-[var(--arion-cyan)] px-6 py-2.5 font-semibold text-white hover:bg-[var(--arion-cyan-strong)] disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Settings"}
          </button>
        </div>
      </form>
    </section>
  );
}
