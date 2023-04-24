import { model, models, Schema } from 'mongoose';

const CategorySchemma:Schema = new Schema({
  name: { type: String, required: true }
});

const Category = models.Category || model('Category', CategorySchemma);

export default Category;
