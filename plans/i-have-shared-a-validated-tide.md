# Portfolio Website — Muhammad Kamal (Iteration 2)

## Context

Phase 1 built the full-page structure. This iteration upgrades the portfolio with real content from the CV, fixes the hero copy, adds project images, and introduces a dedicated `/certificates` page for all 64+ credentials while keeping featured ones on the homepage scroll gallery.

---

## Changes Required

### 1. Hero tagline — rewrite

**Remove:** "I turn data into decisions, ideas into brands, and models into products. Based in Sargodha / Islamabad — open to roles, research collaborations, and interesting problems."

**Replace with an "intersection" framing that names the niches:**
```
I sit at the intersection of
marketing strategy · data analytics · AI · brand design
```
Sub-headline (no location):
> "Business student who builds strategy and then measures it — working across marketing, data analytics, AI, and design to turn business context into outcomes that show up in the numbers."

Remove all location mentions from body/hero/description text. Location lives **only** in the footer.

---

### 2. Real experience data (from CV)

Replace placeholders with actual roles from CV:

| Role | Org | Period |
|---|---|---|
| Co-Founder & Lead Strategist | TriSyn Media | Nov 2025 – Present |
| Social Media Manager Intern | Public Administration Association of Pakistan | Aug 2025 – Feb 2026 |
| Ambassador (Lincoln Corner) | University of Sargodha | Apr 2025 – Mar 2026 |
| Ambassador | Bano Qabil, Alkhidmat Foundation | Aug 2025 – Jan 2026 |
| Head of Media Society | MFKNBS, University of Sargodha | Dec 2025 – Present |
| Event Management | MFKNBS & WWIC, UoS | Apr 2025 – Dec 2025 |

Add a **type badge** ("Work" vs "Volunteer") so the mix reads clearly.

---

### 3. Real skills (from CV)

Replace placeholder skill groups with actual skills:

| Category | Skills |
|---|---|
| Data & Analytics | Python (Pandas, Viz), SQL (MySQL), Power BI, Tableau, MS Excel, Data Visualization |
| AI & Marketing | Digital Marketing, SEO, Social Media Marketing, AI Automation, Prompt Engineering, Brand Strategy, Content Strategy |
| Design & Tools | Canva, Graphic Design, Web Dev (HTML/CSS/JS), Git, Google Workspace, Project Management |

---

### 4. Real contact info (from CV)

- Email: `mk9633273@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/muhammadkamalofficial`
- GitHub: placeholder (not on CV)
- CV link: placeholder

---

### 5. Certificates — two-tier architecture

**Homepage scroll gallery (featured ~10):**
Show only high-signal specializations. Proposed featured set:
1. McKinsey Forward Program
2. Google Digital Marketing & E-commerce Specialization
3. Google Prompting Essentials Specialization
4. Python for Everybody Specialization (Michigan)
5. Google AI Essentials
6. Foundations of Data Science
7. Data Analysis and Visualization with Python
8. From Excel to Power BI
9. AI For Everyone – DeepLearning.AI
10. Deep Learning for Business
11. Intuit Academy Bookkeeping Specialization

Each card links out to verify URL. A **"View All 64+ Certificates →"** button at end of scroll row links to `/certificates`.

**Dedicated `/certificates` page:**
- All 64 certificates organized in filterable grid
- Filter tabs by category: All / AI & Data / Marketing / Python & Dev / Business & Finance / Other
- Each card: title, issuer, year, "Verify →" link button (opens in new tab)
- Back-to-home link in header

**Routing:** Use `react-router-dom` with two routes:
- `/` → main App (homepage)
- `/certificates` → CertificatesPage component

Create `src/app/CertificatesPage.tsx` as the new file.
Wrap routes in `src/main.tsx` (or `src/app/main.tsx`) using `BrowserRouter`.

---

### 6. Project cards — add image slot

Add an `image` field to each project in the `PROJECTS` array. Use Unsplash photos thematically matched to each project (e.g., data dashboard photo for analytics project, brand/design photo for identity project). Display image as card header with `object-cover` aspect ratio of `16/9`.

---

### 7. Stats update in Hero

Update the floating stats to reflect real numbers:
- `64+` Certificates (not 7+)
- `6` Roles / Experiences
- `3.64` CGPA

---

## Files to Modify

| File | Change |
|---|---|
| `src/app/App.tsx` | Hero copy, real data arrays (EXPERIENCE, SKILLS, CERTIFICATES_FEATURED), project images, stats |
| `src/app/CertificatesPage.tsx` | **New file** — full certificates grid with filter tabs |
| `src/main.tsx` | Add BrowserRouter + routes for `/` and `/certificates` |

---

## Certificate Data (all 64)

Full data with verify URLs already extracted from user's message. Organized into categories:

**Specializations (featured):** McKinsey Forward, Google Digital Marketing Spec, Google Prompting Spec, Python for Everybody Spec, Intuit Bookkeeping Spec

**AI & Data:** Google AI Essentials, Foundations of Data Science, Data Analysis & Viz with Python, From Excel to Power BI, AI For Everyone, Deep Learning for Business, Go Beyond the Numbers, Introduction to AI, Maximize Productivity with AI, Use AI Responsibly, Use AI as Creative Partner, Stay Ahead of AI Curve, Work Smarter with AI (Canva), Speed Up Data Analysis, Accelerate Job Search with AI

**Marketing & Business:** Google Digital Marketing modules (5 individual courses), McKinsey Forward, HubSpot Content Marketing (not in list but on CV), Work Smarter with Microsoft Excel

**Python & Dev:** Programming for Everybody, Python Data Structures, Using Databases with Python, Capstone Python, Using Python to Access Web Data, Python Programming Fundamentals, Python for Everybody, Data Analysis with Python, Version Control

**Prompting:** Google Prompting Spec, Design Prompts, Start Writing Prompts, Discover Art of Prompting, Use AI as Creative Partner

**Business & Finance:** Microeconomics, Assets in Accounting, Bookkeeping Basics, Liabilities and Equity, Financial Statement Analysis, Intuit Bookkeeping Spec, How to Finance a Startup, Intro to Project Management, Create PM Tracker, Create Financial Statement

**Other:** Chinese HSK 1, Intro to Psychology, How to Write a Research Paper, Statistical Analysis for Researchers, World of Assessment, Writing with Impact, Freelancing, Business Communication & AI, WordPress, DigiSkills Data Analytics, Aspire Leadership

---

## Verification

1. Homepage hero shows new intersection tagline, no location in body text
2. Experience shows all 6 roles with Work/Volunteer type badge
3. Homepage cert gallery shows ~11 featured certs with verify links
4. "View All" button navigates to `/certificates`
5. `/certificates` page renders all 64 with working filter tabs
6. Clicking "Verify →" opens correct URL in new tab
7. Project cards show Unsplash images
8. No TypeScript errors
