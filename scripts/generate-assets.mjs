import sharp from "sharp";

const faviconSource = "public/favicon.svg";

const generateFavicons = async () => {
  await sharp(faviconSource)
    .resize(32, 32, { fit: "contain", background: { r: 237, g: 246, b: 255, alpha: 0 } })
    .png()
    .toFile("public/favicon-32x32.png");

  await sharp(faviconSource)
    .resize(192, 192, { fit: "contain", background: { r: 237, g: 246, b: 255, alpha: 0 } })
    .png()
    .toFile("public/icon-192.png");

  await sharp(faviconSource)
    .resize(180, 180, { fit: "contain", background: { r: 237, g: 246, b: 255, alpha: 0 } })
    .png()
    .toFile("public/apple-touch-icon.png");
};

const generateSocialCard = async () => {
  const flamingoMark = await sharp(faviconSource)
    .resize({ width: 330, height: 400, fit: "inside", withoutEnlargement: false })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: "#f1ece6"
    }
  })
    .composite([{ input: flamingoMark, gravity: "center" }])
    .flatten({ background: "#f1ece6" })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile("public/social-card.jpg");
};

await generateFavicons();
await generateSocialCard();
