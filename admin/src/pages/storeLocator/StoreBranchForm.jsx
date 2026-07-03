import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createStoreBranch, getStoreBranch, updateStoreBranch } from "../../api/storeBranchApi";

const getInitialForm = () => ({
  name: "",
  address: "",
  area: "",
  city: "",
  map_embed_link: "",
  phone: "",
  hours_display: "",
  detail_slug: "",
  sort_order: 1,
  is_active: true,
});

export default function StoreBranchForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(getInitialForm);

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    if (!isEditMode) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const res = await getStoreBranch(id);
        const item = res.data?.data ?? {};
        setForm({
          name: item.name || "",
          address: item.address || "",
          area: item.area || "",
          city: item.city || "",
          map_embed_link: item.map_embed_link || "",
          phone: item.phone || "",
          hours_display: item.hours_display || "",
          detail_slug: item.detail_slug || "",
          sort_order: Number(item.sort_order ?? 1),
          is_active: item.is_active === 1 || item.is_active === true,
        });
      } catch {
        setError("Failed to load branch.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) { setError("Name is required."); return; }
    if (!form.address.trim()) { setError("Address is required."); return; }
    if (!form.area.trim()) { setError("Area is required."); return; }
    if (!form.city.trim()) { setError("City is required."); return; }
    if (!form.map_embed_link.trim()) { setError("Map embed link is required."); return; }
    if (!form.hours_display.trim()) { setError("Hours display text is required."); return; }

    try {
      setSaving(true);

      const payload = {
        name: form.name.trim(),
        address: form.address.trim(),
        area: form.area.trim(),
        city: form.city.trim(),
        map_embed_link: form.map_embed_link.trim(),
        phone: form.phone.trim(),
        hours_display: form.hours_display.trim(),
        detail_slug: form.detail_slug.trim(),
        sort_order: Number(form.sort_order || 1),
        is_active: form.is_active ? 1 : 0,
      };

      if (isEditMode) await updateStoreBranch(id, payload);
      else await createStoreBranch(payload);

      navigate("/store-locator/branches");
    } catch (err) {
      if (err?.response?.status === 401) {
        navigate("/login", { replace: true });
        return;
      }
      setError(err?.response?.data?.error || err?.response?.data?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-white/70">Loading…</div>;

  const inputCls = "w-full rounded-lg border border-white/20 bg-[var(--admin-card)] px-3 py-2 text-white";
  const labelCls = "mb-1 block text-sm text-white/80";

  return (
    <section className="mx-auto max-w-3xl">
      <h2 className="mb-4 text-2xl font-bold text-white">
        {isEditMode ? "Edit Branch" : "Add Branch"}
      </h2>

      {error && <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-[var(--admin-bg)] p-6">
        <div>
          <label className={labelCls}>Branch Name *</label>
          <input value={form.name} onChange={(e) => setField("name", e.target.value)} required className={inputCls} placeholder="Swift Pharmacy - Johar Town" />
        </div>

        <div>
          <label className={labelCls}>Address *</label>
          <input value={form.address} onChange={(e) => setField("address", e.target.value)} required className={inputCls} placeholder="12 Block C, Johar Town, Lahore, Punjab - 54000" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className={labelCls}>Area * (used for search)</label>
            <input value={form.area} onChange={(e) => setField("area", e.target.value)} required className={inputCls} placeholder="Johar Town" />
          </div>
          <div>
            <label className={labelCls}>City *</label>
            <input value={form.city} onChange={(e) => setField("city", e.target.value)} required className={inputCls} placeholder="Lahore" />
          </div>
        </div>

        <div>
          <label className={labelCls}>Map Embed Link *</label>
          <textarea value={form.map_embed_link} onChange={(e) => setField("map_embed_link", e.target.value)} required rows="3" className={`${inputCls} resize-none`} placeholder="Paste Google Maps embed code or iframe link here" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className={labelCls}>Phone</label>
            <input value={form.phone} onChange={(e) => setField("phone", e.target.value)} className={inputCls} placeholder="0300-1234567" />
          </div>
          <div>
            <label className={labelCls}>Detail Slug (leave blank to auto-generate)</label>
            <input value={form.detail_slug} onChange={(e) => setField("detail_slug", e.target.value)} className={inputCls} placeholder="swift-pharmacy-johar-town" />
          </div>
        </div>

        <div>
          <label className={labelCls}>Hours Display *</label>
          <input value={form.hours_display} onChange={(e) => setField("hours_display", e.target.value)} required className={inputCls} placeholder="Mon–Sat: 8:00 AM – 11:00 PM | Sun: 9:00 AM – 10:00 PM" />
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div>
            <label className={labelCls}>Sort Order</label>
            <input type="number" min="1" value={form.sort_order} onChange={(e) => setField("sort_order", Number(e.target.value))} className={`${inputCls} w-24`} />
          </div>
          <label className="mt-5 flex cursor-pointer items-center gap-2 text-sm text-white/80">
            <input type="checkbox" checked={form.is_active} onChange={(e) => setField("is_active", e.target.checked)} />
            Show on frontend
          </label>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="submit" disabled={saving} className="rounded-xl bg-[var(--admin-primary)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--admin-primary-strong)] disabled:opacity-60">
            {saving ? "Saving…" : isEditMode ? "Update Branch" : "Create Branch"}
          </button>
          <button type="button" onClick={() => navigate("/store-locator/branches")} className="rounded-xl border border-white/20 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/5">
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
