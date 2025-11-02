import { Link } from '@tanstack/react-router';

export function NotFoundChannel({ error }: { error: Error }) {
  return (
    <div className="space-y-2 p-2">
      <div className="text-gray-600 dark:text-gray-400">
        <p>{error.message}</p>
      </div>
      <p className="flex items-center gap-2 flex-wrap">
        <Link
          to="/"
          search={{
            channel: 'lemondefr',
          }}
          className="bg-cyan-600 text-white px-2 py-1 rounded-sm uppercase font-black text-sm"
        >
          Try with "lemondefr"
        </Link>
        <Link
          to="/"
          search={{
            channel: 'taylorswift',
          }}
          className="bg-cyan-600 text-white px-2 py-1 rounded-sm uppercase font-black text-sm"
        >
          Try with "taylorswift"
        </Link>
        <Link
          to="/"
          search={{
            channel: 'C8TV',
          }}
          className="bg-cyan-600 text-white px-2 py-1 rounded-sm uppercase font-black text-sm"
        >
          Try with "C8TV"
        </Link>
      </p>
    </div>
  );
}
