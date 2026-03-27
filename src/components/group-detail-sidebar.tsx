"use client";

import { useState } from "react";
import type { ChatWithRelations } from "@/lib/types";
import { PiCaretUpDownBold } from "react-icons/pi";
import { BiExport } from "react-icons/bi";
import { MdOutlineExitToApp } from "react-icons/md";
import { TbAntennaBars5 } from "react-icons/tb";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";



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
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-500">
      {initials}
    </div>
  );
}

const tabs = ["Overview", "Members", "Logs"] as const;

function SidebarTabs() {
  const [activeTab, setActiveTab] = useState<string>("Overview");

  return (
    <div className="flex px-5 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-1.5 mr-6 px-2 last:mr-0 text-[12px] font-medium cursor-pointer transition-colors ${
            activeTab === tab
              ? "text-green-800 border-b-2 border-green-800"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function GroupDetailSidebar({
  chat,
  onClose,
}: {
  chat: ChatWithRelations | null;
  onClose: () => void;
}) {
  return (
    <div
      className={`shrink-0 border-l border-gray-200 bg-white transition-all duration-300 ease-in-out overflow-hidden ${
        chat ? "w-[220px] md:w-[250px] lg:w-[280px] xl:w-[320px] 2xl:w-[400px]" : "w-0"
      }`}
    >
      {chat && (
        <div className="w-[220px] md:w-[250px] lg:w-[290px] xl:w-[330px] 2xl:w-[400px] flex flex-col h-full overflow-y-auto">
          <div className="flex items-center gap-3 pl-5 pr-7 pt-5 pb-5">
            <GroupAvatar name={chat.name} />
            <h3 className="flex-1 text-sm font-semibold text-gray-900 truncate">
              {chat.name}
            </h3>
            <button
              onClick={onClose}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
              </svg>
              Refresh
            </button>
          </div>

          <SidebarTabs />

          <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-5 px-5 py-5 text-[13px]">
            <span className="text-gray-400 font-medium self-center">Last Active</span>
            <span className="font-semibold text-gray-500">
              {formatLastActive(chat.last_active)}
            </span>

            <span className="text-gray-400 font-medium self-center">Disappearing Messages</span>
            <span className="font-semibold flex items-center gap-0.5 text-gray-500">
              OFF <PiCaretUpDownBold className="h-[10px] w-[10px]" />
            </span>

            <span className="text-gray-400 font-medium self-center">Send Message Permission</span>
            <span className="font-semibold text-gray-500 flex items-center gap-0.5">
              All <PiCaretUpDownBold className="h-[10px] w-[10px]" />
            </span>

            <span className="text-gray-400 font-medium self-center">Project</span>
            <div>
              {chat.project && (
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                  style={{
                    color: chat.project.color,
                    backgroundColor: chat.project.color + "12",
                    borderColor: chat.project.color + "25",
                  }}
                >
                  # {chat.project.name}
                </span>
              )}
            </div>

            <span className="text-gray-400 font-medium pt-1">Labels</span>
            <div className="flex flex-col items-start gap-2">
              {chat.labels.map((label) => {
                const displayName =
                  label.name.length > 6
                    ? label.name.substring(0, 6) + "..."
                    : label.name;
                return (
                  <span
                    key={label.id}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-1.5 py-0.5 text-[11px] font-medium text-gray-700"
                  >
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: label.color }}
                    />
                    {displayName}
                  </span>
                );
              })}
              <button className="text-[10px] text-gray-400 border border-gray-200 px-1 py-0.5 rounded-full hover:text-gray-600 cursor-pointer">
                + Add Label
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200" />

          <div className="px-5 py-4 space-y-3">
            <button className="flex items-center gap-2 text-[13px] text-gray-600 font-medium hover:text-gray-800 cursor-pointer">
              <BiExport className="h-3.5 font-bold w-3.5" />
              Export Chat
            </button>
            <button className="flex items-center gap-2 text-[13px] text-red-600 font-medium hover:text-red-600 cursor-pointer">
              <MdOutlineExitToApp className="h-3.5 font-bold w-3.5" />
              Exit Group
            </button>
          </div>

          <div className="mx-5 mt-2 rounded-lg p-3.5 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)]">
            <div className="flex items-start justify-between">
              <p className="text-[11px] font-semibold text-gray-400">
                PER-011 | {chat.name}
              </p>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white">
                H
              </span>
            </div>
            <p className="mt-1.5 text-[12px] font-semibold text-gray-800 flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-red-400 inline-block" />
              Issues with mentions on groups
            </p>
            <div className="mt-3 flex items-center gap-2 text-[10px] font-semibold text-gray-400">
              <span className="flex items-center gap-1 rounded border border-gray-200 font-bold px-1 py-0.5">
                <TbAntennaBars5 className="h-3 w-3 text-gray-900" />
              </span>
              <span className="flex items-center gap-1 rounded border border-gray-200 font-bold px-1 py-0.5">
                <HiOutlineCalendarDateRange className="h-3 w-3 text-red-600" />
                Dec 22
              </span>
              <span className="flex items-center gap-1 rounded border border-gray-200 font-bold px-1 py-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-800 inline-block" />
                client
              </span>
              <span className="ml-auto text-gray-400 text-[9px]">3 days</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
