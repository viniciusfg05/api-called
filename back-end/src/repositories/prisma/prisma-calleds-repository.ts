import { Prisma, Pet, Calleds } from "@prisma/client";
import {
  CalledsRepository,
  CreateProps,
  updateMessageCalledProps,
} from "../calleds-repository";
import { GetResult } from "@prisma/client/runtime";
import { prisma } from "../../lib/prisma";

export class PrismaCalledRepository implements CalledsRepository {
  async create(data: Prisma.CalledsUncheckedCreateInput): Promise<Calleds> {
    const called = await prisma.calleds.create({
      data
    });

    return called
  }

  findByCalledId(calledId: string): Promise<CreateProps | null> {
    throw new Error("Method not implemented.");
  }
  updateMessageCalled({
    calledId,
    messagesCalled,
  }: updateMessageCalledProps): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
