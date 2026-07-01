import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTrustBadge, getTrustBadge, updateTrustBadge } from "../../api/trustBadgeApi";

const ICON_OPTIONS = [
  { value: "truck", label: "Truck (shipping)" },
  { value: "dollar-sign", label: "Dollar Sign (guarantee)" },
  { value: "headset", label: "Headset (support)" },
  { value: "credit-card", label: "Credit Card (payment)" },
  { value: "shield", label: "Shield" },
  { value: "check-circle", label: "Check Circle" },
  { value: "clock", label: "Clock" },
  { value: "gift", label: "Gift" },
];

const getInitialForm = () => ({
  icon_key: "truck",
  title: "",
  subtitle: "",
  sort_order: 1,
  is_active: true,
});

export default function TrustBadgeForm() {
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
        const res = await getTrustBadge(id);
        const item = res.data?.data ?? {};
        setForm({
          icon_key: item.icon_key || "truck",
          title: item.title || "",
          subtitle: item.subtitle || "",
          sort_order: Number(item.sort_order ?? 1),
          is_active: Boolean(Number(item.is_active ?? 1)),
        });
      } catch {
        setError("Failed to load trust badge.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) { setError("Title is required."); return; }
    if (!form.subtitle.trim()) { setError("Subtitle is required."); return; }

    try {
      setSaving(true);

      const payload = {
        icon_key: form.icon_key,
        title: form.title.trim(),
        subtitle: form.subtitle.trim(),
        sort_order: Number(form.sort_order || 1),
        is_active: form.is_active ? 1 : 0,
      };

      if (isEditMode) await updateTrustBadge(id, payload);
      else await createTrustBadge(payload);

      navigate("/trust-badges");
    } catch (err) {
      setError(err?.response?.data?.error || err?.response?.data?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-white/70">Loading…</div>;

  const inputCls = "w-full rounded-lg border border-white/20 bg-[var(--admin-card)] px-3 py-2 text-white";
  const labelCls = "mb-1 block text-sm text-white/80";

  return (
    <section className="mx-auto max-w-2xl">
      <h2 className="mb-4 text-2xl font-bold text-white">
        {isEditMode ? "Edit Trust Badge" : "Add Trust Badge"}
      </h2>

      {error && <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-[var(--admin-bg)] p-6">
        <div>
          <label className={labelCls}>Icon</label>
          <select value={form.icon_key} onChange={(e) => setField("icon_key", e.target.value)} className={inputCls}>
            {ICON_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>

        <div>
          <label className={labelCls}>Title</label>
          <input value={form.title} onChange={(e) => setField("title", e.target.value)} className={inputCls} placeholder="FREE SHIPPING" />
        </div>

        <div>
          <label className={labelCls}>Subtitle</label>
          <input value={form.subtitle} onChange={(e) => setField("subtitle", e.target.value)} className={inputCls} placeholder="Orders over $130" />
        </div>

        <div>
          <label className={labelCls}>Sort Order</label>
          <input type="number" min="1" value={form.sort_order} onChange={(e) => setField("sort_order", Number(e.target.value))} className={`${inputCls} w-24`} />
        </div>

        <label className="flex items-center gap-2 text-sm text-white/80">
          <input type="checkbox" checked={form.is_active} onChange={(e) => setField("is_active", e.target.checked)} />
          Active (visible on the homepage)
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="submit" disabled={saving} className="rounded-xl bg-[var(--admin-primary)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--admin-primary-strong)] disabled:opacity-60">
            {saving ? "Saving…" : isEditMode ? "Update Badge" : "Add Badge"}
          </button>
          <button type="button" onClick={() => navigate("/trust-badges")} className="rounded-xl border border-white/20 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/5">
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
