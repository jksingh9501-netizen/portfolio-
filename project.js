/* Project detail page: maps the selected card to its archive download. */
const projectCatalog = {
  seven: {
    title: "Seven",
    category: "GRAPHIC DESIGN / VISUAL PROJECT",
    description: "A visual project from the selected-work archive. Download the source package to explore the original project files.",
    preview: "SEVEN",
    archive: "assets/Seven%20(1).zip",
    filename: "Seven (1).zip",
    theme: "seven"
  },
  tea: {
    title: "Tea vs Herbal Infusion",
    category: "GRAPHIC DESIGN / INFORMATION DESIGN",
    description: "A graphic project about tea versus herbal infusion. Download the source package to explore the original project files.",
    preview: "TEA VS\nHERBAL INFUSION",
    archive: "assets/Tea%20vs%20Herbal%20Infusion.zip",
    filename: "Tea vs Herbal Infusion.zip",
    theme: "tea"
  },
  sword: {
    title: "Sword",
    category: "VISUAL PROJECT / DESIGN STUDY",
    description: "A visual project from the selected-work archive. Download the source package to explore the original project files.",
    preview: "SWORD",
    archive: "assets/sword.zip",
    filename: "sword.zip",
    theme: "sword"
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
  previewTitle.setAttribute("aria-label", activeProject.preview.replace(/\n/g, " "));
}
if (downloadLink) {
  downloadLink.href = activeProject.archive;
  downloadLink.setAttribute("download", activeProject.filename);
  downloadLink.setAttribute("aria-label", "Download " + activeProject.filename);
}
if (preview) {
  preview.setAttribute("aria-label", activeProject.title + " project title panel");
}
