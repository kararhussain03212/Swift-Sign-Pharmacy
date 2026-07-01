import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { hasPermission } from "../../modules/users/constants";
import { deleteStoreBranch, getStoreBranches, updateStoreBranch } from "../../api/storeBranchApi";

const extractErrorMessage = (error, fallback) =>
  error?.response?.data?.error || error?.response?.data?.message || error?.message || fallback;

export default function StoreBranchList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const canAdd = hasPermission(user, "create_content");
  const canEdit = hasPermission(user, "edit_content");
  const canDelete = hasPermission(user, "delete_content");
  const canPublish = hasPermission(user, "publish_content");

  const loadBranches = async () => {
    try {
      const res = await getStoreBranches();
      const data = res.data?.data;
      const items = Array.isArray(data) ? data : [];
      setBranches([...items].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)));
    } catch (err) {
      console.error(err);
      setError("Failed to load branches.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBranches();
  }, []);

  const handleDelete = async (id) => {
    if (!canDelete) return;
    if (!window.confirm("Delete this branch?")) return;
    try {
      await deleteStoreBranch(id);
      loadBranches();
    } catch (err) {
      setError(extractErrorMessage(err, "Delete failed."));
    }
  };

  const handleToggleActive = async (item) => {
    if (!canPublish) return;
    try {
      const nextActive = item.is_active ? 0 : 1;
      const { data } = await updateStoreBranch(item.id, { is_active: nextActive });
      setBranches((prev) => prev.map((b) => (b.id === data?.data?.id ? data.data : b)));
    } catch (err) {
      if (err?.response?.status === 401) {
        navigate("/login", { replace: true });
        return;
      }
      setError(extractErrorMessage(err, "Failed to update status."));
    }
  };

  if (loading) return <div className="text-white/70">Loading…</div>;

  return (
    <section className="space-y-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Store Branches</h2>
          <p className="text-sm text-white/65">Manage pharmacy branch locations shown on the Store Locator page.</p>
        </div>
        <button
          type="button"
          disabled={!canAdd}
          onClick={() => navigate("/store-locator/branches/new")}
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-[var(--admin-primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--admin-primary-strong)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Add Branch
        </button>
      </header>

      {error ? <div className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-red-300">{error}</div> : null}

      {branches.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[var(--admin-card)] p-6 text-white/60">No branches yet.</div>
      ) : (
        <div className="grid gap-4">
          {branches.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--admin-card)]">
              <div className="p-4 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">{item.name}</h3>
                    <p className="mt-1 text-sm text-white/70">{item.address}</p>
                    <p className="mt-1 text-xs text-white/50">{item.hours_display}</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/60">
                      <span className="rounded-full bg-white/5 px-2.5 py-1">Area: {item.area}</span>
                      <span className="rounded-full bg-white/5 px-2.5 py-1">City: {item.city}</span>
                      <span className="rounded-full bg-white/5 px-2.5 py-1">Phone: {item.phone || "—"}</span>
                      <span className="rounded-full bg-white/5 px-2.5 py-1">Order: {item.sort_order}</span>
                      <span className="rounded-full bg-white/5 px-2.5 py-1">/store-locator/{item.detail_slug}</span>
                    </div>
                  </div>
                  <div className="flex w-full flex-wrap gap-2 sm:w-auto">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(item)}
                      disabled={!canPublish}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                        item.is_active ? "bg-[var(--admin-primary-light)] text-[var(--admin-primary)]" : "bg-white/10 text-white/50"
                      }`}
                    >
                      {item.is_active ? "Active" : "Inactive"}
                    </button>
                    <button
                      type="button"
                      disabled={!canEdit}
                      onClick={() => navigate(`/store-locator/branches/edit/${item.id}`)}
                      className="rounded-lg border border-white/20 px-3 py-1.5 text-xs font-semibold text-white hover:border-white/40 disabled:opacity-40"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      disabled={!canDelete}
                      onClick={() => handleDelete(item.id)}
                      className="rounded-lg border border-red-500/40 px-3 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-500/10 disabled:opacity-40"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
