import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/solid';

interface IBreadcrumbs {
  pages?: {
    name: string;
    href: string;
    current: boolean;
  }[]
}

export const Breadcrumbs = ({ pages }: IBreadcrumbs) => (
  <nav className="flex relative max-w-7xl mx-auto my-10 px-4 sm:my-16 sm:px-6 lg:px-8" aria-label="Breadcrumb">
    <ol className="bg-white rounded-md shadow px-6 py-4 flex space-x-4">
      <li>
        <div>
          <Link href="/">
            <a className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </Link>
        </div>
      </li>
      {pages?.map((page) => (
        <li key={page.name}>
          <div className="flex items-center">
            <svg
              className="flex-shrink-0 h-5 w-5 text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
            <Link href={page.href}>
              <a
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </a>
            </Link>
          </div>
        </li>
      ))}
    </ol>
  </nav>
);
