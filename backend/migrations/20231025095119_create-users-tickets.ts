import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.text("first_name").notNullable();
    table.text("last_name").notNullable();
    table.text("email").notNullable().unique();
    table.text("password").notNullable();
    table.boolean("admin_authorization").notNullable();
    table.boolean("user_authorization").notNullable();
    table.text("address").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
  });
  
  await knex.schema.createTable("tickets", (table) => {
    table.increments("id");
    table.integer("requester_id").unsigned();
    table.text("modules").notNullable();
    table.text("subject").notNullable();
    table.text("cs").notNullable();
    table.text("priority").notNullable();
    table.text("status").defaultTo(knex.raw("coalesce(??, 'Open')", ["status"])).notNullable();
    table.timestamp("last_message").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
    table.foreign("requester_id").references("users.id");
  });

}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("tickets");
  await knex.schema.dropTable("users");
}