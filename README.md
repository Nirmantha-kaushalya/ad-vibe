# Ad Vibe Studio

A light, editorial portfolio and admin workspace for a graphic-design studio. Public project listings are stored in MongoDB; project media is uploaded directly to Cloudinary.

## Local setup

Requirements: Node.js 20.9 or newer and npm.

```powershell
npm install
Copy-Item .env.example .env.local
```

Fill in `.env.local` before starting the app. Never commit that file.

### MongoDB and admin account

Set `MONGODB_URI` to a MongoDB connection string. Set `ADMIN_USERNAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` to the credentials for the initial admin. Then create the account once:

```powershell
npm run seed:admin
```

The seed script refuses to add a second account or overwrite an existing one. Admin sessions last seven days. `JWT_SECRET` must be a random secret at least 32 bytes long; for example, generate one locally with:

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"
```

### Cloudinary uploads

Set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`. Signed uploads work without presets. To enforce the file-size limits on Cloudinary as well as in the admin interface, create two **signed-upload** presets and put their names in `CLOUDINARY_IMAGE_UPLOAD_PRESET` and `CLOUDINARY_VIDEO_UPLOAD_PRESET`.

The image preset should allow JPG/JPEG, PNG, and WebP with a 10 MB maximum. The video preset should allow MP4, WebM, and MOV with a 200 MB maximum. The upload-signing endpoint restricts formats and the browser checks file sizes. Uploads are stored in the `portfolio-works` folder.

### Password reset email

Configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and `SMTP_FROM` for an SMTP account. Use port `465` for implicit TLS, or a submission port such as `587` for STARTTLS. Set `NEXT_PUBLIC_SITE_URL` to the site origin (for example, `http://localhost:3000` locally and the deployed HTTPS URL in production); reset links are built from this value.

## Run and validate

```powershell
npm run dev
npm run lint
npm run build
npm run start
```

Configure the production environment variables in the hosting provider before deploying. The contact inbox and portfolio require MongoDB; admin media uploads require Cloudinary; password recovery requires SMTP. Update studio copy and social links in `src/content/site.ts`; provide real business contact details before publishing.
