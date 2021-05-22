import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { ICountry } from '../@types/ICountry';
import { Header, Breadcrumbs, Table } from '../components';

interface ICountryIndex {
  countries: ICountry[];
}

const CountryIndex = ({ countries }: ICountryIndex) => (
  <div>
    <Head>
      <title>Ranking | Covid Scoreboard</title>
      <meta name="description" content="Make your own rank lists" />
    </Head>
    <Header
      title='Scoreboard'
      description='Filter data'
      image='https://picsum.photos/1000/400'
    />
    <Breadcrumbs pages={[
    {
      name: 'scoreboard',
      href: '/scoreboard',
      current: true
      }
    ]} />
    <Table items={countries} title='All Countries' />
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
