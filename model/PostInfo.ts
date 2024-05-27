import { Model, Schema, model } from 'mongoose';

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
    const duplicateIds = await PostInfoModel.aggregate([
      { $group: { _id: '$id', count: { $sum: 1 } } },
      { $match: { count: { $gt: 1 } } },
      { $project: { _id: 0, id: '$_id', count: 1 } },
    ]);

    console.log('Duplicate IDs:');
    console.log(duplicateIds);
    console.log('size:', duplicateIds.length);
    if (doRemove) {
      await PostInfoModel.deleteMany({ id: { $in: duplicateIds.map((x) => x.id) } });
    }
    return duplicateIds;
  } catch (err) {
    console.error('Error finding duplicate IDs:', err);
  }
};

const LastRecordModel: Model<any> = model('LastRecord', LastRecordSchema);

export { IPostInfo, PostInfoModel, LastRecordModel, findAndRemoveDuplicateIds };
