import type { NextApiRequest, NextApiResponse } from 'next';
import { ICountry } from '../../../@types/ICountry';
import { ranked, scoreCountries } from '../../../lib';
import prisma from '../../../prisma/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  /*
    This file needs some love. Ended up being a workhorse with a ton of business logic
    and too many ignores for the linter for sake of time
    TODO: Map URL params more effectively
  */
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
        where.AND = where.AND || [];
        // @ts-ignore
        where.AND.push({population: {gte: 1000000}});
        // @ts-ignore
        where.AND.push({population: {lte: 10000000}});
        break;

      case '10m-100m':
        // @ts-ignore
        where.AND = where.AND || [];
        // @ts-ignore
        where.AND.push({population: {gte: 10000000}});
        // @ts-ignore
        where.AND.push({population: {lte: 100000000}});
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
        where.AND = where.AND || [];
        // @ts-ignore
        where.AND.push({gdp_per_capita: {gte: 10000}});
        // @ts-ignore
        where.AND.push({gdp_per_capita: {lte: 25000}});
        break;

      case 'lg':
        // @ts-ignore
        where.AND = where.AND || [];
        // @ts-ignore
        where.AND.push({gdp_per_capita: {gte: 25000}});
        // @ts-ignore
        where.AND.push({gdp_per_capita: {lte: 50000}});
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

  if (parsedFilters?.median_age) {
    switch (parsedFilters.median_age) {
      case '<20':
        // @ts-ignore
        where.median_age = {
          lt: 20
        }
        break;

      case '20-30':
        // @ts-ignore
        where.AND = where.AND || [];
        // @ts-ignore
        where.AND.push({median_age: {gte: 20}});
        // @ts-ignore
        where.AND.push({median_age: {lte: 30}});
        break;

      case '30-40':
        // @ts-ignore
        where.AND = where.AND || [];
        // @ts-ignore
        where.AND.push({median_age: {gte: 30}});
        // @ts-ignore
        where.AND.push({median_age: {lte: 40}});
        break;

      case '>40':
        // @ts-ignore
        where.median_age = {
          gt: 40
        }
        break;

      default:
        break;
    }
  }

  if (parsedFilters?.life_expectancy) {
    switch (parsedFilters.life_expectancy) {
      case '<60':
        // @ts-ignore
        where.life_expectancy = {
          lt: 60
        }
        break;

      case '60-65':
        // @ts-ignore
        where.AND = where.AND || [];
        // @ts-ignore
        where.AND.push({life_expectancy: {gte: 60}});
        // @ts-ignore
        where.AND.push({life_expectancy: {lte: 65}});
        break;

      case '65-70':
        // @ts-ignore
        where.AND = where.AND || [];
        // @ts-ignore
        where.AND.push({life_expectancy: {gte: 65}});
        // @ts-ignore
        where.AND.push({life_expectancy: {lte: 70}});
        break;

      case '70-75':
        // @ts-ignore
        where.AND = where.AND || [];
        // @ts-ignore
        where.AND.push({life_expectancy: {gte: 70}});
        // @ts-ignore
        where.AND.push({life_expectancy: {lte: 75}});
        break;

      case '>75':
        // @ts-ignore
        where.life_expectancy = {
          gt: 75
        }
        break;

      default:
        break;
    }
  }

if (parsedFilters?.human_development_index) {
    switch (parsedFilters.human_development_index) {
      case '<.5':
        // @ts-ignore
        where.human_development_index = {
          lt: .5
        }
        break;

      case '.5-.6':
        // @ts-ignore
        where.AND = where.AND || [];
        // @ts-ignore
        where.AND.push({human_development_index: {gte: .5}});
        // @ts-ignore
        where.AND.push({human_development_index: {lte: .6}});
        break;

      case '.6-.7':
        // @ts-ignore
        where.AND = where.AND || [];
        // @ts-ignore
        where.AND.push({human_development_index: {gte: .6}});
        // @ts-ignore
        where.AND.push({human_development_index: {lte: .7}});
        break;

      case '.7-.8':
        // @ts-ignore
        where.AND = where.AND || [];
        // @ts-ignore
        where.AND.push({human_development_index: {gte: .7}});
        // @ts-ignore
        where.AND.push({human_development_index: {lte: .8}});
        break;

      case '.8-.9':
        // @ts-ignore
        where.AND = where.AND || [];
        // @ts-ignore
        where.AND.push({human_development_index: {gte: .8}});
        // @ts-ignore
        where.AND.push({human_development_index: {lte: .9}});
        break;

      case '>.9':
        // @ts-ignore
        where.human_development_index = {
          gt: .9
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
