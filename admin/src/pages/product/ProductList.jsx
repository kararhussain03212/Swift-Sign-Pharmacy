import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct, getProducts, updateProduct } from "../../api/productApi";
import { useAuth } from "../../context/useAuth";
import { hasPermission } from "../../modules/users/constants";

const STOCK_LABELS = {
  in_stock: "In Stock",
  out_of_stock: "Out of Stock",
  preorder: "Preorder",
};

export default function ProductList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ page: 1, total_pages: 1 });
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ show: false, text: "" });

  const canAdd = hasPermission(user, "create_content");
  const canEdit = hasPermission(user, "edit_content");
  const canDelete = hasPermission(user, "delete_content");
  const canPublish = hasPermission(user, "publish_content");

  const showNoPerm = (action) => setToast({ show: true, text: `You do not have permission to ${action}.` });

  useEffect(() => {
    if (!toast.show) return;
    const t = setTimeout(() => setToast({ show: false, text: "" }), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const load = async (page = 1) => {
    setLoading(true);
    try {
      const params = { page, per_page: 20 };
      if (type) params.type = type;
      if (search.trim()) params.search = search.trim();
      const res = await getProducts(params);
      setProducts(Array.isArray(res.data?.data?.data) ? res.data.data.data : []);
      setMeta(res.data?.data?.meta ?? { page: 1, total_pages: 1 });
    } catch (err) {
      console.error(err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(1); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [type]);

  const handleSearchSubmit = (e) => { e.preventDefault(); load(1); };

  const handleDelete = async (id) => {
    if (!canDelete) { showNoPerm("delete products"); return; }
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      load(meta.page);
    } catch (err) {
      setError(err?.response?.data?.message || "Delete failed.");
    }
  };

  const handleToggleActive = async (item) => {
    if (!canPublish) { showNoPerm("publish products"); return; }
    try {
      const nextActive = item.is_active ? 0 : 1;
      await updateProduct(item.id, { is_active: nextActive });
      setProducts((prev) => prev.map((p) => (p.id === item.id ? { ...p, is_active: nextActive } : p)));
    } catch (err) {
      if (err?.response?.status === 401) { navigate("/login", { replace: true }); return; }
      setError("Failed to update product status.");
    }
  };

  return (
    <section className="space-y-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Products</h2>
          <p className="text-sm text-white/65">Pharmacy and laboratory chemical products shown on the website.</p>
        </div>
        <button
          type="button"
          onClick={() => (canAdd ? navigate("/products/new") : showNoPerm("add products"))}
          className="inline-flex w-fit rounded-xl bg-[var(--admin-primary)] px-5 py-2.5 text-black hover:bg-[var(--admin-primary-strong)]"
        >
          + Add Product
        </button>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <form onSubmit={handleSearchSubmit} className="flex flex-1 gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name…"
            className="flex-1 rounded-lg border border-white/20 bg-[var(--admin-card)] px-3 py-2 text-white"
          />
          <button type="submit" className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/5">Search</button>
        </form>
        <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-lg border border-white/20 bg-[var(--admin-card)] px-3 py-2 text-white">
          <option value="">All Types</option>
          <option value="pharmacy">Pharmacy</option>
          <option value="chemical">Chemical</option>
        </select>
      </div>

      {toast.show && (
        <div className="fixed right-5 top-5 z-[220] rounded-xl border border-red-400/30 bg-red-500/90 px-4 py-2 text-sm font-medium text-white shadow-lg">
          {toast.text}
        </div>
      )}

      {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">{error}</div>}

      {loading ? (
        <p className="text-white/70">Loading products…</p>
      ) : products.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[var(--admin-bg)] p-6 text-white/70">
          No products found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[var(--admin-bg)]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 text-white/60">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Active</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id} className="border-b border-white/5 text-white/85">
                  <td className="px-4 py-3 font-medium">{item.name}</td>
                  <td className="px-4 py-3 text-white/60">{item.category_name || "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${item.product_type === "chemical" ? "bg-amber-500/20 text-amber-300" : "bg-[var(--admin-primary)]/20 text-[var(--admin-primary)]"}`}>
                      {item.product_type}
                    </span>
                  </td>
                  <td className="px-4 py-3">PKR {Number(item.base_price || 0).toLocaleString()}</td>
                  <td className="px-4 py-3 text-white/60">{STOCK_LABELS[item.stock_status] ?? item.stock_status}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(item)}
                      className={item.is_active ? "rounded-lg bg-green-600 px-3 py-1 text-xs text-white hover:bg-green-700" : "rounded-lg bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700"}
                    >
                      {item.is_active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => (canEdit ? navigate(`/products/edit/${item.id}`) : showNoPerm("edit products"))}
                        className="rounded-lg bg-[#1f8b4c] px-3 py-1 text-xs text-white hover:bg-[var(--admin-primary-strong)]"
                      >
                        Edit
                      </button>
                      <button type="button" onClick={() => handleDelete(item.id)} className="rounded-lg bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {meta.total_pages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={meta.page <= 1}
            onClick={() => load(meta.page - 1)}
            className="rounded-lg border border-white/20 px-4 py-1.5 text-sm text-white hover:bg-white/5 disabled:opacity-30"
          >
            Prev
          </button>
          <span className="text-sm text-white/60">Page {meta.page} of {meta.total_pages}</span>
          <button
            type="button"
            disabled={meta.page >= meta.total_pages}
            onClick={() => load(meta.page + 1)}
            className="rounded-lg border border-white/20 px-4 py-1.5 text-sm text-white hover:bg-white/5 disabled:opacity-30"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
