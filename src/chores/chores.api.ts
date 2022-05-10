import { FastifyPluginAsync } from 'fastify';
import { Types } from 'mongoose';
import { Chores } from './Chores.model';

export const chores_api: FastifyPluginAsync = async (app) => {
  // C(R)UD: List all chores
  app.get('/', async () => {
    const chores_docs = await Chores.find();
    return chores_docs;
  });

  // C(R)UD: Get the details of a chore
  app.get<{ Params: { chores_id: string } }>(
    '/:chores_id',
    async (req, res) => {
      const { chores_id } = req.params;

      if (!Types.ObjectId.isValid(chores_id)) {
        throw new Error('Please, pass an object id as route param');
      }

      const doc = await Chores.findById(chores_id);

      if (doc) {
        return doc.toObject();
      }
      res.status(404);
      return { status: 'chore not found' };
    },
  );

  // CRU(D): Delete a chore
  app.delete<{ Params: { chores_id: string } }>(
    '/:chores_id',
    async (req) => {
      const { chores_id } = req.params;

      if (!Types.ObjectId.isValid(chores_id)) {
        throw new Error('Please, pass an object id as route param');
      }

      await Chores.findByIdAndDelete(chores_id);
      req.log.info(`Deleted chore ${chores_id}`);

      return { staus: 'deleted', chores_id };
    },
  );
};
