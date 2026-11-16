## Hi there 👋

# Shanae Revell's Portfolio

Personal portfolio website for showcasing my cloud and systems administration journey, technical projects, resume, GitHub, and contact information.

## Live Site:

[View Portfolio](https://shanaerevell.github.io/ShanaeRevell/?ref=github)

## Purpose:

This portfolio serves as a central hub for my professional background, technical projects, and ongoing learning in cloud infrastructure, systems administration, Linux, Azure, and enterprise IT support.

## Built With:

- HTML
- CSS
- JavaScript
- GitHub Pages

## Featured Projects:

- Networking Home Lab (Proxmox VE, VLANs, pfSense, Active Directory)
- Project Autumn
- The Pulse

## How the Site Is Organized:

| File | What it does |
| --- | --- |
| `index.html` | The page content: navigation, about section, project cards, Meet the Staff, pop-ups |
| `style.css` | How everything looks. Colors are set once at the top as variables (`--orange`, `--bg`, ...) |
| `script.js` | Interactions: contact pop-up, screenshot pop-up, Esc to close, and the moonwalker timeline |
| `images/` | Screenshots, avatar, pet photos, icons and the link-preview card |
| `Documents/` | Resume PDF |

Each file is split into labeled sections (for example `PROJECTS SECTION`, `CONTACT POP-UP`, `MOONWALKER`) so the matching HTML, CSS and JavaScript are easy to find.

## Updating the Site:

- **Add a screenshot:** put the image in `images/`, then in `index.html` replace a `placeholder-box` with a `screenshot-button` (copy one from another project card). Remove location data from personal photos first.
- **After editing `style.css` or `script.js`:** bump the `?v=` number where `index.html` links to that file, so browsers load the new version instead of an old saved copy.
- **Publish:** commit and push to `main`. GitHub Pages updates the live site in about a minute.

## Visitor Stats:

The site uses [GoatCounter](https://www.goatcounter.com/) for private, cookie-free visitor stats (no personal data, no cookie banner needed). The dashboard is at `shanaerevell.goatcounter.com`.

- **Page views** are counted by the script at the bottom of `index.html`.
- **Link clicks** are counted for any link with a `data-goatcounter-click="name"` attribute: both Resume buttons, GitHub, the project links, Email Me and LinkedIn. To track a new link, add the same attribute with a new name.
- **Where visitors came from:** add `?ref=` to the link you share. It shows up under Campaigns in the dashboard. For example:
  - Resume: `https://shanaerevell.github.io/ShanaeRevell/?ref=resume`
  - LinkedIn: `https://shanaerevell.github.io/ShanaeRevell/?ref=linkedin`
  - GitHub profile: `https://shanaerevell.github.io/ShanaeRevell/?ref=github` (the link at the top of this README)
  - A job application: `https://shanaerevell.github.io/ShanaeRevell/?ref=company-name`
- To stop counting your own visits, open `shanaerevell.goatcounter.com/ignore` once in each browser you use.

## Status:

🟢 Active Development
