import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { ICountry } from '../../@types/ICountry';

interface ICountryIndex {
  countries: ICountry[]
}

const CountryIndex = ({ countries }: ICountryIndex) => (
  <>
    {countries && countries.length > 0 && (
      <ul>
        {countries.map((country) => (
          <li>
            <Link href={`/countries/${country.slug}`}>
              <a>{country.emoji} - {country.location} = {country.population}</a>
            </Link>
          </li>
        ))}
      </ul>
    )}
    <h1></h1>
  </>
)


export const getStaticProps: GetStaticProps = async () => {
    const prisma = new PrismaClient();
    const countries = await prisma.country.findMany({
    where: { NOT: [{ emoji: null }] },
    orderBy: [
      {
        location: 'asc'
      }
    ]
  })
  return { props: { countries } }
};

export default CountryIndex;
