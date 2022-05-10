import {
  Schema, Document, model,
} from 'mongoose';

export interface ChoresDocument extends Document {
    title: string;
    description: string;
    done: boolean;
}

const schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    done: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export const Chores = model('chores', schema);
