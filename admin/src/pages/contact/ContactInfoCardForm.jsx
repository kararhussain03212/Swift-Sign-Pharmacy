import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createContactInfoCard, getContactInfoCard, updateContactInfoCard } from "../../api/contactInfoCardApi";

const ICON_OPTIONS = [
  { value: "phone", label: "Phone" },
  { value: "mail", label: "Mail" },
  { value: "map-pin", label: "Map Pin" },
  { value: "clock", label: "Clock" },
];

const getInitialForm = () => ({
  icon_key: "phone",
  title: "",
  value_text: "",
  note_text: "",
  sort_order: 1,
});

export default function ContactInfoCardForm() {
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
        const res = await getContactInfoCard(id);
        const item = res.data?.data ?? {};
        setForm({
          icon_key: item.icon_key || "phone",
          title: item.title || "",
          value_text: item.value_text || "",
          note_text: item.note_text || "",
          sort_order: Number(item.sort_order ?? 1),
        });
      } catch {
        setError("Failed to load info card.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!form.value_text.trim()) {
      setError("Value text is required.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        icon_key: form.icon_key,
        title: form.title.trim(),
        value_text: form.value_text,
        note_text: form.note_text.trim(),
        sort_order: Number(form.sort_order || 1),
      };

      if (isEditMode) await updateContactInfoCard(id, payload);
      else await createContactInfoCard(payload);

      navigate("/contact-info-cards");
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
        {isEditMode ? "Edit Info Card" : "Add Info Card"}
      </h2>

      {error && <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-[var(--admin-bg)] p-6">
        <div>
          <label className={labelCls}>Icon</label>
          <select value={form.icon_key} onChange={(e) => setField("icon_key", e.target.value)} className={inputCls}>
            {ICON_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls}>Title</label>
          <input value={form.title} onChange={(e) => setField("title", e.target.value)} className={inputCls} placeholder="Call Us" />
        </div>

        <div>
          <label className={labelCls}>Value Text</label>
          <textarea
            rows={3}
            value={form.value_text}
            onChange={(e) => setField("value_text", e.target.value)}
            className={inputCls}
            placeholder={"+92 333 8399480\n(use a new line for multi-line values, e.g. Working Hours)"}
          />
        </div>

        <div>
          <label className={labelCls}>Note Text</label>
          <input value={form.note_text} onChange={(e) => setField("note_text", e.target.value)} className={inputCls} placeholder="Mon-Sat, 9am-9pm" />
        </div>

        <div>
          <label className={labelCls}>Sort Order</label>
          <input type="number" min="1" value={form.sort_order} onChange={(e) => setField("sort_order", Number(e.target.value))} className={`${inputCls} w-24`} />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="submit" disabled={saving} className="rounded-xl bg-[var(--admin-primary)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--admin-primary-strong)] disabled:opacity-60">
            {saving ? "Saving…" : isEditMode ? "Update Card" : "Add Card"}
          </button>
          <button type="button" onClick={() => navigate("/contact-info-cards")} className="rounded-xl border border-white/20 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/5">
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
