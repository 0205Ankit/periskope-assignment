import Image from "next/image";
import { RiWhatsappFill } from "react-icons/ri";
import { PiCaretUpDownBold } from "react-icons/pi";
import { SidebarNav } from "@/components/sidebar-nav";

export function Sidebar() {
  return (
    <aside className="flex h-screen w-60 flex-col border-r border-gray-200 px-1">
      <div className="flex items-center gap-2 px-4 py-4">
        <Image
          src="/periskope.webp"
          alt="Periskope"
          className="rounded-full"
          width={30}
          height={30}
        />
        <div className="flex flex-1 min-h-full flex-col leading-tight">
          <span className="text-sm font-semibold text-gray-900">Periskope</span>
          <span className="text-xs text-gray-500">ankit@hashlabs.dev</span>
        </div>
        <PiCaretUpDownBold className="h-4 w-4 text-gray-900" />
      </div>

      <SidebarNav />

      <div className="px-2 py-3">
        <div className="flex items-center gap-4 rounded-md px-3 py-2 text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-50 hover:text-gray-900 transition-colors">
          <RiWhatsappFill className="h-5 w-5 text-green-700" />
          <span className="font-medium">Help & Support</span>
        </div>
      </div>
    </aside>
  );
}
