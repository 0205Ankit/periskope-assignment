import Link from "next/link";
import { FaArrowRightLong, FaArrowLeftLong} from "react-icons/fa6";


type PaginationProps = {
  page: number;
  totalPages: number;
  total: number;
};

export function Pagination({ page, totalPages, total }: PaginationProps) {
  const buttonBase =
    "flex items-center justify-center h-5 px-2 rounded-md border border-gray-200 transition-colors";

  return (
    <div className="flex items-center gap-3 border-t border-gray-200 px-4 py-2 text-xs text-gray-500">
      {page > 1 ? (
        <Link
          href={`/?page=${page - 1}`}
          className={`${buttonBase} text-gray-500 hover:bg-gray-50`}
        >
          <FaArrowLeftLong className="h-3 w-3" />
        </Link>
      ) : (
        <span className={`${buttonBase} text-gray-300 cursor-not-allowed`}>
          <FaArrowLeftLong className="h-3 w-3" />
        </span>
      )}

      <span className="text-xs text-gray-600">
        {page} of {totalPages}
      </span>

      {page < totalPages ? (
        <Link
          href={`/?page=${page + 1}`}
          className={`${buttonBase} text-gray-500 hover:bg-gray-50`}
        >
          <FaArrowRightLong className="h-3 w-3" />
        </Link>
      ) : (
        <span className={`${buttonBase} text-gray-300 cursor-not-allowed`}>
          <FaArrowRightLong className="h-3 w-3" />
        </span>
      )}

      <span className="ml-1 text-xs text-gray-500">{total} rows</span>
    </div>
  );
}
