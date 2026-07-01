import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createContactFaq, getContactFaq, updateContactFaq } from "../../api/contactFaqApi";

const getInitialForm = () => ({
  question: "",
  answer: "",
  is_active: true,
  sort_order: 1,
});

export default function ContactFaqForm() {
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
        const res = await getContactFaq(id);
        const item = res.data?.data ?? {};
        setForm({
          question: item.question || "",
          answer: item.answer || "",
          is_active: Boolean(Number(item.is_active ?? 1)),
          sort_order: Number(item.sort_order ?? 1),
        });
      } catch {
        setError("Failed to load FAQ.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.question.trim()) {
      setError("Question is required.");
      return;
    }
    if (!form.answer.trim()) {
      setError("Answer is required.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        question: form.question.trim(),
        answer: form.answer.trim(),
        is_active: form.is_active ? 1 : 0,
        sort_order: Number(form.sort_order || 1),
      };

      if (isEditMode) await updateContactFaq(id, payload);
      else await createContactFaq(payload);

      navigate("/contact-faqs");
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
        {isEditMode ? "Edit FAQ" : "Add FAQ"}
      </h2>

      {error && <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-[var(--admin-bg)] p-6">
        <div>
          <label className={labelCls}>Question</label>
          <input value={form.question} onChange={(e) => setField("question", e.target.value)} className={inputCls} placeholder="How do I track my order?" />
        </div>

        <div>
          <label className={labelCls}>Answer</label>
          <textarea rows={5} value={form.answer} onChange={(e) => setField("answer", e.target.value)} className={inputCls} placeholder="Once your order is dispatched…" />
        </div>

        <div className="flex items-center gap-3">
          <label className={labelCls}>Sort Order</label>
          <input type="number" min="1" value={form.sort_order} onChange={(e) => setField("sort_order", Number(e.target.value))} className={`${inputCls} w-24`} />
        </div>

        <label className="flex items-center gap-2 text-sm text-white/80">
          <input type="checkbox" checked={form.is_active} onChange={(e) => setField("is_active", e.target.checked)} />
          Active (visible on the Contact page)
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="submit" disabled={saving} className="rounded-xl bg-[var(--admin-primary)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--admin-primary-strong)] disabled:opacity-60">
            {saving ? "Saving…" : isEditMode ? "Update FAQ" : "Add FAQ"}
          </button>
          <button type="button" onClick={() => navigate("/contact-faqs")} className="rounded-xl border border-white/20 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/5">
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
