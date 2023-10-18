import mongoose from "mongoose";
import BaseRepository from "../repositories/baseRepository";
import { MongoDBQuery } from "types";

export default abstract class Service<T> {
  constructor(protected repository: BaseRepository<T>) {}

  async findById(id: string) {
    return await this.repository.findById(id);
  }

  async findOne(fields: MongoDBQuery<T>): Promise<T | null> {
    return await this.repository.findOne(fields);
  }

  async create(item: Partial<T>) {
    return await this.repository.create(item);
  }

  async findByIdAndUpdate(_id: string, item: Partial<T>) {
    return await this.repository.findByIdAndUpdate(_id, item);
  }

  async findOneAndUpdate(
    fields: Partial<T>,
    item: Partial<T>,
    options?: mongoose.QueryOptions
  ) {
    return await this.repository.findOneAndUpdate(fields, item, options);
  }
  async findOneAndDelete(item: Partial<T>) {
    return await this.repository.findOneAndDelete(item);
  }
}
