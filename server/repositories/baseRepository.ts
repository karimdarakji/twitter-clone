import mongoose, { UpdateQuery, UpdateWithAggregationPipeline } from "mongoose";
export default abstract class BaseRepository<T> {
  constructor(protected model: mongoose.Model<T>) {}
  // async findAll(options?: FindOptions): Promise<T[]> {
  //     return this.model.findAll(options) as Promise<T[]>;
  // }

  async findById(id: string) {
    return await this.model.findById(id);
  }

  async findOne(fields: Partial<T>): Promise<T | null> {
    return await this.model.findOne(fields);
  }

  async create(item: Partial<T>) {
    return await this.model.create(item);
  }

  async update(_id: string, item: Partial<T>) {
    return await this.model.findByIdAndUpdate(_id, { $set: item } as
      | UpdateWithAggregationPipeline
      | UpdateQuery<T>);
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
