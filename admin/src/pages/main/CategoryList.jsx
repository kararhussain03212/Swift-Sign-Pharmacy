import { useState, useEffect } from "react";
import { createCategory, deleteCategory, getCategoriesNested, updateCategory } from "../../api/categoryApi";
import { useAuth } from "../../context/useAuth";
import { hasPermission } from "../../modules/users/constants";
import { ChevronDown, Plus, Edit2, Trash2, Save, X } from "lucide-react";

const extractErrorMessage = (error, fallback) =>
  error?.response?.data?.error || error?.response?.data?.message || error?.message || fallback;

const slugify = (value) =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const blankDraft = () => ({
  name: "",
  slug: "",
  parent_id: "",
  sort_order: 1,
  is_active: true,
  slugTouched: false,
});

export default function CategoryList() {
  const { user } = useAuth();
  const [tree, setTree] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [editingId, setEditingId] = useState(null);
  const [addingSubcategoryFor, setAddingSubcategoryFor] = useState(null);
  const [draft, setDraft] = useState(blankDraft());
  const [saving, setSaving] = useState(false);

  const canAdd = hasPermission(user, "create_content");
  const canEdit = hasPermission(user, "edit_content");
  const canDelete = hasPermission(user, "delete_content");

  const load = async () => {
    try {
      const res = await getCategoriesNested();
      setTree(Array.isArray(res.data?.data) ? res.data.data : []);
      setLoading(false);
    } catch {
      setError("Failed to load categories.");
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const setField = (key, value) => setDraft((prev) => ({ ...prev, [key]: value }));

  const handleNameChange = (value) => {
    setDraft((prev) => ({
      ...prev,
      name: value,
      slug: prev.slugTouched ? prev.slug : slugify(value),
    }));
  };

  const startAdd = (parentId = null) => {
    setError("");
    if (parentId) {
      setAddingSubcategoryFor(parentId);
    } else {
      setEditingId("new");
    }
    setDraft({ ...blankDraft(), parent_id: parentId || "" });
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
    setAddingSubcategoryFor(null);
    setDraft(blankDraft());
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

      if (editingId === "new" || addingSubcategoryFor) {
        await createCategory(payload);
      } else {
        await updateCategory(editingId, payload);
      }

      cancelEdit();
      load();
    } catch (err) {
      setError(extractErrorMessage(err, "Save failed."));
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (item) => {
    if (!canEdit) return;
    try {
      await updateCategory(item.id, { is_active: item.is_active ? 0 : 1 });
      load();
    } catch (err) {
      setError(extractErrorMessage(err, "Failed to update status."));
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
    "w-full rounded-lg border border-[var(--arion-border)] bg-[var(--arion-card-solid)] px-3 py-2 text-sm text-[var(--arion-ink)] focus:border-[var(--arion-cyan)] focus:outline-none";

  const renderCategory = (item, isNew = false) => {
    const isEditing = editingId === item.id || isNew;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedIds.has(item.id);

    if (isEditing) {
      return (
        <div key={item.id} className="space-y-3 rounded-xl border border-[var(--arion-cyan-light)] bg-[var(--arion-cyan)]/10 p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-[var(--arion-muted)] uppercase">Name</label>
              <input
                value={draft.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className={inputCls}
                placeholder="Category name"
                autoFocus
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-[var(--arion-muted)] uppercase">Slug</label>
              <input
                value={draft.slug}
                onChange={(e) => setDraft((p) => ({ ...p, slug: e.target.value, slugTouched: true }))}
                className={inputCls}
                placeholder="slug"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-[var(--arion-muted)] uppercase">Order</label>
              <input
                type="number"
                min="1"
                value={draft.sort_order}
                onChange={(e) => setField("sort_order", Number(e.target.value))}
                className={inputCls}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-[var(--arion-muted)] uppercase">Parent</label>
              <select
                value={draft.parent_id}
                onChange={(e) => setField("parent_id", e.target.value)}
                className={inputCls}
              >
                <option value="">None (top-level)</option>
                {tree.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={draft.is_active}
              onChange={(e) => setField("is_active", e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-sm text-[var(--arion-ink)]">Active</span>
          </label>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={saveEdit}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--arion-cyan)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--arion-cyan-strong)] disabled:opacity-60"
            >
              <Save size={16} /> Save
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--arion-border)] px-4 py-2 text-sm font-semibold text-[var(--arion-ink)] hover:bg-white/5"
            >
              <X size={16} /> Cancel
            </button>
          </div>
        </div>
      );
    }

    return (
      <div key={item.id} className="space-y-2">
        <div className="rounded-lg border border-[var(--arion-border)] bg-[var(--arion-card)] p-4 hover:border-[var(--arion-cyan-light)] transition-colors">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                {hasChildren && (
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="text-[var(--arion-muted)] hover:text-[var(--arion-cyan)]"
                  >
                    <ChevronDown
                      size={18}
                      style={{
                        transform: isExpanded ? "rotate(0)" : "rotate(-90deg)",
                        transition: "transform 200ms",
                      }}
                    />
                  </button>
                )}
                {!hasChildren && <div className="w-6" />}
                <div className="min-w-0">
                  <div className="font-semibold text-[var(--arion-ink)]">
                    {item.name}
                  </div>
                  <div className="text-xs text-[var(--arion-muted)]">
                    {item.slug}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => handleToggleActive(item)}
                disabled={!canEdit || editingId !== null || addingSubcategoryFor !== null}
                className={`rounded-lg px-4 py-2 text-sm font-semibold text-white ${
                  item.is_active
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-600 hover:bg-gray-700"
                } disabled:opacity-60`}
              >
                {item.is_active ? "Active" : "Inactive"}
              </button>

              <button
                onClick={() => startEdit(item)}
                disabled={!canEdit || editingId !== null || addingSubcategoryFor !== null}
                className="rounded-lg bg-[var(--arion-cyan)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--arion-cyan-strong)] disabled:opacity-60"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item)}
                disabled={!canDelete || editingId !== null}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Subcategories */}
        {hasChildren && isExpanded && (
          <div className="ml-6 space-y-2 border-l-2 border-[var(--arion-border)] pl-4">
            {item.children.map((child) => renderCategory(child))}
            {addingSubcategoryFor === item.id && renderCategory({ id: "new", name: "", slug: "", sort_order: 1, is_active: true }, true)}
            {canAdd && addingSubcategoryFor !== item.id && (
              <button
                onClick={() => startAdd(item.id)}
                disabled={editingId !== null || addingSubcategoryFor !== null}
                className="w-full rounded-lg border border-dashed border-[var(--arion-border)] py-2 text-sm font-semibold text-[var(--arion-muted)] hover:border-[var(--arion-cyan)] hover:text-[var(--arion-cyan)] disabled:opacity-40"
              >
                <Plus size={16} className="inline mr-1" /> Add Subcategory
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return <div className="arion-theme text-[var(--arion-muted)]">Loading…</div>;
  }

  return (
    <section className="arion-theme space-y-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--arion-ink)] sm:text-3xl">Categories</h2>
          <p className="text-sm text-[var(--arion-muted)]">Manage categories and subcategories shown in the navbar.</p>
        </div>
        <button
          type="button"
          disabled={!canAdd || editingId !== null}
          onClick={() => startAdd()}
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--arion-cyan)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--arion-cyan-strong)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus size={18} /> Add Category
        </button>
      </header>

      {error && (
        <div className="arion-glass rounded-xl border border-red-500/40 px-4 py-3 text-red-300">{error}</div>
      )}

      <div className="space-y-3">
        {editingId === "new" && renderCategory({ id: "new", name: "", slug: "", sort_order: 1, is_active: true }, true)}

        {tree.length === 0 && editingId !== "new" ? (
          <div className="arion-glass rounded-2xl p-6 text-[var(--arion-muted)]">No categories yet.</div>
        ) : (
          tree.map((item) => renderCategory(item))
        )}
      </div>
    </section>
  );
}
