# Portfolio Site Design

Reference slug: `linear.app`

Reason: this portfolio should survive a quick product, security, and operations review by a large-company team. The site needs a calm, precise, product-evidence layout that emphasizes verified flows, data handling, POC criteria, and honest limitations instead of job-application packaging or decorative motion.

## Direction

- First viewport must say: Android / AI service developer who can turn AI features into verified user flows.
- The page should feel like a clean product dossier, not a flashy hero page or personal-application package.
- Use clean project-summary visualizations on the home page; keep screenshots only as secondary evidence when they are large enough to read.
- Lead with verified work, downloadable evidence, and clear POC/review criteria.
- Avoid overclaiming production traction, legal advice, or live API accuracy.

## Layout

- Single-page dossier with compact navigation.
- First screen: identity, core pitch, primary CTA to the LensOverlay case study PDF, proof chips, and a compact evidence panel.
- Project grid: LensOverlay Translate first as the current flagship Android/AI case, then 4 supporting deployed demos.
- Capability section: RAG, LLM evaluation, CS automation, content workflow, office automation.
- Evidence package section: release QA, privacy/security note, architecture note, screenshots, SHA/signing proof, and honest limitations.
- Enterprise review section: 5-minute executive review, 15-minute product review, 30-minute technical review, POC success criteria, and explicit non-production boundaries.
- 2026-05-02 density correction: cap hero type below poster scale, treat screenshots as evidence thumbnails, and avoid oversized cards that slow technical-review scanning.
- 2026-05-02 visual distinction pass: do not repeat one diagram template across projects. Use different forms by project: module hub, lead funnel, risk screen, and route guide.
- 2026-05-23 flagship update: LensOverlay uses a mobile screenshot and Android QA evidence visual, while the other projects remain supporting product demos.
- 2026-05-24 enterprise correction: remove hiring-process wording from the public page and frame the work as a product evidence dossier for product, security, IT, and operations reviewers.
- 2026-06-11 core-feature correction: the first screen should not force reviewers to open PDFs, ZIP files, or installed apps. Lead with the app's core feature map, then keep evidence files as optional supporting proof.

## Visual System

- Base: near-black text on white and soft gray panels.
- Accent: restrained blue `#2563eb` and green `#16a34a`.
- Border: `#d8dee8`.
- Radius: 8px.
- No heavy gradients, no decorative blobs, no excessive animation.

## Components

- Proof chips for status, stack, and verification.
- Project cards with summary visualization, role, stack, proof link, and honest caveat.
- Compact tables for capabilities and evidence.
- Buttons are clear commands: View demo, Open GitHub, Read copy pack.

## Mobile

- Cards stack.
- Screenshots keep fixed aspect ratio.
- No horizontal overflow.
- CTA buttons wrap cleanly.
