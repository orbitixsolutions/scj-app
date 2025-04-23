export type WorkshopListProps = {
  workshops: {
    id: string
    createdAt: Date
    updatedAt: Date
    studentId: string
    workshopId: string
  }[]
}
