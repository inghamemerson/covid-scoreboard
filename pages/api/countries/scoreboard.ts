import type { NextApiRequest, NextApiResponse } from 'next';
import { ICountry } from '../../../@types/ICountry';
import { ranked, scoreCountries } from '../../../lib';
import prisma from '../../../prisma/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let reverse = false;
  let parsedFilters;
  let parsedWeights;
  const { type, filters, weights } = req.query;
  const where = {
    NOT: [{ emoji: null }]
  };

  if (filters && typeof filters === 'string') {
    parsedFilters = JSON.parse(filters);
  };

  if (weights && typeof weights === 'string') {
    parsedWeights = JSON.parse(weights);
  } else {
    parsedWeights = {
      deathBenchmarked: 1,
      vaccBenchmarked: 1,
      econBenchmarked: 1,
      socialBenchmarked: 1
    }
  }

  if (type && type === 'reverse') {
    reverse = true;
  }

  if (parsedFilters?.continent) {
    // @ts-ignore
    where.continent = parsedFilters.continent;
  }

  if (parsedFilters?.population) {
    switch (parsedFilters.population) {
      case '<1m':
        // @ts-ignore
        where.population = {
          lt: 1000000
        }
        break;

      case '1m-10m':
        // @ts-ignore
        where.AND = where.AND || [
          {
            population: {
              gte: 1000000
            }
          },
          {
            population: {
              lte: 10000000
            }
          }
        ]
        break;

      case '10m-100m':
        // @ts-ignore
        where.AND = where.AND || [
          {
            population: {
              gte: 10000000
            }
          },
          {
            population: {
              lte: 100000000
            }
          }
        ]
        break;

      case '>100m':
        // @ts-ignore
        where.population = {
          gt: 100000000
        }
        break;

      default:
        break;
    }
  }

  if (parsedFilters?.gdp_per_capita) {
    switch (parsedFilters.gdp_per_capita) {
      case 'sm':
        // @ts-ignore
        where.gdp_per_capita = {
          lt: 10000
        }
        break;

      case 'med':
        // @ts-ignore
        where.AND = where.AND || [
          {
            gdp_per_capita: {
              gte: 10000
            }
          },
          {
            gdp_per_capita: {
              lte: 25000
            }
          }
        ]
        break;

      case 'lg':
        // @ts-ignore
        where.AND = where.AND || [
          {
            gdp_per_capita: {
              gte: 25000
            }
          },
          {
            gdp_per_capita: {
              lte: 50000
            }
          }
        ]
        break;

      case 'xl':
        // @ts-ignore
        where.gdp_per_capita = {
          gt: 50000
        }
        break;

      default:
        break;
    }
  }

  const scoreWeights = {
    deathBenchmarked: 1,
    vaccBenchmarked: 1,
    econBenchmarked: 1,
    socialBenchmarked: 1
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
  const scoredCountries: ICountry[] = scoreCountries(countriesRes, parsedWeights);
  const rankedCountries: ICountry[]= ranked(scoredCountries, reverse);

  res.json(rankedCountries);
};
