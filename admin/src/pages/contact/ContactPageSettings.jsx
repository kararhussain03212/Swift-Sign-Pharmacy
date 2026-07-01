import { useEffect, useState } from "react";
import { getContactPageSettings, updateContactPageSettings } from "../../api/contactApi";

const inputCls = "w-full rounded-lg border border-white/20 bg-[var(--admin-card)] px-3 py-2 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[var(--admin-primary)]";
const labelCls = "mb-1 block text-sm text-white/80";
const sectionCls = "rounded-xl border border-white/10 bg-[var(--admin-bg)] p-4 space-y-3";

const EMPTY = {
  hero_heading: "", hero_description: "",
  form_eyebrow: "", form_title: "", form_subtext: "", newsletter_checkbox_label: "", submit_button_text: "",
  name_label: "", name_placeholder: "", email_label: "", email_placeholder: "",
  phone_label: "", phone_placeholder: "", subject_label: "", subject_placeholder: "",
  message_label: "", message_placeholder: "",
  location_card_heading: "", phone_number: "", email: "", address: "", google_map_url: "", map_embed_url: "",
  save_contact_button_text: "", vcard_business_name: "", whatsapp_number: "", website_url: "",
  call_action_label: "", call_action_link: "",
  sms_action_label: "", sms_action_link: "",
  email_action_label: "", email_action_link: "",
  whatsapp_action_label: "", whatsapp_action_link: "",
  website_action_label: "", website_action_link: "",
  location_action_label: "", location_action_link: "",
  follow_us_heading: "", facebook_url: "", instagram_url: "", youtube_url: "", tiktok_url: "",
  faq_eyebrow: "", faq_heading: "", faq_subtext: "",
};

export default function ContactPageSettings() {
  const [form, setForm]     = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [toast, setToast]   = useState("");
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContactPageSettings()
      .then((res) => {
        const d = res?.data?.data || {};
        setForm({
          hero_heading:              d.hero_heading              || "",
          hero_description:          d.hero_description          || "",
          form_eyebrow:              d.form_eyebrow              || "",
          form_title:                d.form_title                || "",
          form_subtext:              d.form_subtext              || "",
          newsletter_checkbox_label: d.newsletter_checkbox_label || "",
          submit_button_text:        d.submit_button_text        || "",
          name_label:                d.name_label                || "",
          name_placeholder:          d.name_placeholder          || "",
          email_label:               d.email_label               || "",
          email_placeholder:         d.email_placeholder         || "",
          phone_label:               d.phone_label               || "",
          phone_placeholder:         d.phone_placeholder         || "",
          subject_label:             d.subject_label             || "",
          subject_placeholder:       d.subject_placeholder       || "",
          message_label:             d.message_label             || "",
          message_placeholder:       d.message_placeholder       || "",
          location_card_heading:     d.location_card_heading     || "",
          phone_number:              d.phone_number              || "",
          email:                     d.email                     || "",
          address:                   d.address                   || "",
          google_map_url:            d.google_map_url            || "",
          map_embed_url:             d.map_embed_url             || "",
          save_contact_button_text:  d.save_contact_button_text  || "",
          vcard_business_name:       d.vcard_business_name       || "",
          whatsapp_number:           d.whatsapp_number           || "",
          website_url:               d.website_url               || "",
          call_action_label:         d.call_action_label         || "",
          call_action_link:          d.call_action_link          || "",
          sms_action_label:          d.sms_action_label          || "",
          sms_action_link:           d.sms_action_link           || "",
          email_action_label:        d.email_action_label        || "",
          email_action_link:         d.email_action_link         || "",
          whatsapp_action_label:     d.whatsapp_action_label     || "",
          whatsapp_action_link:      d.whatsapp_action_link      || "",
          website_action_label:      d.website_action_label      || "",
          website_action_link:       d.website_action_link       || "",
          location_action_label:     d.location_action_label     || "",
          location_action_link:      d.location_action_link      || "",
          follow_us_heading:         d.follow_us_heading         || "",
          facebook_url:              d.facebook_url              || "",
          instagram_url:             d.instagram_url             || "",
          youtube_url:               d.youtube_url               || "",
          tiktok_url:                d.tiktok_url                || "",
          faq_eyebrow:               d.faq_eyebrow               || "",
          faq_heading:               d.faq_heading               || "",
          faq_subtext:               d.faq_subtext               || "",
        });
      })
      .catch(() => setError("Failed to load contact page settings."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const setField = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await updateContactPageSettings(form);
      setToast("Contact page settings saved!");
    } catch {
      setError("Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-white/70">Loading…</p>;

  return (
    <section className="mx-auto max-w-3xl space-y-5">
      <header>
        <h2 className="text-3xl font-bold text-white">Contact Page Settings</h2>
        <p className="mt-1 text-sm text-white/65">
          Edit every dynamic section of the Contact Us page — hero, form, location, follow us, and FAQ header copy.
        </p>
      </header>

      {toast ? <div className="rounded-xl bg-green-600/80 px-4 py-2.5 text-sm font-medium text-white">{toast}</div> : null}
      {error ? <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div> : null}

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-[var(--admin-bg)] p-6">

        {/* Hero Section */}
        <div className={sectionCls}>
          <h3 className="font-semibold text-white/90">Hero Section</h3>
          <div>
            <label className={labelCls}>Heading</label>
            <input className={inputCls} value={form.hero_heading} onChange={(e) => setField("hero_heading", e.target.value)} placeholder="Let's Talk Health" />
          </div>
          <div>
            <label className={labelCls}>Subheading</label>
            <textarea rows={3} className={inputCls} value={form.hero_description} onChange={(e) => setField("hero_description", e.target.value)} placeholder="Have questions about medicines, products, or your order?…" />
          </div>
        </div>

        {/* Form Section */}
        <div className={sectionCls}>
          <h3 className="font-semibold text-white/90">Send Us a Message Form</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Eyebrow Pill Text</label>
              <input className={inputCls} value={form.form_eyebrow} onChange={(e) => setField("form_eyebrow", e.target.value)} placeholder="GET IN TOUCH" />
            </div>
            <div>
              <label className={labelCls}>Heading</label>
              <input className={inputCls} value={form.form_title} onChange={(e) => setField("form_title", e.target.value)} placeholder="Send Us a Message" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Subtext</label>
            <textarea rows={2} className={inputCls} value={form.form_subtext} onChange={(e) => setField("form_subtext", e.target.value)} placeholder="Fill out the form below and our team will respond within 24 hours." />
          </div>
          <div>
            <label className={labelCls}>Newsletter Checkbox Label</label>
            <input className={inputCls} value={form.newsletter_checkbox_label} onChange={(e) => setField("newsletter_checkbox_label", e.target.value)} placeholder="Subscribe to our health newsletter for tips, deals, and updates." />
          </div>
          <div>
            <label className={labelCls}>Submit Button Text</label>
            <input className={inputCls} value={form.submit_button_text} onChange={(e) => setField("submit_button_text", e.target.value)} placeholder="Send Message" />
          </div>
        </div>

        {/* Form Fields */}
        <div className={sectionCls}>
          <h3 className="font-semibold text-white/90">Form Field Labels &amp; Placeholders</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Full Name — Label</label>
              <input className={inputCls} value={form.name_label} onChange={(e) => setField("name_label", e.target.value)} placeholder="Full Name" />
            </div>
            <div>
              <label className={labelCls}>Full Name — Placeholder</label>
              <input className={inputCls} value={form.name_placeholder} onChange={(e) => setField("name_placeholder", e.target.value)} placeholder="John Doe" />
            </div>
            <div>
              <label className={labelCls}>Email — Label</label>
              <input className={inputCls} value={form.email_label} onChange={(e) => setField("email_label", e.target.value)} placeholder="Email Address" />
            </div>
            <div>
              <label className={labelCls}>Email — Placeholder</label>
              <input className={inputCls} value={form.email_placeholder} onChange={(e) => setField("email_placeholder", e.target.value)} placeholder="you@example.com" />
            </div>
            <div>
              <label className={labelCls}>Phone — Label</label>
              <input className={inputCls} value={form.phone_label} onChange={(e) => setField("phone_label", e.target.value)} placeholder="Phone Number" />
            </div>
            <div>
              <label className={labelCls}>Phone — Placeholder</label>
              <input className={inputCls} value={form.phone_placeholder} onChange={(e) => setField("phone_placeholder", e.target.value)} placeholder="+92 311 000 0000" />
            </div>
            <div>
              <label className={labelCls}>Subject — Label</label>
              <input className={inputCls} value={form.subject_label} onChange={(e) => setField("subject_label", e.target.value)} placeholder="Subject" />
            </div>
            <div>
              <label className={labelCls}>Subject — Placeholder</label>
              <input className={inputCls} value={form.subject_placeholder} onChange={(e) => setField("subject_placeholder", e.target.value)} placeholder="e.g. Order Inquiry" />
            </div>
            <div>
              <label className={labelCls}>Message — Label</label>
              <input className={inputCls} value={form.message_label} onChange={(e) => setField("message_label", e.target.value)} placeholder="Message" />
            </div>
            <div>
              <label className={labelCls}>Message — Placeholder</label>
              <input className={inputCls} value={form.message_placeholder} onChange={(e) => setField("message_placeholder", e.target.value)} placeholder="Tell us how we can help you..." />
            </div>
          </div>
        </div>

        {/* Location & Map */}
        <div className={sectionCls}>
          <h3 className="font-semibold text-white/90">Location</h3>
          <div>
            <label className={labelCls}>Location Card Heading</label>
            <input className={inputCls} value={form.location_card_heading} onChange={(e) => setField("location_card_heading", e.target.value)} placeholder="Our Location" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Phone Number</label>
              <input className={inputCls} value={form.phone_number} onChange={(e) => setField("phone_number", e.target.value)} placeholder="+92 333 8399480" />
            </div>
            <div>
              <label className={labelCls}>Email Address</label>
              <input type="email" className={inputCls} value={form.email} onChange={(e) => setField("email", e.target.value)} placeholder="contactus@arion.pk" />
            </div>
            <div>
              <label className={labelCls}>WhatsApp Number</label>
              <input className={inputCls} value={form.whatsapp_number} onChange={(e) => setField("whatsapp_number", e.target.value)} placeholder="+923338399480" />
            </div>
            <div>
              <label className={labelCls}>Website URL</label>
              <input className={inputCls} value={form.website_url} onChange={(e) => setField("website_url", e.target.value)} placeholder="https://arion.pk" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Address</label>
            <textarea rows={2} className={inputCls} value={form.address} onChange={(e) => setField("address", e.target.value)} placeholder="Office 22, 4th Floor, Pakland City Center, I-8 Markaz, Islamabad, Pakistan" />
          </div>
          <div>
            <label className={labelCls}>Google Maps Link (used for the Location quick-action tile)</label>
            <input className={inputCls} value={form.google_map_url} onChange={(e) => setField("google_map_url", e.target.value)} placeholder="https://maps.google.com/…" />
          </div>
          <div>
            <label className={labelCls}>Map Embed URL (used in the iframe)</label>
            <input className={inputCls} value={form.map_embed_url} onChange={(e) => setField("map_embed_url", e.target.value)} placeholder="https://www.google.com/maps?q=…&output=embed" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Save Contact Button Text</label>
              <input className={inputCls} value={form.save_contact_button_text} onChange={(e) => setField("save_contact_button_text", e.target.value)} placeholder="Save Contact" />
            </div>
            <div>
              <label className={labelCls}>Business/Contact Name (used in the saved .vcf file)</label>
              <input className={inputCls} value={form.vcard_business_name} onChange={(e) => setField("vcard_business_name", e.target.value)} placeholder="Arion Pharmacy" />
            </div>
          </div>
          <div>
            <label className="font-semibold text-white/90">Quick Action Tiles</label>
            <p className="text-xs text-white/40">
              Leave a Link blank to fall back to the matching field above (Phone Number, Email, WhatsApp Number, Website URL, Google Maps Link).
            </p>
            <div className="mt-2 space-y-4">
              {[
                { key: "call",     label: "Call",     linkPlaceholder: "+92 333 8399480" },
                { key: "sms",      label: "SMS",      linkPlaceholder: "+92 333 8399480" },
                { key: "email",    label: "Email",    linkPlaceholder: "contactus@arion.pk" },
                { key: "whatsapp", label: "WhatsApp", linkPlaceholder: "+923338399480" },
                { key: "website",  label: "Website",  linkPlaceholder: "https://arion.pk" },
                { key: "location", label: "Location", linkPlaceholder: "https://maps.google.com/…" },
              ].map((tile) => (
                <div key={tile.key} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>{tile.label} — Label</label>
                    <input
                      className={inputCls}
                      value={form[`${tile.key}_action_label`]}
                      onChange={(e) => setField(`${tile.key}_action_label`, e.target.value)}
                      placeholder={tile.label}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>{tile.label} — Link</label>
                    <input
                      className={inputCls}
                      value={form[`${tile.key}_action_link`]}
                      onChange={(e) => setField(`${tile.key}_action_link`, e.target.value)}
                      placeholder={tile.linkPlaceholder}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Follow Us */}
        <div className={sectionCls}>
          <h3 className="font-semibold text-white/90">Follow Us</h3>
          <div>
            <label className={labelCls}>Section Heading</label>
            <input className={inputCls} value={form.follow_us_heading} onChange={(e) => setField("follow_us_heading", e.target.value)} placeholder="Follow Us" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Facebook URL</label>
              <input className={inputCls} value={form.facebook_url} onChange={(e) => setField("facebook_url", e.target.value)} placeholder="https://facebook.com/…" />
            </div>
            <div>
              <label className={labelCls}>Instagram URL</label>
              <input className={inputCls} value={form.instagram_url} onChange={(e) => setField("instagram_url", e.target.value)} placeholder="https://instagram.com/…" />
            </div>
            <div>
              <label className={labelCls}>YouTube URL</label>
              <input className={inputCls} value={form.youtube_url} onChange={(e) => setField("youtube_url", e.target.value)} placeholder="https://youtube.com/…" />
            </div>
            <div>
              <label className={labelCls}>TikTok URL</label>
              <input className={inputCls} value={form.tiktok_url} onChange={(e) => setField("tiktok_url", e.target.value)} placeholder="https://tiktok.com/@…" />
            </div>
          </div>
        </div>

        {/* FAQ Header */}
        <div className={sectionCls}>
          <h3 className="font-semibold text-white/90">FAQ Section Header</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Eyebrow Pill Text</label>
              <input className={inputCls} value={form.faq_eyebrow} onChange={(e) => setField("faq_eyebrow", e.target.value)} placeholder="FAQ" />
            </div>
            <div>
              <label className={labelCls}>Heading</label>
              <input className={inputCls} value={form.faq_heading} onChange={(e) => setField("faq_heading", e.target.value)} placeholder="Frequently Asked Questions" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Subtext</label>
            <input className={inputCls} value={form.faq_subtext} onChange={(e) => setField("faq_subtext", e.target.value)} placeholder="Quick answers to the most common questions." />
          </div>
          <p className="text-xs text-white/40">Manage the individual questions and answers under "FAQs" in the sidebar.</p>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-[var(--admin-primary)] px-6 py-2.5 font-semibold text-black hover:bg-[var(--admin-primary-strong)] disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </section>
  );
}
