import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { ICountry } from '../../@types/ICountry';

interface ICountryIndex {
  countries: ICountry[];
}

const CountryIndex = ({ countries }: ICountryIndex) => (
  <div>
    <Head>
      <title>Countries | Covid Scoreboard</title>
      <meta name="description" content="Indexing all countries" />
    </Head>
    {countries && countries.length > 0 && (
      <ul>
        {countries.map((country) => (
          <li key={country.iso_code}>
            <Link href={`/countries/${country.slug}`}>
              <a>{country.emoji} - {country.location} = {country.population}</a>
            </Link>
          </li>
        ))}
      </ul>
    )}
    <h1></h1>
  </div>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/countries`);
  const data = await res.json();
  let countries: ICountry[] | string[] = data;

  return { props: { countries } };
};

export default CountryIndex;
