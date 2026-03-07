
# PROJECT_CHECKLIST.md
## Turkey Manufacturers Platform – Full Project Checklist

A step‑by‑step checklist to build and launch the MVP of the Turkey Manufacturers Platform.
Designed for free domain + free hosting setup.

---

# 1. Project Initialization

- [ ] Define project idea and scope
- [ ] Define target users
  - [ ] Buyers
  - [ ] Suppliers
  - [ ] Admin
- [ ] Define core features
  - [ ] Supplier directory
  - [ ] Product catalog
  - [ ] RFQ system
  - [ ] Supplier subscription
  - [ ] Admin panel

---

# 2. Domain and Hosting (Free)

## Free domain options

- [ ] Register free domain
  - https://freenom.com
  - https://eu.org
  - https://nic.eu.org

Example:

turkeymanufacturers.eu.org

## Free hosting

Choose platform:

- [ ] Vercel (recommended)
- [ ] Netlify
- [ ] Cloudflare Pages

---

# 3. GitHub Repository Setup

- [ ] Create GitHub account
- [ ] Create repository

Repository name:

turkey-manufacturers-platform

- [ ] Upload documentation
- [ ] Upload README
- [ ] Upload docs folder
- [ ] Upload PROJECT_CHECKLIST.md

Repo structure:

repo/
README.md
PROJECT_CHECKLIST.md
docs/

---

# 4. Development Environment Setup

Install tools:

- [ ] Node.js
- [ ] VS Code
- [ ] Git

VS Code extensions:

- [ ] Prettier
- [ ] ESLint
- [ ] Tailwind CSS IntelliSense
- [ ] Markdown Preview

---

# 5. Project Bootstrap (Next.js)

Create project:

npx create-next-app@latest turkey-manufacturers-platform

Options:

TypeScript → Yes  
Tailwind → Yes  
App Router → Yes  
src folder → Yes  

Run project:

npm run dev

Verify:

http://localhost:3000

---

# 6. Project Folder Architecture

Create structure:

src/
app/
components/
lib/
db/
services/
types/

---

# 7. Database Setup (Supabase Free)

- [ ] Create account at https://supabase.com
- [ ] Create project
- [ ] Create PostgreSQL database
- [ ] Copy credentials

Create .env.local:

DATABASE_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=

---

# 8. Database Schema

Create tables:

- [ ] users
- [ ] companies
- [ ] categories
- [ ] products
- [ ] product_images
- [ ] rfqs
- [ ] subscriptions
- [ ] payments
- [ ] supplier_applications

---

# 9. Authentication

Use Supabase Auth

Features:

- [ ] Signup
- [ ] Login
- [ ] Session handling
- [ ] Role system

Roles:

admin  
supplier  
buyer  

---

# 10. Public Website Pages

Create pages:

- [ ] Homepage
- [ ] Category page
- [ ] Supplier profile page
- [ ] Product page
- [ ] Pricing page
- [ ] Contact page
- [ ] Supplier application form
- [ ] RFQ form

---

# 11. Supplier Onboarding

Workflow:

Supplier applies  
↓  
Admin reviews  
↓  
Admin approves  
↓  
Company created  

Tasks:

- [ ] Supplier application form
- [ ] Admin approval page
- [ ] Company creation flow

---

# 12. Product Catalog

Supplier features:

- [ ] Add product
- [ ] Edit product
- [ ] Upload images
- [ ] Publish product

Fields:

product name  
description  
category  
MOQ  
images  

---

# 13. RFQ System

RFQ flow:

Buyer submits RFQ  
↓  
System stores RFQ  
↓  
Suppliers receive RFQ  

Tasks:

- [ ] RFQ form
- [ ] RFQ database table
- [ ] RFQ admin view
- [ ] Email notifications

---

# 14. Admin Panel

Admin features:

- [ ] Approve suppliers
- [ ] Manage companies
- [ ] Manage products
- [ ] View RFQs
- [ ] Manage subscriptions
- [ ] Manage payments

Admin routes:

/admin/dashboard  
/admin/companies  
/admin/products  
/admin/rfqs  
/admin/subscriptions  

---

# 15. Subscription System

Plans:

Free  
Premium  
Gold  

Features:

Free → limited products  
Premium → RFQ access  
Gold → featured listing  

---

# 16. Payment Integration (Later)

Options:

- Stripe
- iyzico

Flow:

Choose plan  
↓  
Checkout  
↓  
Payment confirmation  
↓  
Activate subscription  

---

# 17. SEO Setup

Create landing pages:

/turkish-textile-manufacturers  
/turkish-furniture-suppliers  
/turkish-food-exporters  

Tools:

- Google Search Console
- Google Analytics

---

# 18. Deployment (Free)

Use Vercel

Steps:

- [ ] Connect GitHub repo
- [ ] Import project
- [ ] Add environment variables
- [ ] Deploy

Flow:

Git push  
↓  
Vercel build  
↓  
Live website  

---

# 19. Connect Domain

- [ ] Add domain in Vercel
- [ ] Configure DNS
- [ ] Enable HTTPS

---

# 20. Launch MVP

Minimum version:

- [ ] Homepage
- [ ] 3 categories
- [ ] 10 suppliers
- [ ] 30 products
- [ ] RFQ form
- [ ] Admin panel
- [ ] Pricing page

---

# 21. Post Launch

- [ ] Add suppliers
- [ ] Collect RFQ leads
- [ ] Improve SEO
- [ ] Add blog content
- [ ] Monitor analytics

---

# MVP Success Criteria

- [ ] Suppliers visible
- [ ] Products searchable
- [ ] RFQ working
- [ ] Admin panel functional
- [ ] Website publicly accessible
# github test