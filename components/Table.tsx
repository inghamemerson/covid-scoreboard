import React from 'react';
// import Link from 'next/link';
import { ICountry } from '../@types/ICountry';

interface ITable {
  title?: string;
  items: ICountry[]
}

export const Table = ({ title, items }: ITable) => (
  <div className="relative max-w-7xl mx-auto my-16 px-4 sm:my-20 sm:px-6 lg:px-8">
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            {title && (
              <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
              </div>
            )}
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                    <th scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Rank
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Flag</span>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Country
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Overall Score
                    </th>
                    {/* <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">View</span>
                    </th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((country, i) => (
                  <tr key={country.slug}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{i + 1}.</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-3xl text-gray-900">{country.emoji}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{country.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-lg text-black">{country.overallBenchmarked?.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">
                        <span>Benchmarks: </span>
                        <span>Disease: {country.deathBenchmarked?.toFixed(2)} | </span>
                        <span>Vaccination: {country.vaccBenchmarked?.toFixed(2)} | </span>
                        <span>Economy: {country.econBenchmarked?.toFixed(2)} | </span>
                        <span>Social: {country.socialBenchmarked?.toFixed(2)}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        <span>Scores: </span>
                        <span>Disease: {country.deathScore?.toFixed(2)} | </span>
                        <span>Vaccination: {country.vaccScore?.toFixed(2)} | </span>
                        <span>Economy: {country.econScore?.toFixed(2)} | </span>
                        <span>Social: {country.socialScore?.toFixed(2)}</span>
                      </p>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/countries/${country.slug}`}>
                        <a className="text-indigo-600 hover:text-indigo-900">
                          View
                        </a>
                      </Link>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
);
