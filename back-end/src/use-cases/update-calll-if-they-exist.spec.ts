import { expect, test, describe, beforeEach } from 'vitest'
import { CreateCalledsUseCase } from './create-tickets'
import { InMemoriesCalledsRepository } from '../repositories/in-memories/in-memories-calleds-repository'
import { UpdateCallsIFTheyExistUseCase } from './update-calls-if-they-exist'

let calledsRepository: InMemoriesCalledsRepository
let sutCreateCalled: CreateCalledsUseCase
let sut: UpdateCallsIFTheyExistUseCase

describe('Update call if they exits', () => {
  beforeEach(async () => {
    calledsRepository = new InMemoriesCalledsRepository()
    sutCreateCalled = new CreateCalledsUseCase(calledsRepository)
    sut = new UpdateCallsIFTheyExistUseCase(calledsRepository)
  })

  test('It should be update call if exists', async () => {
    const { called } = await sutCreateCalled.execute({
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
      ],
    })

    await sut.execute({
      calledId: 'CHM1584204',
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
          name: 'Natalia de Macedo Santos teste 3',
          date: new Date('2023-06-20T12:02:00-03:00'),
          message:
            'Priscila, boa tarde.Pode nos auxiliar com a demanda, prestador informa: Será necessário orçamento para individualização dos drenos.Demanda não cabe mais a preventiva. Orçamento pendente.Att.',
        },
      ],
    })

    expect(called.messagesCalled).toEqual(
      expect.objectContaining([
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
          name: 'Natalia de Macedo Santos teste 3',
          date: new Date('2023-06-20T12:02:00-03:00'),
          message:
            'Priscila, boa tarde.Pode nos auxiliar com a demanda, prestador informa: Será necessário orçamento para individualização dos drenos.Demanda não cabe mais a preventiva. Orçamento pendente.Att.',
        },
      ]),
    )
  })
})
