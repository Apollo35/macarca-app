# Macarca App — Source of Truth

**Last updated:** Session 1 (Sprint 0)
**Repository:** https://github.com/Apollo35/macarca-app (public)

---

## 1. Current Project Status

- **Phase:** MVP development — foundational setup
- **Current Sprint:** Sprint 0 — Project Setup — **✅ Complete**
- **Session number:** 1
- **Overall progress:** Environment and repo are live. No application features (vocabulary, sentences, review) have been built yet.

---

## 2. Completed Work (this session)

- Defined and approved the MVP plan: feature set, screens, user flow, data structure, tech stack, architecture, and sprint roadmap.
- Confirmed existing dev environment (Node.js v24.15.0, npm 11.12.1, Git 2.54.0 — all pre-installed, no new installs needed).
- Confirmed GitHub account exists; repo will be public.
- Confirmed VS Code as editor.
- Created the project via `npm create vite@latest macarca-app -- --template react`.
- Installed dependencies (`npm install`) and verified the dev server runs (`npm run dev` → default Vite+React starter page loaded correctly at `localhost:5173`).
- Initialized Git, made first commit ("Initial commit: Vite + React scaffold").
- Created GitHub repo `Apollo35/macarca-app` (public) and pushed successfully — confirmed `node_modules` correctly excluded via `.gitignore` (push was only 32.00 KiB).

---

## 3. Current Application State

- The app currently shows only the **default Vite + React starter page** (spinning logo, demo counter button). No Macarca-specific UI exists yet.
- No vocabulary, sentences, or review functionality implemented.
- No custom components, pages, or data files created yet.

---

## 4. Technical State

**Confirmed stack (approved, in use):**

- React + Vite (JavaScript template, not TypeScript)
- Plain CSS (no UI library, no Tailwind)
- Local JSON files for content (planned — not yet created)
- No backend, no database, no authentication (MVP scope)
- Navigation: simple state-based (React Router deferred unless genuinely needed)

**Project structure (current — default Vite output, not yet customized):**

```
macarca-app/
├── node_modules/        (gitignored)
├── public/
├── src/
│   ├── App.jsx           ← default Vite starter content, not yet modified
│   ├── main.jsx
│   └── (default Vite assets/CSS)
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

Planned folders (`src/data/`, `src/components/`, `src/pages/`) — **not created yet**, will be added in Sprint 1.

**Environment confirmed on developer machine:**

- Node.js v24.15.0
- npm 11.12.1
- Git 2.54.0.windows.1
- OS: Windows
- Editor: VS Code

**Dependencies:** only Vite/React defaults so far. No additional libraries added.

**Version control:**

- Git initialized, first commit made and pushed to `main`.
- Working workflow going forward: change → test → verify → commit → push (small, meaningful commits, never committing untested code).

---

## 5. Data & Content State

- **No content created yet.** No vocabulary or sentence data exists in the project.
- **Approved data model (planned, not yet implemented):**

```json
{
  "id": "greetings-001",
  "category": "greetings",
  "turkish": "Merhaba",
  "hungarian": "Szia",
  "pronunciation": "si-ya",
  "note": "Informal greeting, used with people you're on first-name terms with.",
  "type": "vocabulary"
}
```

- **Decision:** `pronunciation` is an **optional** field — included only when accuracy is confident, never invented or approximated to fill the field.
- **Decision:** same data shape used for both vocabulary and sentences (`type` field distinguishes them).
- Categories planned (subject to refinement): Greetings, Numbers, Food, Family, Work, Transportation, Shopping, Home, Time and dates, Common verbs, Common adjectives, Everyday expressions.
- **Blocked/waiting on:** real Hungarian content sample from product owner (at least ~10 verified words/sentences) before Sprint 1 can use real data instead of placeholders.

---

## 6. Known Issues

- None currently — scaffold and Git setup verified working, no bugs encountered this session.
- Note: application currently shows placeholder Vite content, not a real limitation, just expected state before Sprint 1.

---

## 7. Decisions Made (this session)

| Decision                                        | Reasoning                                                                  |
| ----------------------------------------------- | -------------------------------------------------------------------------- |
| React + Vite, plain JS (not TS)                 | Well-documented, beginner-friendly, matches user's prior experience        |
| Plain CSS, no UI library                        | Fewer concepts/dependencies to manage in MVP                               |
| Local JSON content, no database                 | Content is static and owner-controlled; no need for backend infrastructure |
| No auth, no backend in MVP                      | Not required for core learning loop; reduces complexity and risk           |
| Simple state-based navigation over React Router | Fewer moving parts initially; can add Router later if structure demands it |
| Pronunciation is optional per item              | Accuracy priority — never fill the field with guessed/approximated content |
| Public GitHub repo                              | Approved by product owner for v1                                           |
| Small, tested, meaningful commits               | Establishes Git as a real safety net, not just occasional backup           |

---

## 8. Next Steps (not started — awaiting go-ahead)

1. **Sprint 1 — Vocabulary core loop:**
   - Create `src/data/vocabulary.json` with a real, verified sample category (e.g. Greetings, ~10 items) — **requires content from product owner first**
   - Build `Home`, `Vocabulary` (category list), and item list components
   - Wire up simple state-based navigation between them
2. Clean up the default Vite starter content in `App.jsx` before building real screens.
3. Decide exact category list order/naming (currently just a draft list).

**Not started automatically — waiting for product owner's decision to proceed.**

---

## 9. File/Architecture Reference (current, verified)

| Path              | Status                      | Purpose                                           |
| ----------------- | --------------------------- | ------------------------------------------------- |
| `macarca-app/`    | ✅ Exists                   | Project root                                      |
| `src/App.jsx`     | ✅ Exists (default content) | Currently unmodified Vite starter                 |
| `src/main.jsx`    | ✅ Exists (default)         | App entry point                                   |
| `.gitignore`      | ✅ Exists, verified correct | Excludes `node_modules` (confirmed via push size) |
| `src/data/`       | ❌ Not yet created          | Planned for Sprint 1                              |
| `src/components/` | ❌ Not yet created          | Planned for Sprint 1                              |
| `src/pages/`      | ❌ Not yet created          | Planned for Sprint 1                              |

---

_This document reflects verified project state only. Nothing above has been assumed or invented — all items marked complete were confirmed via terminal output or explicit user confirmation._
