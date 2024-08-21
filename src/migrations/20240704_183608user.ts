import { SasatMigration, MigrationStore } from "sasat";

export default class User implements SasatMigration {
  up: (store: MigrationStore) => void = (store) => {
    store.createTable("user", (table) => {
      table.column("address").varchar(255).primary();
      table.createdAt();
    });
  };

  down: (store: MigrationStore) => void = (store) => {
    throw new Error("Down is not implemented on user");
  };
}
