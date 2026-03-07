# Database Schema

## Core Tables

### users
- id
- email
- role
- created_at

### companies
- id
- company_name
- country
- city
- description
- is_verified

### categories
- id
- parent_id
- name
- slug

### products
- id
- company_id
- category_id
- product_name
- description
- moq

### rfqs
- id
- buyer_email
- product_name
- quantity
- message
- created_at

### subscriptions
- id
- company_id
- plan
- status
- start_date
- end_date

### payments
- id
- subscription_id
- amount
- currency
- status