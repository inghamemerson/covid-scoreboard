import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await prisma.country.findMany({
    where: { NOT: [{ emoji: null }] },
    orderBy: [
      {
        location: 'asc'
      }
    ]
  });
  res.json(result);
};
