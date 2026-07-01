import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { hasPermission } from "../../modules/users/constants";
import { deleteStoreGalleryImage, getStoreGalleryImages } from "../../api/storeGalleryApi";
import { getBackendRoot } from "../../api/runtimeApi";

const extractErrorMessage = (error, fallback) =>
  error?.response?.data?.error || error?.response?.data?.message || error?.message || fallback;

const resolveImage = (value) => {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw)) return raw;
  if (raw.startsWith("/uploads/")) return `${getBackendRoot()}${raw}`;
  if (raw.startsWith("/")) return raw;
  // Check if it's a demo file from /public (store*.png, etc.)
  if (/^(store|demo)\d+\.png$/i.test(raw)) return `/${raw}`;
  return `${getBackendRoot()}/uploads/${raw}`;
};

export default function StoreGalleryList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const canAdd = hasPermission(user, "create_content");
  const canEdit = hasPermission(user, "edit_content");
  const canDelete = hasPermission(user, "delete_content");

  const loadImages = async () => {
    try {
      const res = await getStoreGalleryImages();
      const data = res.data?.data;
      const items = Array.isArray(data) ? data : [];
      setImages([...items].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)));
    } catch (err) {
      console.error(err);
      setError("Failed to load gallery images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleDelete = async (id) => {
    if (!canDelete) return;
    if (!window.confirm("Delete this image?")) return;
    try {
      await deleteStoreGalleryImage(id);
      loadImages();
    } catch (err) {
      setError(extractErrorMessage(err, "Delete failed."));
    }
  };

  if (loading) return <div className="text-white/70">Loading…</div>;

  return (
    <section className="space-y-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Store Gallery</h2>
          <p className="text-sm text-white/65">Carousel images shown in the "Our Retail Outlets" section.</p>
        </div>
        <button
          type="button"
          disabled={!canAdd}
          onClick={() => navigate("/store-locator/gallery/new")}
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-[var(--admin-primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--admin-primary-strong)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Add Image
        </button>
      </header>

      {error ? <div className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-red-300">{error}</div> : null}

      {images.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[var(--admin-card)] p-6 text-white/60">No gallery images yet.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--admin-card)]">
              <img src={resolveImage(item.image_url)} alt={item.alt_text || ""} className="h-40 w-full object-cover" />
              <div className="p-3">
                <p className="truncate text-sm text-white/80">{item.alt_text || "—"}</p>
                <div className="mt-1 flex items-center justify-between text-xs text-white/50">
                  <span>Order: {item.sort_order}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    disabled={!canEdit}
                    onClick={() => navigate(`/store-locator/gallery/edit/${item.id}`)}
                    className="flex-1 rounded-lg border border-white/20 px-3 py-1.5 text-xs font-semibold text-white hover:border-white/40 disabled:opacity-40"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    disabled={!canDelete}
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 rounded-lg border border-red-500/40 px-3 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-500/10 disabled:opacity-40"
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
