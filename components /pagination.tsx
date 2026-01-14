'use client'
import Link from "next/link";
import {ChevronLeft, ChevronRight} from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl: string;
    searchParams : Record<string, string>
}

export default function Pagination({
    currentPage,
    totalPages,
    baseUrl,
    searchParams}:PaginationProps) {
    if(totalPages<=1) return null;

    const getPageUrl = (page:number)=>{
        const params = new URLSearchParams({...searchParams, page:String(page)});
        return `${baseUrl}?${params.toString()}`;
    }

    const getVisiblePages = () => {
        const delta = 2;
        const pages: (number | string)[] = [];

        const start = Math.max(2, currentPage - delta);
        const end = Math.min(totalPages - 1, currentPage + delta);

        // Always first page
        pages.push(1);

        // Left dots
        if (start > 2) {
            pages.push("...");
        }

        // Middle pages
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        // Right dots
        if (end < totalPages - 1) {
            pages.push("...");
        }

        // Always last page
        pages.push(totalPages);

        return pages;
    };


    const visiblePages = getVisiblePages();

    if(totalPages <= 1 )
        return null;

    return <nav className="flex items-center justify-center gap-4">
        <Link href={`${getPageUrl(currentPage-1)}`} className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg 
        ${currentPage<= 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700"}`}
        aria-disabled={currentPage<=1}>
            <ChevronLeft/>  Previous
        </Link>
        {visiblePages.map((page,key)=>{


            if(page==="..."){
                return <span className={"px-3 py-2 text-sm text-gray-500"} key={key}>...</span>
            }
            const pageNumber = page as number;

            const isCurrentPage = pageNumber === currentPage;

            return <Link className={`px-3 py-2 text-sm font-medium rounded-lg ${isCurrentPage? "bg-purple-600 text-white" : "text-gray-700 hover:bg-gray-100 bg-white border border-gray-500" }`}
                         href={`${getPageUrl(pageNumber)}`} key={key}>
                {pageNumber}
            </Link>
        })}
        <Link href={`${getPageUrl(currentPage+1)}`} className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg 
        ${currentPage>= totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-700"}`}
              aria-disabled={currentPage>= totalPages} >
              Next
            <ChevronRight/>
        </Link>
    </nav>

}