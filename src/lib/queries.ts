import { createClient } from "@/lib/supabase/server";
import type { ChatWithRelations } from "@/lib/types";

const PAGE_SIZE = 30;

export async function getChats(page: number = 1) {
  const supabase = await createClient();
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data: chats, count, error } = await supabase
    .from("chats")
    .select(
      `
      *,
      project:projects(*),
      labels:chat_labels(label:labels(*))
    `,
      { count: "exact" }
    )
    .order("last_active", { ascending: false })
    .range(from, to);

  if (error) {
    throw error;
  }

  const formatted: ChatWithRelations[] = (chats ?? []).map((chat) => ({
    ...chat,
    project: chat.project ?? null,
    labels: (chat.labels ?? []).map(
      (cl: { label: ChatWithRelations["labels"][number] }) => cl.label
    ),
  }));

  return {
    chats: formatted,
    total: count ?? 0,
    page,
    pageSize: PAGE_SIZE,
    totalPages: Math.ceil((count ?? 0) / PAGE_SIZE),
  };
}
