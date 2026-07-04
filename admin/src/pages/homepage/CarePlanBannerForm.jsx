import { useEffect, useState } from "react";
import { getHomepageCarePlanBanner, updateHomepageCarePlanBanner } from "../../api/homepageCarePlanBannerApi";

const inputCls = "w-full rounded-lg border border-white/20 bg-[var(--admin-card)] px-3 py-2 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[var(--admin-primary)]";
const labelCls = "mb-1 block text-sm text-white/80";

const EMPTY = { eyebrow: "", heading: "", description: "", button_text: "", button_link: "" };

export default function CarePlanBannerForm() {
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHomepageCarePlanBanner()
      .then((res) => {
        const d = res?.data?.data || {};
        setForm({
          eyebrow: d.eyebrow || "",
          heading: d.heading || "",
          description: d.description || "",
          button_text: d.button_text || "",
          button_link: d.button_link || "",
        });
      })
      .catch(() => setError("Failed to load care plan banner."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const setField = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await updateHomepageCarePlanBanner(form);
      setToast("Care Plan banner saved!");
    } catch {
      setError("Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-white/70">Loading…</p>;

  return (
    <section className="mx-auto max-w-2xl space-y-5">
      <header>
        <h2 className="text-3xl font-bold text-white">Care Plan Banner</h2>
        <p className="mt-1 text-sm text-white/65">The light-teal "Get Healthier Together" CTA banner on the homepage.</p>
      </header>

      {toast ? <div className="rounded-xl bg-[#0998A0]/80 px-4 py-2.5 text-sm font-medium text-white">{toast}</div> : null}
      {error ? <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div> : null}

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-[var(--admin-bg)] p-6">
        <div>
          <label className={labelCls}>Eyebrow Label</label>
          <input className={inputCls} value={form.eyebrow} onChange={(e) => setField("eyebrow", e.target.value)} placeholder="CARE PLAN" />
        </div>
        <div>
          <label className={labelCls}>Heading</label>
          <input className={inputCls} value={form.heading} onChange={(e) => setField("heading", e.target.value)} placeholder="Get Healthier Together" />
        </div>
        <div>
          <label className={labelCls}>Description</label>
          <textarea rows={2} className={inputCls} value={form.description} onChange={(e) => setField("description", e.target.value)} placeholder="Book 2 Packages And Get Flat 25% Off On the Second Package" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Button Text</label>
            <input className={inputCls} value={form.button_text} onChange={(e) => setField("button_text", e.target.value)} placeholder="BOOK NOW" />
          </div>
          <div>
            <label className={labelCls}>Button Link</label>
            <input className={inputCls} value={form.button_link} onChange={(e) => setField("button_link", e.target.value)} placeholder="/care-plans" />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-[var(--admin-primary)] px-6 py-2.5 font-semibold text-black hover:bg-[var(--admin-primary-strong)] disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </section>
  );
}
