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
  const top = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/countries/scoreboard`);
  const bottom = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/countries/scoreboard?type=reverse`);
  const top10Data = await top.json();
  const bottom10Data = await bottom.json();
  let top10: ICountry[] | string[] = top10Data.splice(0, 10);
  let bottom10: ICountry[] | string[] = bottom10Data.splice(0, 10);

  return { props: { top10, bottom10 } };
};

export default Home;
