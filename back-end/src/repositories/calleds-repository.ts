import { Calleds, Prisma } from '@prisma/client'

export interface CreateProps {
  id?: string
  uid: string
  called_id: string
  branch_id: string
  call_date: Date
  description: string
  description_summary: string
  date_open: Date
  emergency: boolean
  scope: string
  priority: string
  messages_called: {
    name: string
    date: Date
    message: string
  }[]
}

export interface updateMessageCalledProps {
  messagesCalled: {
    name: string
    date: Date
    message: string
  }[]
  calledId: string
}

export interface CalledsRepository {
  create(data: Prisma.CalledsUncheckedCreateInput): Promise<Calleds>
  findByCalledId(calledId: string): Promise<CreateProps | null>
  updateMessageCalled({
    calledId,
    messagesCalled,
  }: updateMessageCalledProps): Promise<any>
}
