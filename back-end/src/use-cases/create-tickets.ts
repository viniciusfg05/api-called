import { Calleds } from '../model/calleds'
import { CalledsRepository } from '../repositories/calleds-repository'

interface CreateCalledsUseCaseRequest {
  uid: number
  calledId: string
  branchId: string
  callDate: Date
  description: string
  descriptionSummary: string
  dataOpen: string
  emergency: boolean
  scope: string
  priority: string
  messagesCalled: {
    name: string
    date: Date
    message: string
  }[]
}

interface CreateCalledsUseCaseResponse {
  called: Calleds
}

export class CreateCalledsUseCase {
  constructor(private calledsRepository: CalledsRepository) {}

  async execute({
    callDate,
    calledId,
    dataOpen,
    description,
    descriptionSummary,
    emergency,
    branchId,
    messagesCalled,
    priority,
    scope,
    uid,
  }: CreateCalledsUseCaseRequest): Promise<CreateCalledsUseCaseResponse> {
    const findByCalledId = await this.calledsRepository.findByCalledId(calledId)

    if (findByCalledId) {
      const called = await this.calledsRepository.updateMessageCalled({
        calledId,
        messagesCalled,
      })

      return called
    }

    const called = await this.calledsRepository.create({
      callDate,
      calledId,
      dataOpen,
      description,
      descriptionSummary,
      emergency,
      branchId,
      messagesCalled,
      priority,
      scope,
      uid,
    })

    return { called }
  }
}
