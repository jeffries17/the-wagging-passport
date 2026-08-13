import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  throw new Error("Set SANITY_WRITE_TOKEN to a project token with write access before running this script.");
}

const client = createClient({
  projectId: "0cacv61u",
  dataset: "production",
  apiVersion: "2026-07-27",
  token,
  useCdn: false,
});
const imagesDir = "/tmp/wagging-images";

const assignments = [
  { docId: "destination-brazil", field: "heroImage", file: "brazil-hero.jpg" },
  { docId: "destination-france", field: "heroImage", file: "france-hero.jpg" },
  { docId: "destination-georgia", field: "heroImage", file: "georgia-hero.jpg" },
  { docId: "destination-japan", field: "heroImage", file: "japan-hero.jpg" },
  { docId: "post-flying-with-your-dog", field: "coverImage", file: "post-flying.jpg" },
  { docId: "post-pet-friendly-hotels", field: "coverImage", file: "post-pet-friendly-hotels.jpg" },
  { docId: "post-is-my-hotel-really-pet-friendly", field: "coverImage", file: "post-hotel-really-pet-friendly.jpg" },
  { docId: "post-airbnb-vs-booking", field: "coverImage", file: "post-airbnb-vs-booking.jpg" },
  { docId: "post-first-impressions-rio", field: "coverImage", file: "post-rio.jpg" },
  { docId: "gear-carrier", field: "image", file: "gear-carrier.jpg" },
  { docId: "gear-collapsible-bowl", field: "image", file: "gear-water-bowl.jpg" },
  { docId: "gear-health-certificate-folder", field: "image", file: "gear-document-folder.jpg" },
  { docId: "gear-gps-tracker", field: "image", file: "gear-gps-tracker.jpg" },
  { docId: "author-caitlin", field: "petImage", file: "author-tishka.jpg" },
];

async function main() {
  const uploadedByFile = new Map();

  for (const { docId, field, file } of assignments) {
    let asset = uploadedByFile.get(file);
    if (!asset) {
      const buffer = await readFile(path.join(imagesDir, file));
      asset = await client.assets.upload("image", buffer, { filename: file });
      uploadedByFile.set(file, asset);
      console.log(`Uploaded: ${file} -> ${asset._id}`);
    }

    await client
      .patch(docId)
      .set({ [field]: { _type: "image", asset: { _type: "reference", _ref: asset._id } } })
      .commit();
    console.log(`Patched: ${docId}.${field}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
