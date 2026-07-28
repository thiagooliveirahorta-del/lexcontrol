export function DiligenciaSkeleton() {

    return (

        <div className="animate-pulse rounded-xl border bg-white p-6 shadow-sm">

            <div className="mb-4 h-6 w-40 rounded bg-gray-200"></div>

            <div className="mb-3 h-4 w-64 rounded bg-gray-200"></div>

            <div className="mb-6 h-4 w-52 rounded bg-gray-200"></div>

            <div className="grid grid-cols-2 gap-4">

                <div className="h-10 rounded bg-gray-200"></div>

                <div className="h-10 rounded bg-gray-200"></div>

            </div>

        </div>

    );

}