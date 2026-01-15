import SideBar from "@/components /sidebar";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SideBar />
      <main className={"ml-64 p-8 "}>
        {/* Header Skeleton */}
        <div className={"mb-8"}>
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-64 bg-gray-200 rounded mt-2 animate-pulse"></div>
        </div>

        {/* Key Metrics Skeleton */}
        <div className={"grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"}>
          <div className={"bg-white rounded-lg border border-gray-200 p-6"}>
            <div className="h-6 w-32 bg-gray-200 rounded mb-6 animate-pulse"></div>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="h-8 w-16 mx-auto bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-20 mx-auto bg-gray-200 rounded mt-2 animate-pulse"></div>
              </div>
              <div className="text-center">
                <div className="h-8 w-16 mx-auto bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-20 mx-auto bg-gray-200 rounded mt-2 animate-pulse"></div>
              </div>
              <div className="text-center">
                <div className="h-8 w-16 mx-auto bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-20 mx-auto bg-gray-200 rounded mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className={"bg-white rounded-lg border border-gray-200 p-6"}>
            <div className="h-6 w-40 bg-gray-200 rounded mb-6 animate-pulse"></div>
            <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Table/List Skeleton */}
        <div className={"grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"}>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="h-6 w-32 bg-gray-200 rounded mb-6 animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="h-6 w-24 bg-gray-200 rounded mb-6 animate-pulse"></div>
            <div className="h-48 flex items-center justify-center bg-gray-100 rounded-full w-48 mx-auto animate-pulse"></div>
          </div>
        </div>
      </main>
    </div>
  );
}