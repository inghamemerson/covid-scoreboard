import type { NextApiRequest, NextApiResponse } from 'next';
import { scoreCountries } from '../../../../lib';
import prisma from '../../../../prisma/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    if (id && typeof id === 'string') {
      const result = await prisma.country.findUnique({
        where: {
          slug: id
          },
      });

      const scored = scoreCountries([result]);
      res.json(scored);
    }
  } catch (e) {
    res.status(500).send(e);
  }
};
