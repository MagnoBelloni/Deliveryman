import { prisma } from "../../../../database/prismaClient";

export class FindAllDeliveriesUseCase {
  async execute(id_client: string) {
    const deliveries = prisma.clients.findFirst({
      where: {
        id: id_client,
      },
      select: {
        Deliveries: true,
        username: true,
        id: true,
      },
    });

    return deliveries;
  }
}
