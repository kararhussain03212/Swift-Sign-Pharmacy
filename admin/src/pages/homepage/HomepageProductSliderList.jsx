import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { hasPermission } from "../../modules/users/constants";
import {
  deleteHomepageSlider,
  getHomepageSliders,
  reorderHomepageSliders,
  updateHomepageSlider,
} from "../../api/homepageProductSliderApi";

const extractErrorMessage = (error, fallback) =>
  error?.response?.data?.error || error?.response?.data?.message || error?.message || fallback;

const SORT_LABELS = {
  newest: "Newest",
  best_selling: "Best Selling",
  random: "Random",
  price_low_high: "Price: Low to High",
  price_high_low: "Price: High to Low",
};

export default function HomepageProductSliderList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const canAdd = hasPermission(user, "create_content");
  const canEdit = hasPermission(user, "edit_content");
  const canDelete = hasPermission(user, "delete_content");
  const canPublish = hasPermission(user, "publish_content");

  const loadSliders = async () => {
    try {
      const res = await getHomepageSliders();
      const data = res.data?.data;
      const items = Array.isArray(data) ? data : [];
      setSliders([...items].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)));
    } catch (err) {
      console.error(err);
      setError("Failed to load homepage sliders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSliders();
  }, []);

  const handleDelete = async (id) => {
    if (!canDelete) return;
    if (!window.confirm("Delete this slider? This cannot be undone.")) return;
    try {
      await deleteHomepageSlider(id);
      loadSliders();
    } catch (err) {
      setError(extractErrorMessage(err, "Delete failed."));
    }
  };

  const handleToggleActive = async (item) => {
    if (!canPublish) return;
    try {
      const nextActive = item.is_active ? 0 : 1;
      const { data } = await updateHomepageSlider(item.id, { is_active: nextActive });
      setSliders((prev) => prev.map((s) => (s.id === data?.data?.id ? { ...s, ...data.data } : s)));
    } catch (err) {
      setError(extractErrorMessage(err, "Failed to update status."));
    }
  };

  const move = async (index, direction) => {
    if (!canEdit) return;
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= sliders.length) return;

    const reordered = [...sliders];
    [reordered[index], reordered[targetIndex]] = [reordered[targetIndex], reordered[index]];
    setSliders(reordered);

    try {
      await reorderHomepageSliders(reordered.map((s) => s.id));
    } catch (err) {
      setError(extractErrorMessage(err, "Failed to reorder sliders."));
      loadSliders();
    }
  };

  if (loading) return <div className="text-white/70">Loading…</div>;

  return (
    <section className="space-y-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Homepage Sliders</h2>
          <p className="text-sm text-white/65">
            Product carousel sections shown on the homepage. Add as many as you like — order controls
            where each one appears on the page.
          </p>
        </div>
        <button
          type="button"
          disabled={!canAdd}
          onClick={() => navigate("/homepage-sliders/new")}
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-[var(--admin-primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--admin-primary-strong)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Add Slider
        </button>
      </header>

      {error ? <div className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-red-300">{error}</div> : null}

      {sliders.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[var(--admin-card)] p-6 text-white/60">No sliders yet.</div>
      ) : (
        <div className="grid gap-4">
          {sliders.map((item, index) => (
            <article key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--admin-card)] p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 flex-1 items-start gap-4">
                  <div className="flex shrink-0 flex-col items-center gap-1 pt-0.5">
                    <button
                      type="button"
                      disabled={!canEdit || index === 0}
                      onClick={() => move(index, -1)}
                      className="flex h-6 w-6 items-center justify-center rounded bg-white/10 text-white hover:bg-white/20 disabled:opacity-30"
                      title="Move up"
                    >
                      ▲
                    </button>
                    <span className="text-xs text-white/40">{item.sort_order}</span>
                    <button
                      type="button"
                      disabled={!canEdit || index === sliders.length - 1}
                      onClick={() => move(index, 1)}
                      className="flex h-6 w-6 items-center justify-center rounded bg-white/10 text-white hover:bg-white/20 disabled:opacity-30"
                      title="Move down"
                    >
                      ▼
                    </button>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                      {(item.categories ?? []).length === 0 ? (
                        <span className="rounded-full bg-yellow-500/15 px-2.5 py-0.5 text-xs font-medium text-yellow-300">
                          No categories assigned
                        </span>
                      ) : (
                        item.categories.map((c) => (
                          <span key={c.id} className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/80">
                            {c.name}
                          </span>
                        ))
                      )}
                    </div>
                    <div className="mt-1.5 text-xs text-white/40">
                      {item.product_count} product{item.product_count === 1 ? "" : "s"} · Max {item.max_products} · {SORT_LABELS[item.sort_criteria] ?? item.sort_criteria}
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    disabled={!canPublish}
                    onClick={() => handleToggleActive(item)}
                    className={`rounded-full px-4 py-1.5 text-sm font-semibold text-white disabled:opacity-40 ${
                      item.is_active ? "bg-green-600 hover:bg-green-700" : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    {item.is_active ? "Active" : "Inactive"}
                  </button>
                  <button
                    type="button"
                    disabled={!canEdit}
                    onClick={() => navigate(`/homepage-sliders/edit/${item.id}`)}
                    className="rounded-full bg-[var(--admin-primary)] px-4 py-1.5 text-sm font-semibold text-white hover:bg-[var(--admin-primary-strong)] disabled:opacity-40"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    disabled={!canDelete}
                    onClick={() => handleDelete(item.id)}
                    className="rounded-full bg-red-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-40"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
