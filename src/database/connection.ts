import { createConnection, getConnection, getConnectionOptions } from 'typeorm';

const connection = {
  async create() {
    await createConnection();
  },

  async get() {
    await getConnection();
  },

  async getOptions() {
    await getConnectionOptions();
  },

  async close() {
    await getConnection().close(); 
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },
};
export { connection };