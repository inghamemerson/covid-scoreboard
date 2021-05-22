import type { NextApiRequest, NextApiResponse } from 'next';
import { fatalityRatio } from '../../../lib';
import prisma from '../../../prisma/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { type } = req.query;
  try {
    const response = await prisma.data.groupBy({
      by: ['countryId'],
      where: {
        NOT: [
          {
            total_cases: null
          },
          {
            total_deaths: null
          }
        ]
      },
      _sum: {
        total_cases: true,
        total_deaths: true
      },
    });

    const top10 = response.sort((a, b) => {
      if (type && type === 'bottom') {
        return fatalityRatio(a._sum) > fatalityRatio(b._sum) ? 1 : -1
      }
      return fatalityRatio(a._sum) > fatalityRatio(b._sum) ? -1 : 1
    }).slice(0, 10);

    const isos: string[] = top10.map(({ countryId }) => countryId || '');

    const countryData = await prisma.country.findMany({
      where: {
        iso_code: { in: isos }
      },
      select: {
        emoji: true,
        iso_code: true,
        location: true,
        population: true,
        gdp_per_capita: true,
      },
    });

    const result = isos.map((iso) => {
      const country = countryData.find((c) => c.iso_code === iso) || { score: null};
      const summed = top10.find((c) => c.countryId === iso);
      let updatedCountry = {};

      if (summed) {
        updatedCountry = {
          ...country,
          total_cases: summed._sum.total_cases,
          total_deaths: summed._sum.total_deaths,
          score: fatalityRatio(summed._sum)
        }
      };

      return updatedCountry;
    });

    res.json(result);
  } catch (e) {
    res.status(500).send(e);
  }
};
