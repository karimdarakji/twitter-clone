import BaseRepository from "../repositories/baseRepository";

export default abstract class Service<T> {
  constructor(protected repository: BaseRepository<T>) {}

  async findOne(fields: Partial<T>): Promise<T | null> {
    return await this.repository.findOne(fields);
  }

  async create(item: Partial<T>) {
    return await this.repository.create(item);
  }

  async update(_id: string, item: Partial<T>) {
    return await this.repository.update(_id, item);
  }
}
