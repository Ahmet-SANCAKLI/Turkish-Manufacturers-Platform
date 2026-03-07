# PROJECT_DESIGN.md
## Turkey Manufacturers Platform – System Design

This document describes the high-level architecture and system design of the Turkey Manufacturers Platform.

The platform connects international buyers with Turkish manufacturers and allows buyers to submit RFQs (Request for Quotation).

---

# 1. Platform Overview

The Turkey Manufacturers Platform is a B2B sourcing marketplace.

Main purpose:

Allow international buyers to:

- discover Turkish manufacturers
- explore product catalogs
- send RFQ requests
- contact suppliers

Suppliers can:

- create company profiles
- upload products
- receive RFQ leads

Admin can:

- approve suppliers
- manage products
- review RFQs

---

# 2. Technology Stack

The platform uses a modern full-stack architecture.

Frontend:

- Next.js
- React
- TypeScript
- Tailwind CSS

Backend:

- Next.js Server Actions / API Routes

Database:

- PostgreSQL (Supabase)

Authentication:

- Supabase Auth

File Storage:

- Supabase Storage

Deployment:

- Vercel

Email notifications:

- Resend / SendGrid / Postmark

---

# 3. High Level System Architecture
