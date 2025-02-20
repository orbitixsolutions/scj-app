import db from '@/lib/db'

export async function getStudents() {
  try {
    const STUDENTS = await db.students.findMany()
    return STUDENTS
  } catch {
    return null
  }
}

export async function getWorkshops() {
  try {
    const WORKSHOPS = await db.workshops.findMany()
    return WORKSHOPS
  } catch {
    return null
  }
}

export async function getInitialAssistances() {
  try {
    const ASSISTANCES = await db.initialAssistances.findMany()
    return ASSISTANCES
  } catch {
    return null
  }
}

export async function getAbsents() {
  try {
    const ABSENTS = await db.absents.findMany()
    return ABSENTS
  } catch {
    return null
  }
}
