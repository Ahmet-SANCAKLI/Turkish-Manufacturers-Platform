# PROJECT_CHECKLIST.md
## Turkey Manufacturers Platform – MVP Development Checklist

This checklist provides a complete step-by-step roadmap to build and launch the MVP of the Turkey Manufacturers Platform.

Goal:

Build a B2B sourcing platform where international buyers can discover Turkish manufacturers and send RFQs (Request for Quotation).

Technology stack:

- Next.js
- TypeScript
- Tailwind CSS
- PostgreSQL
- Supabase
- Vercel

---

# 1. Project Initialization

Define the basic project concept.

- [ ] Define the platform idea
- [ ] Define target users

Users:

- [ ] Buyers
- [ ] Suppliers
- [ ] Admin

Define MVP features:

- [ ] Supplier directory
- [ ] Product catalog
- [ ] RFQ system
- [ ] Supplier onboarding
- [ ] Admin panel
- [ ] SEO landing pages

---

# 2. Domain and Hosting

Choose domain and hosting.

## Domain

Register a domain.

Options:

- https://freenom.com
- https://eu.org
- https://nic.eu.org

Example:

turkeymanufacturers.eu.org

---

## Hosting

Choose hosting platform.

- [ ] Vercel (recommended)
- [ ] Netlify
- [ ] Cloudflare Pages

---

# 3. GitHub Repository Setup

Create GitHub repository.

- [ ] Create GitHub account
- [ ] Create repository

Repository name:

turkey-manufacturers-platform

Upload initial files:

- [ ] README.md
- [ ] PROJECT_CHECKLIST.md
- [ ] docs folder

Example repo structure:

repo/

README.md  
PROJECT_CHECKLIST.md  
docs/

---

# 4. Development Environment Setup

Install required development tools.

- [ ] Install Node.js
- [ ] Install VS Code
- [ ] Install Git

Install useful VS Code extensions:

- [ ] Prettier
- [ ] ESLint
- [ ] Tailwind CSS IntelliSense
- [ ] Markdown Preview

---

# 5. Project Bootstrap (Next.js)

Create the Next.js project.

Run:

npx create-next-app@latest turkey-manufacturers-platform

Choose options:

TypeScript → Yes  
Tailwind → Yes  
App Router → Yes  
src folder → Yes

Run project:

npm run dev

Verify the site:

http://localhost:3000

---

# 6. Project Folder Structure

Inside the project create basic folders.

src/

app/  
components/  
lib/  
db/  
services/  
types/  
utils/

---

# 7. Environment Configuration

Create environment variables.

Create file:

.env.local

Add variables:

DATABASE_URL=  
SUPABASE_URL=  
SUPABASE_ANON_KEY=  
SUPABASE_SERVICE_ROLE_KEY=

Ensure `.env.local` is inside `.gitignore`.

---

# 8. Supabase Setup

Create database using Supabase.

Steps:

- [ ] Create account at https://supabase.com
- [ ] Create new project
- [ ] Enable PostgreSQL database
- [ ] Copy API credentials
- [ ] Add credentials to `.env.local`

---

# 9. Database Schema (MVP)

Create the main database tables.

## users

Fields:

- id
- email
- role
- created_at

Roles:

admin  
supplier  
buyer  

---

## companies

Fields:

- id
- name
- slug
- description
- country
- city
- website
- logo_url
- verified
- created_at

---

## categories

Fields:

- id
- name
- slug
- parent_id

---

## products

Fields:

- id
- company_id
- category_id
- name
- slug
- description
- moq
- image_url
- created_at

---

## rfqs

Fields:

- id
- buyer_name
- buyer_email
- company_name
- country
- product_id
- supplier_id
- message
- quantity
- created_at

---

# 10. Slug System

Create SEO friendly URLs.

Tasks:

- [ ] Generate slugs for companies
- [ ] Generate slugs for products
- [ ] Generate slugs for categories
- [ ] Ensure slug uniqueness

Examples:


/suppliers/istanbul-textile-co  
/products/cotton-tshirt  
/categories/textile

---

# 11. Image Storage

Configure product image storage.

Options:

- [ ] Supabase Storage
- [ ] Cloudinary

Tasks:

- [ ] Configure storage
- [ ] Upload product images
- [ ] Save image URLs in database

---

# 12. Public Website Pages

Create main public pages.

- [ ] Homepage
- [ ] Supplier directory
- [ ] Category page
- [ ] Supplier profile page
- [ ] Product page
- [ ] Contact page
- [ ] Supplier application page
- [ ] RFQ submission page

---

# 13. Supplier Onboarding

Create supplier application workflow.

Flow:

Supplier applies  
↓  
Admin reviews  
↓  
Admin approves  
↓  
Company profile created

Tasks:

- [ ] Supplier application form
- [ ] Admin approval interface
- [ ] Create company profile after approval

---

# 14. Product Catalog

Allow suppliers to manage products.

Features:

- [ ] Add product
- [ ] Edit product
- [ ] Upload product images
- [ ] Publish product

Product fields:

product name  
description  
category  
MOQ  
images

---

# 15. RFQ System

Implement RFQ workflow.

Flow:

Buyer submits RFQ  
↓  
System stores RFQ  
↓  
Admin reviews RFQ  
↓  
Suppliers notified

Tasks:

- [ ] RFQ submission form
- [ ] Save RFQ in database
- [ ] RFQ admin dashboard
- [ ] Email notifications

---

# 16. Email Service

Configure email notifications.

Options:

- [ ] Resend
- [ ] SendGrid
- [ ] Postmark

Tasks:

- [ ] Setup email service
- [ ] Send RFQ notification emails
- [ ] Send supplier approval emails

---

# 17. Search Functionality

Add basic search.

Features:

- [ ] Search suppliers
- [ ] Search products
- [ ] Filter by category

---

# 18. Admin Panel

Create admin panel.

Admin features:

- [ ] Approve suppliers
- [ ] Manage companies
- [ ] Manage products
- [ ] View RFQs
- [ ] Manage categories

Admin routes:

/admin/dashboard  
/admin/companies  
/admin/products  
/admin/rfqs  
/admin/categories

---

# 19. SEO Setup

Create SEO optimized landing pages.

Examples:

/turkish-textile-manufacturers  
/turkish-furniture-suppliers  
/turkish-food-exporters  

Technical SEO tasks:

- [ ] Dynamic meta tags
- [ ] Open Graph tags
- [ ] Structured data
- [ ] sitemap.xml
- [ ] robots.txt

Tools:

- [ ] Google Search Console
- [ ] Google Analytics

---

# 20. Seed Data

Add initial marketplace data.

Tasks:

- [ ] Add supplier data
- [ ] Add product data
- [ ] Add categories

Recommended minimum:

- 3 categories
- 30 suppliers
- 100 products

---

# 21. Deployment

Deploy platform.

Steps:

- [ ] Connect GitHub repository to Vercel
- [ ] Import project
- [ ] Add environment variables
- [ ] Deploy project

Deployment flow:

Git push  
↓  
Vercel build  
↓  
Live website

---

# 22. Domain Connection

Connect custom domain.

- [ ] Add domain to Vercel
- [ ] Configure DNS
- [ ] Enable HTTPS

---

# 23. MVP Launch

Minimum launch requirements:

- [ ] Homepage ready
- [ ] 3 categories published
- [ ] 30 suppliers added
- [ ] 100 products published
- [ ] RFQ form working
- [ ] Admin panel working
- [ ] SEO landing pages published

---

# 24. Post Launch Tasks

After launch:

- [ ] Add more suppliers
- [ ] Improve SEO
- [ ] Add blog content
- [ ] Monitor analytics
- [ ] Improve UI/UX

---

# MVP Success Criteria

The platform is successful when:

- [ ] Suppliers are visible
- [ ] Products are searchable
- [ ] RFQ system works
- [ ] Admin panel works
- [ ] Website is publicly accessible
- [ ] Real RFQ leads are generated