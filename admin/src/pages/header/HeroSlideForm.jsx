import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createHeroSlide, getHeroSlide, updateHeroSlide } from "../../api/heroSlideApi";
import { uploadImage } from "../../api/uploadApi";
import ImageUpload from "../../components/ImageUpload";

const getInitialForm = () => ({
  heading: "",
  firsttext: "",
  secondtext: "",
  heading_color: "#1a365d",
  subtext_color: "#2c5282",
  centered: false,
  sort_order: 1,
  is_active: true,
  imageFile: null,
  imagePreview: "",
});

export default function HeroSlideForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState("");
  const [form, setForm]       = useState(getInitialForm);

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    if (!isEditMode) { setForm(getInitialForm()); setLoading(false); return; }
    (async () => {
      try {
        const res = await getHeroSlide(id);
        const item = res.data?.data ?? {};
        setForm({
          heading:       item.heading       || "",
          firsttext:     item.firsttext     || "",
          secondtext:    item.secondtext    || "",
          heading_color: item.heading_color || "#1a365d",
          subtext_color: item.subtext_color || "#2c5282",
          centered:      item.centered === 1 || item.centered === true,
          sort_order:    Number(item.sort_order ?? 1),
          is_active:     item.is_active === 1 || item.is_active === true,
          imageFile:     null,
          imagePreview:  item.image || "",
        });
      } catch {
        setError("Failed to load hero slide.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.heading.trim()) { setError("Heading is required."); return; }
    if (!form.imageFile && !form.imagePreview) { setError("Please upload a background image."); return; }

    try {
      setSaving(true);

      const payload = {
        heading:       form.heading.trim(),
        firsttext:     form.firsttext.trim(),
        secondtext:    form.secondtext.trim(),
        heading_color: form.heading_color.trim(),
        subtext_color: form.subtext_color.trim(),
        centered:      form.centered ? 1 : 0,
        sort_order:    Number(form.sort_order || 1),
        is_active:     form.is_active ? 1 : 0,
      };

      if (form.imageFile) {
        const oldPath = isEditMode && form.imagePreview ? form.imagePreview.replace(/^.*\/uploads\//, "") : "";
        payload.image = await uploadImage(form.imageFile, "hero", oldPath);
      } else if (form.imagePreview) {
        payload.image = form.imagePreview.replace(/.*\/uploads\//, "");
      } else {
        payload.image = "";
      }

      if (isEditMode) await updateHeroSlide(id, payload);
      else await createHeroSlide(payload);

      navigate("/header/hero-slides");
    } catch (err) {
      if (err?.response?.status === 401) { navigate("/login", { replace: true }); return; }
      setError(err?.response?.data?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-white/70">Loading hero slide…</div>;

  const inputCls = "w-full rounded-lg border border-white/20 bg-[var(--admin-card)] px-3 py-2 text-white";
  const labelCls = "mb-1 block text-sm text-white/80";

  return (
    <section className="mx-auto max-w-3xl">
      <h2 className="mb-4 text-2xl font-bold text-white">
        {isEditMode ? "Edit Hero Slide" : "Add Hero Slide"}
      </h2>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-[var(--admin-bg)] p-6">

        {/* Heading */}
        <div>
          <label className={labelCls}>Heading *</label>
          <input value={form.heading} onChange={(e) => setField("heading", e.target.value)} required className={inputCls} placeholder="Fast & Reliable Delivery" />
        </div>

        {/* Subtext */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className={labelCls}>First Line</label>
            <input value={form.firsttext} onChange={(e) => setField("firsttext", e.target.value)} className={inputCls} placeholder="On-time delivery you" />
          </div>
          <div>
            <label className={labelCls}>Second Line</label>
            <input value={form.secondtext} onChange={(e) => setField("secondtext", e.target.value)} className={inputCls} placeholder="can count on" />
          </div>
        </div>

        {/* Colors */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className={labelCls}>Heading Color</label>
            <input type="color" value={form.heading_color} onChange={(e) => setField("heading_color", e.target.value)} className="h-10 w-full rounded-lg border border-white/20 bg-[var(--admin-card)]" />
          </div>
          <div>
            <label className={labelCls}>Subtext Color</label>
            <input type="color" value={form.subtext_color} onChange={(e) => setField("subtext_color", e.target.value)} className="h-10 w-full rounded-lg border border-white/20 bg-[var(--admin-card)]" />
          </div>
        </div>

        {/* Sort, Active, Centered */}
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <label className={labelCls}>Sort Order</label>
            <input type="number" min="1" value={form.sort_order} onChange={(e) => setField("sort_order", Number(e.target.value))} className="w-24 rounded-lg border border-white/20 bg-[var(--admin-card)] px-3 py-2 text-white" />
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-white/80 mt-5">
            <input type="checkbox" checked={form.is_active} onChange={(e) => setField("is_active", e.target.checked)} className="h-4 w-4" />
            Show on frontend
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-white/80 mt-5">
            <input type="checkbox" checked={form.centered} onChange={(e) => setField("centered", e.target.checked)} className="h-4 w-4" />
            Center-align text
          </label>
        </div>

        {/* Image Upload */}
        <ImageUpload
          value={form.imagePreview}
          onFileSelect={(file) => setField("imageFile", file)}
          label="Upload Background Image *"
          helperText={isEditMode ? "Upload to replace the current background image" : "Required — shown as the slide's background"}
        />

        {/* Submit */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="submit" disabled={saving} className="rounded-lg bg-[var(--admin-primary)] px-5 py-2 text-black hover:bg-[var(--admin-primary-strong)] disabled:opacity-60">
            {saving ? "Saving…" : isEditMode ? "Update Slide" : "Create Slide"}
          </button>
          <button type="button" onClick={() => navigate("/header/hero-slides")} className="rounded-lg border border-white/20 px-5 py-2 text-white/90 hover:bg-white/10">
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
