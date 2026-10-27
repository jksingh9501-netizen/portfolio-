/* Project detail page: maps the selected card to its archive download. */
const projectCatalog = {
  seven: {
    title: "Seven",
    category: "GRAPHIC DESIGN / VISUAL PROJECT",
    description: "A visual project from the selected-work archive. Download the source package to explore the original project files.",
    preview: "SEVEN",
    archive: "assets/Seven%20(1).zip",
    filename: "Seven (1).zip",
    theme: "seven",
    images: ["6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg"].map(file => "assets/Seven%20(1)/" + file)
  },
  tea: {
    title: "Tea vs Herbal Infusion",
    category: "GRAPHIC DESIGN / INFORMATION DESIGN",
    description: "A graphic project about tea versus herbal infusion. Download the source package to explore the original project files.",
    preview: "TEA VS
HERBAL INFUSION",
    archive: "assets/Tea%20vs%20Herbal%20Infusion.zip",
    filename: "Tea vs Herbal Infusion.zip",
    theme: "tea",
    images: Array.from({ length: 19 }, (_, index) => "assets/Tea%20vs%20Herbal%20Infusion/" + (index + 1) + ".png")
  },
  nectar: {
    title: "Nectar PDP",
    category: "UI DESIGN / PRODUCT DETAIL PAGE",
    description: "A product-detail-page design exploration for Nectar. Browse the uploaded screens and visual assets below.",
    preview: "NECTAR
PDP",
    theme: "nectar",
    images: [1,5,6,7,8,9,10,11,12,13,14,15,16,17,19,20,21,23,24,25,26,28].map(file => "assets/nectar%20pdp/" + file + ".jpg")
  },
  branddeck: {
    title: "Brand Deck",
    category: "BRAND DESIGN / PRESENTATION",
    description: "A visual brand deck presented page by page. Explore the full set of uploaded presentation spreads below.",
    preview: "BRAND
DECK",
    theme: "branddeck",
    images: Array.from({ length: 18 }, (_, index) => "assets/brand%20deck/Retail%20Expansion%20Portfolio_page-" + String(index + 1).padStart(4, "0") + ".jpg")
  },
  jewellery: {
    title: "Jewellery Poster",
    category: "GRAPHIC DESIGN / POSTER",
    description: "A jewellery poster design from the selected-work archive.",
    preview: "JEWELLERY
POSTER",
    theme: "jewellery",
    images: ["assets/jewellery%20poster.jpg"]
  },
  sword: {
    title: "Sword",
    category: "VISUAL PROJECT / DESIGN STUDY",
    description: "A visual project from the selected-work archive. Download the source package to explore the original project files.",
    preview: "SWORD",
    archive: "assets/sword.zip",
    filename: "sword.zip",
    theme: "sword",
    images: Array.from({ length: 9 }, (_, index) => "assets/sword/" + (index + 1) + ".jpg")
  }
};

const projectKey = new URLSearchParams(window.location.search).get("work") || "seven";
const activeProject = projectCatalog[projectKey] || projectCatalog.seven;

document.title = activeProject.title + " | Manpreet";
document.body.classList.add("project-theme-" + activeProject.theme);

const title = document.getElementById("project-title");
const category = document.getElementById("project-category");
const description = document.getElementById("project-description");
const previewTitle = document.getElementById("project-preview-title");
const downloadLink = document.getElementById("project-download");
const preview = document.getElementById("project-preview");

if (title) title.textContent = activeProject.title;
if (category) category.textContent = activeProject.category;
if (description) description.textContent = activeProject.description;
if (previewTitle) {
  previewTitle.textContent = activeProject.preview;
  previewTitle.setAttribute("aria-label", activeProject.preview.replace(/
/g, " "));
}
if (downloadLink && activeProject.archive) {
  downloadLink.href = activeProject.archive;
  downloadLink.setAttribute("download", activeProject.filename);
  downloadLink.setAttribute("aria-label", "Download " + activeProject.filename);
}
if (downloadLink && !activeProject.archive) {
  downloadLink.hidden = true;
}
if (preview) {
  preview.setAttribute("aria-label", activeProject.title + " project title panel");
}


// Show the real exported artwork already stored in the assets folders.
// Each image opens its full-size version when clicked.
const gallery = document.getElementById("project-gallery-grid");
if (gallery && activeProject.images) {
  gallery.replaceChildren();
  activeProject.images.forEach((src, index) => {
    const link = document.createElement("a");
    link.className = "project-gallery-item";
    link.href = src;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.setAttribute("aria-label", "Open " + activeProject.title + " image " + (index + 1) + " full size");

    const image = document.createElement("img");
    image.src = src;
    image.alt = activeProject.title + " artwork, image " + (index + 1);
    image.loading = index < 3 ? "eager" : "lazy";
    image.decoding = "async";
    image.onerror = () => link.remove();

    link.appendChild(image);
    gallery.appendChild(link);
  });
}
