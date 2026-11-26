/* =====================================================================
   SITE SETTINGS — contact details, profile links and photo gallery.
   Leave a link as "" to hide its button.
   ===================================================================== */

window.SITE = {
  name: "Jayantha Obeysekera",
  nickname: "Obey",
  email: "jobeysek@fiu.edu",
  officePhone: "(305) 919-4119",
  cv: "files/CV_Obeysekera_2026.pdf",

  profiles: [
    { label: "FIU Profile",     url: "https://case.fiu.edu/about/directory/profiles/obeysekera-jayantha.html" },
    { label: "FIU Discovery",   url: "https://discovery.fiu.edu/display/person-obeysekera-jayantha" },
    { label: "Google Scholar",  url: "" },   // paste your Google Scholar profile link here
    { label: "ORCID",           url: "https://orcid.org/0000-0002-7038-1668" },
    { label: "ResearchGate",    url: "" },
    { label: "LinkedIn",        url: "" }
  ]
};

/* Photo gallery: put the image files in images/gallery/ and list them here.
   "old" is the photo's address on the previous website, used only as a
   fallback until the file is saved into images/gallery/. */
window.GALLERY = [
  { src: "images/gallery/cottage-sri-lanka.jpg", caption: "Cottage in Sri Lanka (under construction)",
    old: "https://obeysekera.net/uploads/3/4/9/5/34952646/3351104_orig.jpg" },
  { src: "images/gallery/peradeniya-1.png", caption: "University of Peradeniya",
    old: "https://obeysekera.net/uploads/3/4/9/5/34952646/9041725.png" },
  { src: "images/gallery/peradeniya-2.png", caption: "University of Peradeniya",
    old: "https://obeysekera.net/uploads/3/4/9/5/34952646/8982485.png" },
  { src: "images/gallery/upcountry-sri-lanka.jpg", caption: "Upcountry, Sri Lanka",
    old: "https://obeysekera.net/uploads/3/4/9/5/34952646/4493652.jpg" },
  { src: "images/gallery/field-visit.jpg", caption: "After a field visit",
    old: "https://obeysekera.net/uploads/3/4/9/5/34952646/4417455.jpg" },
  { src: "images/gallery/lima-short-course.jpg", caption: "Short course in Lima, Peru",
    old: "https://obeysekera.net/uploads/3/4/9/5/34952646/5805875.jpg" }
];

window.HEADSHOT_OLD = "https://obeysekera.net/uploads/3/4/9/5/34952646/941551_orig.jpg";
