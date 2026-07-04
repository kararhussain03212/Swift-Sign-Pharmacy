import { useEffect, useState } from "react";
import {
  getPrescriptionPageContent,
  updatePrescriptionPageContent,
  getPrescriptionProcessSteps,
  createPrescriptionProcessStep,
  updatePrescriptionProcessStep,
  deletePrescriptionProcessStep,
  getPrescriptionHowtoInstructions,
  createPrescriptionHowtoInstruction,
  updatePrescriptionHowtoInstruction,
  deletePrescriptionHowtoInstruction,
} from "../../api/prescriptionContentApi";

const inputCls = "w-full rounded-lg border border-white/20 bg-[var(--admin-card)] px-3 py-2 text-white";
const labelCls = "mb-1 block text-sm text-white/80";
const cardCls = "space-y-5 rounded-2xl border border-white/10 bg-[var(--admin-bg)] p-6";

function extractError(err, fallback) {
  return err?.response?.data?.error || err?.response?.data?.message || fallback;
}

/* ── Page copy singleton form ─────────────────────────── */
function ContentSection() {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getPrescriptionPageContent();
        setForm(res.data?.data ?? {});
      } catch {
        setError("Failed to load page content.");
      }
    })();
  }, []);

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMsg("");
    try {
      setSaving(true);
      const res = await updatePrescriptionPageContent(form);
      setForm(res.data?.data ?? form);
      setMsg("Saved.");
    } catch (err) {
      setError(extractError(err, "Failed to save page content."));
    } finally {
      setSaving(false);
    }
  };

  if (!form) return <div className={cardCls}>Loading page content…</div>;

  const fields = [
    ["hero_badge_text", "Hero Badge Text", "text"],
    ["hero_heading", "Hero Heading", "text"],
    ["hero_subheading", "Hero Subheading", "textarea"],
    ["upload_badge_text", "Upload Badge Text", "text"],
    ["upload_heading", "Upload Heading", "text"],
    ["upload_subtext", "Upload Subtext", "textarea"],
    // ["dropzone_instruction_text", "Dropzone Instruction Text", "text"],
    // ["dropzone_hint_text", "Dropzone Hint Text", "text"],
    ["howto_heading", "How-To Section Heading", "text"],
    ["sample_section_heading", "Sample Section Heading", "text"],
    ["help_heading", "Help Bar Heading", "text"],
    ["help_subtext", "Help Bar Subtext", "text"],
    ["help_phone_number", "Help Phone Number", "text"],
    // ["max_file_size_mb", "Max File Size (MB)", "number"],
    // ["allowed_file_types", "Allowed File Types (comma-separated)", "text"],
  ];

  return (
    <form onSubmit={handleSubmit} className={cardCls}>
      <h3 className="text-lg font-semibold text-white">Page Copy</h3>
      {error && <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">{error}</div>}
      {msg && <div className="rounded-lg border border-[rgba(15,175,184,0.30)] bg-[rgba(15,175,184,0.10)] px-4 py-3 text-[#0FAFB8]">{msg}</div>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map(([key, label, type]) => (
          <div key={key} className={type === "textarea" ? "sm:col-span-2" : ""}>
            <label className={labelCls}>{label}</label>
            {type === "textarea" ? (
              <textarea rows={3} value={form[key] ?? ""} onChange={(e) => setField(key, e.target.value)} className={inputCls} />
            ) : (
              <input
                type={type}
                value={form[key] ?? ""}
                onChange={(e) => setField(key, type === "number" ? Number(e.target.value) : e.target.value)}
                className={inputCls}
              />
            )}
          </div>
        ))}
      </div>

      <button type="submit" disabled={saving} className="rounded-xl bg-[var(--admin-primary)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--admin-primary-strong)] disabled:opacity-60">
        {saving ? "Saving…" : "Save Page Copy"}
      </button>
    </form>
  );
}

/* ── Generic reorderable list section (process steps / how-to) ──── */
function ListSection({ title, fetchAll, onCreate, onUpdate, onDelete, itemFields }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [drafts, setDrafts] = useState({});
  const [newItem, setNewItem] = useState(() => Object.fromEntries(itemFields.map((f) => [f.key, ""])));

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchAll();
      const list = res.data?.data ?? [];
      const sorted = [...list].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
      setItems(sorted);
      setDrafts(Object.fromEntries(sorted.map((it) => [it.id, { ...it }])));
    } catch {
      setError(`Failed to load ${title.toLowerCase()}.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUpdate = async (id) => {
    setError("");
    try {
      await onUpdate(id, drafts[id]);
      load();
    } catch (err) {
      setError(extractError(err, "Failed to save item."));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    setError("");
    try {
      await onDelete(id);
      load();
    } catch (err) {
      setError(extractError(err, "Failed to delete item."));
    }
  };

  const handleCreate = async () => {
    setError("");
    try {
      await onCreate({ ...newItem, sort_order: items.length + 1 });
      setNewItem(Object.fromEntries(itemFields.map((f) => [f.key, ""])));
      load();
    } catch (err) {
      setError(extractError(err, "Failed to add item."));
    }
  };

  return (
    <div className={cardCls}>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {error && <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">{error}</div>}

      {loading ? (
        <div className="text-sm text-[var(--admin-muted)]">Loading…</div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex flex-wrap items-end gap-3 rounded-xl border border-white/10 p-3">
              {itemFields.map((f) => (
                <div key={f.key} className="flex-1 min-w-[160px]">
                  <label className={labelCls}>{f.label}</label>
                  <input
                    value={drafts[item.id]?.[f.key] ?? ""}
                    onChange={(e) => setDrafts((prev) => ({ ...prev, [item.id]: { ...prev[item.id], [f.key]: e.target.value } }))}
                    className={inputCls}
                  />
                </div>
              ))}
              <div className="w-20">
                <label className={labelCls}>Order</label>
                <input
                  type="number"
                  value={drafts[item.id]?.sort_order ?? 0}
                  onChange={(e) => setDrafts((prev) => ({ ...prev, [item.id]: { ...prev[item.id], sort_order: Number(e.target.value) } }))}
                  className={inputCls}
                />
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => handleUpdate(item.id)} className="rounded-lg bg-[var(--admin-primary)] px-3 py-2 text-xs font-semibold text-white hover:bg-[var(--admin-primary-strong)]">
                  Save
                </button>
                <button type="button" onClick={() => handleDelete(item.id)} className="rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-end gap-3 rounded-xl border border-dashed border-white/20 p-3">
        {itemFields.map((f) => (
          <div key={f.key} className="flex-1 min-w-[160px]">
            <label className={labelCls}>{f.label}</label>
            <input
              value={newItem[f.key] ?? ""}
              onChange={(e) => setNewItem((prev) => ({ ...prev, [f.key]: e.target.value }))}
              className={inputCls}
              placeholder={f.label}
            />
          </div>
        ))}
        <button type="button" onClick={handleCreate} className="rounded-lg bg-[var(--admin-primary)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--admin-primary-strong)]">
          + Add
        </button>
      </div>
    </div>
  );
}

export default function PrescriptionPageContentEditor() {
  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-white">Prescription Page — Content</h2>
        <p className="mt-0.5 text-sm text-[var(--admin-muted)]">Edit the copy, process steps, and how-to list.</p>
      </header>

      <ContentSection />

      <ListSection
        title="Process Steps"
        fetchAll={getPrescriptionProcessSteps}
        onCreate={createPrescriptionProcessStep}
        onUpdate={updatePrescriptionProcessStep}
        onDelete={deletePrescriptionProcessStep}
        itemFields={[
          { key: "icon_key", label: "Icon Key" },
          { key: "label", label: "Label" },
        ]}
      />

      <ListSection
        title="How-To Instructions"
        fetchAll={getPrescriptionHowtoInstructions}
        onCreate={createPrescriptionHowtoInstruction}
        onUpdate={updatePrescriptionHowtoInstruction}
        onDelete={deletePrescriptionHowtoInstruction}
        itemFields={[{ key: "instruction_text", label: "Instruction Text" }]}
      />
    </section>
  );
}
