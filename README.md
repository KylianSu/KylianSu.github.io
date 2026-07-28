# KylianSu Academic Homepage

Source for Tan Su's English academic homepage, published at
[kyliansu.com](https://kyliansu.com/).

The site uses Next.js static export and deploys through GitHub Actions. Every
push to `main` validates the public content, builds the `out/` directory, and
publishes it to GitHub Pages.

## Content structure

- Sidebar profile with a circular GitHub avatar and resilient contact links
- Full-paragraph biography, current appointments, and 2027 opportunity statement
- AI researcher and football player overview cards
- Two selected publications with original paper figures
- University and high-school education, research experience, football record,
  and awards
- Manchester City and France national-team supporter note in the football section
- GitHub-attributed guestbook with continuous scrolling, enlarged message view,
  and author profile links
- Institution marks for SUSTech, CUHK CSE, KNOWIN AI, UF, UTokyo, and
  NC State, with light-background adaptations where required

## Privacy choices

- GPA and class rank are not included.
- The phone number is not included.
- The email address is assembled in the browser instead of appearing as plain
  text in the page source.
- WeChat appears only after the visitor opens the contact panel.

This is lightweight protection against basic crawlers, not a guarantee against
determined scraping or image-based QR-code extraction.

All core academic content is visible without client-side JavaScript. The contact
panel uses a CSS target fallback, so Email / WeChat opens even when the client
bundle does not hydrate. Email launching remains progressively enhanced because
the address is assembled only after the visitor clicks.

The guestbook reads public comments from
[`KylianSu/guestbook#1`](https://github.com/KylianSu/guestbook/issues/1).
GitHub handles sign-in and posting; the homepage never stores an OAuth secret.
The implementation and identity limitations are documented in
`docs/guestbook-plan.md`.

The matching GitHub Profile README is maintained at
`../github-profile/README.md`. Publish it as `KylianSu/KylianSu/README.md` so
GitHub renders it on the account overview page.

## Visual system

- White background throughout the site
- One sans-serif type family for headings and body copy
- Deep charcoal text with one restrained teal link color
- Medium-weight body copy for legibility
- Direct academic section titles without decorative slogans
- A wider desktop reading column and larger institution marks

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
python scripts/validate_site.py
npm run build
```

The production build emits a fully static site in `out/`. GitHub Pages deploys
that directory through `.github/workflows/deploy-pages.yml`.

## Custom domain

The production site uses [kyliansu.com](https://kyliansu.com/) as its custom
domain. GitHub Pages enforces HTTPS, and the default `kyliansu.github.io`
address redirects to the custom domain.
