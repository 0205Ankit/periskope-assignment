"use client";

import { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { IoChatbubbleEllipses, IoFolderOpen } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi";
import { RiContactsBookFill, RiSettings2Fill } from "react-icons/ri";
import { MdNotificationsActive } from "react-icons/md";

const navItems = [
  { label: "Dashboard", id: "dashboard", icon: AiFillHome },
  { label: "Chats", id: "chats", icon: IoChatbubbleEllipses, badge: "99+" },
  { label: "Groups", id: "groups", icon: HiUserGroup },
  { label: "Contacts", id: "contacts", icon: RiContactsBookFill },
  { label: "Logs", id: "logs", icon: MdNotificationsActive },
  { label: "Files", id: "files", icon: IoFolderOpen },
  { label: "Settings", id: "settings", icon: RiSettings2Fill },
];

export function SidebarNav() {
  const [activeId, setActiveId] = useState("groups");

  return (
    <nav className="flex-1 px-2 py-1 space-y-[6px]">
      {navItems.map((item) => {
        const isActive = activeId === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => setActiveId(item.id)}
            className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm font-lg transition-colors ${
              isActive
                ? "bg-gray-100 text-green-800"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <Icon className="h-[16px] w-[16px]" />
            <span className="flex-1 text-left font-medium">{item.label}</span>
            {item.badge && (
              <span className="rounded-full bg-green-500 px-[5px] py-0.5 text-[10px] font-bold text-white">
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
