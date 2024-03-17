import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type error_type = { onrejected?: string }; 

prisma.$connect().then(() => {
  console.log('Connect on MongoDB');
}).catch((err: unknown) => {
  const error = err as error_type;

  console.log(error?.onrejected);
})

export default prisma;