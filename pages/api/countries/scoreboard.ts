import type { NextApiRequest, NextApiResponse } from 'next';
import { ICountry } from '../../../@types/ICountry';
import { ranked, scoreCountries } from '../../../lib';
import prisma from '../../../prisma/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let reverse = false;
  const { type, filters, weights } = req.query;
  const where = {
    NOT: [{ emoji: null }]
  };

  if (type && type === 'reverse') {
    reverse = true;
  }

  // Filters
  // continent
  // population_density
  // aged_65_older
  // gdp_per_capita
  // life_expectancy
  // human_development_index
  // extreme_poverty

  const scoreWeights = {
    deathScore: 1,
    vaccScore: 1,
    econScore: 1,
    socialScore: 1
  };

  const countriesRes = await prisma.country.findMany({
    where,
    orderBy: [
      {
        location: 'asc'
      }
    ],
    select: {
      iso_code: true,
      slug: true,
      emoji: true,
      continent: true,
      location: true,
      population: true,
      population_density: true,
      gdp_per_capita: true,
      life_expectancy: true,
      human_development_index: true,
      extreme_poverty: true,
      data: {
        select: {
          total_cases: true,
          total_deaths: true,
          total_vaccinations: true,
          people_fully_vaccinated: true
        }
      },
      unemployment: {
        select: {
          year: true,
          value: true
        }
      },
      fertility: {
        select: {
          year: true,
          value: true
        }
      },
      schoolClosure: {
        select: {
          days_fully_closed: true,
          instruction_days: true
        }
      },
    }
  });

  // @ts-ignore
  const scoredCountries: ICountry[] = scoreCountries(countriesRes, scoreWeights);

  const rankedCountries: ICountry[]= ranked(scoredCountries, reverse);

  res.json(rankedCountries);
};
