import { Header } from "@/components/header";
import { GroupsToolbar } from "@/components/groups-toolbar";
import { GroupsContent } from "@/components/groups-content";
import { Pagination } from "@/components/pagination";
import { getChats } from "@/lib/queries";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const { chats, total, totalPages } = await getChats(page);

  return (
    <>
      <Header />
      <GroupsToolbar />
      <GroupsContent chats={chats} />
      <Pagination page={page} totalPages={totalPages} total={total} />
    </>
  );
}
