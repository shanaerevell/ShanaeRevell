## Hi there 👋

# Shanae Revell's Portfolio

Personal portfolio website for showcasing my cloud and systems administration journey, technical projects, resume, GitHub, and contact information.

## Live Site:

[View Portfolio](https://shanaerevell.github.io/ShanaeRevell/)

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

## Status:

🟢 Active Development
