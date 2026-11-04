# Design brief

The personal site of **Om Jyoti Prakash** — a full-stack developer in Bhubaneswar,
Odisha, working in the MERN stack. The site is a working portfolio for hiring
managers and clients: the projects he actually built, the stack he is strong in and
where he is still learning, and one clear way to reach him. Three doors — see the
work, hire me, get in touch — rather than one funnel. There is no essays section and
no film section; the profile's cinema and community life stay off the site.
Contact: omjyotiprakash4@gmail.com.

## The page

- **/ — the work.** Hero: **QuickNote shown as software** — a browser bar, profile
  row, three notes and a deploy log built from the ui primitives, with a rotated
  caption overlapping its bottom-left edge. Then a **dark band** holding the claim,
  the one action and the three doors that follow from it. Then **Selected work**:
  a running
  index where each project opens its case-study page — question, context, what it
  is, how it is built, what is next — and the MERN apps carry a drawn request path.
  Then **What I am learning**, the photograph left and three honours trackers right.
  Then **contact and the FAQ** on the accent ground: the form beside five questions
  in an accordion.
- **/work/:slug** — one route per project (quicknote, cinequirk, food-delivery,
  eduquirk, smartpark), an editorial column with a data card, the build list, the
  request path where one applies, a pull quote and the next/previous project.
- **/studio** — the hiring letterhead: a letter on the left, a card of facts on the
  right, two columns of what a build includes and what he will not do, the FAQ in
  the Studio's own words, and the brief form.
- **\*** — a 404 that is part of the site: an index card listing what does exist.

Section shapes deliberately differ one after another: split hero → dark band of
cells → running index → picture/text → accent form. The ground alternates
background → ink → background → secondary → accent.

## Palette and type

Everything lives in `src/theme.css`. Warm paper (`oklch` L 0.975) and a near-black
ink L 0.225, one blue primary at L 0.44 (a link and action colour, 7:1 on paper),
and the same blue lifted to L 0.795 as `--ink-primary` for the dark band. The dark band (`--ink`) exists for the one section that changes key.

**A visitor may switch the site to dark.** `:root.dark` in `theme.css` is a second
walk of the same roles — warm charcoal paper L 0.205, a dimmer blue at L 0.79
(dark ink on it), hairline borders, shadows that barely register. In dark `--ink`
becomes the *raised* light surface, so the stack band turns from the darkest
ground on the page to the lightest, and its labels use the darker `--ink-primary`
and `--ink-muted` for contrast there. Nothing reads the OS setting: the toggle in
the header (and in the mobile sheet) writes `dark` on `<html>` and stores the
choice, so the first paint is always the scheme the visitor last picked.

- Display: **Fraunces** (optical sizing, 500) — a serif that carries an essayist's
  voice, and reads as a person rather than a product.
- Body and label: **Inter**, 400/500/600.
- Two faces loaded together in `src/fonts.css` with `display=swap`. A third would
  be a render-blocking request nobody asked for.
- Display sizes are fluid: `--hero-size` for h1, a 1.4 ratio for h2 (3xl → 2.75rem).
- `--section-space` is one clamp used by every section.

## Shell

A slim top bar: monogram + name left, Home and Studio right, and the one real
action ("Get in touch") at its end, with the theme toggle just before the menu
button. At 360 the links collapse to one 44px menu
button opening a right-hand sheet with a visible 44px close, the same links, the
email address and the theme toggle. The footer carries the name, three in-page jumps, the email,
the studio link and the photograph credit.

## Brand mark

`src/components/Brand.tsx` draws the **O and J** as two strokes in one blue — a
circle (for Om) crossed by a descender (for Jyoti) — with no container, so it
reads at 16px and at header height. `public/favicon.svg` is the same glyph in
solid blue on its own. One icon weight throughout: **lucide at 2px stroke**
(the default), never mixed, always imported by name.

 ## Imagery

One photograph (**journal and pen on a wooden desk**, Eva Bronzini / Pexels) for
the section on what he is learning; everything else is drawn in code — the
QuickNote screen in the hero, the numbered request path in the dark band. No
generated images, no clip art, no grey boxes. Anything that is software is shown
as software. QuickNote's sample notes and figures are an illustration; nothing
outside a mockup states a number that was not given.

 ## Voice

 First person, plain, and honest about limits: there is no server yet, so the
 form says it hands the message to the visitor's own mail app. Skills are ranked
 by the profile's own account — React and Node first, Java, Python and SQL from
 coursework — rather than flattened into one list. Internships are described as
 under three months. No invented testimonials, prices, awards, dates or figures,
 and no claim of expertise the profile did not state.
