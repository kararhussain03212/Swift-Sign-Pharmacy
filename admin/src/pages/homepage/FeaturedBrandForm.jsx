import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createFeaturedBrand, getFeaturedBrand, updateFeaturedBrand } from "../../api/featuredBrandApi";
import { uploadImage } from "../../api/uploadApi";
import ImageUpload from "../../components/ImageUpload";

const getInitialForm = () => ({
  name: "",
  link_url: "",
  sort_order: 1,
  is_active: true,
  logoFile: null,
  logoPreview: "",
});

export default function FeaturedBrandForm() {
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
        const res = await getFeaturedBrand(id);
        const item = res.data?.data ?? {};
        setForm({
          name: item.name || "",
          link_url: item.link_url || "",
          sort_order: Number(item.sort_order ?? 1),
          is_active: Boolean(Number(item.is_active ?? 1)),
          logoFile: null,
          logoPreview: item.logo_url || "",
        });
      } catch {
        setError("Failed to load brand.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) { setError("Name is required."); return; }

    try {
      setSaving(true);

      const payload = {
        name: form.name.trim(),
        link_url: form.link_url.trim(),
        sort_order: Number(form.sort_order || 1),
        is_active: form.is_active ? 1 : 0,
      };

      if (form.logoFile) {
        const oldPath = isEditMode && form.logoPreview ? form.logoPreview.replace(/^.*\/uploads\//, "") : "";
        payload.logo_url = await uploadImage(form.logoFile, "brands", oldPath);
      } else if (form.logoPreview) {
        payload.logo_url = form.logoPreview;
      } else {
        payload.logo_url = "";
      }

      if (isEditMode) await updateFeaturedBrand(id, payload);
      else await createFeaturedBrand(payload);

      navigate("/featured-brands");
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
        {isEditMode ? "Edit Brand" : "Add Brand"}
      </h2>

      {error && <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-[var(--admin-bg)] p-6">
        <ImageUpload
          value={form.logoPreview}
          onFileSelect={(file) => setField("logoFile", file)}
          label="Upload Logo (optional)"
          helperText="PNG, JPG, SVG — leave empty to show the brand name as styled text"
        />

        <div>
          <label className={labelCls}>Name</label>
          <input value={form.name} onChange={(e) => setField("name", e.target.value)} className={inputCls} placeholder="NutriPlus" />
        </div>

        <div>
          <label className={labelCls}>Link URL</label>
          <input value={form.link_url} onChange={(e) => setField("link_url", e.target.value)} className={inputCls} placeholder="/brands/nutriplus" />
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
            {saving ? "Saving…" : isEditMode ? "Update Brand" : "Create Brand"}
          </button>
          <button type="button" onClick={() => navigate("/featured-brands")} className="rounded-xl border border-white/20 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/5">
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
