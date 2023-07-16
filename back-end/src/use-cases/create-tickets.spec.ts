import { expect, test, describe, beforeEach } from 'vitest'
import { CreateCalledsUseCase } from './create-tickets'
import { InMemoriesCalledsRepository } from '../repositories/in-memories/in-memories-calleds-repository'
import { UpdateCallsIFTheyExistUseCase } from './update-calls-if-they-exist'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let calledsRepository: InMemoriesCalledsRepository
let sut: CreateCalledsUseCase

let sutUpdated: UpdateCallsIFTheyExistUseCase

describe('Create calleds', () => {
  beforeEach(async () => {
    calledsRepository = new InMemoriesCalledsRepository()
    sut = new CreateCalledsUseCase(calledsRepository)
  })

  test('It should be create an called', async () => {
    const { called } = await sut.execute({
      uid: 9329,
      calledId: 'CHM1584204',
      branchId: 'DS1741',
      callDate: new Date('2023-06-20T15:02:13.000Z'),
      description:
        'Estamos com dois ar condicionados pingando na loja , o pessoal já veio na loja porem o problema persiste.',
      descriptionSummary: 'Ar Condicionado - Máquinas Pingando',
      dataOpen: '2023-03-04T08:47:00-03:00Z',
      emergency: true,
      scope: 'Corretiva',
      priority: 'Alto',
      messagesCalled: [
        {
          name: 'Priscila Vieira de Andrade',
          date: new Date('2023-06-20T12:02:00-03:00'),
          message:
            'Temos um retorno .Aguardando orçamento de individualização de dreno.Atte',
        },
        {
          name: 'Priscila Vieira de Andrade',
          date: new Date('2023-06-20T12:02:00-03:00'),
          message:
            'Olá, bom dia!Poderia analisar o chamado e nos encaminhar orçamento.Ficamos no aguardo.Att.',
        },
        {
          name: 'Natalia de Macedo Santos',
          date: new Date('2023-06-20T12:02:00-03:00'),
          message:
            'Priscila, boa tarde.Pode nos auxiliar com a demanda, prestador informa: Será necessário orçamento para individualização dos drenos.Demanda não cabe mais a preventiva. Orçamento pendente.Att.',
        },
      ],
    })

    expect(called.id).toEqual(await expect.any(String))
  })

  test('It should be update call if exists', async () => {
    calledsRepository = new InMemoriesCalledsRepository()
    sut = new CreateCalledsUseCase(calledsRepository)

    sutUpdated = new UpdateCallsIFTheyExistUseCase(calledsRepository)

    const { called } = await sut.execute({
      uid: 9329,
      calledId: 'CHM1584203',
      branchId: 'DS1741',
      callDate: new Date('2023-06-20T15:02:13.000'),
      description:
        'Estamos com dois ar condicionados pingando na loja , o pessoal já veio na loja porem o problema persiste.',
      descriptionSummary: 'Ar Condicionado - Máquinas Pingando',
      dataOpen: '2023-03-04T08:47:00-03:00Z',
      emergency: true,
      scope: 'Corretiva',
      priority: 'Alto',
      messagesCalled: [
        {
          name: 'test 1',
          date: new Date('2023-06-20T12:02:00-03:00'),
          message:
            'Temos um retorno .Aguardando orçamento de individualização de dreno.Atte',
        },
      ],
    })

    await sutUpdated.execute({
      calledId: 'CHM1584203',
      messagesCalled: [
        {
          name: 'test 1',
          date: new Date('2023-06-20T12:02:00-03:00Z'),
          message:
            'Temos um retorno .Aguardando orçamento de individualização de dreno.Atte',
        },
        {
          name: 'test 2',
          date: new Date('2023-06-20T12:02:00-03:00Z'),
          message:
            'Temos um retorno .Aguardando orçamento de individualização de dreno.Atte',
        },
        {
          name: 'test 3',
          date: new Date('2023-06-20T12:02:00-03:00Z'),
          message:
            'Temos um retorno .Aguardando orçamento de individualização de dreno.Atte',
        },
      ],
    })

    expect(called.messagesCalled).toEqual(
      expect.objectContaining([
        {
          name: 'test 1',
          date: new Date('2023-06-20T12:02:00-03:00Z'),
          message:
            'Temos um retorno .Aguardando orçamento de individualização de dreno.Atte',
        },
        {
          name: 'test 2',
          date: new Date('2023-06-20T12:02:00-03:00Z'),
          message:
            'Temos um retorno .Aguardando orçamento de individualização de dreno.Atte',
        },
        {
          name: 'test 3',
          date: new Date('2023-06-20T12:02:00-03:00Z'),
          message:
            'Temos um retorno .Aguardando orçamento de individualização de dreno.Atte',
        },
      ]),
    )
  })

  test('it should not be possible to update a non-existent ticket', async () => {
    calledsRepository = new InMemoriesCalledsRepository()
    sut = new CreateCalledsUseCase(calledsRepository)

    sutUpdated = new UpdateCallsIFTheyExistUseCase(calledsRepository)

    await sut.execute({
      uid: 9329,
      calledId: 'CHM1584203',
      branchId: 'DS1741',
      callDate: new Date('2023-06-20T15:02:13.000'),
      description:
        'Estamos com dois ar condicionados pingando na loja , o pessoal já veio na loja porem o problema persiste.',
      descriptionSummary: 'Ar Condicionado - Máquinas Pingando',
      dataOpen: '2023-03-04T08:47:00-03:00Z',
      emergency: true,
      scope: 'Corretiva',
      priority: 'Alto',
      messagesCalled: [
        {
          name: 'test 1',
          date: new Date('2023-06-20T12:02:00-03:00'),
          message:
            'Temos um retorno .Aguardando orçamento de individualização de dreno.Atte',
        },
      ],
    })

    expect(() =>
      sutUpdated.execute({
        calledId: 'CHM1584204',
        messagesCalled: [
          {
            name: 'test 1',
            date: new Date('2023-06-20T12:02:00-03:00Z'),
            message:
              'Temos um retorno .Aguardando orçamento de individualização de dreno.Atte',
          },
          {
            name: 'test 2',
            date: new Date('2023-06-20T12:02:00-03:00Z'),
            message:
              'Temos um retorno .Aguardando orçamento de individualização de dreno.Atte',
          },
          {
            name: 'test 3',
            date: new Date('2023-06-20T12:02:00-03:00Z'),
            message:
              'Temos um retorno .Aguardando orçamento de individualização de dreno.Atte',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
