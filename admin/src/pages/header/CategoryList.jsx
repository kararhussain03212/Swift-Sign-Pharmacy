import { Fragment, useEffect, useState } from "react";
import { createCategory, deleteCategory, getCategoriesNested, updateCategory } from "../../api/categoryApi";
import { useAuth } from "../../context/useAuth";
import { hasPermission } from "../../modules/users/constants";

const extractErrorMessage = (error, fallback) =>
  error?.response?.data?.error || error?.response?.data?.message || error?.message || fallback;

const slugify = (value) =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const blankDraft = (nextOrder) => ({
  name: "",
  slug: "",
  parent_id: "",
  sort_order: nextOrder,
  is_active: true,
  slugTouched: false,
});

function flatten(nodes, depth = 0) {
  return nodes.flatMap((node) => [
    { ...node, depth },
    ...flatten(node.children || [], depth + 1),
  ]);
}

export default function CategoryList() {
  const { user } = useAuth();
  const [tree, setTree] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(blankDraft(1));
  const [saving, setSaving] = useState(false);

  const canAdd = hasPermission(user, "create_content");
  const canEdit = hasPermission(user, "edit_content");
  const canDelete = hasPermission(user, "delete_content");
  const canPublish = hasPermission(user, "publish_content");

  const load = async () => {
    try {
      const res = await getCategoriesNested();
      setTree(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch {
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const setField = (key, value) => setDraft((prev) => ({ ...prev, [key]: value }));

  const handleNameChange = (value) => {
    setDraft((prev) => ({
      ...prev,
      name: value,
      slug: prev.slugTouched ? prev.slug : slugify(value),
    }));
  };

  const startAdd = () => {
    setError("");
    setEditingId("new");
    setDraft(blankDraft(flatten(tree).length + 1));
  };

  const startEdit = (item) => {
    setError("");
    setEditingId(item.id);
    setDraft({
      name: item.name || "",
      slug: item.slug || "",
      parent_id: item.parent_id ?? "",
      sort_order: Number(item.sort_order ?? 1),
      is_active: item.is_active === 1 || item.is_active === true,
      slugTouched: true,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft(blankDraft(1));
  };

  const saveEdit = async () => {
    if (!draft.name.trim()) {
      setError("Name is required.");
      return;
    }
    try {
      setSaving(true);
      const payload = {
        name: draft.name.trim(),
        slug: (draft.slug.trim() || slugify(draft.name)).trim(),
        parent_id: draft.parent_id === "" ? null : Number(draft.parent_id),
        sort_order: Number(draft.sort_order || 1),
        is_active: draft.is_active ? 1 : 0,
      };

      if (editingId === "new") await createCategory(payload);
      else await updateCategory(editingId, payload);

      cancelEdit();
      load();
    } catch (err) {
      setError(extractErrorMessage(err, "Save failed."));
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (item) => {
    if (!canPublish) return;
    try {
      await updateCategory(item.id, { is_active: item.is_active ? 0 : 1 });
      load();
    } catch {
      setError("Failed to update status.");
    }
  };

  const handleDelete = async (item) => {
    if (!canDelete) return;
    const childCount = item.children?.length || 0;
    const confirmMsg =
      childCount > 0
        ? `Delete "${item.name}"? Its ${childCount} subcategor${childCount === 1 ? "y" : "ies"} will become top-level.`
        : `Delete "${item.name}"?`;
    if (!window.confirm(confirmMsg)) return;
    try {
      await deleteCategory(item.id);
      load();
    } catch {
      setError("Delete failed.");
    }
  };

  const inputCls =
    "w-full rounded-lg border border-[var(--arion-border)] bg-[var(--arion-card-solid)] px-2.5 py-1.5 text-sm text-[var(--arion-ink)] focus:border-[var(--arion-cyan)] focus:outline-none";

  const flatRows = flatten(tree);
  const rows = editingId === "new" ? [{ id: "new", depth: 0 }, ...flatRows] : flatRows;

  return (
    <section className="arion-theme space-y-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--arion-ink)] sm:text-3xl">Categories</h2>
          <p className="text-sm text-[var(--arion-muted)]">Shop categories shown in the navbar dropdown.</p>
        </div>
        <button
          type="button"
          disabled={!canAdd || editingId !== null}
          onClick={startAdd}
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-[var(--arion-cyan)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--arion-cyan-strong)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Add Category
        </button>
      </header>

      {error ? (
        <div className="arion-glass rounded-xl border border-red-500/40 px-4 py-3 text-red-300">{error}</div>
      ) : null}

      {loading ? (
        <p className="text-[var(--arion-muted)]">Loading…</p>
      ) : rows.length === 0 ? (
        <div className="arion-glass rounded-2xl p-6 text-[var(--arion-muted)]">No categories yet.</div>
      ) : (
        <div className="arion-glass overflow-hidden rounded-2xl">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--arion-border)] text-xs uppercase tracking-wider text-[var(--arion-muted)]">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => {
                const isEditing = editingId === item.id;
                const topLevelOptions = tree.filter((c) => String(c.id) !== String(item.id));

                return (
                  <Fragment key={item.id}>
                    <tr className={`border-b border-[var(--arion-border)] ${isEditing ? "bg-[var(--arion-cyan-light)]" : ""} ${isEditing ? "" : "last:border-0"}`}>
                      {isEditing ? (
                        <>
                          <td className="px-4 py-3 align-top">
                            <input value={draft.name} onChange={(e) => handleNameChange(e.target.value)} className={inputCls} placeholder="Medicines" autoFocus />
                          </td>
                          <td className="px-4 py-3 align-top">
                            <input
                              value={draft.slug}
                              onChange={(e) => setDraft((p) => ({ ...p, slug: e.target.value, slugTouched: true }))}
                              className={inputCls}
                              placeholder="medicines"
                            />
                          </td>
                          <td className="px-4 py-3 align-top">
                            <input
                              type="number"
                              min="1"
                              value={draft.sort_order}
                              onChange={(e) => setField("sort_order", Number(e.target.value))}
                              className={`${inputCls} w-16`}
                            />
                          </td>
                          <td className="px-4 py-3 align-top">
                            <label className="flex items-center gap-2 text-xs text-[var(--arion-muted)]">
                              <input type="checkbox" checked={draft.is_active} onChange={(e) => setField("is_active", e.target.checked)} className="h-4 w-4" />
                              Active
                            </label>
                          </td>
                          <td className="px-4 py-3 text-right align-top">
                            <div className="inline-flex gap-2">
                              <button type="button" onClick={saveEdit} disabled={saving} className="rounded-lg bg-[var(--arion-cyan)] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[var(--arion-cyan-strong)] disabled:opacity-60">
                                {saving ? "Saving…" : "Save"}
                              </button>
                              <button type="button" onClick={cancelEdit} className="rounded-lg border border-[var(--arion-border)] px-3 py-1.5 text-xs font-semibold text-[var(--arion-ink)] hover:bg-white/5">
                                Cancel
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-3 text-[var(--arion-ink)]" style={{ paddingLeft: `${1 + item.depth * 1.5}rem` }}>
                            {item.depth > 0 ? <span className="mr-2 text-[var(--arion-muted)]">↳</span> : null}
                            <span className={item.depth === 0 ? "font-semibold" : ""}>{item.name}</span>
                          </td>
                          <td className="px-4 py-3 text-[var(--arion-muted)]">{item.slug}</td>
                          <td className="px-4 py-3 text-[var(--arion-muted)]">{item.sort_order}</td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              onClick={() => handleToggleActive(item)}
                              disabled={!canPublish || editingId !== null}
                              className={
                                item.is_active
                                  ? "rounded-full bg-[var(--arion-cyan-light)] px-3 py-1 text-xs font-semibold text-[var(--arion-cyan)]"
                                  : "rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/50"
                              }
                            >
                              {item.is_active ? "Active" : "Inactive"}
                            </button>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="inline-flex gap-2">
                              <button
                                type="button"
                                disabled={!canEdit || editingId !== null}
                                onClick={() => startEdit(item)}
                                className="rounded-lg border border-[var(--arion-border)] px-3 py-1.5 text-xs font-semibold text-[var(--arion-ink)] hover:border-[var(--arion-border-strong)] disabled:opacity-40"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                disabled={!canDelete || editingId !== null}
                                onClick={() => handleDelete(item)}
                                className="rounded-lg border border-red-500/40 px-3 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-500/10 disabled:opacity-40"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>

                    {isEditing && (
                      <tr className="border-b border-[var(--arion-border)] bg-[var(--arion-cyan-light)]">
                        <td colSpan={5} className="px-4 pb-4">
                          <div className="flex flex-wrap items-end gap-4">
                            <div>
                              <label className="mb-1 block text-xs text-[var(--arion-muted)]">Parent Category</label>
                              <select
                                value={draft.parent_id}
                                onChange={(e) => setField("parent_id", e.target.value)}
                                className={`${inputCls} w-48`}
                              >
                                <option value="">None (top-level)</option>
                                {topLevelOptions.map((opt) => (
                                  <option key={opt.id} value={opt.id}>
                                    {opt.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
