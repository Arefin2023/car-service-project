import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const ralf = await prisma.customer.upsert({
    where: { email: 'ralf@actyvyst.com' },
    update: {},
    create: {
      email: 'ralf@actyvyst.com',
      name: 'Ralf Siewert',
      cars: {
        create: [
          {
            model: 'Volvo V70',
            vehicleId: '12345',
          },
        ],
      },
    },
  });

  const sascha = await prisma.customer.upsert({
    where: { email: 'sascha@actyvyst.com' },
    update: {},
    create: {
      email: 'sascha@actyvyst.com',
      name: 'Sascha Rose',
      cars: {
        create: [
          {
            model: 'Audi TT',
            vehicleId: '23456',
          },
        ],
      },
    },
  });

  const appointments = [
    {
      customerId: ralf.id,
      service: 'oil change',
      start: '2023-11-24T16:00:00.000Z',
      end: '2023-11-24T18:00:00.000Z',
      vehicleId: '12345',
    },
    {
      customerId: ralf.id,
      service: 'brake repair',
      start: '2023-12-03T10:00:00.000Z',
      end: '2023-12-03T14:00:00.000Z',
      vehicleId: '12345',
    },
    {
      customerId: ralf.id,
      service: 'wheel alignment',
      start: '2023-12-04T14:00:00.000Z',
      end: '2023-12-04T15:00:00.000Z',
      vehicleId: '12345',
    },
    {
      customerId: sascha.id,
      service: 'filter change',
      start: '2023-11-29T13:00:00.000Z',
      end: '2023-11-29T14:00:00.000Z',
      vehicleId: '23456',
    },
    {
      customerId: sascha.id,
      service: 'brake repair',
      start: '2023-12-06T09:00:00.000Z',
      end: '2023-12-06T09:00:00.000Z',
      vehicleId: '23456',
    },
  ];
  for (const appointment of appointments) {
    await prisma.appointment.create({
      data: appointment,
    });
  }

  console.log({ ralf, sascha });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
