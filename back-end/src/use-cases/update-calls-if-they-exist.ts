import { Calleds } from '../model/calleds'
import { CalledsRepository } from '../repositories/calleds-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateCallsIFTheyExistRequest {
  calledId: string
  messagesCalled: {
    name: string
    date: Date
    message: string
  }[]
}

interface UpdateCallsIFTheyExistResponse {
  called: Calleds
}

export class UpdateCallsIFTheyExistUseCase {
  constructor(private calledsRepository: CalledsRepository) {}

  async execute({
    calledId,
    messagesCalled,
  }: UpdateCallsIFTheyExistRequest): Promise<UpdateCallsIFTheyExistResponse> {
    const findByCalledId = await this.calledsRepository.findByCalledId(calledId)

    if (!findByCalledId) {
      throw new ResourceNotFoundError()
    }

    const called = await this.calledsRepository.updateMessageCalled({
      calledId,
      messagesCalled,
    })

    return { called }
  }
}
