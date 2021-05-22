import type { NextApiRequest, NextApiResponse } from 'next';
import { fatalityRatio } from '../../../lib';
import prisma from '../../../prisma/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { type } = req.query;

};

// continent
// population_density
// median_age
// aged_65_older
// gdp_per_capita
// life_expectancy
// human_development_index
// stringency_index
// extreme_poverty
