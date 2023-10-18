import mongoose, { UpdateQuery, UpdateWithAggregationPipeline } from "mongoose";
import { MongoDBQuery } from "types";

export default abstract class BaseRepository<T> {
  constructor(protected model: mongoose.Model<T>) {}
  // async findAll(options?: FindOptions): Promise<T[]> {
  //     return this.model.findAll(options) as Promise<T[]>;
  // }

  async findById(id: string) {
    return await this.model.findById(id);
  }

  async findOne(fields: MongoDBQuery<T>): Promise<T | null> {
    return await this.model.findOne(fields);
  }

  async create(item: Partial<T>) {
    return await this.model.create(item);
  }

  async findByIdAndUpdate(_id: string, item: Partial<T>) {
    return await this.model.findByIdAndUpdate(
      _id,
      { $set: item } as UpdateWithAggregationPipeline | UpdateQuery<T>,
      { new: true }
    );
  }

  async findOneAndUpdate(
    fields: Partial<T>,
    item: Partial<T>,
    options?: mongoose.QueryOptions
  ) {
    return await this.model.findOneAndUpdate(
      fields,
      { $set: item } as UpdateWithAggregationPipeline | UpdateQuery<T>,
      { ...options, new: true }
    );
  }

  async findOneAndDelete(item: Partial<T>) {
    return await this.model.findOneAndDelete(item);
  }

  // async update(id: number, item: T): Promise<T | null> {
  //     await this.model.update(item, {
  //         where: { id }
  //     });
  //     return this.findById(id);
  // }

  // async delete(id: number): Promise<void> {
  //     await this.model.destroy({
  //         where: { id }
  //     });
  // }
}
