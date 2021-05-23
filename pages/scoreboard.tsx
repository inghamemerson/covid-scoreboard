import React, { useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { ICountry } from '../@types/ICountry';
import { Header, Breadcrumbs, ReportDetails, Table } from '../components';

interface ICountryIndex {
  countries: ICountry[];
}

const CountryIndex = ({ countries }: ICountryIndex) => {
  const [displayCountries, setDisplayCountries] = useState(countries);
  const [filters, setFilters] = useState({});
  const [weights, setWeights] = useState({});

  const handleSubmit = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/countries/scoreboard?filters=${JSON.stringify(filters)}&weights=${JSON.stringify(weights)}`);
    const data = await res.json();

    if (data && data.length) {
      setDisplayCountries(data);
    };
  };

  return (
    <div className="bg-gray-100 pb-20">
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
      <ReportDetails
        submit={handleSubmit}
        setFilters={setFilters}
        setWeights={setWeights}
      />
      <Table items={displayCountries} title='Rankings' />
      <h1></h1>
    </div>
  )
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/countries/scoreboard`);
  const data = await res.json();
  let countries: ICountry[] | string[] = data;

  return { props: { countries } };
};

export default CountryIndex;
