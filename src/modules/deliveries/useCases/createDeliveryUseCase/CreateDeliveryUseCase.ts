import { prisma } from "../../../../database/prismaClient";

interface ICreateDelivery {
  id_client: string;
  item_name: string;
}

export class CreateDeliveryUseCase {
  async execute({ id_client, item_name }: ICreateDelivery) {
    if (id_client == "") {
      throw new Error("You must send a valid id_client!");
    }

    if (item_name == "") {
      throw new Error("You must send a valid item_name!");
    }

    const clientExist = await prisma.clients.findFirst({
      where: {
        id: {
          mode: "insensitive",
          equals: id_client,
        },
      },
    });

    if (!clientExist) {
      throw new Error("Client not found");
    }

    const delivery = await prisma.deliveries.create({
      data: {
        item_name,
        id_client,
      },
    });

    return delivery;
  }
}
