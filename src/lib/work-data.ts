import { unstable_cache } from "next/cache";
import { Types } from "mongoose";

import { connectToDatabase } from "@/src/lib/mongodb";
import { Work } from "@/src/models/work";

export type PublicWork = {
  id: string;
  title: string;
  description: string;
  type: "image" | "video";
  url: string;
  thumbnailUrl?: string;
  order: number;
  createdAt: string;
};

const readPublishedWorks = unstable_cache(
  async (): Promise<PublicWork[]> => {
    await connectToDatabase();
    const results = await Work.find({ published: true })
      .sort({ order: 1, createdAt: -1 })
      .select("title description type url thumbnailUrl order createdAt")
      .lean();

    return results.map((work) => ({
      id: String(work._id),
      title: work.title,
      description: work.description,
      type: work.type,
      url: work.url,
      thumbnailUrl: work.thumbnailUrl,
      order: work.order,
      createdAt: work.createdAt.toISOString(),
    }));
  },
  ["published-works"],
  { revalidate: 3600, tags: ["works"] },
);

export function getPublishedWorks() {
  return readPublishedWorks();
}

export async function getAdminWorks() {
  await connectToDatabase();
  const results = await Work.find().sort({ order: 1, createdAt: -1 }).lean();

  return results.map((work) => ({
    id: String(work._id),
    title: work.title,
    description: work.description,
    type: work.type,
    url: work.url,
    thumbnailUrl: work.thumbnailUrl,
    order: work.order,
    published: work.published,
    createdAt: work.createdAt.toISOString(),
  }));
}

export async function getAdminWork(id: string) {
  if (!Types.ObjectId.isValid(id)) return null;
  await connectToDatabase();
  const work = await Work.findById(id).lean();
  if (!work) return null;

  return {
    id: String(work._id),
    title: work.title,
    description: work.description,
    type: work.type,
    url: work.url,
    publicId: work.publicId,
    thumbnailUrl: work.thumbnailUrl,
    order: work.order,
    published: work.published,
  };
}
