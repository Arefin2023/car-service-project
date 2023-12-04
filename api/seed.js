// import knexBuilder from "knex";

// const knex = knexBuilder({
//   client: "better-sqlite3",
//   connection: {
//     filename: "./db/car-service-db.sqlite",
//   },
// });
import "dotenv/config";
import clerkClient from "@clerk/clerk-sdk-node";
import { knex } from "./util/knex.js";

const userData = {
  "ralf.siewert@actyvyst.com": {
    name: "Ralf Siewert",
    vehicleId: "12345",
    vehicleMake: "BMW",
  },

  "arefin.hasnat@gmail.com": {
    name: "Arefin Hasnat",
    vehicleId: "34567",
    vehicleMake: "Mercedes",
  },
};

await knex.schema.dropTableIfExists("appointments");
await knex.schema.dropTableIfExists("customers");

await knex.schema.createTable("customers", function (table) {
  table.string("id").primary();
  table.string("email").notNullable().unique();
  table.string("name");
  table.string("vehicleId");
  table.string("vehicleMake");
});

await knex.schema.createTable("appointments", function (table) {
  table.increments();
  table.string("customerId").references("id").inTable("customers");
  table.string("service");
  table.dateTime("startTime");
  table.integer("rating");
});

const users = await clerkClient.users.getUserList({
  orderBy: "-created_at",
  limit: 10,
});
console.log("users");
console.log(users.map((user) => user.emailAddresses));

for (const user of users) {
  const primaryEmailAddress = user.emailAddresses.find(
    (emailAddress) => emailAddress.id === user.primaryEmailAddressId
  );
  const customer = userData[primaryEmailAddress.emailAddress];
  console.log("customer", customer);
  if (!customer) {
    continue;
  }
  await knex("customers").insert({
    id: user.id,
    name: user.fullName,
    email: primaryEmailAddress.emailAddress,
    ...customer,
  });
  await knex("appointments").insert({
    customerId: user.id,
    service: "Oil Change",
    startTime: "2021-06-01T09:00:00.000Z",
  });
}

await knex.destroy();
