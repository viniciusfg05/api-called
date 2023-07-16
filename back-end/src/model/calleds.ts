import { randomUUID } from 'node:crypto'

export class Calleds {
  id?: string
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

  constructor() {
    if (!this.id) {
      this.id = randomUUID()
    }
  }
}
