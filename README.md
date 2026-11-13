# FRAME — Image Gallery

A responsive photography portfolio built with HTML, CSS, and vanilla JavaScript. FRAME presents a curated collection of images with category filters, a keyboard-accessible lightbox, and layouts designed for desktop, tablet, and mobile.

## Features

- Dark editorial design with orange accents and responsive navigation
- Image collection filtered by Nature, Architecture, Travel, Animals, and Food
- Lightbox with previous/next controls, image counter, and keyboard support
- Lazy-loaded gallery images
- Mobile navigation menu and reduced-motion support
- No frameworks, build step, or package installation required

## Project structure

```text
CodeAlpha_ImageGallery/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
└── public/
    └── ... 39 existing image files
```

The supplied images are stored directly in `public/` rather than in category subfolders. The gallery uses an explicit image data array in `js/script.js`; it does not scan local folders automatically.

## Run locally

### VS Code Live Server

1. Open the project folder in Visual Studio Code.
2. Install the **Live Server** extension if it is not already installed.
3. Open `index.html`, then select **Go Live** in the status bar (or right-click the file and select **Open with Live Server**).
4. The gallery opens in your browser and refreshes when files are saved.

### Python HTTP server

If Python is installed, open a terminal in the project folder and run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to Vercel

Import the project into Vercel with the repository root as the **Root Directory**.
The included `vercel.json` configures this as a plain static site and publishes
the project root, where `index.html`, `css/`, `js/`, and `public/` are located.
After pushing changes, trigger a new deployment in Vercel.

## Images and categories

The current collection contains 39 images:

| Category | Images |
| --- | ---: |
| Nature | 10 |
| Architecture | 8 |
| Travel | 7 |
| Animals | 7 |
| Food | 7 |

To add an image:

1. Place the image in `public/`.
2. Add an entry to the `images` array in `js/script.js`, using its exact filename and one of the existing category names:

   ```js
   { src: "public/My image.jpg", category: "Nature" }
   ```

3. Save the file and reload the page.

The existing collection includes AVIF, JFIF, and JPG files. The gallery uses standard browser image elements, so you can also reference other formats supported by the browser, such as JPEG, PNG, and WebP.

## Lightbox controls

- Click a gallery image to open it.
- Use the **Previous** and **Next** buttons or the left and right arrow keys to browse.
- Press **Escape** or select **Close** to exit.
- Click the dark backdrop outside the image to close it.
