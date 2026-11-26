# obeysekera.net — How to edit and publish

This site is plain HTML, CSS and JavaScript. No special software or build step is needed. You can open any page on your computer by double-clicking it.

## Where things live

| To change… | Edit this file |
|---|---|
| Publications (all 7 CV sections: journal articles, books, chapters, technical reports, proceedings, abstracts, preprints/other) | `data/publications.js`. Each section is its own list, in the same order and with the same numbering as the CV |
| Email, CV file, profile links (Google Scholar, ORCID, LinkedIn…) | `data/site-config.js` |
| Photo gallery | put photos in `images/gallery/`, list them in `data/site-config.js` |
| Menu items | the `NAV` list at the top of `assets/js/site.js` |
| Bio and home page text | `index.html` |
| Experience, Research, Teaching, Service, Contact | the matching `.html` file |
| Colours and fonts | top of `assets/css/style.css` |
| CV download | replace `files/CV_Obeysekera_2026.pdf` with a PDF of your latest CV (keep the same name, or update `cv:` in `data/site-config.js`) |

The home page's journal-article count and "Recent journal articles" update by themselves from `data/publications.js`. When you update your CV, update `data/publications.js` and the CV PDF together so they match.

## Adding a paper (example)

Paste a new line at the top of the right list (for example `journal: [`). The site numbers the items automatically to match the CV.

```js
    { y: 2027, c: "Author, A., & Obeysekera, J. (2027). Title of the paper. Journal Name, 12(3), 45–67.", doi: "10.xxxx/xxxxx", tags: ["sealevel"] },
```

Keep the commas and quotation marks. Your name is shown in bold automatically. Topic tags: `sealevel`, `extremes`, `climate`, `everglades`, `ml`, `groundwater`, `stochastic`, `srilanka`.

## Photos still to add

Save these from the old site (open each link, right-click → Save Image As) into the folders shown:

| Save as | From |
|---|---|
| `images/headshot.jpg` | https://obeysekera.net/uploads/3/4/9/5/34952646/941551_orig.jpg |
| `images/gallery/cottage-sri-lanka.jpg` | https://obeysekera.net/uploads/3/4/9/5/34952646/3351104_orig.jpg |
| `images/gallery/peradeniya-1.png` | https://obeysekera.net/uploads/3/4/9/5/34952646/9041725.png |
| `images/gallery/peradeniya-2.png` | https://obeysekera.net/uploads/3/4/9/5/34952646/8982485.png |
| `images/gallery/upcountry-sri-lanka.jpg` | https://obeysekera.net/uploads/3/4/9/5/34952646/4493652.jpg |
| `images/gallery/field-visit.jpg` | https://obeysekera.net/uploads/3/4/9/5/34952646/4417455.jpg |
| `images/gallery/lima-short-course.jpg` | https://obeysekera.net/uploads/3/4/9/5/34952646/5805875.jpg |

Until they are saved, the pages show the copies on the old site, which will disappear when that site goes offline.

## Publishing (GitHub Pages)

The site is live at **https://tikiri.github.io** from the repository `tikiri/tikiri.github.io`.

- **Small edits:** open the file on github.com, click the pencil icon, make the change, and click **Commit changes**. The site updates within a minute or two.
- **Many files:** on the repository page choose **Add file → Upload files**, drag the changed files or folders in, and click **Commit changes**. Files with the same name are replaced.

**Connecting obeysekera.net later:** wherever the domain is registered, set these DNS records:
- `A` records for `@`: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
- `CNAME` record for `www`: `tikiri.github.io`
- Keep any `tsunami` record pointing to wherever the Tsunami site is hosted.

Then in the repository's **Settings → Pages**, enter `obeysekera.net` as the custom domain and tick **Enforce HTTPS** once it's offered.

## Moving to Microsoft later

Microsoft 365 Business itself doesn't host public websites. Microsoft's option is **Azure Static Web Apps**, whose Free plan includes a custom domain and HTTPS. It deploys straight from the same GitHub repository. In the Azure portal, create a Static Web App, choose GitHub as the source, pick this repository, and set the app location to `/` with no build. Then move the domain's DNS records to the address Azure gives you. The included `staticwebapp.config.json` already handles the old-page redirect and the 404 page.

## Old addresses keep working

`publications.html` and `photo-gallery.html` keep their old names. `education--experience.html` forwards visitors to `experience.html`.
