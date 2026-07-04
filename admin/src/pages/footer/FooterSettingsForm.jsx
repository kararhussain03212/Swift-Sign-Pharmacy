import { useEffect, useState } from "react";
import { getFooterSettings, updateFooterSettings } from "../../api/footerApi";

const inputCls = "w-full rounded-lg border border-white/20 bg-[var(--admin-card)] px-3 py-2 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[var(--admin-primary)]";
const labelCls = "mb-1 block text-sm font-medium text-white/80";

export default function FooterSettingsForm() {
  const [form, setForm] = useState({
    copyright_text: "",
    funded_by_text: "",
    app_download_title: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getFooterSettings();
      if (res?.data?.data) {
        setForm(res.data.data);
      }
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const setField = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateFooterSettings(form);
      setMessage("Settings saved successfully");
      setError("");
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to save settings");
      setMessage("");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-white/60">Loading…</p>;

  return (
    <section className="mx-auto max-w-2xl space-y-5">
      <header>
        <h2 className="text-3xl font-bold text-white">Footer Settings</h2>
        <p className="text-sm text-white/65">Customize footer text and attribution information.</p>
      </header>

      {message ? <div className="rounded-lg border border-[rgba(15,175,184,0.30)] bg-[rgba(15,175,184,0.10)] px-4 py-3 text-sm text-[#0FAFB8]">{message}</div> : null}
      {error ? <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div> : null}

      <form onSubmit={handleSave} className="space-y-4 rounded-2xl border border-white/10 bg-[var(--admin-bg)] p-6">
        <div>
          <label className={labelCls}>Copyright Text *</label>
          <textarea
            required
            rows={2}
            className={inputCls}
            value={form.copyright_text || ""}
            onChange={(e) => setField("copyright_text", e.target.value)}
            placeholder="© 2026 Company Name - All rights reserved"
          />
          <p className="mt-1 text-xs text-white/60">The copyright notice shown at the bottom of the footer</p>
        </div>

        <div>
          <label className={labelCls}>Funded By Text (optional)</label>
          <textarea
            rows={2}
            className={inputCls}
            value={form.funded_by_text || ""}
            onChange={(e) => setField("funded_by_text", e.target.value)}
            placeholder="Funded by Company Name"
          />
          <p className="mt-1 text-xs text-white/60">Optional funding or sponsor information</p>
        </div>

        <div>
          <label className={labelCls}>App Download Section Title</label>
          <input
            type="text"
            className={inputCls}
            value={form.app_download_title || ""}
            onChange={(e) => setField("app_download_title", e.target.value)}
            placeholder="Download Our App"
          />
          <p className="mt-1 text-xs text-white/60">The heading shown next to the app store badges in the footer</p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-[var(--admin-primary)] px-5 py-2 font-semibold text-black hover:bg-[var(--admin-primary-strong)] disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Settings"}
          </button>
        </div>
      </form>
    </section>
  );
}
