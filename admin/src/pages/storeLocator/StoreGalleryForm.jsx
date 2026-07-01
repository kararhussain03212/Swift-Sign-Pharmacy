import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createStoreGalleryImage, getStoreGalleryImage, updateStoreGalleryImage } from "../../api/storeGalleryApi";
import { uploadImage } from "../../api/uploadApi";
import ImageUpload from "../../components/ImageUpload";

const getInitialForm = () => ({
  alt_text: "",
  sort_order: 1,
  imageFile: null,
  imagePreview: "",
});

export default function StoreGalleryForm() {
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
        const res = await getStoreGalleryImage(id);
        const item = res.data?.data ?? {};
        setForm({
          alt_text: item.alt_text || "",
          sort_order: Number(item.sort_order ?? 1),
          imageFile: null,
          imagePreview: item.image_url || "",
        });
      } catch {
        setError("Failed to load gallery image.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.imageFile && !form.imagePreview) {
      setError("Please upload an image.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        alt_text: form.alt_text.trim(),
        sort_order: Number(form.sort_order || 1),
      };

      if (form.imageFile) {
        const oldPath = isEditMode && form.imagePreview ? form.imagePreview.replace(/^.*\/uploads\//, "") : "";
        payload.image_url = await uploadImage(form.imageFile, "store-gallery", oldPath);
      } else if (form.imagePreview) {
        payload.image_url = form.imagePreview.replace(/.*\/uploads\//, "");
      }

      if (isEditMode) await updateStoreGalleryImage(id, payload);
      else await createStoreGalleryImage(payload);

      navigate("/store-locator/gallery");
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
    <section className="mx-auto max-w-2xl">
      <h2 className="mb-4 text-2xl font-bold text-white">
        {isEditMode ? "Edit Gallery Image" : "Add Gallery Image"}
      </h2>

      {error && <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-[var(--admin-bg)] p-6">
        <ImageUpload
          value={form.imagePreview}
          onFileSelect={(file) => setField("imageFile", file)}
          label="Upload Store Photo *"
          helperText="PNG, JPG, JPEG, WebP"
        />

        <div>
          <label className={labelCls}>Alt Text</label>
          <input value={form.alt_text} onChange={(e) => setField("alt_text", e.target.value)} className={inputCls} placeholder="Pharmacy Store - Main Floor" />
        </div>

        <div>
          <label className={labelCls}>Sort Order</label>
          <input type="number" min="1" value={form.sort_order} onChange={(e) => setField("sort_order", Number(e.target.value))} className={`${inputCls} w-24`} />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="submit" disabled={saving} className="rounded-xl bg-[var(--admin-primary)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--admin-primary-strong)] disabled:opacity-60">
            {saving ? "Saving…" : isEditMode ? "Update Image" : "Add Image"}
          </button>
          <button type="button" onClick={() => navigate("/store-locator/gallery")} className="rounded-xl border border-white/20 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/5">
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
