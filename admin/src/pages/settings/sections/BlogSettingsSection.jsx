import ImageUpload from "../../../components/ImageUpload";

const inputClass =
  "w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-ink)] focus:outline-none focus:ring-1 focus:ring-[var(--admin-accent)]";
const labelClass = "pt-1 text-sm font-semibold text-[var(--admin-ink)]";
const rowClass =
  "grid grid-cols-1 gap-2 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card-elevated)] p-3 md:grid-cols-[220px_1fr] md:items-start";

const HEADING_MAX = 255;
const BUTTON_MAX = 50;

function Field({ label, hint, children }) {
  return (
    <div className={rowClass}>
      <div>
        <p className={labelClass}>{label}</p>
        {hint && <p className="mt-0.5 text-xs text-[var(--admin-muted)]">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

function CharCount({ value, max }) {
  const len = String(value || "").length;
  return (
    <p className={`mt-1 text-right text-[11px] ${len > max ? "text-red-400" : "text-[var(--admin-muted)]"}`}>
      {len}/{max}
    </p>
  );
}

export default function BlogSettingsSection({ form, setField, toImageUrl, uploadToSetting }) {
  return (
    <div className="space-y-3">
      {/* ── Hero Text ────────────────────────────────── */}
      <h3 className="pt-2 text-xs font-semibold uppercase tracking-widest text-[var(--admin-muted)]">
        Hero Section
      </h3>

      <Field label="Badge Text" hint='Small tag above the heading — e.g. "Wellness Journal"'>
        <input
          type="text"
          value={form.blog_badge_text || ""}
          onChange={(e) => setField("blog_badge_text", e.target.value)}
          className={inputClass}
          placeholder="Wellness Journal"
        />
      </Field>

      <Field label="Heading" hint="Main hero heading shown on the Articles page">
        <input
          type="text"
          value={form.blog_hero_title || ""}
          onChange={(e) => setField("blog_hero_title", e.target.value.slice(0, HEADING_MAX))}
          className={inputClass}
          placeholder="Health Articles & Wellness Tips"
          maxLength={HEADING_MAX}
        />
        <CharCount value={form.blog_hero_title} max={HEADING_MAX} />
      </Field>

      <Field label="Title Accent" hint="Optional — highlighted word(s) rendered in a lighter shade">
        <input
          type="text"
          value={form.blog_hero_title_accent || ""}
          onChange={(e) => setField("blog_hero_title_accent", e.target.value)}
          className={inputClass}
          placeholder="Optional"
        />
      </Field>

      <Field label="Subheading" hint="Subtitle paragraph below the heading">
        <textarea
          rows={3}
          value={form.blog_hero_description || ""}
          onChange={(e) => setField("blog_hero_description", e.target.value)}
          className={inputClass}
          placeholder="Expert-written guides on medicine, nutrition, skincare, and living your healthiest life."
        />
      </Field>

      <Field label="Search Placeholder" hint="Placeholder text inside the hero search bar">
        <input
          type="text"
          value={form.blog_search_placeholder || ""}
          onChange={(e) => setField("blog_search_placeholder", e.target.value)}
          className={inputClass}
          placeholder="Search articles..."
        />
      </Field>

      <Field label="Button Text" hint="Label on the search button">
        <input
          type="text"
          value={form.blog_button_text || ""}
          onChange={(e) => setField("blog_button_text", e.target.value.slice(0, BUTTON_MAX))}
          className={inputClass}
          placeholder="Search"
          maxLength={BUTTON_MAX}
        />
        <CharCount value={form.blog_button_text} max={BUTTON_MAX} />
      </Field>

      {/* ── Hero Image ────────────────────────────────── */}
      {/* <h3 className="pt-2 text-xs font-semibold uppercase tracking-widest text-[var(--admin-muted)]">
        Hero Image
      </h3> */}

      {/* <div className={rowClass}>
        <div>
          <p className={labelClass}>Blog Hero Image</p>
          <p className="mt-0.5 text-xs text-[var(--admin-muted)]">Banner image for the Blog page header</p>
        </div>
        <ImageUpload
          value={toImageUrl(form.blog_page_hero_image)}
          onFileSelect={(file) => uploadToSetting("blog_page_hero_image", file, "settings")}
          label="Upload Blog Hero Image"
          helperText="Recommended: wide landscape, min 1200 px wide"
        />
      </div> */}
    </div>
  );
}
