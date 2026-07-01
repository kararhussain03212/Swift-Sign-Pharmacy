<?php

declare(strict_types=1);

namespace Backend\Models;

require_once __DIR__ . '/BaseModel.php';

final class ContactPageSetting extends BaseModel
{
    protected string $table = 'contact_page_settings';
    protected array $fillable = [
        'form_eyebrow', 'hero_heading', 'hero_description',
        'form_title', 'form_subtext', 'newsletter_checkbox_label', 'submit_button_text',
        'name_label', 'name_placeholder', 'email_label', 'email_placeholder',
        'phone_label', 'phone_placeholder', 'subject_label', 'subject_placeholder',
        'message_label', 'message_placeholder',
        'location_card_heading', 'save_contact_button_text', 'vcard_business_name', 'follow_us_heading',
        'call_action_label', 'call_action_link',
        'sms_action_label', 'sms_action_link',
        'email_action_label', 'email_action_link',
        'whatsapp_action_label', 'whatsapp_action_link',
        'website_action_label', 'website_action_link',
        'location_action_label', 'location_action_link',
        'faq_eyebrow', 'faq_heading', 'faq_subtext',
        'whatsapp_number', 'phone_number', 'email', 'address', 'google_map_url',
        'map_embed_url', 'website_url',
        'facebook_url', 'instagram_url', 'youtube_url', 'tiktok_url',
    ];
}
