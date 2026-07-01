import { useEffect, useState } from "react";
import {
  getHomepageHeroBanner,
  updateHomepageHeroBanner,
  addHomepageHeroBannerImage,
  updateHomepageHeroBannerImage,
  deleteHomepageHeroBannerImage,
} from "../../api/homepageHeroBannerApi";
import { uploadImage } from "../../api/uploadApi";
import ImageUpload from "../../components/ImageUpload";

const inputCls = "w-full rounded-lg border border-white/20 bg-[var(--admin-card)] px-3 py-2 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[var(--admin-primary)]";
const labelCls = "mb-1 block text-sm text-white/80";
const sectionCls = "rounded-xl border border-white/10 bg-[var(--admin-bg)] p-4 space-y-3";

const MAX_IMAGES = 3;

const EMPTY = { heading: "", subheading: "", description: "", button_text: "", button_link: "" };

export default function HomepageHeroBannerForm() {
  const [form, setForm] = useState(EMPTY);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);
  const [newImageAlt, setNewImageAlt] = useState("");

  const load = () => {
    getHomepageHeroBanner()
      .then((res) => {
        const d = res?.data?.data || {};
        setForm({
          heading: d.heading || "",
          subheading: d.subheading || "",
          description: d.description || "",
          button_text: d.button_text || "",
          button_link: d.button_link || "",
        });
        setImages(Array.isArray(d.images) ? [...d.images].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)) : []);
      })
      .catch(() => setError("Failed to load hero banner."))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

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
      await updateHomepageHeroBanner(form);
      setToast("Hero banner saved!");
    } catch {
      setError("Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleAddImage = async () => {
    if (!newImageFile) {
      setError("Choose an image to upload first.");
      return;
    }
    if (images.length >= MAX_IMAGES) {
      setError(`A maximum of ${MAX_IMAGES} images is allowed.`);
      return;
    }
    setError("");
    setUploading(true);
    try {
      const imageUrl = await uploadImage(newImageFile, "homepage-hero");
      await addHomepageHeroBannerImage({ image_url: imageUrl, alt_text: newImageAlt, sort_order: images.length + 1 });
      setNewImageFile(null);
      setNewImageAlt("");
      load();
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || "Failed to add image.");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (id) => {
    if (!window.confirm("Remove this image?")) return;
    try {
      await deleteHomepageHeroBannerImage(id);
      load();
    } catch {
      setError("Failed to remove image.");
    }
  };

  const handleSortOrderChange = async (id, sortOrder) => {
    try {
      await updateHomepageHeroBannerImage(id, { sort_order: sortOrder });
      load();
    } catch {
      setError("Failed to update image order.");
    }
  };

  if (loading) return <p className="text-white/70">Loading…</p>;

  return (
    <section className="mx-auto max-w-3xl space-y-5">
      <header>
        <h2 className="text-3xl font-bold text-white">Homepage Hero Banner</h2>
        <p className="mt-1 text-sm text-white/65">The dark-teal "Up To 25% Off" banner with stacked product photos.</p>
      </header>

      {toast ? <div className="rounded-xl bg-green-600/80 px-4 py-2.5 text-sm font-medium text-white">{toast}</div> : null}
      {error ? <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div> : null}

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-[var(--admin-bg)] p-6">
        <div className={sectionCls}>
          <h3 className="font-semibold text-white/90">Content</h3>
          <div>
            <label className={labelCls}>Heading</label>
            <input className={inputCls} value={form.heading} onChange={(e) => setField("heading", e.target.value)} placeholder="Up To 25% Off" />
          </div>
          <div>
            <label className={labelCls}>Subheading</label>
            <input className={inputCls} value={form.subheading} onChange={(e) => setField("subheading", e.target.value)} placeholder="On Top Brands" />
          </div>
          <div>
            <label className={labelCls}>Description</label>
            <input className={inputCls} value={form.description} onChange={(e) => setField("description", e.target.value)} placeholder="Extra 8% Off on the Healthcare Range" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Button Text</label>
              <input className={inputCls} value={form.button_text} onChange={(e) => setField("button_text", e.target.value)} placeholder="SHOP NOW" />
            </div>
            <div>
              <label className={labelCls}>Button Link</label>
              <input className={inputCls} value={form.button_link} onChange={(e) => setField("button_link", e.target.value)} placeholder="/shop" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="rounded-lg bg-[var(--admin-primary)] px-6 py-2.5 font-semibold text-black hover:bg-[var(--admin-primary-strong)] disabled:opacity-60">
            {saving ? "Saving…" : "Save Content"}
          </button>
        </div>
      </form>

      <div className="space-y-4 rounded-2xl border border-white/10 bg-[var(--admin-bg)] p-6">
        <div>
          <h3 className="font-semibold text-white/90">Product Images ({images.length}/{MAX_IMAGES})</h3>
          <p className="text-xs text-white/40">Up to {MAX_IMAGES} stacked product photos shown on the left of the banner.</p>
        </div>

        {images.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-3">
            {images.map((img) => (
              <div key={img.id} className="rounded-lg border border-white/10 bg-[var(--admin-card)] p-3">
                <img src={img.image_url} alt={img.alt_text || ""} className="h-28 w-full rounded object-contain bg-white/5" />
                <div className="mt-2 flex items-center gap-2">
                  <label className="text-xs text-white/60">Order</label>
                  <input
                    type="number"
                    min="1"
                    defaultValue={img.sort_order}
                    onBlur={(e) => handleSortOrderChange(img.id, Number(e.target.value || 1))}
                    className="w-16 rounded border border-white/20 bg-[var(--admin-bg)] px-2 py-1 text-sm text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(img.id)}
                    className="ml-auto rounded-lg border border-red-500/40 px-2 py-1 text-xs font-semibold text-red-300 hover:bg-red-500/10"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {images.length < MAX_IMAGES ? (
          <div className="space-y-3 rounded-lg border border-white/10 bg-[var(--admin-card)] p-3">
            <ImageUpload
              value=""
              onFileSelect={(file) => setNewImageFile(file)}
              label="Upload New Image"
              helperText="PNG, JPG, JPEG"
            />
            <input
              className={inputCls}
              value={newImageAlt}
              onChange={(e) => setNewImageAlt(e.target.value)}
              placeholder="Alt text (optional)"
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleAddImage}
              className="rounded-lg bg-[var(--admin-primary)] px-4 py-2 text-sm font-semibold text-black hover:bg-[var(--admin-primary-strong)] disabled:opacity-60"
            >
              {uploading ? "Uploading…" : "Add Image"}
            </button>
          </div>
        ) : (
          <p className="text-xs text-white/40">Maximum of {MAX_IMAGES} images reached — remove one to add another.</p>
        )}
      </div>
    </section>
  );
}
