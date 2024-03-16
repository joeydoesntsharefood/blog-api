import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma.$connect().then(() => {
  console.log('Connect on MongoDB');
}).catch((err: { onrejected?: ((reason: any) => void | PromiseLike<void>) | null | undefined }) => {
  console.log(err?.onrejected);
})

export default prisma;