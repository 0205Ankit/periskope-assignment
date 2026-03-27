import { HiUserGroup } from "react-icons/hi";
import { LuBell } from "react-icons/lu";
import { GrCircleQuestion } from "react-icons/gr";


export function Header() {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 px-4 py-2">
      <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
        <HiUserGroup className="h-3.5 w-3.5" />
        <span className="font-medium text-xs">groups</span>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1 rounded-sm border border-gray-200 px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
          <GrCircleQuestion className="h-3.5 w-3.5" />
          <span className="font-medium text-xs">Docs</span>
        </button>
        <button className="flex items-center gap-2 rounded-sm border border-gray-200 px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-700" />
          </span>
          <span className="font-medium text-xs">+91 91190 18066</span>
        </button>
        <button className="p-1 border border-gray-200 rounded-sm text-gray-500 hover:text-gray-700 transition-colors">
          <LuBell className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
