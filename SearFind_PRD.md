# SearFind — Product Requirements Document (PRD)

**Version:** 1.0  
**Platform:** Web + Mobile  
**Target:** Global  
**Domain:** searfind.io  
**Team:** 3 Developers  

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [User Roles & Personas](#2-user-roles--personas)
3. [Figma Design Steps](#3-figma-design-steps)
4. [Full Feature List](#4-full-feature-list)
5. [API Endpoints](#5-api-endpoints-summary)
6. [Database Schema](#6-database-schema)
7. [Non-Functional Requirements](#7-non-functional-requirements)
8. [Git Branch Strategy](#8-git-branch-strategy)
9. [Deployment Plan](#9-deployment-plan)
10. [Team Task Assignment](#10-team-task-assignment)
11. [Project Roadmap](#11-project-roadmap)

---

## 1. Product Overview

**SearFind** is a global-level all-in-one platform that combines:

- 💼 **Job Search** — Post, browse, apply and track jobs
- 🧑‍💻 **Freelancer Search** — Find, hire and pay freelancers
- 📚 **Learning Platform** — Browse courses, enroll, get certified

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js + Vite + Tailwind CSS |
| State Management | Redux Toolkit |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT + bcryptjs + Google OAuth |
| File Upload | Cloudinary |
| Payments | Stripe |
| Real-time Chat | Socket.io |
| Email | Nodemailer |
| Deployment | Vercel + Render + MongoDB Atlas |

---

## 2. User Roles & Personas

| Role | Description | Key Actions |
|------|-------------|-------------|
| **Job Seeker** | Looking for full-time/part-time jobs | Search jobs, apply, track applications |
| **Employer** | Companies posting jobs | Post jobs, review applications, hire |
| **Freelancer** | Independent professionals | Create profile, get hired, get paid |
| **Learner** | Wants to upskill | Browse courses, enroll, get certified |
| **Instructor** | Teaches courses | Create courses, upload lessons, earn |
| **Admin** | Platform manager | Manage all users, jobs, courses |

---

## 3. Figma Design Steps

### Step 1 — Design System Setup

```
Colors:
  Primary:      #4F46E5  (Indigo)
  Secondary:    #06B6D4  (Cyan)
  Success:      #10B981  (Green)
  Warning:      #F59E0B  (Amber)
  Danger:       #EF4444  (Red)
  Dark:         #1F2937
  Light:        #F9FAFB
  White:        #FFFFFF

Typography:
  Font Family:  Inter / Plus Jakarta Sans
  H1:           32px bold
  H2:           24px bold
  H3:           20px semibold
  Body:         16px regular
  Small:        14px regular
  Caption:      12px regular

Spacing System: 4px base grid (4, 8, 12, 16, 24, 32, 48, 64)
Border Radius:  8px / 12px / 16px / 24px
Shadows:        sm / md / lg / xl
```

### Step 2 — Pages to Design in Figma

#### Public Pages
1. Landing Page (Home)
2. Login Page
3. Register Page
4. Jobs Listing Page
5. Job Detail Page
6. Freelancers Listing Page
7. Freelancer Profile Page
8. Courses Listing Page
9. Course Detail Page

#### Private Pages
10. User Dashboard
11. Employer Dashboard
12. Freelancer Dashboard
13. Learner Dashboard
14. Post a Job Page
15. My Jobs Page
16. My Applications Page
17. Enrolled Courses Page
18. Profile Edit Page
19. Chat / Messages Page
20. Admin Dashboard

### Step 3 — Component Library in Figma

#### Atoms
- Button (primary, secondary, outline, ghost, danger)
- Input (text, email, password, search, textarea)
- Badge / Tag (job type, status, category)
- Avatar (small, medium, large)
- Card (base card component)
- Spinner / Loader
- Checkbox / Radio / Toggle
- Tooltip

#### Molecules
- Job Card
- Freelancer Card
- Course Card
- Navbar (desktop + mobile)
- Sidebar
- Search Bar with filters
- Filter Panel
- Pagination
- Rating Stars
- Notification Bell
- Breadcrumb

#### Organisms
- Hero Section
- Job Listing Section
- Freelancer Grid
- Course Grid
- Featured Jobs
- Stats Section
- Testimonials Section
- Footer
- Auth Form
- Dashboard Stats Cards
- Notification Dropdown

### Step 4 — Figma Page Structure

```
SearFind Figma File Structure:
├── 🎨 Design System
│   ├── Colors
│   ├── Typography
│   ├── Icons
│   ├── Spacing
│   └── Components
├── 📱 Mobile Designs (375px)
│   ├── Landing Page
│   ├── Auth Pages
│   ├── Job Pages
│   ├── Freelancer Pages
│   └── Learning Pages
├── 💻 Desktop Designs (1440px)
│   ├── Landing Page
│   ├── Auth Pages
│   ├── Job Pages
│   ├── Freelancer Pages
│   ├── Learning Pages
│   └── Dashboard Pages
└── 🔄 User Flow Diagrams
    ├── Job Seeker Flow
    ├── Employer Flow
    ├── Freelancer Flow
    └── Learner Flow
```

---

## 4. Full Feature List

### 4.1 Authentication Module ✅ Done (Dev 1)

- [x] Register with role selection (Job Seeker / Employer / Freelancer / Instructor)
- [x] Login with JWT token
- [x] Protected routes
- [ ] Forgot password via email
- [ ] Reset password
- [ ] Email verification
- [ ] Google OAuth login
- [ ] LinkedIn OAuth login

### 4.2 Job Search Module ✅ Done (Dev 1)

- [x] Post a job (Employer)
- [x] Browse all jobs
- [x] Search by title / keyword
- [x] Filter by type (Full-time / Part-time / Remote)
- [x] Filter by experience level
- [x] Job detail page
- [x] Apply for job with cover letter
- [x] My applications page
- [x] My posted jobs page
- [x] Delete a job
- [ ] Save / bookmark jobs
- [ ] Job application status tracking
- [ ] Email notification on application
- [ ] Job expiry / deadline

### 4.3 Freelancer Module ⏳ Dev 2

- [ ] Become a freelancer (setup profile)
- [ ] Freelancer profile page
- [ ] Browse all freelancers
- [ ] Search by skills / category
- [ ] Filter by hourly rate / rating / availability
- [ ] Hire a freelancer
- [ ] Send project proposal
- [ ] Portfolio showcase
- [ ] Freelancer reviews and ratings
- [ ] Project history
- [ ] Freelancer verification badge

### 4.4 Learning Platform Module ⏳ Dev 3

- [ ] Browse all courses
- [ ] Search by title / category
- [ ] Filter by level (Beginner / Intermediate / Advanced)
- [ ] Filter by price (Free / Paid)
- [ ] Course detail page
- [ ] Course preview video
- [ ] Enroll in course (free/paid)
- [ ] Video lessons player
- [ ] Course progress tracking
- [ ] Quiz / assessment
- [ ] Certificate on completion
- [ ] Course reviews and ratings
- [ ] Instructor profile page
- [ ] My enrolled courses

### 4.5 Dashboard Module (All Devs)

#### Job Seeker Dashboard
- [ ] Applied jobs list
- [ ] Saved jobs
- [ ] Profile completion percentage
- [ ] Recommended jobs
- [ ] Activity feed

#### Employer Dashboard
- [ ] Posted jobs list
- [ ] Applications received
- [ ] Shortlisted candidates
- [ ] Hire status tracker

#### Freelancer Dashboard
- [ ] Active projects
- [ ] Earnings overview
- [ ] Reviews received
- [ ] Profile views count

#### Learner Dashboard
- [ ] Enrolled courses
- [ ] Progress tracking
- [ ] Certificates earned
- [ ] Recommended courses

### 4.6 Chat / Messaging Module

- [ ] Real-time chat (Socket.io)
- [ ] Employer ↔ Job Seeker chat
- [ ] Client ↔ Freelancer chat
- [ ] File sharing in chat
- [ ] Read receipts
- [ ] Chat notifications
- [ ] Video call integration (future)

### 4.7 Payment Module ⏳ Dev 3

- [ ] Stripe payment integration
- [ ] Pay for premium job posting
- [ ] Pay for courses
- [ ] Pay freelancers (escrow system)
- [ ] Refund system
- [ ] Invoice generation (PDF)
- [ ] Earnings withdrawal for freelancers
- [ ] Payment history

### 4.8 Notification System

- [ ] In-app notifications
- [ ] Email notifications
- [ ] Job alert (notify when matching job posted)
- [ ] Application status updates
- [ ] Course update notifications
- [ ] New message notifications

### 4.9 Admin Panel

- [ ] Admin dashboard with stats
- [ ] Manage all users
- [ ] Manage all jobs (approve / reject)
- [ ] Manage all courses (approve / reject)
- [ ] Manage payments
- [ ] Ban / suspend users
- [ ] Platform analytics
- [ ] Revenue reports

### 4.10 AI / Smart Features (Future)

- [ ] AI job recommendations (based on profile)
- [ ] AI freelancer match (best match for project)
- [ ] AI course recommendations
- [ ] Smart search with autocomplete
- [ ] Resume parser (auto-fill profile)
- [ ] Skill gap analysis

---

## 5. API Endpoints Summary

### Auth Routes
```
POST   /api/auth/register          Register new user
POST   /api/auth/login             Login user
GET    /api/auth/me                Get current user
POST   /api/auth/forgot-password   Send reset email
PUT    /api/auth/reset-password/:token   Reset password
GET    /api/auth/verify/:token     Verify email
```

### Job Routes ✅ Done
```
GET    /api/jobs                   Get all jobs (with filters)
GET    /api/jobs/:id               Get single job
POST   /api/jobs                   Create job (employer only)
PUT    /api/jobs/:id               Update job (owner only)
DELETE /api/jobs/:id               Delete job (owner only)
POST   /api/jobs/:id/apply         Apply for job
GET    /api/jobs/my-jobs           Get my posted jobs
GET    /api/jobs/my-applications   Get my applications
```

### Freelancer Routes ⏳
```
GET    /api/freelancers            Get all freelancers
GET    /api/freelancers/:id        Get freelancer profile
POST   /api/freelancers            Create freelancer profile
PUT    /api/freelancers/:id        Update freelancer profile
POST   /api/freelancers/:id/hire   Hire a freelancer
POST   /api/freelancers/:id/review Add review
```

### Learning Routes ⏳
```
GET    /api/courses                Get all courses
GET    /api/courses/:id            Get single course
POST   /api/courses                Create course (instructor)
POST   /api/courses/:id/enroll     Enroll in course
GET    /api/courses/my-courses     Get enrolled courses
PUT    /api/courses/:id/progress   Update progress
```

### User Routes
```
GET    /api/users/:id              Get user profile
PUT    /api/users/profile          Update profile
POST   /api/users/upload-avatar    Upload profile photo
POST   /api/users/upload-resume    Upload resume PDF
```

### Payment Routes ⏳
```
POST   /api/payments/create-session   Create Stripe session
POST   /api/payments/webhook          Stripe webhook
GET    /api/payments/history          Payment history
POST   /api/payments/withdraw         Request withdrawal
```

### Message Routes ⏳
```
GET    /api/messages/:conversationId  Get messages
POST   /api/messages                  Send message
GET    /api/messages/conversations    Get all conversations
```

---

## 6. Database Schema

### Collections Summary

| Collection | Purpose |
|------------|---------|
| users | All platform users |
| jobs | Job listings |
| applications | Job applications |
| freelancers | Freelancer profiles |
| courses | Online courses |
| lessons | Course lessons |
| enrollments | Course enrollments |
| reviews | Reviews (jobs/freelancers/courses) |
| payments | All payments |
| messages | Chat messages |
| notifications | User notifications |

---

## 7. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Page load time | < 2 seconds |
| API response time | < 500ms |
| Uptime | 99.9% |
| Mobile responsive | Yes (all screens) |
| SEO optimized | Yes |
| HTTPS / SSL | Yes |
| API rate limiting | 100 requests/min |
| Password encryption | bcrypt (10 rounds) |
| Token expiry | 30 days |
| File upload limit | 10MB per file |
| Max video size | 500MB per lesson |

---

## 8. Git Branch Strategy

```
main                    → Production only (protected)
dev                     → Integration branch
│
├── feature/auth            → Dev 1 — Auth module ✅
├── feature/job-search      → Dev 1 — Job module ✅
├── feature/freelancer      → Dev 2 — Freelancer module
├── feature/dashboard       → Dev 2 — Dashboard module
├── feature/learning        → Dev 3 — Learning module
├── feature/payment         → Dev 3 — Payment module
└── feature/user-profile    → User profile module
```

### Daily Workflow
```bash
# Start of day
git checkout feature/your-branch
git pull origin dev

# During work
git add .
git commit -m "feat: description of change"
git push origin feature/your-branch

# When feature done — raise Pull Request
# feature/your-branch → dev
# Get 1 teammate review → merge
```

### Commit Message Format
```
feat:     New feature
fix:      Bug fix
ui:       UI changes
refactor: Code refactor
docs:     Documentation
test:     Tests
chore:    Config changes
```

---

## 9. Deployment Plan

| Service | Platform | Cost |
|---------|----------|------|
| Frontend | Vercel | Free |
| Backend API | Render | Free |
| Database | MongoDB Atlas (M0) | Free |
| File Storage | Cloudinary | Free |
| Domain | Namecheap (searfind.io) | ~$30/yr |
| SSL Certificate | Let's Encrypt | Free |
| CI/CD | GitHub Actions | Free |
| Analytics | Google Analytics | Free |
| Email | Gmail SMTP | Free |
| Payments | Stripe | 2.9% + 30¢ per transaction |

### CI/CD Pipeline (GitHub Actions)
```yaml
On Push to main:
  1. Run tests
  2. Build frontend (npm run build)
  3. Deploy frontend to Vercel
  4. Deploy backend to Render
  5. Notify team on Slack
```

### Environment Variables Required
```env
# Backend
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
STRIPE_SECRET_KEY=...
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=...
EMAIL_PASS=...
CLIENT_URL=https://searfind.io
NODE_ENV=production

# Frontend
VITE_API_URL=https://api.searfind.io
VITE_STRIPE_PUBLIC_KEY=...
VITE_SOCKET_URL=https://api.searfind.io
```

---

## 10. Team Task Assignment

### Dev 1 — Tushar (You)
**Branches:** `feature/auth` + `feature/job-search`

| Task | Status |
|------|--------|
| Login page | ✅ Done |
| Register page | ✅ Done |
| Auth API (register/login/me) | ✅ Done |
| Jobs listing page | ✅ Done |
| Job detail page | ✅ Done |
| Post a job page | ✅ Done |
| My jobs page | ✅ Done |
| My applications page | ✅ Done |
| Job API (CRUD + apply) | ✅ Done |
| Navbar component | ⏳ Next |
| Landing page | ⏳ Next |
| User profile page | ⏳ Next |

### Dev 2
**Branch:** `feature/freelancer` + `feature/dashboard`

| Task | Status |
|------|--------|
| Freelancer profile setup | ⏳ Todo |
| Freelancers listing page | ⏳ Todo |
| Freelancer detail page | ⏳ Todo |
| Freelancer API | ⏳ Todo |
| User dashboard | ⏳ Todo |
| Employer dashboard | ⏳ Todo |
| Freelancer dashboard | ⏳ Todo |

### Dev 3
**Branch:** `feature/learning` + `feature/payment`

| Task | Status |
|------|--------|
| Courses listing page | ⏳ Todo |
| Course detail page | ⏳ Todo |
| Lesson video player | ⏳ Todo |
| Learning API | ⏳ Todo |
| Stripe payment integration | ⏳ Todo |
| Payment API | ⏳ Todo |
| Enrollment system | ⏳ Todo |

---

## 11. Project Roadmap

### Phase 1 — Foundation (Month 1-2)
- [x] Project setup (React + Node + MongoDB)
- [x] Authentication system
- [x] User profiles
- [x] Job search module
- [ ] Landing page
- [ ] Navbar

### Phase 2 — Core Modules (Month 2-3)
- [x] Job CRUD + Apply
- [ ] Freelancer module
- [ ] Learning platform
- [ ] Dashboards

### Phase 3 — Advanced Features (Month 4-5)
- [ ] Real-time chat (Socket.io)
- [ ] Stripe payments
- [ ] Notifications
- [ ] Admin panel
- [ ] AI recommendations

### Phase 4 — Production Launch (Month 6)
- [ ] Performance optimization
- [ ] SEO setup
- [ ] Security hardening
- [ ] Deploy to searfind.io
- [ ] CI/CD pipeline
- [ ] Analytics setup
- [ ] Beta testing
- [ ] Public launch 🚀

---

## 12. MVP (Minimum Viable Product)

Launch fast with these core features:

```
✅ Auth (Login / Register)
✅ Job Search & Apply
⏳ Freelancer Search & Hire
⏳ Basic Courses
⏳ User Dashboard
⏳ Deploy on searfind.io
```

**Target MVP Date:** 2 months from start

---

*SearFind PRD v1.0 — Generated for production-ready development*  
*Repository: https://github.com/tushar4722/searfind*
