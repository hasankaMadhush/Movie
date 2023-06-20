import { Schema, model } from 'mongoose';
import Collection from './collection.interface';

const NO_OF_MOVIES_ALLOWED = 10;

const CollectionSchema = new Schema(
  {
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    movies: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
      validate: [arrayLimit, `Allowed Movies exceeds the limit of ${NO_OF_MOVIES_ALLOWED}`],
    },
  },
  { timestamps: true }
);

function arrayLimit(data: [Schema.Types.ObjectId]): boolean {
  return data.length < NO_OF_MOVIES_ALLOWED;
}

CollectionSchema.index({ name: 1, owner: 1 }, { unique: true });

export default model<Collection>('Collection', CollectionSchema);
