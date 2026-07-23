# imenelydiaker.github.io

Personal website of Imene Kerboua, built with [Hugo](https://gohugo.io/) and the
[Neso](https://github.com/babeneso/hugo-neso) theme.

## Prerequisites

- [Hugo extended](https://gohugo.io/installation/) `v0.150.0` or later.

## Running locally

The theme is vendored as a git submodule, so clone with submodules:

```bash
git clone --recurse-submodules https://github.com/imenelydiaker/imenelydiaker.github.io.git
# or, if already cloned:
git submodule update --init --recursive
```

Then start the dev server (drafts included):

```bash
hugo server -D
```

The site is served at http://localhost:1313/ and rebuilds automatically on change.

## Structure

- `content/` — pages and sections (`about`, `cv`, `teaching`, `search`) and the home page (`_index.md`).
- `static/` — files served as-is (`/files/...`, `favicon.ico`).
- `assets/images/` — the profile avatar (processed by the theme).
- `hugo.toml` — site configuration, menu, and theme parameters.
- `themes/hugo-neso/` — the Neso theme (git submodule).

## Deployment

Pushed to `master`, the site is built and deployed to GitHub Pages by the workflow
in `.github/workflows/hugo.yml`. Make sure the repository's **Settings → Pages → Source**
is set to **GitHub Actions**.
