# System Architecture

High Level Architecture

User Browser
↓
Frontend (Next.js)
↓
API / Server Actions
↓
PostgreSQL Database
↓
External Services

External Services
- Payment Gateway (Stripe / iyzico)
- Email Service
- Storage
- Analytics

## Deployment

GitHub Repository
↓
Vercel CI/CD
↓
Production Environment