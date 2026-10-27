/* Project detail page: maps each selected card to its artwork gallery. */
const projectCatalog = {
  seven: {
    title: "Seven",
    category: "GRAPHIC DESIGN / VISUAL PROJECT",
    description: "A visual project from the selected-work archive. Browse the artwork below or download the source package.",
    preview: "SEVEN",
    cover: "assets/Seven%20(1)/6.jpg",
    archive: "assets/Seven%20(1).zip",
    filename: "Seven (1).zip",
    theme: "seven",
    images: ["6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg"].map(file => "assets/Seven%20(1)/" + file)
  },
  tea: {
    title: "Tea vs Herbal Infusion",
    category: "GRAPHIC DESIGN / INFORMATION DESIGN",
    description: "A graphic project about tea versus herbal infusion. Browse the artwork below or download the source package.",
    preview: "TEA VS\nHERBAL INFUSION",
    cover: "assets/Tea%20vs%20Herbal%20Infusion/2.png",
    archive: "assets/Tea%20vs%20Herbal%20Infusion.zip",
    filename: "Tea vs Herbal Infusion.zip",
    theme: "tea",
    images: Array.from({ length: 19 }, (_, index) => "assets/Tea%20vs%20Herbal%20Infusion/" + (index + 1) + ".png")
  },
  nectar: {
    title: "Nectar PDP",
    category: "UI DESIGN / PRODUCT DETAIL PAGE",
    description: "A product-detail-page design exploration for Nectar. Browse the uploaded screens and visual assets below.",
    preview: "NECTAR\nPDP",
    cover: "assets/nectar%20pdp/1.jpg",
    theme: "nectar",
    images: [1,5,6,7,8,9,10,11,12,13,14,15,16,17,19,20,21,23,24,25,26,28].map(file => "assets/nectar%20pdp/" + file + ".jpg")
  },
  branddeck: {
    title: "Brand Deck",
    category: "BRAND DESIGN / PRESENTATION",
    description: "A visual brand deck presented page by page. Explore the full set of uploaded presentation pages below.",
    preview: "BRAND\nDECK",
    theme: "branddeck",
    images: Array.from({ length: 18 }, (_, index) => "assets/brand%20deck/Retail%20Expansion%20Portfolio_page-" + String(index + 1).padStart(4, "0") + ".jpg")
  },
  cult: {
    title: "CULT",
    category: "WEB DESIGN / DIGITAL PRODUCT EXPERIENCE",
    description: "A dark, immersive website concept for CULT, a digital-wellness wearable brand. Explore the visual direction and project imagery below.",
    preview: "CULT",
    cover: "assets/cult/1.jpg",
    archive: "assets/cult.zip",
    filename: "cult.zip",
    liveUrl: "https://nimble-lebkuchen-9245b7.netlify.app",
    theme: "cult",
    images: ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg","5.png","6.png","7.png","8.png","9.png","10.png","11.png","12.png","13.png","Your%20paragraph%20text.png"].map(file => "assets/cult/" + file)
  },
  jewellery: {
    title: "Jewellery Poster",
    category: "GRAPHIC DESIGN / POSTER",
    description: "A jewellery poster design from the selected-work archive.",
    preview: "JEWELLERY\nPOSTER",
    cover: "assets/jewellery%20poster.jpg",
    theme: "jewellery",
    images: ["assets/jewellery%20poster.jpg"]
  },
  sword: {
    title: "Sword",
    category: "VISUAL PROJECT / DESIGN STUDY",
    description: "A visual project from the selected-work archive. Browse the artwork below or download the source package.",
    preview: "SWORD",
    cover: "assets/sword/1.jpg",
    archive: "assets/sword.zip",
    filename: "sword.zip",
    theme: "sword",
    images: Array.from({ length: 9 }, (_, index) => "assets/sword/" + (index + 1) + ".jpg")
  }
};

const params = new URLSearchParams(window.location.search);
const projectKey = params.get("work") || "seven";
const activeProject = projectCatalog[projectKey] || projectCatalog.seven;

document.title = activeProject.title + " | Manpreet";

const title = document.getElementById("project-title");
const category = document.getElementById("project-category");
const description = document.getElementById("project-description");
const previewTitle = document.getElementById("project-preview-title");
const downloadLink = document.getElementById("project-download");
const preview = document.getElementById("project-preview");
const cover = document.getElementById("project-cover");
const liveLink = document.getElementById("project-live-link");

if (title) title.textContent = activeProject.title;
if (category) category.textContent = activeProject.category;
if (description) description.textContent = activeProject.description;
if (previewTitle) {
  previewTitle.textContent = activeProject.preview;
  previewTitle.setAttribute("aria-label", activeProject.preview.replace(/\n/g, " "));
}
if (downloadLink) {
  if (activeProject.archive) {
    downloadLink.href = activeProject.archive;
    downloadLink.setAttribute("download", activeProject.filename);
    downloadLink.setAttribute("aria-label", "Download " + activeProject.filename);
    downloadLink.hidden = false;
  } else {
    downloadLink.hidden = true;
  }
}
if (preview) preview.setAttribute("aria-label", activeProject.title + " project cover");
if (cover) {
  cover.src = activeProject.cover || activeProject.images[0];
  cover.alt = activeProject.title + " project cover page";
}
if (liveLink) {
  if (activeProject.liveUrl) { liveLink.href = activeProject.liveUrl; liveLink.hidden = false; }
  else liveLink.hidden = true;
}
document.body.classList.add("project-theme-" + activeProject.theme);

// Build the gallery from the selected project's own asset list.
const gallery = document.getElementById("project-gallery-grid");
if (gallery) {
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