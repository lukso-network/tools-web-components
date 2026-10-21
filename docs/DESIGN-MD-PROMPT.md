# Generating a DESIGN.md for a LUKSO repo

> **Audience:** consumer repos of `@lukso/web-components` (dApps, docs sites, explorers, etc.). This file is a copy-pasteable prompt — paste it into a coding agent inside a _consumer repo_, not inside this library.

This is a copy-pasteable prompt for coding agents (Claude Code, Cursor, Gemini CLI, Aider, etc.) that **bootstraps both a `DESIGN.md` _and_ a generator script that keeps it in sync** in any repo consuming the [`@lukso/web-components`](https://github.com/lukso-network/tools-web-components) library. The `DESIGN.md` itself follows the [google-labs/design.md](https://github.com/google-labs-code/design.md) spec.

Static DESIGN.md files rot the moment the upstream design system shifts. The generator pattern fixes that: tokens are derived from the live `node_modules/@lukso/web-components` CSS on every relevant change, the `<lukso-*>` and bespoke component inventories are recomputed by reading the consumer repo, and a git pre-commit hook re-runs the generator and re-stages the file. The output ends up looking the same as a hand-curated DESIGN.md — but it never goes stale.

## When to use it

- Any LUKSO-ecosystem repo that doesn't yet have a `DESIGN.md` at its root.
- After a major visual refresh, to bootstrap the full pipeline rather than hand-editing a stale file.
- When onboarding a new design-system consumer (dApp, docs site, explorer) so AI contributors produce library-consistent UI from day one.

## How to use it

1. Check out a fresh branch in the target repo (`git checkout -b docs/design-md`).
2. Ensure dependencies are installed (`yarn install` / `pnpm install` / `npm install`) so the LUKSO Tailwind preset and CSS can be read from `node_modules`.
3. Open an agent session in the repo root, paste the prompt below verbatim, let it run to completion.
4. Review the produced `DESIGN.md`, the generator script, and the hook/CI changes. Run the validator yourself, commit, open a PR.

**Reference implementation:** [universaleverything.io](https://github.com/universal-everything/universaleverything.io) is the canonical example —

- [`DESIGN.md`](https://github.com/universal-everything/universaleverything.io/blob/main/DESIGN.md) — the generated artifact
- [`scripts/generate-design-md.mjs`](https://github.com/universal-everything/universaleverything.io/blob/main/scripts/generate-design-md.mjs) — the generator
- [`scripts/design-md.config.mjs`](https://github.com/universal-everything/universaleverything.io/blob/main/scripts/design-md.config.mjs) — project-specific role mapping
- [`.husky/pre-commit`](https://github.com/universal-everything/universaleverything.io/blob/main/.husky/pre-commit) — auto-regenerate hook
- `package.json` `scripts.lint` includes `lint:design` — CI gate

---

## The prompt

Copy everything inside the fenced block below and paste it as your first message to the agent in the target repo.

````markdown
You are going to set up a **DESIGN.md generator pipeline** in this repo. The deliverable is not a static markdown file — it's a small Node script that derives `DESIGN.md` from live sources, plus the `DESIGN.md` it produces, plus the git hook + CI gate that keep them in sync.

The generated `DESIGN.md` follows the [google-labs/design.md](https://github.com/google-labs-code/design.md) v1 (alpha) format and integrates `@lukso/web-components`. Work through the seven numbered steps below in order. Do not skip validation.

### 1. Confirm the library is in use

Read `package.json`. Confirm `@lukso/web-components` appears in `dependencies` or `devDependencies`; note the version. If it is absent, stop and ask the user whether to proceed with a generic palette instead — this prompt is tuned for LUKSO consumers.

Also note the runtime: Vue/Nuxt (`*.vue`), React/Next (`*.tsx`), Svelte (`*.svelte`), Astro (`*.astro`). The generator's repo-scan logic adapts per-runtime.

### 2. Resolve authoritative tokens from the library

The generator should read these preset files at runtime (do **not** copy them into the repo):

- `node_modules/@lukso/web-components/dist/styles/colors-v4.css` — full color scale (`neutral-10`..`neutral-100`, `lukso-50`..`lukso-90`, plus `purple`, `green`, `red`, `blue`, `yellow`, `coral`, `honey` scales, etc.). Hex values are the source of truth for the `colors:` front-matter block.
- `node_modules/@lukso/web-components/dist/styles/typography-v4.css` — type scale classes (e.g. `heading-inter-48-regular`, `paragraph-inter-16-semi-bold`, `paragraph-ptmono-14-regular`). Resolve the `var(--font-*)` / `var(--text-*)` / `var(--leading-*)` / `var(--font-weight-*)` references via step 2's component CSS.
- `node_modules/@lukso/web-components/dist/styles/component-v4.css` — `--radius-*`, `--spacing-*`, `--font-*`, `--text-*`, `--leading-*`, `--font-weight-*` custom properties. The generator must build a flat `var-name -> value` lookup and resolve typography classes through it.
- `node_modules/@lukso/web-components/tailwind.config.cjs` (or `.js`) — secondary confirmation of palette and shadow tokens exported to Tailwind.

A reasonable default role mapping (override per project; commit this in a separate `*.config.mjs` next to the generator):

- `colors.primary` = `neutral-20`, `secondary` = `neutral-50`, `tertiary` = `lukso-50`, `neutral` = `neutral-95`, `surface` = `neutral-100`, `muted` = `neutral-98`, `border` = `neutral-90`
- `colors.success` / `warning` / `error` / `info` = `green-54` / `yellow-55` / `red-55` / `blue-50`
- Optional: `accent-coral` = `coral-65`, `accent-honey` = `honey-72`

### 3. Inventory `<lukso-*>` library usage

Walk every template/source file in the repo (`*.vue` / `*.tsx` / `*.svelte` / `*.astro` per step 1) and grep for `<lukso-` tags. Build a table of: tag name, total occurrences, top-N attributes actually passed (ranked by frequency).

Important — naive regex breaks on Vue templates with multi-line attribute values containing template literals like `` `<strong>` ``. The matcher must skip over balanced `"…"` / `'…'` / `` `…` `` runs when finding the closing `>` of an opening tag. Filter out:

- `@`-prefixed event handlers (these are not attributes you'd document)
- `v-`-prefixed Vue directives
- `class` and `style` attributes (universal, uninteresting)

Also confirm where the library is registered (look under `plugins/`, `src/main.ts`, `app/entry.client.tsx`, or a Nuxt/Next bootstrap file) so the prose can link to it. Typical pattern: a single side-effect import in a client-only bootstrap.

### 4. Inventory bespoke / custom components

**This is the step most prompts miss.** Real product repos have a layer of in-repo Vue/React/Svelte components on top of the library — wrappers (`AppLinkButton`), compositions (`ProfileCard`), domain widgets (`GridFloatingMenu`). Coding agents need to know about these too, otherwise they'll either hand-roll new bespoke alternatives or skip past the right abstraction.

For each first-class component file in the standard component directories (`components/`, `domains/**/components/`, `src/components/`, `app/components/` — adapt to repo layout):

- Skip dynamic-route pages (`[param].vue`, `[id].tsx`) and barrel files (`index.vue`, `index.tsx`).
- Use the file's basename as the canonical PascalCase tag name; map it to the kebab-case form Vue / JSX auto-generates.
- Count usage by grepping every other template for either form (`<AppLink`, `<app-link`).
- Filter out tiny utility wrappers per a project-specific ignore list (e.g. `AppPlaceholder`, `AppPortal`, `AppRevealOnView`).

Cap the table at the top ~20 most-used custom components so DESIGN.md stays scannable.

### 5. Emit the generator + config

Create three files:

**`scripts/generate-design-md.mjs`** — the generator. Pure Node ESM, no new runtime deps beyond `prettier` (already in any LUKSO repo). It must:

- Take no arguments by default → write `DESIGN.md` if changes are needed.
- Take `--check` → exit `1` and print a hint if `DESIGN.md` would change. CI runs this.
- Pipe its raw output through Prettier programmatically before writing, so the file is always Prettier-stable. (Otherwise CI's `lint:fmt` and `lint:design` will fight each other.)
- Splice _only_ between fence markers in the prose body — the YAML front matter is fully regenerated each run, but evergreen prose (Overview, Colors descriptions, Typography rationale, Do's and Don'ts) is preserved verbatim. Use HTML comment fences like `<!-- design-md:auto:library-table:start -->` ... `<!-- design-md:auto:library-table:end -->`.

**`scripts/design-md.config.mjs`** — the project's opinions. Holds:

- `name`, `description` strings.
- `colorRoles` — a map of logical roles (`primary`, `tertiary`, etc.) to LUKSO scale token names (`neutral-20`, `lukso-50`).
- `typographyRoles` — map of `h1`/`body-md`/`mono`/etc. to LUKSO typography class names (`heading-inter-48-regular` etc.) and any project-level overrides (e.g. `letterSpacing`).
- `roundedRoles`, `spacingRoles` — map of `sm`/`md`/`lg` to `--radius-*` / `--spacing-*` suffix numbers.
- `components` — the literal recipe block that goes into the YAML front matter (tokenized references like `'{colors.tertiary}'`, never inline hex).
- `scanGlobs`, `triggerPaths`, `ignoreCustomComponents`, `maxLibraryRows`, `maxCustomRows`.

**`DESIGN.md`** at repo root. Prose `##` sections in canonical order; the generator splices into the marked fences:

1. **Overview** — product in 2–3 sentences, plus an "Implementation note" paragraph pointing agents at `@lukso/web-components` and the [Storybook](https://tools-web-components.pages.dev/).
2. **Colors** — role of each color token. Hex values live in YAML front matter only; do not inline them in prose (they'll drift).
3. **Typography** — Inter for UI, PT Mono for on-chain strings.
4. **Layout** — spacing scale, max content width, breakpoints.
5. **Elevation & Depth** — neutral drop-shadow system, three roles (resting / elevated / floating).
6. **Shapes** — radius semantic (`sm` chips, `md` inputs, `lg` cards/buttons, `xl` panels, `2xl` modals, `full` avatars).
7. **Components** — one bullet per recipe. For each, append an _Implementation:_ line pointing at the canonical `<lukso-*>` tag (from step 3's inventory) or the in-repo custom component (from step 4) where applicable.
8. **Library & Implementation** — intro prose plus two fenced sub-tables:
   - `<!-- design-md:auto:library-table:start -->` ... — top `<lukso-*>` tags ranked by usage, with the most-passed props.
   - `<!-- design-md:auto:custom-table:start -->` ... — top in-repo custom components ranked by usage, with file links.
   - Plus a `<!-- design-md:auto:token-summary:start -->` line stating the LUKSO version and counts.
9. **Do's and Don'ts** — first Do: "reach for `@lukso/web-components` first"; second Do: "reach for the in-repo custom components in the table above before authoring new bespoke markup". First Don't: "don't override shadow DOM of `<lukso-*>` components with `::part()` / `!important` / deep selectors — raise upstream in [tools-web-components](https://github.com/lukso-network/tools-web-components)".

### 6. Wire the generator into the repo's hooks and CI

- Add `package.json` scripts: `"design:generate"`, `"lint:design"` (which runs `node scripts/generate-design-md.mjs --check`), and `"lint:design:fix"`. Add `design` to the existing `lint` parallel-runner so the CI gate fails when DESIGN.md is out of sync.
- Update `.husky/pre-commit` (or whatever the repo uses): after lint-staged, detect whether any of the trigger paths are staged (`tailwind.config.*`, `package.json`, the scan globs, the generator/config files themselves). If yes, run the generator and `git add DESIGN.md` if it changed.
- Do **not** run the generator on `postinstall` or in `nuxt:prepare` — that runs in CI before the `lint:design` check, masking drift. The hook plus the explicit lint gate are enough.

### 7. Validate and report

```bash
yarn design:generate            # writes DESIGN.md
yarn lint:design                # exit 0 ⇒ committed file matches sources
npx @google/design.md lint DESIGN.md   # spec validation, expect 0 errors
yarn lint:fmt                   # prettier-clean across the new files
```

Target: `errors: 0` from the spec linter. Warnings are acceptable when they stem from upstream LUKSO values (e.g. `button-primary-hover` using `lukso-60` `#bb7793` for hover, `status-error` using `red-55` `#e23636`). If the linter flags any other warnings, fix them in the role mapping or component recipes — never silently accept them.

When you're done, report: a tree of new files, the spec-lint summary, the list of accepted upstream warnings with one-line justifications, and how to invoke the generator manually.
````

---

## Prompt hygiene

- Run the prompt on a fresh branch, not directly on `main`.
- Spot-check a handful of token hex values against `colors-v4.css` before committing — the role mapping is the only place values can drift.
- Keep `DESIGN.md` at the **repo root**, not in `docs/`. The google-labs convention is root-level, and agents look there first.
- Don't let the agent edit `tailwind.config.js`, SCSS files, or `package.json`'s `dependencies` — the generator only reads them.
- If the agent produces a custom `luksoTag:` property on a component entry in the YAML, reject it. The spec rejects unknown component properties; library pointers belong in the prose Implementation table.
- Treat `scripts/design-md.config.mjs` as the project's **opinion** — review it like any other code change. The generator script itself should be near-identical across consumer repos.

## Tooling reference

| Command                                                    | Purpose                                                           |
| ---------------------------------------------------------- | ----------------------------------------------------------------- |
| `yarn design:generate`                                     | Regenerate `DESIGN.md` from live sources.                         |
| `yarn lint:design`                                         | Fail if `DESIGN.md` is out of sync (CI gate).                     |
| `npx @google/design.md lint DESIGN.md`                     | Validate against the spec. Exit code `1` on errors.               |
| `npx @google/design.md diff DESIGN.md DESIGN-v2.md`        | Detect token-level regressions between versions.                  |
| `npx @google/design.md export --format tailwind DESIGN.md` | Export tokens as a Tailwind theme JSON.                           |
| `npx @google/design.md export --format dtcg DESIGN.md`     | Export as W3C Design Tokens Community Group JSON.                 |
| `npx @google/design.md spec`                               | Print the current spec — useful for injecting into agent prompts. |
