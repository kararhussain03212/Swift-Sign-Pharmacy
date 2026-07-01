import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStoreLocatorContent, updateStoreLocatorContent } from "../../api/storeLocatorContentApi";

const getInitialForm = () => ({
  page_title: "Store Locator",
  page_subtitle: "",
  network_eyebrow: "Our Network",
  network_heading: "",
  network_paragraph: "",
  outlets_eyebrow: "Our Retail Outlets",
  outlets_heading: "",
  outlets_paragraph: "",
});

export default function StoreLocatorContentForm() {
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
        const res = await getStoreLocatorContent();
        const item = res.data?.data ?? {};
        setForm({
          page_title: item.page_title || "Store Locator",
          page_subtitle: item.page_subtitle || "",
          network_eyebrow: item.network_eyebrow || "Our Network",
          network_heading: item.network_heading || "",
          network_paragraph: item.network_paragraph || "",
          outlets_eyebrow: item.outlets_eyebrow || "Our Retail Outlets",
          outlets_heading: item.outlets_heading || "",
          outlets_paragraph: item.outlets_paragraph || "",
        });
      } catch {
        setError("Failed to load page content.");
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
        page_title: form.page_title.trim() || "Store Locator",
        page_subtitle: form.page_subtitle.trim(),
        network_eyebrow: form.network_eyebrow.trim(),
        network_heading: form.network_heading.trim(),
        network_paragraph: form.network_paragraph.trim(),
        outlets_eyebrow: form.outlets_eyebrow.trim(),
        outlets_heading: form.outlets_heading.trim(),
        outlets_paragraph: form.outlets_paragraph.trim(),
      };

      await updateStoreLocatorContent(payload);
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

  if (loading) return <div className="text-white/70">Loading…</div>;

  const inputCls = "w-full rounded-lg border border-white/20 bg-[var(--admin-card)] px-3 py-2 text-white";
  const textareaCls = `${inputCls} min-h-[90px]`;
  const labelCls = "mb-1 block text-sm text-white/80";

  return (
    <section className="mx-auto max-w-2xl space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Store Locator — Page Content</h2>
        <p className="text-sm text-white/65">Header, network stats section, and retail outlets section copy.</p>
      </div>

      {error && <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">{error}</div>}
      {saved && <div className="rounded-lg border border-[var(--admin-primary)]/40 bg-[var(--admin-primary-light)] px-4 py-3 text-[var(--admin-primary)]">Content saved.</div>}

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-[var(--admin-bg)] p-6">
        <h3 className="text-sm font-bold uppercase tracking-wide text-white/50">Page Header</h3>
        <div>
          <label className={labelCls}>Page Title</label>
          <input value={form.page_title} onChange={(e) => setField("page_title", e.target.value)} className={inputCls} placeholder="Store Locator" />
        </div>
        <div>
          <label className={labelCls}>Page Subtitle</label>
          <input value={form.page_subtitle} onChange={(e) => setField("page_subtitle", e.target.value)} className={inputCls} placeholder="Find your nearest Swift Pharmacy outlet..." />
        </div>

        <hr className="border-white/10" />
        <h3 className="text-sm font-bold uppercase tracking-wide text-white/50">"Our Network" Section</h3>
        <div>
          <label className={labelCls}>Eyebrow Label</label>
          <input value={form.network_eyebrow} onChange={(e) => setField("network_eyebrow", e.target.value)} className={inputCls} placeholder="Our Network" />
        </div>
        <div>
          <label className={labelCls}>Heading</label>
          <input value={form.network_heading} onChange={(e) => setField("network_heading", e.target.value)} className={inputCls} placeholder="Pharmacy Chain In The GCC" />
        </div>
        <div>
          <label className={labelCls}>Paragraph</label>
          <textarea value={form.network_paragraph} onChange={(e) => setField("network_paragraph", e.target.value)} className={textareaCls} />
        </div>

        <hr className="border-white/10" />
        <h3 className="text-sm font-bold uppercase tracking-wide text-white/50">"Our Retail Outlets" Section</h3>
        <div>
          <label className={labelCls}>Eyebrow Label</label>
          <input value={form.outlets_eyebrow} onChange={(e) => setField("outlets_eyebrow", e.target.value)} className={inputCls} placeholder="Our Retail Outlets" />
        </div>
        <div>
          <label className={labelCls}>Heading</label>
          <input value={form.outlets_heading} onChange={(e) => setField("outlets_heading", e.target.value)} className={inputCls} placeholder="Supportive Personal Care In A Comfortable Environment" />
        </div>
        <div>
          <label className={labelCls}>Paragraph</label>
          <textarea value={form.outlets_paragraph} onChange={(e) => setField("outlets_paragraph", e.target.value)} className={textareaCls} />
        </div>

        <div className="sticky bottom-4 flex justify-end pt-2">
          <button type="submit" disabled={saving} className="rounded-lg bg-[var(--admin-primary)] px-6 py-2.5 font-semibold text-white hover:bg-[var(--admin-primary-strong)] disabled:opacity-60">
            {saving ? "Saving…" : "Save Content"}
          </button>
        </div>
      </form>
    </section>
  );
}
