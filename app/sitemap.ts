import type { MetadataRoute } from "next";

const staticRoutes = ["", "/about", "/services", "/works", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const base = new URL(siteUrl);

  return staticRoutes.map((route) => ({
    url: new URL(route, base).toString(),
    lastModified: new Date(),
    changeFrequency: route === "/works" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/works" ? 0.9 : 0.7,
  }));
}
