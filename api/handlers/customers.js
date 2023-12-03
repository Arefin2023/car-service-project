import { knex } from "../util/knex.js";
import clerkClient from "@clerk/clerk-sdk-node";

export const adminGetCustomers = async (req, res) => {
  try {
    const customers = await knex("customers").select("*");
    return res.json(customers);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProfile = async (req, res) => {
  const id = req.auth?.claims?.sub;
  if (!id) {
    return res.status(400).json({ message: "Missing userId" });
  }

  try {
    let customer = await knex("customers").where({ id }).first();
    if (!customer) {
      const user = await clerkClient.users.getUser(id);
      const primaryEmailAddress = user.emailAddresses.find(
        (emailAddress) => emailAddress.id === user.primaryEmailAddressId
      );
      customer = await knex
        .insert({ id, email: primaryEmailAddress.emailAddress })
        .into("customers");
    }
    return res.json(customer);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  const { name, vehicleId, vehicleMake } = req.body;

  const id = req.auth?.claims?.sub;
  if (!id) {
    return res.status(400).json({ message: "Missing userId" });
  }
  console.log(req.auth);

  try {
    await knex("customers")
      .where({ id })
      .update({ name, vehicleId, vehicleMake });

    return res.json({ message: "Customer updated" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAppointmentsByCustomer = async (req, res) => {
  const id = req.auth?.claims?.sub;
  if (!id) {
    return res.status(400).json({ message: "Missing userId" });
  }

  try {
    const appointments = await knex("appointments")
      .where({ customerId: id })
      .select("*");
    return res.json(appointments);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createAppointment = async (req, res) => {
  const { service, startTime } = req.body;
  if (!service || !startTime) {
    return res.status(400).json({ message: "Missing service or startTime" });
  }
  const id = req.auth?.claims?.sub;
  if (!id) {
    return res.status(400).json({ message: "Missing userId" });
  }
  try {
    const appointment = await knex("appointments")
      .insert({ customerId: id, service, startTime })
      .returning("*");
    return res.json(appointment);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const rateAppointment = async (req, res) => {
  const { rating } = req.body;
  const { id } = req.params;
  const userId = req.auth?.claims?.sub;
  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }
  if (!rating) {
    return res.status(400).json({ message: "Missing rating" });
  }
  if (!id) {
    return res.status(400).json({ message: "Missing appointment id" });
  }
  try {
    const result = await knex("appointments")
      .where({ id, customerId: userId })
      .update({ rating });
    if (!result) {
      return res.status(400).json({ message: "Appointment not found" });
    }
    return res.json({ message: "Appointment updated" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const adminGetAppointments = async (req, res) => {
  console.log("adminGetAppointments");
  try {
    const appointments = await knex("appointments")
      .leftJoin("customers", "appointments.customerId", "customers.id")
      .select(
        "appointments.id",
        "appointments.service",
        "appointments.startTime",
        "appointments.customerId",
        "appointments.rating",
        "customers.name",
        "customers.email",
        "customers.vehicleId",
        "customers.vehicleMake"
      );

    const transformedAppointments = appointments.map((appointment) => {
      const { name, email, vehicleId, vehicleMake, customerId, ...rest } =
        appointment;
      return {
        ...rest,
        customer: {
          id: customerId,
          name,
          email,
          vehicleId,
          vehicleMake,
        },
      };
    });
    return res.json(transformedAppointments);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
