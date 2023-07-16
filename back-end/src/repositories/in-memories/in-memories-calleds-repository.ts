import { randomUUID } from 'crypto'
import {
  CalledsRepository,
  CreateProps,
  updateMessageCalledProps,
} from '../calleds-repository'
import { Calleds, Prisma } from '@prisma/client'

interface CreateCalledProps {
  id: string
  branch_id: string
  call_date: Date
  called_id: string
  date_open: Date
  description: string
  description_summary: string
  emergency: Boolean
  messages: {
    name: string
    date: Date
    message: string
  }[]
  priority: string
  scope: string
  uid: string
}

export class InMemoriesCalledsRepository implements CalledsRepository {
  public items: CreateProps[] = []

  async create(data: Prisma.CalledsCreateInput): Promise<Calleds> {
    const called = {
      id: randomUUID(),
      branch_id: data.branch_id,
      call_date: new Date(data.call_date),
      called_id: data.called_id,
      date_open: new Date(data.date_open),
      description: data.description,
      description_summary: data.description_summary,
      emergency: data.emergency,
      priority: data.priority,
      scope: data.scope,
      uid: String(data.uid),
      messages_called: data.me,
    }

    this.items.push(called)

    return called
  }

  async findByCalledId(calledId: string): Promise<CreateProps | null> {
    const called = this.items.find((called) => called.calledId === calledId)

    if (!called) {
      return null
    }

    return called
  }

  async updateMessageCalled({
    calledId,
    messagesCalled,
  }: updateMessageCalledProps): Promise<any> {
    const calledIndex = this.items.findIndex(
      (item) => item.calledId === calledId,
    )

    if (calledIndex >= 0) {
      this.items[calledIndex].messagesCalled = messagesCalled
    }

    return calledIndex
  }
}
