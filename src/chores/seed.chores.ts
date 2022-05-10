import { DocumentDefinition } from 'mongoose';
import { MongoServerError } from 'mongodb';
import { ChoresDocument, Chores } from './Chores.model';
import { prepare_db } from '../db';

const chores: DocumentDefinition<ChoresDocument>[] = [
  {
    title: 'Do the laundry',
    description: "Don't forget to wash the shirts",
    done: false,
  },
  {
    title: 'Change light bulbs',
    description: 'Two in the living room and one in the bathroom.',
    done: false,
  },
  {
    title: 'Get flight tickets to Brazil',
    description: 'It will be a big surprise for grandma',
    done: false,
  },
  {
    title: 'Hang pictures',
    description: '',
    done: true,
  },
  {
    title: 'Buy tables for the living room',
    description: 'Two green and one blue',
    done: false,
  },
];

(async () => {
  const { close_connection } = await prepare_db();

  try {
    await Chores.collection.drop();
    console.log('✅ Deleted all previous chores');
  } catch (error) {
    const e = error as MongoServerError;
    if (e.codeName === 'NamespaceNotFound') {
      console.log('❌ Collection does not exist, cannot drop');
    }
  }

  const docs = await Promise.all(
    chores.map(async (r) => {
      const bc_doc = await Chores.create(r);
      return bc_doc;
    }),
  );

  console.log(`✅ Created ${docs.length} chores`);

  await close_connection();
})();
