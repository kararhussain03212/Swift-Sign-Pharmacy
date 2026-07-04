import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { hasPermission } from "../../modules/users/constants";
import { deleteContactInfoCard, getContactInfoCards } from "../../api/contactInfoCardApi";

const extractErrorMessage = (error, fallback) =>
  error?.response?.data?.error || error?.response?.data?.message || error?.message || fallback;

export default function ContactInfoCardList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const canAdd = hasPermission(user, "create_content");
  const canEdit = hasPermission(user, "edit_content");
  const canDelete = hasPermission(user, "delete_content");

  const loadCards = async () => {
    try {
      const res = await getContactInfoCards();
      const data = res.data?.data;
      const items = Array.isArray(data) ? data : [];
      setCards([...items].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)));
    } catch (err) {
      console.error(err);
      setError("Failed to load info cards.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  const handleDelete = async (id) => {
    if (!canDelete) return;
    if (!window.confirm("Delete this info card?")) return;
    try {
      await deleteContactInfoCard(id);
      loadCards();
    } catch (err) {
      setError(extractErrorMessage(err, "Delete failed."));
    }
  };

  if (loading) return <div className="text-white/70">Loading…</div>;

  return (
    <section className="space-y-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Contact Info Cards</h2>
          <p className="text-sm text-white/65">Call Us / Email Us / Visit Us / Working Hours cards shown on the Contact page.</p>
        </div>
        <button
          type="button"
          disabled={!canAdd}
          onClick={() => navigate("/contact-info-cards/new")}
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-[var(--admin-primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--admin-primary-strong)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Add Card
        </button>
      </header>

      {error ? <div className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-red-300">{error}</div> : null}

      {cards.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[var(--admin-card)] p-6 text-white/60">No info cards yet.</div>
      ) : (
        <div className="grid gap-4">
          {cards.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--admin-card)] p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 whitespace-pre-line text-white/70">{item.value_text}</p>
                  {item.note_text ? <p className="mt-2 text-white/60">{item.note_text}</p> : null}
                  <div className="mt-2 text-sm text-white/40">Order: {item.sort_order}</div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="rounded-full bg-[#0998A0] px-4 py-1.5 text-sm font-semibold text-white">
                    {item.icon_key}
                  </span>
                  <button
                    type="button"
                    disabled={!canEdit}
                    onClick={() => navigate(`/contact-info-cards/edit/${item.id}`)}
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
