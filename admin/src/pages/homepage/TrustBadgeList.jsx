import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { hasPermission } from "../../modules/users/constants";
import { deleteTrustBadge, getTrustBadges, updateTrustBadge } from "../../api/trustBadgeApi";

const extractErrorMessage = (error, fallback) =>
  error?.response?.data?.error || error?.response?.data?.message || error?.message || fallback;

export default function TrustBadgeList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const canAdd = hasPermission(user, "create_content");
  const canEdit = hasPermission(user, "edit_content");
  const canDelete = hasPermission(user, "delete_content");
  const canPublish = hasPermission(user, "publish_content");

  const loadBadges = async () => {
    try {
      const res = await getTrustBadges();
      const data = res.data?.data;
      const items = Array.isArray(data) ? data : [];
      setBadges([...items].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)));
    } catch (err) {
      console.error(err);
      setError("Failed to load trust badges.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBadges();
  }, []);

  const handleDelete = async (id) => {
    if (!canDelete) return;
    if (!window.confirm("Delete this trust badge?")) return;
    try {
      await deleteTrustBadge(id);
      loadBadges();
    } catch (err) {
      setError(extractErrorMessage(err, "Delete failed."));
    }
  };

  const handleToggleActive = async (item) => {
    if (!canPublish) return;
    try {
      const nextActive = item.is_active ? 0 : 1;
      const { data } = await updateTrustBadge(item.id, { is_active: nextActive });
      setBadges((prev) => prev.map((b) => (b.id === data?.data?.id ? data.data : b)));
    } catch (err) {
      setError(extractErrorMessage(err, "Failed to update status."));
    }
  };

  if (loading) return <div className="text-white/70">Loading…</div>;

  return (
    <section className="space-y-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Trust Badges</h2>
          <p className="text-sm text-white/65">The 4-column shipping/guarantee/support/payment bar shown on the homepage.</p>
        </div>
        <button
          type="button"
          disabled={!canAdd}
          onClick={() => navigate("/trust-badges/new")}
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-[var(--admin-primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--admin-primary-strong)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Add Badge
        </button>
      </header>

      {error ? <div className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-red-300">{error}</div> : null}

      {badges.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[var(--admin-card)] p-6 text-white/60">No trust badges yet.</div>
      ) : (
        <div className="grid gap-4">
          {badges.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--admin-card)] p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-wide text-white/40">{item.icon_key}</p>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-1 text-white/60">{item.subtitle}</p>
                  <div className="mt-2 text-sm text-white/40">Order: {item.sort_order}</div>
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
                    onClick={() => navigate(`/trust-badges/edit/${item.id}`)}
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
