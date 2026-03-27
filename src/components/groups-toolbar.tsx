import { IoSearch } from "react-icons/io5";
import { MdFilterList } from "react-icons/md";
import { PiCaretUpDownBold } from "react-icons/pi";


export function GroupsToolbar() {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-4 py-1.5 bg-gray-50">
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-white gap-2 rounded-sm border border-gray-200 px-2.5 py-1.5">
          <IoSearch className="h-3.5 w-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-36 bg-transparent text-xs text-gray-700 placeholder-gray-400 outline-none"
          />
        </div>
        <button className="flex items-center bg-white gap-1.5 rounded-sm border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
          <MdFilterList className="h-3.5 w-3.5" />
          <span>Filter</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button className="rounded-sm bg-green-800 px-4 py-1.5 text-xs font-semibold text-white hover:bg-green-700 transition-colors">
          Bulk message
        </button>
        <button className="flex items-center gap-1 rounded-sm bg-white border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
          <span>Group Actions</span>
          <PiCaretUpDownBold className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
