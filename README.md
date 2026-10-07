# Mantara Villas · Tapx

A responsive, static villa guest page in Tapx red `#f32230`, navy `#061e3f`, and white.

## Customize

Edit `dist/config.js` with the real Wi-Fi credentials, contact number, Google review URL, villa WhatsApp number and Tapx WhatsApp number. WhatsApp numbers need the international country code. Set `villaLogo` and `tapxLogo` to your official image paths and place the images in `dist/assets/`.

Replace `dist/assets/villa.jpg` with your villa photograph. The current stock image is by [Vero Benedini on Pexels](https://www.pexels.com/photo/luxury-villa-with-pool-in-tropical-setting-28915352/).

Missing contact details produce a helpful message rather than sending guests to a made-up number or business. Wi-Fi opens a details dialog with password copying once configured; browsers cannot automatically join Wi-Fi. Saving a contact downloads a `.vcf` file for the guest to import. Review and WhatsApp links open in a new tab once configured.

## Preview

Serve `dist` using any static HTTP server. No build or dependencies are required.

## GitHub Pages

The deployment workflow publishes `dist` on every push to `main`. In the repository's **Settings → Pages**, set the source to **GitHub Actions**.
