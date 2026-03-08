# Turkey Manufacturers Platform - Architecture

This architecture is derived from:
- `PROJECT_CHECKLIST.md`
- `docs/modules.md`
- `docs/database-schema.md`
- `docs/roadmap.md`

It is written in Markdown + Mermaid so it is viewable in both:
- GitHub (Markdown renderer with Mermaid)
- VS Code (Markdown Preview)

## 1. High-Level System Architecture

```mermaid
flowchart TD
    A[Buyer / Supplier / Admin] --> B[Next.js App Router UI]
    B --> C[Server Actions + Route Handlers]
    C --> D[(PostgreSQL on Supabase)]
    C --> E[Supabase Auth]
    C --> F[Supabase Storage / Cloudinary]
    C --> G[Email Provider<br/>Resend / SendGrid / Postmark]
    C --> H[Payment Provider<br/>Stripe / iyzico]
    B --> I[SEO Layer<br/>Metadata + Sitemap + Robots + OG]
    B --> J[Analytics<br/>GA + Search Console]
```

## 2. Core Domain Modules

```mermaid
flowchart LR
    U[Users & Roles] --> SM[Supplier Management]
    U --> AP[Admin Panel]
    SM --> PC[Product Catalog]
    PC --> SR[Search & Filters]
    PC --> SEO[SEO Landing Pages]
    PC --> RFQ[RFQ System]
    RFQ --> AP
    SM --> SUB[Subscriptions]
    SUB --> PAY[Payments]
    PAY --> AP
```

## 3. Application Layer (Next.js Folder-Oriented)

```mermaid
flowchart TD
    A[src/app] --> A1[Public Pages<br/>home, categories, suppliers, products]
    A --> A2[Admin Routes<br/>/admin/dashboard, /admin/companies,<br/>/admin/products, /admin/rfqs, /admin/categories]
    A --> A3[Supplier Flows<br/>apply, onboarding, product management]
    A --> A4[RFQ Flows<br/>submit, confirmation]

    B[src/components] --> B1[UI Components]
    B --> B2[Feature Components]

    C[src/services] --> C1[RFQ Service]
    C --> C2[Email Service]
    C --> C3[Payment Service]
    C --> C4[Search Service]

    D[src/db + src/lib] --> D1[DB Client]
    D --> D2[Queries / Repositories]
    D --> D3[Auth Utilities]

    E[src/types + src/utils] --> E1[Type Models]
    E --> E2[Validation + Slug + Helpers]
```

## 4. Data Model Relationships

```mermaid
erDiagram
    USERS ||--o{ COMPANIES : owns_or_manages
    COMPANIES ||--o{ PRODUCTS : publishes
    CATEGORIES ||--o{ PRODUCTS : classifies
    PRODUCTS ||--o{ RFQS : requested_for
    COMPANIES ||--o{ RFQS : receives
    COMPANIES ||--o{ SUBSCRIPTIONS : has
    SUBSCRIPTIONS ||--o{ PAYMENTS : billed_by

    USERS {
      uuid id
      string email
      string role
      timestamp created_at
    }
    COMPANIES {
      uuid id
      string company_name
      string country
      string city
      bool is_verified
    }
    CATEGORIES {
      uuid id
      uuid parent_id
      string name
      string slug
    }
    PRODUCTS {
      uuid id
      uuid company_id
      uuid category_id
      string product_name
      int moq
    }
    RFQS {
      uuid id
      string buyer_email
      int quantity
      string message
      timestamp created_at
    }
    SUBSCRIPTIONS {
      uuid id
      uuid company_id
      string plan
      string status
    }
    PAYMENTS {
      uuid id
      uuid subscription_id
      decimal amount
      string currency
      string status
    }
```

## 5. Key Workflows

### Supplier Onboarding

```mermaid
sequenceDiagram
    participant Supplier
    participant Platform as Next.js Platform
    participant Admin
    participant DB as PostgreSQL
    Supplier->>Platform: Submit supplier application
    Platform->>DB: Save application/company draft
    Admin->>Platform: Review application
    Platform->>DB: Approve and activate company
    Platform-->>Supplier: Approval email notification
```

### RFQ Flow

```mermaid
sequenceDiagram
    participant Buyer
    participant Platform as Next.js Platform
    participant DB as PostgreSQL
    participant Admin
    participant Supplier
    Buyer->>Platform: Submit RFQ form
    Platform->>DB: Persist RFQ
    Platform-->>Admin: Notify new RFQ
    Admin->>Platform: Review and route RFQ
    Platform-->>Supplier: RFQ notification email
```

## 6. Deployment Architecture

```mermaid
flowchart LR
    A[GitHub Repository] --> B[Vercel CI/CD]
    B --> C[Production Next.js App]
    C --> D[Supabase Postgres]
    C --> E[Supabase Auth]
    C --> F[Storage]
    C --> G[Email Provider]
    C --> H[Payment Provider]
    C --> I[Analytics + Search Console]
```

## 7. Checklist-to-Architecture Mapping

- Public pages and directory structure: `PROJECT_CHECKLIST.md` sections 6, 12, 19
- Supplier onboarding workflow: sections 13, 18
- Product catalog and search: sections 14, 17
- RFQ lifecycle and notifications: sections 15, 16
- Database schema and slugs: sections 9, 10
- Deployment and domain: sections 21, 22
- Launch criteria and growth: sections 23, 24
