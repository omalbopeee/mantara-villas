# Mantara Villas · Tapx

A responsive, static villa guest page in Tapx red `#f32230`, navy `#061e3f`, and white.

## Customize

Edit `dist/config.js` with the real Wi-Fi credentials, contact number, Google review URL, villa WhatsApp number and Tapx WhatsApp number. WhatsApp numbers need the international country code. Set `villaLogo` and `tapxLogo` to your official image paths and place the images in `dist/assets/`.

The current M monogram and Tapx wordmark are temporary typeset marks. The photograph is illustrative, not a photograph of Mantara Villas. Replace `dist/assets/villa.jpg` with the actual villa image and update its alt text and remove the illustrative photograph caption in `dist/index.html`.

Missing contact details produce a helpful message rather than sending guests to a made-up number or business. Wi-Fi opens a details dialog with password copying once configured; browsers cannot automatically join Wi-Fi. Saving a contact downloads a `.vcf` file for the guest to import. Review and WhatsApp links open in a new tab once configured.

## Preview

Serve `dist` using any static HTTP server. No build or dependencies are required.
