import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { ICountry } from '../@types/ICountry';

interface IHome {
  top10: ICountry[];
  bottom10: ICountry[];
}

const Home = ({ top10, bottom10 }: IHome) => (
  <div>
    <Head>
      <title>Covid Scoreboard</title>
      <meta name="description" content="Indexing all countries" />
    </Head>
    {top10 && top10.length > 0 && (
      <ul>
        {top10.map((country) => (
          <li key={country.iso_code}>
            <Link href={`/countries/${country.slug}`}>
              <a>{country.emoji} - {country.location} = {country.population}</a>
            </Link>
          </li>
        ))}
      </ul>
    )}
    {bottom10 && bottom10.length > 0 && (
      <ul>
        {bottom10.map((country) => (
          <li key={country.iso_code}>
            <Link href={`/countries/${country.slug}`}>
              <a>{country.emoji} - {country.location} = {country.population}</a>
            </Link>
          </li>
        ))}
      </ul>
    )}
    <p>
      <Link href='/scoreboard'>
        <a>
          Scoreboard
        </a>
      </Link>
    </p>
    <p>
      <Link href='/countries'>
        <a>
          List All Countries
        </a>
      </Link>
    </p>
  </div>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const top10Res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/countries/rollup`);
  const bottom10Res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/countries/rollup?type=bottom`);
  const top10Data = await top10Res.json();
  const bottom10Data = await bottom10Res.json();
  let top10: ICountry[] | string[] = top10Data;
  let bottom10: ICountry[] | string[] = bottom10Data;

  return { props: { top10, bottom10 } };
};

export default Home;
