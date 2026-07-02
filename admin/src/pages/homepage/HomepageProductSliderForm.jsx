import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoriesNested } from "../../api/categoryApi";
import {
  createHomepageSlider,
  getHomepageSlider,
  updateHomepageSlider,
} from "../../api/homepageProductSliderApi";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "best_selling", label: "Best Selling" },
  { value: "random", label: "Random" },
  { value: "price_low_high", label: "Price: Low to High" },
  { value: "price_high_low", label: "Price: High to Low" },
];

const getInitialForm = () => ({
  title: "",
  category_ids: [],
  max_products: 10,
  sort_criteria: "newest",
  is_active: true,
  view_all_link: "",
  position: "bottom",
});

// Only top-level categories are offered: products store a single category
// value that matches a top-level slug, so picking a subcategory could never
// actually match any product.
function topLevelCategories(nodes) {
  return nodes.map((node) => ({ id: node.id, name: node.name }));
}

export default function HomepageProductSliderForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(getInitialForm);
  const [categoryTree, setCategoryTree] = useState([]);

  const flatCategories = useMemo(() => topLevelCategories(categoryTree), [categoryTree]);

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    (async () => {
      try {
        const [catRes, sliderRes] = await Promise.all([
          getCategoriesNested(),
          isEditMode ? getHomepageSlider(id) : Promise.resolve(null),
        ]);

        setCategoryTree(Array.isArray(catRes.data?.data) ? catRes.data.data : []);

        if (sliderRes) {
          const item = sliderRes.data?.data ?? {};
          setForm({
            title: item.title || "",
            category_ids: Array.isArray(item.category_ids) ? item.category_ids : [],
            max_products: Number(item.max_products ?? 10),
            sort_criteria: item.sort_criteria || "newest",
            is_active: Boolean(Number(item.is_active ?? 1)),
            view_all_link: item.view_all_link || "",
            position: "bottom",
          });
        }
      } catch {
        setError("Failed to load slider data.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEditMode]);

  const toggleCategory = (categoryId) => {
    setForm((prev) => {
      const has = prev.category_ids.includes(categoryId);
      return {
        ...prev,
        category_ids: has
          ? prev.category_ids.filter((c) => c !== categoryId)
          : [...prev.category_ids, categoryId],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) { setError("Title is required."); return; }

    try {
      setSaving(true);

      const payload = {
        title: form.title.trim(),
        category_ids: form.category_ids,
        max_products: Number(form.max_products || 10),
        sort_criteria: form.sort_criteria,
        is_active: form.is_active ? 1 : 0,
        view_all_link: form.view_all_link.trim(),
      };

      if (isEditMode) {
        await updateHomepageSlider(id, payload);
      } else {
        await createHomepageSlider({ ...payload, position: form.position });
      }

      navigate("/homepage-sliders");
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
        {isEditMode ? "Edit Slider" : "Add Slider"}
      </h2>

      {error && <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-[var(--admin-bg)] p-6">
        <div>
          <label className={labelCls}>Title</label>
          <input value={form.title} onChange={(e) => setField("title", e.target.value)} className={inputCls} placeholder="Popular Product" />
        </div>

        <div>
          <label className={labelCls}>Categories</label>
          <p className="mb-2 text-xs text-white/50">Products from any of the selected categories will appear in this slider.</p>
          <div className="max-h-64 space-y-1 overflow-y-auto rounded-lg border border-white/10 bg-[var(--admin-card)] p-3">
            {flatCategories.length === 0 ? (
              <p className="text-sm text-white/40">No categories found.</p>
            ) : (
              flatCategories.map((c) => (
                <label
                  key={c.id}
                  className="flex items-center gap-2 rounded px-1.5 py-1 text-sm text-white/85 hover:bg-white/5"
                >
                  <input
                    type="checkbox"
                    checked={form.category_ids.includes(c.id)}
                    onChange={() => toggleCategory(c.id)}
                  />
                  {c.name}
                </label>
              ))
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Max Products</label>
            <input
              type="number"
              min="1"
              max="50"
              value={form.max_products}
              onChange={(e) => setField("max_products", Number(e.target.value))}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Sort Criteria</label>
            <select value={form.sort_criteria} onChange={(e) => setField("sort_criteria", e.target.value)} className={inputCls}>
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className={labelCls}>View All Link (optional)</label>
          <input
            value={form.view_all_link}
            onChange={(e) => setField("view_all_link", e.target.value)}
            className={inputCls}
            placeholder="Leave blank to auto-generate from the first selected category"
          />
        </div>

        {!isEditMode && (
          <div>
            <label className={labelCls}>Position</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setField("position", "top")}
                className={`flex-1 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                  form.position === "top"
                    ? "border-[var(--admin-primary)] bg-[var(--admin-primary)] text-white"
                    : "border-white/20 text-white/70 hover:bg-white/5"
                }`}
              >
                Add to Top
              </button>
              <button
                type="button"
                onClick={() => setField("position", "bottom")}
                className={`flex-1 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                  form.position === "bottom"
                    ? "border-[var(--admin-primary)] bg-[var(--admin-primary)] text-white"
                    : "border-white/20 text-white/70 hover:bg-white/5"
                }`}
              >
                Add to Bottom
              </button>
            </div>
          </div>
        )}

        <label className="flex items-center gap-2 text-sm text-white/80">
          <input type="checkbox" checked={form.is_active} onChange={(e) => setField("is_active", e.target.checked)} />
          Active (visible on the homepage)
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="submit" disabled={saving} className="rounded-xl bg-[var(--admin-primary)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--admin-primary-strong)] disabled:opacity-60">
            {saving ? "Saving…" : isEditMode ? "Update Slider" : "Create Slider"}
          </button>
          <button type="button" onClick={() => navigate("/homepage-sliders")} className="rounded-xl border border-white/20 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/5">
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
