import { useEffect, useState } from "react";
import { getCertificationPageContent, updateCertificationPageContent } from "../../api/certificationApi";

const inputCls = "w-full rounded-lg border border-white/20 bg-[var(--admin-card)] px-3 py-2 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[var(--admin-primary)]";
const labelCls = "mb-1 block text-sm font-medium text-white/80";

export default function CertificationPageContentForm() {
  const [form, setForm] = useState({
    hero_badge_text: "",
    hero_heading: "",
    hero_subheading: "",
    trust_heading: "",
    trust_paragraph: "",
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
      const res = await getCertificationPageContent();
      if (res?.data?.data) {
        setForm(res.data.data);
      }
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to load page content");
    } finally {
      setLoading(false);
    }
  };

  const setField = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateCertificationPageContent(form);
      setMessage("Page content saved successfully");
      setError("");
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to save page content");
      setMessage("");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-white/60">Loading…</p>;

  return (
    <section className="mx-auto max-w-2xl space-y-5">
      <header>
        <h2 className="text-3xl font-bold text-white">Certifications — Page Content</h2>
        <p className="text-sm text-white/65">Manage the hero and trust section copy on the Certifications page.</p>
      </header>

      {message ? <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">{message}</div> : null}
      {error ? <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div> : null}

      <form onSubmit={handleSave} className="space-y-4 rounded-2xl border border-white/10 bg-[var(--admin-bg)] p-6">
        <h3 className="text-sm font-bold uppercase tracking-wide text-white/50">Hero Section</h3>

        <div>
          <label className={labelCls}>Badge Text *</label>
          <input
            type="text"
            required
            className={inputCls}
            value={form.hero_badge_text || ""}
            onChange={(e) => setField("hero_badge_text", e.target.value)}
            placeholder="VERIFIED & LICENSED"
          />
        </div>

        <div>
          <label className={labelCls}>Heading *</label>
          <input
            type="text"
            required
            className={inputCls}
            value={form.hero_heading || ""}
            onChange={(e) => setField("hero_heading", e.target.value)}
            placeholder="Our Certifications"
          />
        </div>

        <div>
          <label className={labelCls}>Subheading *</label>
          <textarea
            required
            rows={3}
            className={inputCls}
            value={form.hero_subheading || ""}
            onChange={(e) => setField("hero_subheading", e.target.value)}
            placeholder="Fully licensed and certified by the relevant authorities..."
          />
        </div>

        <h3 className="pt-2 text-sm font-bold uppercase tracking-wide text-white/50">Trust Section</h3>

        <div>
          <label className={labelCls}>Trust Heading *</label>
          <input
            type="text"
            required
            className={inputCls}
            value={form.trust_heading || ""}
            onChange={(e) => setField("trust_heading", e.target.value)}
            placeholder="100% Verified & Licensed"
          />
        </div>

        <div>
          <label className={labelCls}>Trust Paragraph *</label>
          <textarea
            required
            rows={4}
            className={inputCls}
            value={form.trust_paragraph || ""}
            onChange={(e) => setField("trust_paragraph", e.target.value)}
            placeholder="Every product we sell is sourced from certified manufacturers..."
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-[var(--admin-primary)] px-5 py-2 font-semibold text-black hover:bg-[var(--admin-primary-strong)] disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Page Content"}
          </button>
        </div>
      </form>
    </section>
  );
}
