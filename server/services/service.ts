import BaseRepository from "../repositories/baseRepository";

export default abstract class Service<T> {
  constructor(protected repository: BaseRepository<T>) {}

  async findOne(fields: Partial<T>): Promise<T | null> {
    return await this.repository.findOne(fields);
  }

  async create(item: T) {
    return await this.repository.create(item);
  }
}
