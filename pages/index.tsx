import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { ICountry } from '../@types/ICountry';
import { Header, Table } from '../components';

interface IHome {
  top10: ICountry[];
  bottom10: ICountry[];
}

const Home = ({ top10, bottom10 }: IHome) => (
  <div className="bg-gray-100 pb-20">
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
      <div className="relative max-w-7xl mx-auto my-16 px-4 sm:my-20 sm:px-6 lg:px-8">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="mt-5 md:mt-0">
            <h2 className="text-xl mb-6">Build your own</h2>
            <p className="txt-md mb-4">Using the scoreboard, you can update scoring weights and filter various aspects to build your own rankings.</p>
            <Link href="/scoreboard">
              <a
                className="py-2 border border-transparent text-lg font-medium rounded-md text-indigo-600 hover:text-indigo-700 focus:outline-none "
              >
                Check it out
              </a>
            </Link>
          </div>
        </div>
      </div>
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
