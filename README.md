# ATM Engineering Website Prototype

Client-review prototype for the ATM Engineering website. The site presents a responsive, single-page marine engineering website built with plain HTML, CSS, and JavaScript.

## Included

- Sticky header with section navigation and a mobile-friendly Services dropdown
- Hero section with animated background image
- Services and Products sections with placeholder descriptions
- About section with company statistics
- Contact section with phone, email, and a draft contact form
- Footer with quick links and placeholder social links

## Project Structure

```text
index.html                         Page markup and content
styles.css                         Layout, responsive styles, and animations
script.js                          Footer year and navigation interactions
public/                            Local placeholder images
```

## Run Locally

Because this is a static website, no build step or package installation is required. Open `index.html` directly in a browser, or serve the project directory with any local web server.

For example:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Prototype Notes

This version is intended for visual and content review. Before launch, replace the placeholder logo, Lorem ipsum copy, and stock imagery with approved brand assets and final content. The `Learn More` and social links currently use placeholder `#` URLs, and the contact form still needs a real Formspree form ID or another form-processing service.
