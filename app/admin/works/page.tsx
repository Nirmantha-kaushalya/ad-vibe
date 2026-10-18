import { WorkManager } from "@/src/components/admin/work-manager";
import { getAdminWorks } from "@/src/lib/work-data";

export const dynamic = "force-dynamic";

export default async function AdminWorksPage({ searchParams }: { searchParams: Promise<{ created?: string; updated?: string }> }) {
  const params = await searchParams;
  const works = await getAdminWorks();
  const initialStatus = params.created
    ? "Project added to your portfolio."
    : params.updated
      ? "Project updated."
      : "";
  return <WorkManager initialWorks={works} initialStatus={initialStatus} />;
}
