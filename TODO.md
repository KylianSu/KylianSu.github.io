# KylianSu Homepage Delivery Checklist

- [x] Prepare a dedicated `KylianSu/KylianSu.github.io` source tree.
- [x] Configure a static Next.js export.
- [x] Add content and privacy validation to the deployment workflow.
- [x] Add a GitHub Pages deployment workflow.
- [x] Replace the HSFZ monogram with the school emblem.
- [x] Correct the class type to `University Preparatory Class`.
- [x] Add football team marks and shirt numbers 7 and 10.
- [x] Switch public and canonical URLs to `https://kyliansu.com/`.
- [x] Create the public GitHub repository and push `main`.
- [x] Enable GitHub Pages with GitHub Actions.
- [x] Verify that GitHub reports the Pages deployment as built.
- [x] Update the GitHub profile website field to the Pages URL.
- [ ] Re-check direct HTTPS access after the custom domain is connected; the
  current mainland-China egress resets the `github.io` TLS connection.

- [x] Correct the Second-Class Scholarship year to 2025.
- [x] Prepare the matching `KylianSu/KylianSu` GitHub Profile README.
- [x] Add restrained semantic emoji to the GitHub profile and football supporter details.

- [x] Audit the source CV, portrait, paper figures, and public profile links.
- [x] Rebuild the page as a clear white-background academic profile.
- [x] Remove GPA, ranking, and phone number from public page content.
- [x] Add browser-assembled email and click-to-open WeChat contact panel.
- [x] Implement responsive desktop and mobile layouts.
- [x] Add reduced-motion accessibility support.
- [x] Use the current circular GitHub avatar.
- [x] Add full-paragraph biography, 2027 opportunity statement, and research focus.
- [x] Add publications, education, research experience, football, and awards.
- [x] Add complete reverse-chronological research experience with month-level dates.
- [x] Add official institution marks to education and research entries.
- [x] Replace the annotated UF guide image and make the KNOWIN mark visible.
- [x] Widen the desktop layout and enlarge research-experience institution marks.
- [x] Add collaboration topics, degree details, and verified SUSTech program wording.
- [x] Add HSFZ University Preparatory Program to Education.
- [x] Update KNOWIN role to Foundation Model Group Algorithm Intern.
- [x] Make the contact panel open without relying on client-side JavaScript.
- [x] Clarify full ownership of the BTECF codebase and experiments.
- [x] Add deterministic source and privacy validation.
- [x] Install JavaScript dependencies and run the production build.
- [ ] Review rendered desktop and mobile screenshots.
- [x] Push the exact source commit to the Sites source repository.
- [x] Save and deploy the production version.

## Current acceptance evidence

Run:

```bash
python scripts/validate_site.py
```

The validator checks required files, local asset references, section anchors,
and the absence of GPA, rank, phone number, and a plain-text email address in
the public JavaScript source.

Production build evidence:

```text
Next.js 16 / vinext
SITE VALIDATION: PASSED
Build complete
Runtime entry: dist/server/index.js
Worker event handler: default.fetch
Hosting metadata: dist/.openai/hosting.json
```
