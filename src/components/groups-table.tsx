"use client";

import { useState } from "react";
import type { ChatWithRelations } from "@/lib/types";

function formatLastActive(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours < 24) {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

function GroupAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")[0]
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-[10px] font-semibold text-gray-500">
      {initials}
    </div>
  );
}

function ProjectBadge({ name, color }: { name: string; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[11px] font-semibold"
      style={{
        color: color,
        backgroundColor: color + "15",
      }}
    >
      # {name}
    </span>
  );
}

function LabelBadge({ name, color }: { name: string; color: string }) {
  const displayName = name.length > 5 ? name.substring(0, 4) + "..." : name;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-1.5 py-0.5 text-[11px] font-medium text-gray-600">
      <span
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: color }}
      />
      {displayName}
    </span>
  );
}

export function GroupsTable({
  chats,
  selectedChatId,
  onSelectChat,
}: {
  chats: ChatWithRelations[];
  selectedChatId: string | null;
  onSelectChat: (chat: ChatWithRelations) => void;
}) {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  const allChecked = chats.length > 0 && checkedIds.size === chats.length;

  function toggleAll() {
    if (allChecked) {
      setCheckedIds(new Set());
    } else {
      setCheckedIds(new Set(chats.map((c) => c.id)));
    }
  }

  function toggleOne(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="flex-1 overflow-auto">
      <table className="w-full">
        <thead className="sticky top-0 bg-white border-b border-gray-200">
          <tr className="text-left text-xs font-medium text-gray-500">
            <th className="w-8 pl-2 pr-1 py-2.5">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={toggleAll}
                className="h-3 w-3 rounded-sm appearance-none border border-gray-300 checked:bg-green-600 checked:border-green-600 cursor-pointer"
              />
            </th>
            <th className="py-2">Group Name</th>
            <th className="px-4 py-2">Project</th>
            <th className="px-4 py-2">Labels</th>
            <th className="px-4 py-2 text-right">Members</th>
            <th className="px-4 py-2 text-right">Last Active</th>
          </tr>
        </thead>
        <tbody>
          {chats.map((chat) => (
            <tr
              key={chat.id}
              onClick={() => onSelectChat(chat)}
              className={`border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer ${
                selectedChatId === chat.id ? "bg-gray-100 hover:bg-gray-100" : ""
              }`}
            >
              <td className="pl-2 pr-3 py-2.5" onClick={(e) => toggleOne(e, chat.id)}>
                <input
                  type="checkbox"
                  checked={checkedIds.has(chat.id)}
                  onChange={() => {}}
                  className="h-3 w-3 rounded-sm appearance-none border border-gray-300 checked:bg-green-600 checked:border-green-600 cursor-pointer pointer-events-none"
                />
              </td>

              <td className="py-2.5">
                <div className="flex items-center gap-2">
                  <GroupAvatar name={chat.name} />
                  <span className="text-[13px] font-medium text-gray-500">
                    {chat.name}
                  </span>
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[9px] font-extrabold text-white">
                    {chat.members_count}
                  </span>
                </div>
              </td>

              <td className="px-4 py-2.5">
                {chat.project && (
                  <ProjectBadge
                    name={chat.project.name}
                    color={chat.project.color}
                  />
                )}
              </td>

              <td className="px-4 py-2.5">
                <div className="flex items-center gap-1">
                  {chat.labels.slice(0, 2).map((label) => (
                    <LabelBadge
                      key={label.id}
                      name={label.name}
                      color={label.color}
                    />
                  ))}
                  {chat.labels.length > 2 && (
                    <span className="rounded-full border border-gray-200 px-2 py-1 text-[10px] text-gray-500">
                      {chat.labels.length - 2}+
                    </span>
                  )}
                </div>
              </td>

              <td className="px-4 py-2.5 text-right text-sm text-gray-500">
                {chat.members_count}
              </td>

              <td className="px-4 py-2.5 text-right text-sm text-gray-400">
                {formatLastActive(chat.last_active)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
