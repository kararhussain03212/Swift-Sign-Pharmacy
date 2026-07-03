# Footer API

## `GET /api/public/footer`

Aggregates every footer section into a single cached response (5 min TTL, cleared automatically whenever any footer resource is created/updated/deleted).

```json
{
  "success": true,
  "message": "Fetched successfully",
  "data": {
    "categories": [
      { "id": 1, "name": "Medicines", "slug": "medicines" }
    ],
    "quickLinks": [
      { "id": 1, "label": "Asaan Order", "url": "/asaan-order", "sort_order": 1, "is_active": 1, "created_at": "...", "updated_at": "..." }
    ],
    "companyInfo": {
      "id": 1, "logo_url": null, "address": "...", "email": "...", "phone": "...", "created_at": "...", "updated_at": "..."
    },
    "appLinks": [
      { "id": 1, "platform": "app_store", "label": "Download on the App Store", "url": "#", "badge_image_url": "...", "sort_order": 1, "is_active": 1, "created_at": "...", "updated_at": "..." }
    ],
    "socialLinks": [
      { "id": 1, "platform": "Facebook", "icon_key": "facebook", "url": "https://www.facebook.com", "sort_order": 1, "is_active": 1, "created_at": "...", "updated_at": "..." }
    ],
    "settings": {
      "id": 1, "copyright_text": "...", "funded_by_text": "...", "created_at": "...", "updated_at": "..."
    }
  }
}
```

- `categories` reuses the existing top-level `categories` table (the same data source as the Navbar/Shop pages) — there is no separate `footer_categories` table.
- `icon_key` on `socialLinks` is one of `facebook`, `instagram`, `x`, `linkedin` and maps to an icon component on the frontend (`SOCIAL_ICON_MAP` in `src/components/layout/Footer.jsx`).
- Any section can be an empty array/`null`; the frontend `Footer` component hides that block instead of erroring.

## Admin CRUD

All routes below require `requireAuth` + the `edit_content`/`create_content`/`delete_content` permission (same convention as the rest of the admin API) and clear the public cache on write.

| Resource | Routes |
|---|---|
| Quick Links | `GET/POST /api/admin/footer/quick-links`, `GET/PUT/DELETE /api/admin/footer/quick-links/{id}` |
| App Links | `GET/POST /api/admin/footer/app-links`, `GET/PUT/DELETE /api/admin/footer/app-links/{id}` |
| Social Links | `GET/POST /api/admin/footer/social-links`, `GET/PUT/DELETE /api/admin/footer/social-links/{id}` |
| Company Info (singleton, id=1) | `GET/PUT /api/admin/footer/company-info` |
| Settings (singleton, id=1) | `GET/PUT /api/admin/footer/settings` |

Categories are managed via the existing `/api/admin/categories` endpoints.
