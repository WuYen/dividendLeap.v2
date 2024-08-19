import { Model, Schema, Types, model } from 'mongoose';

interface IPostInfo {
  tag: string | null;
  title: string;
  href: string | null;
  author: string | null;
  date: string | null;
  batchNo: number;
  id: number;
}

const PostInfoSchema: Schema = new Schema({
  tag: { type: String, default: null },
  title: { type: String, required: true },
  href: { type: String, default: null },
  author: { type: String, default: null },
  date: { type: String, default: null },
  batchNo: { type: Number, required: true },
  id: { type: Number, required: true },
});

const PostInfoModel: Model<IPostInfo> = model<IPostInfo>('PostInfo', PostInfoSchema);

// Add lastRecordSchema for PostInfo
const LastRecordSchema: Schema = new Schema({
  lastProcessedRecord: {
    type: Schema.Types.ObjectId,
    ref: 'PostInfo',
  },
});

//TODO: figure out why duplicate, maybe its because schedule job has overlap
const findAndRemoveDuplicateIds = async (doRemove: boolean = false) => {
  try {
    // Step 1: Find duplicate IDs
    const duplicateIds = await PostInfoModel.aggregate([
      { $group: { _id: '$id', count: { $sum: 1 } } },
      { $match: { count: { $gt: 1 } } },
      { $project: { _id: 0, id: '$_id', count: 1 } },
    ]);

    console.log('Duplicate IDs:');
    console.log(duplicateIds);
    console.log('size:', duplicateIds.length);

    if (doRemove && duplicateIds.length > 0) {
      // Step 2: Find all documents with duplicate IDs
      const allDuplicates = await PostInfoModel.find({ id: { $in: duplicateIds.map((x) => x.id) } });

      // Step 3: Group by id and remove all but one document for each group
      const idsToRemove: Types.ObjectId[] = [];

      // The 'grouped' object will have keys as the 'id' and values as an array of ObjectIds
      const grouped: Record<number, Types.ObjectId[]> = allDuplicates.reduce((acc, doc) => {
        if (!acc[doc.id]) {
          acc[doc.id] = [];
        }
        acc[doc.id].push(doc._id); // Store the _id of each document
        return acc;
      }, {} as Record<number, Types.ObjectId[]>);

      for (const id in grouped) {
        const docs = grouped[id];
        if (docs.length > 1) {
          // Keep the first document and remove the rest
          idsToRemove.push(...docs.slice(1));
        }
      }

      await PostInfoModel.deleteMany({ _id: { $in: idsToRemove } });
      console.log(`Removed ${idsToRemove.length} duplicate documents.`);
    }

    return duplicateIds;
  } catch (err) {
    console.error('Error finding and removing duplicate IDs:', err);
  }
};

const LastRecordModel: Model<any> = model('LastRecord', LastRecordSchema);

export { IPostInfo, PostInfoModel, LastRecordModel, findAndRemoveDuplicateIds };
