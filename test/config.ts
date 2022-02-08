import { connection } from "../src/database/connection";

beforeEach(async () => {
    await connection.create();
    await connection.clear();
});

afterEach(async () => {
  await connection.close();
});