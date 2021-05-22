import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { ICountry } from '../../@types/ICountry';
import { Header, Breadcrumbs, Table } from '../../components';

interface ICountryIndex {
  countries: ICountry[];
}

const CountryIndex = ({ countries }: ICountryIndex) => (
  <div>
    <Head>
      <title>Countries | Covid Scoreboard</title>
      <meta name="description" content="Indexing all countries" />
    </Head>
    <Header
      title='Countries'
      description='All countries alphabetically'
      image='https://picsum.photos/1000/400'
    />
    <Breadcrumbs pages={[
    {
      name: 'Countries',
      href: '/countries',
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
