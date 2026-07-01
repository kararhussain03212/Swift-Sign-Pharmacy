import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { hasPermission } from "../../modules/users/constants";
import { deleteContactFaq, getContactFaqs, updateContactFaq } from "../../api/contactFaqApi";

const extractErrorMessage = (error, fallback) =>
  error?.response?.data?.error || error?.response?.data?.message || error?.message || fallback;

export default function ContactFaqList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const canAdd = hasPermission(user, "create_content");
  const canEdit = hasPermission(user, "edit_content");
  const canDelete = hasPermission(user, "delete_content");
  const canPublish = hasPermission(user, "publish_content");

  const loadFaqs = async () => {
    try {
      const res = await getContactFaqs();
      const data = res.data?.data;
      const items = Array.isArray(data) ? data : [];
      setFaqs([...items].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)));
    } catch (err) {
      console.error(err);
      setError("Failed to load FAQs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const handleDelete = async (id) => {
    if (!canDelete) return;
    if (!window.confirm("Delete this FAQ?")) return;
    try {
      await deleteContactFaq(id);
      loadFaqs();
    } catch (err) {
      setError(extractErrorMessage(err, "Delete failed."));
    }
  };

  const handleToggleActive = async (item) => {
    if (!canPublish) return;
    try {
      const nextActive = item.is_active ? 0 : 1;
      const { data } = await updateContactFaq(item.id, { is_active: nextActive });
      setFaqs((prev) => prev.map((f) => (f.id === data?.data?.id ? data.data : f)));
    } catch (err) {
      setError(extractErrorMessage(err, "Failed to update status."));
    }
  };

  if (loading) return <div className="text-white/70">Loading…</div>;

  return (
    <section className="space-y-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Contact FAQs</h2>
          <p className="text-sm text-white/65">Accordion questions/answers shown on the Contact page.</p>
        </div>
        <button
          type="button"
          disabled={!canAdd}
          onClick={() => navigate("/contact-faqs/new")}
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-[var(--admin-primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--admin-primary-strong)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Add FAQ
        </button>
      </header>

      {error ? <div className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-red-300">{error}</div> : null}

      {faqs.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[var(--admin-card)] p-6 text-white/60">No FAQs yet.</div>
      ) : (
        <div className="grid gap-4">
          {faqs.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--admin-card)] p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-white">{item.question}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-white/60">{item.answer}</p>
                  <div className="mt-1 text-xs text-white/40">Order: {item.sort_order}</div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    disabled={!canPublish}
                    onClick={() => handleToggleActive(item)}
                    className={`rounded-full px-4 py-1.5 text-sm font-semibold text-white disabled:opacity-40 ${
                      item.is_active
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    {item.is_active ? "Active" : "Inactive"}
                  </button>
                  <button
                    type="button"
                    disabled={!canEdit}
                    onClick={() => navigate(`/contact-faqs/edit/${item.id}`)}
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
