import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageUpload from "../../components/ImageUpload";
import { uploadImage } from "../../api/uploadApi";
import { createProduct, getCategoriesWithType, getProduct, updateProduct } from "../../api/productApi";
import { getBackendRoot } from "../../api/runtimeApi";

const resolveDocUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("blob:") || url.startsWith("http") || url === "#") return url === "#" ? "" : url;
  if (url.startsWith("/uploads/")) return getBackendRoot() + url;
  return "";
};

const DOC_GROUPS = [
  { key: "certificate", label: "Certificates" },
  { key: "safety_data_sheet", label: "Safety Data Sheets" },
  { key: "product_information", label: "Product Information" },
  { key: "scientific_resource", label: "Scientific Resources" },
];

const getInitialForm = () => ({
  name: "",
  category_id: "",
  manufacturer_or_brand: "",
  form: "",
  sku: "",
  base_price: "",
  badge_label: "",
  description_text: "",
  stock_status: "in_stock",
  is_active: true,
  images: [], // array of { url, file }
  pharmacy: {
    net_weight: "",
    original_price: "",
    discount_percent: "",
    directions_for_use: "",
    benefits: [""],
  },
  chemical: {
    cas_number: "",
    chemical_name_of_material: "",
    boiling_point: "",
    melting_point: "",
    molecular_formula: "",
    molecular_weight: "",
    percent_purity: "",
    color: "",
    synonym: "",
    grade: "",
    unit_size: "",
    molecule_diagram_url: "",
    moleculeDiagramFile: null,
    quantity_options: [{ label: "", price_override: "", is_default: true }],
    packaging_options: [{ label: "", is_default: true }],
    documents: { certificate: [], safety_data_sheet: [], product_information: [], scientific_resource: [] },
  },
});

function categoryFor(categories, id) {
  return categories.find((c) => c.id === Number(id)) || null;
}

const inputCls = "w-full rounded-lg border border-white/20 bg-[var(--admin-card)] px-3 py-2 text-white";
const labelCls = "mb-1 block text-sm text-white/80";
const sectionCls = "space-y-4 rounded-xl border border-white/10 bg-[var(--admin-bg)] p-4";

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [form, setForm] = useState(getInitialForm);
  const [categories, setCategories] = useState([]);
  const [topCategoryId, setTopCategoryId] = useState("");
  const [originalCategoryId, setOriginalCategoryId] = useState(null);
  const [pendingCategoryId, setPendingCategoryId] = useState(null); // awaiting type-change confirmation
  const [toast, setToast] = useState("");

  const topLevelCategories = useMemo(() => categories.filter((c) => !c.parent_id), [categories]);
  const subCategories = useMemo(
    () => categories.filter((c) => c.parent_id === Number(topCategoryId)),
    [categories, topCategoryId]
  );
  const selectedCategory = useMemo(
    () => categoryFor(categories, form.category_id),
    [categories, form.category_id]
  );
  const productType = selectedCategory?.product_type ?? null;

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const setPharmacyField = (key, value) => setForm((prev) => ({ ...prev, pharmacy: { ...prev.pharmacy, [key]: value } }));
  const setChemicalField = (key, value) => setForm((prev) => ({ ...prev, chemical: { ...prev.chemical, [key]: value } }));

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    (async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          getCategoriesWithType(),
          isEditMode ? getProduct(id) : Promise.resolve(null),
        ]);

        const categoryList = Array.isArray(catRes.data?.data) ? catRes.data.data : [];
        setCategories(categoryList);

        if (prodRes) {
          const item = prodRes.data?.data ?? {};
          setOriginalCategoryId(item.category_id ?? null);

          const loadedCategory = categoryFor(categoryList, item.category_id);
          setTopCategoryId(
            loadedCategory ? String(loadedCategory.parent_id ?? loadedCategory.id) : ""
          );

          setForm({
            name: item.name || "",
            category_id: item.category_id ?? "",
            manufacturer_or_brand: item.manufacturer_or_brand || "",
            form: item.form || "",
            sku: item.sku || "",
            base_price: item.base_price != null ? String(item.base_price) : "",
            badge_label: item.badge_label || "",
            description_text: item.description_text || "",
            stock_status: item.stock_status || "in_stock",
            is_active: Boolean(Number(item.is_active ?? 1)),
            images: Array.isArray(item.images) ? item.images.map((url) => ({ url, file: null })) : [],
            pharmacy: {
              net_weight: item.pharmacy?.net_weight || "",
              original_price: item.pharmacy?.original_price != null ? String(item.pharmacy.original_price) : "",
              discount_percent: item.pharmacy?.discount_percent != null ? String(item.pharmacy.discount_percent) : "",
              directions_for_use: item.pharmacy?.directions_for_use || "",
              benefits: item.pharmacy?.benefits?.length ? item.pharmacy.benefits : [""],
            },
            chemical: {
              cas_number: item.chemical?.cas_number || "",
              chemical_name_of_material: item.chemical?.chemical_name_of_material || "",
              boiling_point: item.chemical?.boiling_point || "",
              melting_point: item.chemical?.melting_point || "",
              molecular_formula: item.chemical?.molecular_formula || "",
              molecular_weight: item.chemical?.molecular_weight || "",
              percent_purity: item.chemical?.percent_purity || "",
              color: item.chemical?.color || "",
              synonym: item.chemical?.synonym || "",
              grade: item.chemical?.grade || "",
              unit_size: item.chemical?.unit_size || "",
              molecule_diagram_url: item.chemical?.molecule_diagram_url || "",
              moleculeDiagramFile: null,
              quantity_options: item.chemical?.quantity_options?.length
                ? item.chemical.quantity_options.map((q) => ({ label: q.label, price_override: q.price_override ?? "", is_default: !!Number(q.is_default) }))
                : [{ label: "", price_override: "", is_default: true }],
              packaging_options: item.chemical?.packaging_options?.length
                ? item.chemical.packaging_options.map((p) => ({ label: p.label, is_default: !!Number(p.is_default) }))
                : [{ label: "", is_default: true }],
              documents: (() => {
                const grouped = { certificate: [], safety_data_sheet: [], product_information: [], scientific_resource: [] };
                const docs = Array.isArray(item.chemical?.documents) ? item.chemical.documents : [];
                docs.forEach((d) => {
                  const documentDate = d.document_date && d.document_date !== "0000-00-00" ? d.document_date : "";
                  (grouped[d.doc_group] ??= []).push({ ...d, document_date: documentDate, fileObj: null });
                });
                return grouped;
              })(),
            },
          });
        }
      } catch {
        setError("Failed to load product data.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEditMode]);

  const commitCategorySelection = (newCategoryIdRaw) => {
    const newCategoryId = newCategoryIdRaw === "" ? "" : Number(newCategoryIdRaw);
    if (isEditMode && originalCategoryId != null && newCategoryId !== "") {
      const oldType = categories.find((c) => c.id === originalCategoryId)?.product_type;
      const newType = categories.find((c) => c.id === newCategoryId)?.product_type;
      if (oldType && newType && oldType !== newType) {
        setPendingCategoryId(newCategoryId);
        return;
      }
    }
    setField("category_id", newCategoryId);
  };

  const handleTopCategoryChange = (newTopIdRaw) => {
    setTopCategoryId(newTopIdRaw);
    const children = categories.filter((c) => c.parent_id === Number(newTopIdRaw));
    // No subcategories under this top-level pick -> it IS the product's category.
    // Otherwise wait for the subcategory dropdown before committing category_id.
    commitCategorySelection(children.length === 0 ? newTopIdRaw : "");
  };

  const handleSubCategoryChange = (newSubIdRaw) => {
    commitCategorySelection(newSubIdRaw);
  };

  const confirmCategoryChange = () => {
    setField("category_id", pendingCategoryId);
    setPendingCategoryId(null);
  };

  // ---- Images ----
  const addImageSlot = () => setForm((p) => ({ ...p, images: [...p.images, { url: "", file: null }] }));
  const removeImageSlot = (idx) => setForm((p) => ({ ...p, images: p.images.filter((_, i) => i !== idx) }));
  const setImageFile = (idx, file) =>
    setForm((p) => ({ ...p, images: p.images.map((img, i) => (i === idx ? { ...img, file } : img)) }));

  // ---- Pharmacy benefits ----
  const addBenefit = () => setPharmacyField("benefits", [...form.pharmacy.benefits, ""]);
  const removeBenefit = (idx) => setPharmacyField("benefits", form.pharmacy.benefits.filter((_, i) => i !== idx));
  const setBenefit = (idx, value) =>
    setPharmacyField("benefits", form.pharmacy.benefits.map((b, i) => (i === idx ? value : b)));

  // ---- Chemical quantity/packaging options ----
  const addQuantityOption = () =>
    setChemicalField("quantity_options", [...form.chemical.quantity_options, { label: "", price_override: "", is_default: false }]);
  const removeQuantityOption = (idx) =>
    setChemicalField("quantity_options", form.chemical.quantity_options.filter((_, i) => i !== idx));
  const setQuantityOption = (idx, key, value) =>
    setChemicalField("quantity_options", form.chemical.quantity_options.map((o, i) => (i === idx ? { ...o, [key]: value } : o)));

  const addPackagingOption = () =>
    setChemicalField("packaging_options", [...form.chemical.packaging_options, { label: "", is_default: false }]);
  const removePackagingOption = (idx) =>
    setChemicalField("packaging_options", form.chemical.packaging_options.filter((_, i) => i !== idx));
  const setPackagingOption = (idx, key, value) =>
    setChemicalField("packaging_options", form.chemical.packaging_options.map((o, i) => (i === idx ? { ...o, [key]: value } : o)));

  // ---- Chemical documents ----
  const addDocument = (group) =>
    setChemicalField("documents", {
      ...form.chemical.documents,
      [group]: [...form.chemical.documents[group], { title: "", file_url: "", fileObj: null, lot_number: "", certificate_type: "", document_date: "", catalog_numbers: "" }],
    });
  const removeDocument = (group, idx) =>
    setChemicalField("documents", { ...form.chemical.documents, [group]: form.chemical.documents[group].filter((_, i) => i !== idx) });
  const setDocumentField = (group, idx, key, value) =>
    setChemicalField("documents", {
      ...form.chemical.documents,
      [group]: form.chemical.documents[group].map((d, i) => (i === idx ? { ...d, [key]: value } : d)),
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    if (!form.name.trim()) { setError("Name is required."); return; }
    if (!form.category_id) { setError("Category is required."); return; }
    if (!form.manufacturer_or_brand.trim()) { setError(`${productType === "chemical" ? "Manufacturer" : "Brand"} is required.`); return; }
    if (!form.base_price) { setError("Base price is required."); return; }

    if (productType === "chemical") {
      for (const group of DOC_GROUPS) {
        for (const doc of form.chemical.documents[group.key]) {
          if (doc.title.trim() && !doc.fileObj && !doc.file_url) {
            setError(`"${doc.title.trim()}" under ${group.label} has no file attached — choose a file or remove it before saving.`);
            return;
          }
        }
      }
    }

    try {
      setSaving(true);

      const imageUrls = await Promise.all(
        form.images.map(async (img) => (img.file ? await uploadImage(img.file, "products") : img.url))
      );

      const payload = {
        name: form.name.trim(),
        category_id: Number(form.category_id),
        manufacturer_or_brand: form.manufacturer_or_brand.trim(),
        form: form.form.trim(),
        sku: form.sku.trim(),
        base_price: Number(form.base_price),
        badge_label: form.badge_label.trim(),
        description_text: form.description_text.trim(),
        stock_status: form.stock_status,
        is_active: form.is_active ? 1 : 0,
        images: imageUrls.filter(Boolean),
      };

      if (productType === "pharmacy") {
        payload.pharmacy = {
          net_weight: form.pharmacy.net_weight.trim(),
          original_price: form.pharmacy.original_price === "" ? "" : Number(form.pharmacy.original_price),
          discount_percent: form.pharmacy.discount_percent === "" ? "" : Number(form.pharmacy.discount_percent),
          directions_for_use: form.pharmacy.directions_for_use.trim(),
          benefits: form.pharmacy.benefits.map((b) => b.trim()).filter(Boolean),
        };
      } else if (productType === "chemical") {
        const moleculeDiagramUrl = form.chemical.moleculeDiagramFile
          ? await uploadImage(form.chemical.moleculeDiagramFile, "products")
          : form.chemical.molecule_diagram_url;

        const documents = [];
        for (const group of DOC_GROUPS) {
          for (const doc of form.chemical.documents[group.key]) {
            if (!doc.title.trim()) continue;
            const fileUrl = doc.fileObj ? await uploadImage(doc.fileObj, "documents") : doc.file_url;
            if (!fileUrl) continue;
            documents.push({
              doc_group: group.key,
              title: doc.title.trim(),
              file_url: fileUrl,
              lot_number: doc.lot_number || "",
              certificate_type: doc.certificate_type || "",
              document_date: doc.document_date || "",
              catalog_numbers: doc.catalog_numbers || "",
            });
          }
        }

        payload.chemical = {
          cas_number: form.chemical.cas_number.trim(),
          chemical_name_of_material: form.chemical.chemical_name_of_material.trim(),
          boiling_point: form.chemical.boiling_point.trim(),
          melting_point: form.chemical.melting_point.trim(),
          molecular_formula: form.chemical.molecular_formula.trim(),
          molecular_weight: form.chemical.molecular_weight.trim(),
          percent_purity: form.chemical.percent_purity.trim(),
          color: form.chemical.color.trim(),
          synonym: form.chemical.synonym.trim(),
          grade: form.chemical.grade.trim(),
          unit_size: form.chemical.unit_size.trim(),
          molecule_diagram_url: moleculeDiagramUrl,
          quantity_options: form.chemical.quantity_options.filter((o) => o.label.trim()),
          packaging_options: form.chemical.packaging_options.filter((o) => o.label.trim()),
          documents,
        };
      }

      if (isEditMode) await updateProduct(id, payload);
      else await createProduct(payload);

      setToast(isEditMode ? "Product updated." : "Product created.");
      navigate("/products");
    } catch (err) {
      setError(err?.response?.data?.error || err?.response?.data?.message || err?.message || "Save failed.");
      setFieldErrors(err?.response?.data?.fields || {});
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-white/70">Loading…</div>;

  return (
    <section className="mx-auto max-w-3xl space-y-5">
      <h2 className="text-2xl font-bold text-white">{isEditMode ? "Edit Product" : "Add Product"}</h2>

      {toast && (
        <div className="fixed right-5 top-5 z-[220] rounded-xl border border-[rgba(15,175,184,0.30)] bg-[#0998A0]/90 px-4 py-2 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}

      {error && <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">{error}</div>}

      {pendingCategoryId !== null && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[var(--admin-bg)] p-6">
            <h3 className="text-lg font-bold text-white">Change product type?</h3>
            <p className="mt-2 text-sm text-white/70">
              This category switches the product from{" "}
              <strong>{categories.find((c) => c.id === originalCategoryId)?.product_type}</strong> to{" "}
              <strong>{categories.find((c) => c.id === pendingCategoryId)?.product_type}</strong>. The previous
              type-specific fields (benefits, specifications, documents, etc.) will stop showing on the storefront —
              they are not deleted, but you'll need to re-enter fields for the new type.
            </p>
            <div className="mt-5 flex gap-3">
              <button type="button" onClick={confirmCategoryChange} className="rounded-xl bg-[var(--admin-primary)] px-5 py-2 text-sm font-semibold text-white hover:bg-[var(--admin-primary-strong)]">
                Continue
              </button>
              <button type="button" onClick={() => setPendingCategoryId(null)} className="rounded-xl border border-white/20 px-5 py-2 text-sm font-semibold text-white hover:bg-white/5">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Shared fields */}
        <div className={sectionCls}>
          <h3 className="font-semibold text-white/90">Product Details</h3>

          <div>
            <label className={labelCls}>Name</label>
            <input value={form.name} onChange={(e) => setField("name", e.target.value)} className={inputCls} />
            {fieldErrors.name && <p className="mt-1 text-xs text-red-400">{fieldErrors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Category</label>
              <select value={topCategoryId} onChange={(e) => handleTopCategoryChange(e.target.value)} className={inputCls}>
                <option value="">Select a category…</option>
                {topLevelCategories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Subcategory</label>
              <select
                value={subCategories.some((c) => c.id === Number(form.category_id)) ? form.category_id : ""}
                onChange={(e) => handleSubCategoryChange(e.target.value)}
                disabled={subCategories.length === 0}
                className={inputCls}
              >
                <option value="">{subCategories.length === 0 ? "No subcategories" : "Select a subcategory…"}</option>
                {subCategories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            {fieldErrors.category_id && <p className="col-span-2 mt-1 text-xs text-red-400">{fieldErrors.category_id}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>{productType === "chemical" ? "Manufacturer" : "Brand"}</label>
              <input value={form.manufacturer_or_brand} onChange={(e) => setField("manufacturer_or_brand", e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Form</label>
              <input value={form.form} onChange={(e) => setField("form", e.target.value)} className={inputCls} placeholder="Cream, Liquid, Tablet…" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>SKU</label>
              <input value={form.sku} onChange={(e) => setField("sku", e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Base Price</label>
              <input type="number" min="0" step="0.01" value={form.base_price} onChange={(e) => setField("base_price", e.target.value)} className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Badge Label</label>
              <input value={form.badge_label} onChange={(e) => setField("badge_label", e.target.value)} className={inputCls} placeholder="HOT, NEW, CHEMICAL…" />
            </div>
            <div>
              <label className={labelCls}>Stock Status</label>
              <select value={form.stock_status} onChange={(e) => setField("stock_status", e.target.value)} className={inputCls}>
                <option value="in_stock">In Stock</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="preorder">Preorder</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Description</label>
            <textarea value={form.description_text} onChange={(e) => setField("description_text", e.target.value)} rows={4} className={inputCls} />
          </div>

          <label className="flex items-center gap-2 text-sm text-white/80">
            <input type="checkbox" checked={form.is_active} onChange={(e) => setField("is_active", e.target.checked)} />
            Active (visible on the storefront)
          </label>
        </div>

        {/* Image gallery */}
        <div className={sectionCls}>
          <h3 className="font-semibold text-white/90">Image Gallery</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {form.images.map((img, idx) => (
              <div key={idx} className="relative">
                <ImageUpload value={img.url} onFileSelect={(file) => setImageFile(idx, file)} label={`Image ${idx + 1}`} />
                <button type="button" onClick={() => removeImageSlot(idx)} className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white hover:bg-red-600">✕</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addImageSlot} className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/5">
            + Add Image
          </button>
        </div>

        {/* Pharmacy section */}
        {productType === "pharmacy" && (
          <div className={sectionCls}>
            <h3 className="font-semibold text-white/90">Pharmacy Details</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelCls}>Net Weight</label>
                <input value={form.pharmacy.net_weight} onChange={(e) => setPharmacyField("net_weight", e.target.value)} className={inputCls} placeholder="50g" />
              </div>
              <div>
                <label className={labelCls}>Original Price</label>
                <input type="number" min="0" step="0.01" value={form.pharmacy.original_price} onChange={(e) => setPharmacyField("original_price", e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Discount %</label>
                <input type="number" min="0" max="100" value={form.pharmacy.discount_percent} onChange={(e) => setPharmacyField("discount_percent", e.target.value)} className={inputCls} />
              </div>
            </div>

            <div>
              <label className={labelCls}>Directions for Use</label>
              <textarea value={form.pharmacy.directions_for_use} onChange={(e) => setPharmacyField("directions_for_use", e.target.value)} rows={3} className={inputCls} />
            </div>

            <div>
              <label className={labelCls}>Key Benefits</label>
              <div className="space-y-2">
                {form.pharmacy.benefits.map((b, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input value={b} onChange={(e) => setBenefit(idx, e.target.value)} className={inputCls} placeholder="Broad-spectrum protection…" />
                    <button type="button" onClick={() => removeBenefit(idx)} className="rounded-lg border border-white/20 px-3 text-white hover:bg-white/5">✕</button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={addBenefit} className="mt-2 rounded-lg border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/5">
                + Add Benefit
              </button>
            </div>
          </div>
        )}

        {/* Chemical section */}
        {productType === "chemical" && (
          <>
            <div className={sectionCls}>
              <h3 className="font-semibold text-white/90">Chemical Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["cas_number", "CAS Number"], ["chemical_name_of_material", "Chemical Name of Material"],
                  ["boiling_point", "Boiling Point"], ["melting_point", "Melting Point"],
                  ["molecular_formula", "Molecular Formula"], ["molecular_weight", "Molecular Weight (g/mol)"],
                  ["percent_purity", "Percent Purity"], ["color", "Color"],
                  ["synonym", "Synonym"], ["grade", "Grade"], ["unit_size", "Unit Size"],
                ].map(([key, label]) => (
                  <div key={key}>
                    <label className={labelCls}>{label}</label>
                    <input value={form.chemical[key]} onChange={(e) => setChemicalField(key, e.target.value)} className={inputCls} />
                  </div>
                ))}
              </div>
              <div>
                <label className={labelCls}>Molecule Diagram</label>
                <ImageUpload value={form.chemical.molecule_diagram_url} onFileSelect={(file) => setChemicalField("moleculeDiagramFile", file)} label="Upload Molecule Diagram" />
              </div>
            </div>

            <div className={sectionCls}>
              <h3 className="font-semibold text-white/90">Quantity Options</h3>
              {form.chemical.quantity_options.map((opt, idx) => (
                <div key={idx} className="flex flex-wrap items-center gap-2">
                  <input value={opt.label} onChange={(e) => setQuantityOption(idx, "label", e.target.value)} className={inputCls + " flex-1"} placeholder="500 mL" />
                  <input type="number" min="0" step="0.01" value={opt.price_override} onChange={(e) => setQuantityOption(idx, "price_override", e.target.value)} className={inputCls + " w-32"} placeholder="Price override" />
                  <label className="flex items-center gap-1 text-xs text-white/70">
                    <input type="radio" name="qty_default" checked={opt.is_default} onChange={() => form.chemical.quantity_options.forEach((_, i) => setQuantityOption(i, "is_default", i === idx))} />
                    Default
                  </label>
                  <button type="button" onClick={() => removeQuantityOption(idx)} className="rounded-lg border border-white/20 px-3 py-1 text-white hover:bg-white/5">✕</button>
                </div>
              ))}
              <button type="button" onClick={addQuantityOption} className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/5">
                + Add Quantity Option
              </button>
            </div>

            <div className={sectionCls}>
              <h3 className="font-semibold text-white/90">Packaging Options</h3>
              {form.chemical.packaging_options.map((opt, idx) => (
                <div key={idx} className="flex flex-wrap items-center gap-2">
                  <input value={opt.label} onChange={(e) => setPackagingOption(idx, "label", e.target.value)} className={inputCls + " flex-1"} placeholder="Clear glass bottle" />
                  <label className="flex items-center gap-1 text-xs text-white/70">
                    <input type="radio" name="pkg_default" checked={opt.is_default} onChange={() => form.chemical.packaging_options.forEach((_, i) => setPackagingOption(i, "is_default", i === idx))} />
                    Default
                  </label>
                  <button type="button" onClick={() => removePackagingOption(idx)} className="rounded-lg border border-white/20 px-3 py-1 text-white hover:bg-white/5">✕</button>
                </div>
              ))}
              <button type="button" onClick={addPackagingOption} className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/5">
                + Add Packaging Option
              </button>
            </div>

            <div className={sectionCls}>
              <h3 className="font-semibold text-white/90">Documents &amp; Downloads</h3>
              {DOC_GROUPS.map((group) => (
                <div key={group.key} className="space-y-3 rounded-lg border border-white/10 p-3">
                  <p className="text-sm font-semibold text-white/80">{group.label}</p>
                  {form.chemical.documents[group.key].map((doc, idx) => (
                    <div key={idx} className="space-y-2 rounded-lg bg-white/5 p-3">
                      <div className="flex gap-2">
                        <input value={doc.title} onChange={(e) => setDocumentField(group.key, idx, "title", e.target.value)} className={inputCls} placeholder="Title" />
                        <button type="button" onClick={() => removeDocument(group.key, idx)} className="rounded-lg border border-white/20 px-3 text-white hover:bg-white/5">✕</button>
                      </div>
                      <input
                        type="file"
                        onChange={(e) => setDocumentField(group.key, idx, "fileObj", e.target.files?.[0] || null)}
                        className="block w-full text-sm text-white file:mr-3 file:rounded-md file:border-0 file:bg-[var(--admin-primary)] file:px-3 file:py-1.5 file:text-black"
                      />
                      {doc.fileObj ? (
                        <p className="text-xs text-[var(--admin-primary)]">New file selected: {doc.fileObj.name} (uploaded on save)</p>
                      ) : doc.file_url ? (
                        <p className="text-xs text-white/60">
                          Attached: {resolveDocUrl(doc.file_url)
                            ? <a href={resolveDocUrl(doc.file_url)} target="_blank" rel="noreferrer" className="text-[var(--admin-primary)] underline">{doc.file_url.split("/").pop()}</a>
                            : doc.file_url.split("/").pop()}
                        </p>
                      ) : (
                        <p className="text-xs text-[#0FAFB8]">No file attached yet — this document won't be saved until you choose a file.</p>
                      )}
                      {group.key === "certificate" && (
                        <div className="grid grid-cols-2 gap-2">
                          <input value={doc.lot_number} onChange={(e) => setDocumentField(group.key, idx, "lot_number", e.target.value)} className={inputCls} placeholder="Lot Number" />
                          <input value={doc.certificate_type} onChange={(e) => setDocumentField(group.key, idx, "certificate_type", e.target.value)} className={inputCls} placeholder="Certificate Type" />
                          <input type="date" value={doc.document_date} onChange={(e) => setDocumentField(group.key, idx, "document_date", e.target.value)} className={inputCls} />
                          <input value={doc.catalog_numbers} onChange={(e) => setDocumentField(group.key, idx, "catalog_numbers", e.target.value)} className={inputCls} placeholder="Catalog Number(s)" />
                        </div>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={() => addDocument(group.key)} className="rounded-lg border border-white/20 px-3 py-1.5 text-xs text-white hover:bg-white/5">
                    + Add {group.label.replace(/s$/, "")}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="submit" disabled={saving} className="rounded-xl bg-[var(--admin-primary)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--admin-primary-strong)] disabled:opacity-60">
            {saving ? "Saving…" : isEditMode ? "Update Product" : "Create Product"}
          </button>
          <button type="button" onClick={() => navigate("/products")} className="rounded-xl border border-white/20 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/5">
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
