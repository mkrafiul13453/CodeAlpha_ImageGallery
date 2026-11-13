"use strict";

const images = [
  { src: "public/Animals 1.avif", category: "Animals" },
  { src: "public/Animals 2.avif", category: "Animals" },
  { src: "public/Animals 3.avif", category: "Animals" },
  { src: "public/Animals 3.jfif", category: "Animals" },
  { src: "public/Animals 5.jfif", category: "Animals" },
  { src: "public/Animals 6.avif", category: "Animals" },
  { src: "public/Animals 7.jfif", category: "Animals" },
  { src: "public/Architecture 1.avif", category: "Architecture" },
  { src: "public/Architecture 2.avif", category: "Architecture" },
  { src: "public/Architecture 3.avif", category: "Architecture" },
  { src: "public/Architecture 4.avif", category: "Architecture" },
  { src: "public/Architecture 5.avif", category: "Architecture" },
  { src: "public/Architecture 6.jfif", category: "Architecture" },
  { src: "public/Architecture 7.avif", category: "Architecture" },
  { src: "public/Architecture 8.jpg", category: "Architecture" },
  { src: "public/Food 1.avif", category: "Food" },
  { src: "public/Food 2.avif", category: "Food" },
  { src: "public/Food 3.avif", category: "Food" },
  { src: "public/Food 4.avif", category: "Food" },
  { src: "public/Food 5.avif", category: "Food" },
  { src: "public/Food 6.jfif", category: "Food" },
  { src: "public/Food 7.avif", category: "Food" },
  { src: "public/Nature 1.avif", category: "Nature" },
  { src: "public/nature 10.avif", category: "Nature" },
  { src: "public/nature 2.avif", category: "Nature" },
  { src: "public/nature 3.avif", category: "Nature" },
  { src: "public/nature 4.avif", category: "Nature" },
  { src: "public/nature 5.avif", category: "Nature" },
  { src: "public/nature 6.avif", category: "Nature" },
  { src: "public/nature 7.avif", category: "Nature" },
  { src: "public/nature 8.avif", category: "Nature" },
  { src: "public/nature 9.avif", category: "Nature" },
  { src: "public/Travel 1.jfif", category: "Travel" },
  { src: "public/Travel 2.avif", category: "Travel" },
  { src: "public/Travel 3.avif", category: "Travel" },
  { src: "public/Travel 4.jfif", category: "Travel" },
  { src: "public/Travel 5.jfif", category: "Travel" },
  { src: "public/Travel 6.jfif", category: "Travel" },
  { src: "public/Travel 8.jfif", category: "Travel" },
];

const gallery = document.querySelector("#gallery-grid");
const visibleCount = document.querySelector("#visible-count");
const emptyMessage = document.querySelector("#gallery-empty");
const filterButtons = [...document.querySelectorAll(".filter-button")];
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxTitle = document.querySelector(".lightbox-title");
const lightboxCounter = document.querySelector(".lightbox-counter");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

let activeImages = images;
let currentImageIndex = 0;
let lastFocusedElement = null;

function imageTitle(image) {
  const fileName = image.src.split("/").pop();
  return fileName.replace(/\.[^.]+$/, "");
}

function renderGallery(category = "All") {
  activeImages =
    category === "All"
      ? images
      : images.filter((image) => image.category === category);

  gallery.replaceChildren();
  const cards = activeImages.map((image, index) => {
    const card = document.createElement("button");
    card.className = "gallery-card";
    card.type = "button";
    card.setAttribute("aria-label", `View ${image.category}: ${imageTitle(image)}`);
    card.style.animationDelay = `${Math.min(index % 12, 8) * 35}ms`;

    const img = document.createElement("img");
    img.src = encodeURI(image.src);
    img.alt = `${image.category} photograph ${imageTitle(image)}`;
    img.loading = "lazy";
    img.decoding = "async";

    const info = document.createElement("span");
    info.className = "gallery-card-info";
    const text = document.createElement("span");
    const title = document.createElement("span");
    title.className = "gallery-card-title";
    title.textContent = imageTitle(image);
    const categoryLabel = document.createElement("span");
    categoryLabel.className = "gallery-card-category";
    categoryLabel.textContent = image.category;
    text.append(title, categoryLabel);
    const openIcon = document.createElement("span");
    openIcon.className = "gallery-card-open";
    openIcon.setAttribute("aria-hidden", "true");
    openIcon.textContent = "↗";
    info.append(text, openIcon);
    card.append(img, info);
    card.addEventListener("click", () => openLightbox(index));
    return card;
  });

  gallery.append(...cards);
  visibleCount.textContent = String(activeImages.length);
  emptyMessage.hidden = activeImages.length !== 0;
}

function setFilter(category) {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === category;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  renderGallery(category);
}

function updateLightbox() {
  const image = activeImages[currentImageIndex];
  if (!image) return;

  lightboxImage.src = encodeURI(image.src);
  lightboxImage.alt = `${image.category} photograph ${imageTitle(image)}`;
  lightboxTitle.textContent = `${imageTitle(image)} · ${image.category}`;
  lightboxCounter.textContent = `${currentImageIndex + 1} / ${activeImages.length}`;
}

function openLightbox(index) {
  currentImageIndex = index;
  lastFocusedElement = document.activeElement;
  updateLightbox();
  lightbox.inert = false;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
  lightbox.querySelector(".lightbox-close").focus();
}

function closeLightbox() {
  if (!lightbox.classList.contains("is-open")) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightbox.inert = true;
  document.body.classList.remove("lightbox-open");
  if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
}

function moveLightbox(direction) {
  if (activeImages.length < 2) return;
  currentImageIndex =
    (currentImageIndex + direction + activeImages.length) % activeImages.length;
  updateLightbox();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
});

document.querySelectorAll("[data-count]").forEach((count) => {
  const category = count.dataset.count;
  count.textContent =
    category === "All"
      ? images.length
      : images.filter((image) => image.category === category).length;
});

lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.querySelector(".lightbox-previous").addEventListener("click", () => moveLightbox(-1));
lightbox.querySelector(".lightbox-next").addEventListener("click", () => moveLightbox(1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (lightbox.classList.contains("is-open")) {
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") moveLightbox(1);
    if (event.key === "ArrowLeft") moveLightbox(-1);
    if (event.key === "Tab") {
      const controls = [...lightbox.querySelectorAll("button")];
      const firstControl = controls[0];
      const lastControl = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === firstControl) {
        event.preventDefault();
        lastControl.focus();
      } else if (!event.shiftKey && document.activeElement === lastControl) {
        event.preventDefault();
        firstControl.focus();
      }
    }
  }
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
  }
});

function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  navigation.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.querySelector("#current-year").textContent = String(new Date().getFullYear());
renderGallery();
