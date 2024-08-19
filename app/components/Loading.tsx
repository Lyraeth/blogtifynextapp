import RefreshButton from './RefreshButton';

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-6">
      <div className="text-center">
        <h1 className="text-3xl">Recent posts</h1>
        <p className="text-sm text-gray-500">Fetching posts...</p>
        <RefreshButton />
      </div>
      <div className="divide-y divide-gray-900/5">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200" />
              <div className="space-y-1">
                <div className="h-6 w-28 animate-pulse rounded-md bg-gray-200" />
                <div className="h-4 w-24 animate-pulse rounded-md bg-gray-200" />
              </div>
            </div>
            <div className="h-4 w-12 animate-pulse rounded-md bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
