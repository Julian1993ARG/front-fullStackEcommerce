import { model, models, Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  parent?: {
    _id: string;
    name: string;
  }
}

const CategorySchemma:Schema = new Schema({
  name: { type: String, required: true },
  parent: { type: Schema.Types.ObjectId, ref: 'Category' }
});

const Category = models.Category || model('Category', CategorySchemma);

export default Category;
