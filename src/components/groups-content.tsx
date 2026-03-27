"use client";

import { useState } from "react";
import type { ChatWithRelations } from "@/lib/types";
import { GroupsTable } from "@/components/groups-table";
import { GroupDetailSidebar } from "@/components/group-detail-sidebar";

export function GroupsContent({ chats }: { chats: ChatWithRelations[] }) {
  const [selectedChat, setSelectedChat] = useState<ChatWithRelations | null>(
    null
  );

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-1 overflow-auto">
        <GroupsTable
          chats={chats}
          selectedChatId={selectedChat?.id ?? null}
          onSelectChat={(chat) =>
            setSelectedChat(chat.id === selectedChat?.id ? null : chat)
          }
        />
      </div>
      <GroupDetailSidebar
        chat={selectedChat}
        onClose={() => setSelectedChat(null)}
      />
    </div>
  );
}
