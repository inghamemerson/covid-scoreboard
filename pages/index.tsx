import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { ICountry } from '../@types/ICountry';
import { Header, Table } from '../components';

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
    <div>
      <Header
        title='COVID Scoreboard'
        description='Comparing how various countries performed in response to the COVID pandemic'
        image='https://picsum.photos/1000/400'
      />
      {/* <Breadcrumbs /> */}
      <Table items={top10} title='Top 10 Countries' />
      <Table items={bottom10} title='Bottom 10 Countries' />
    </div>
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
