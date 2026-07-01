import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createHomepagePromoCard, getHomepagePromoCard, updateHomepagePromoCard } from "../../api/homepagePromoCardApi";
import { uploadImage } from "../../api/uploadApi";
import ImageUpload from "../../components/ImageUpload";

const LAYOUT_OPTIONS = [
  { value: "image_left", label: "Image Left" },
  { value: "image_right", label: "Image Right" },
  { value: "image_bottom", label: "Image Bottom" },
];

const THEME_OPTIONS = [
  { value: "light-teal", label: "Light Teal" },
  { value: "dark-teal", label: "Dark Teal" },
  { value: "pink-teal", label: "Pink Teal" },
];

const getInitialForm = () => ({
  heading: "",
  description: "",
  highlight_text: "",
  button_text: "",
  button_link: "",
  layout_key: "image_right",
  theme_key: "light-teal",
  sort_order: 1,
  is_active: true,
  imageFile: null,
  imagePreview: "",
  image_alt: "",
});

export default function PromoCardForm() {
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
        const res = await getHomepagePromoCard(id);
        const item = res.data?.data ?? {};
        setForm({
          heading: item.heading || "",
          description: item.description || "",
          highlight_text: item.highlight_text || "",
          button_text: item.button_text || "",
          button_link: item.button_link || "",
          layout_key: item.layout_key || "image_right",
          theme_key: item.theme_key || "light-teal",
          sort_order: Number(item.sort_order ?? 1),
          is_active: Boolean(Number(item.is_active ?? 1)),
          imageFile: null,
          imagePreview: item.image_url || "",
          image_alt: item.image_alt || "",
        });
      } catch {
        setError("Failed to load promo card.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.heading.trim()) { setError("Heading is required."); return; }
    if (!form.button_text.trim()) { setError("Button text is required."); return; }
    if (!form.button_link.trim()) { setError("Button link is required."); return; }
    if (!form.imageFile && !form.imagePreview) { setError("Please upload an image."); return; }

    try {
      setSaving(true);

      const payload = {
        heading: form.heading.trim(),
        description: form.description.trim(),
        highlight_text: form.highlight_text.trim(),
        button_text: form.button_text.trim(),
        button_link: form.button_link.trim(),
        layout_key: form.layout_key,
        theme_key: form.theme_key,
        sort_order: Number(form.sort_order || 1),
        is_active: form.is_active ? 1 : 0,
        image_alt: form.image_alt.trim(),
      };

      if (form.imageFile) {
        const oldPath = isEditMode && form.imagePreview ? form.imagePreview.replace(/^.*\/uploads\//, "") : "";
        payload.image_url = await uploadImage(form.imageFile, "homepage-promo", oldPath);
      } else if (form.imagePreview) {
        payload.image_url = form.imagePreview;
      }

      if (isEditMode) await updateHomepagePromoCard(id, payload);
      else await createHomepagePromoCard(payload);

      navigate("/homepage-promo-cards");
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
        {isEditMode ? "Edit Promo Card" : "Add Promo Card"}
      </h2>

      {error && <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-[var(--admin-bg)] p-6">
        <ImageUpload
          value={form.imagePreview}
          altText={form.image_alt}
          onFileSelect={(file) => setField("imageFile", file)}
          onAltTextChange={(text) => setField("image_alt", text)}
          label="Upload Card Image *"
          helperText="PNG, JPG, JPEG, WebP"
          includeAltText
        />

        <div>
          <label className={labelCls}>Heading</label>
          <input value={form.heading} onChange={(e) => setField("heading", e.target.value)} className={inputCls} placeholder="Discount 50% Up To" />
        </div>

        <div>
          <label className={labelCls}>Description (paragraph-style)</label>
          <textarea rows={2} value={form.description} onChange={(e) => setField("description", e.target.value)} className={inputCls} placeholder="Vitamins & General Supplements From 59k Products" />
        </div>

        <div>
          <label className={labelCls}>Highlight Text (short badge, used instead of description)</label>
          <input value={form.highlight_text} onChange={(e) => setField("highlight_text", e.target.value)} className={inputCls} placeholder="EXTRA 15% OFF" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Button Text</label>
            <input value={form.button_text} onChange={(e) => setField("button_text", e.target.value)} className={inputCls} placeholder="Book Now" />
          </div>
          <div>
            <label className={labelCls}>Button Link</label>
            <input value={form.button_link} onChange={(e) => setField("button_link", e.target.value)} className={inputCls} placeholder="/shop" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Layout</label>
            <select value={form.layout_key} onChange={(e) => setField("layout_key", e.target.value)} className={inputCls}>
              {LAYOUT_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Theme</label>
            <select value={form.theme_key} onChange={(e) => setField("theme_key", e.target.value)} className={inputCls}>
              {THEME_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
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
            {saving ? "Saving…" : isEditMode ? "Update Card" : "Create Card"}
          </button>
          <button type="button" onClick={() => navigate("/homepage-promo-cards")} className="rounded-xl border border-white/20 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/5">
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
