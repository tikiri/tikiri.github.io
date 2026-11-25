# obeysekera.net — How to edit and publish

This site is plain HTML, CSS and JavaScript. No special software or build step is needed. You can open any page on your computer by double-clicking it.

## Where things live

| To change… | Edit this file |
|---|---|
| Publications (add a new paper) | `data/publications.js`. Copy an entry, paste it at the top, change the text |
| Books | bottom of `data/publications.js` |
| Old reports & presentations | `data/reports.js` |
| Email, CV file, profile links (Google Scholar, ORCID, LinkedIn…) | `data/site-config.js` |
| Photo gallery | put photos in `images/gallery/`, list them in `data/site-config.js` |
| Menu items | the `NAV` list at the top of `assets/js/site.js` |
| Bio and home page text | `index.html` |
| Experience, Research, Teaching, Service, Contact | the matching `.html` file |
| Colours and fonts | top of `assets/css/style.css` |
| CV download | replace `files/CV_Obeysekera_2026.pdf` (keep the same name, or update `cv:` in `data/site-config.js`) |

The home page's publication count and "Recent publications" update by themselves from `data/publications.js`.

## Adding a paper (example)

```js
  { y: 2027, a: "A. Author, J. Obeysekera",
    t: "Title of the paper",
    v: "Journal Name, 12(3), 45–67", doi: "10.xxxx/xxxxx", tags: ["sealevel"] },
```

Keep the commas and quotation marks. Topic tags: `sealevel`, `extremes`, `climate`, `everglades`, `ml`, `groundwater`, `stochastic`, `srilanka`.

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

## Publishing on GitHub Pages (free)

1. Create a free account at github.com, then a new **public** repository named `obeysekera-site`.
2. On the repository page choose **Add file → Upload files**, drag in *everything inside* this folder (including the `CNAME` file), and click **Commit changes**.
3. Go to **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and click **Save**. In a minute the site is live at `https://<your-username>.github.io/obeysekera-site/`.
4. **Point your domain.** Wherever obeysekera.net is registered, set these DNS records:
   - `A` records for `@`: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - `CNAME` record for `www`: `<your-username>.github.io`
   - Keep any `tsunami` record pointing to wherever the Tsunami site is hosted.
5. Back in **Settings → Pages**, enter `obeysekera.net` as the custom domain and tick **Enforce HTTPS** once it's offered.

**Later edits:** open the file on github.com, click the pencil icon, make the change and click **Commit changes**. The site updates within a minute or two.

## Moving to Microsoft later

Microsoft 365 Business itself doesn't host public websites. Microsoft's option is **Azure Static Web Apps**, whose Free plan includes a custom domain and HTTPS. It deploys straight from the same GitHub repository. In the Azure portal, create a Static Web App, choose GitHub as the source, pick this repository, and set the app location to `/` with no build. Then move the domain's DNS records to the address Azure gives you. The included `staticwebapp.config.json` already handles the old-page redirect and the 404 page.

## Old addresses keep working

`publications.html` and `photo-gallery.html` keep their old names. `education--experience.html` forwards visitors to `experience.html`.
