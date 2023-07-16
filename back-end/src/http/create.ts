import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaCalledRepository } from '../repositories/prisma/prisma-calleds-repository'
import { CreateCalledsUseCase } from '../use-cases/create-tickets'

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const {
    branchId,
    callDate,
    calledId,
    dataOpen,
    description,
    descriptionSummary,
    emergency,
    messagesCalled,
    priority,
    scope,
    uid,
  } = req.body

  const calledRepository = new PrismaCalledRepository()
  const userCase = new CreateCalledsUseCase(calledRepository)

  const { pet } = await userCase.execute({
    branchId,
    callDate,
    calledId,
    dataOpen,
    description,
    descriptionSummary,
    emergency,
    messagesCalled,
    priority,
    scope,
    uid,
  })

  return reply
    .setCookie('pet_id', pet.id, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true, // acessado apenas pelo back-end
    })
    .status(201)
    .send({ pet })
}
