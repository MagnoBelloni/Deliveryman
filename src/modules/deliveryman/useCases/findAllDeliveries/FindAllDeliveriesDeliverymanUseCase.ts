import { prisma } from "../../../../database/prismaClient";

export class FindAllDeliveriesDeliverymanUseCase {
  async execute(id_deliveryman: string) {
    const deliveries = prisma.deliveryman.findFirst({
      where: {
        id: id_deliveryman,
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
