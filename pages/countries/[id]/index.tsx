import React from 'react';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { ICountry } from '../../../@types/ICountry';

interface ICountryIndex {
  country: ICountry
}

interface IPaths {
  params: {
    id: string
  }
}

const CountryPage = ({ country }: ICountryIndex) => (
  <>
    <h1>{country.location}</h1>
  </>
);

export const getStaticProps: GetStaticProps = async (context) => {
  console.log({context});
  const prisma = new PrismaClient();
  const countrySlug = context?.params?.id;
  let country;

  if (countrySlug && typeof countrySlug === 'string') {
    country = await prisma.country.findUnique({
      where: {
        slug: countrySlug
       },
    })
  }

  return { props: { country } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prisma = new PrismaClient();
  const paths: IPaths[] = [];
  const countriesPaths = await prisma.country.findMany({
    where: { NOT: [{ emoji: null }] },
    select: {
      slug: true
    }
  });

  countriesPaths.forEach((country) => {
    const { slug } = country;
    if (slug && typeof slug === 'string') {
      paths.push({
        params: { id: slug }
      });
    }
  });

  return {
    paths: paths,
    fallback: false
  }
}

export default CountryPage;
