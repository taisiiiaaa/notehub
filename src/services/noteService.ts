import axios from "axios"
import type { CreateNote, Note } from "../types/note"

interface Response {
  notes: Note[]
  totalPages: number
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` },
})

export const fetchNotes = async (
  page: number,
  search: string,
): Promise<Response> => {
  const { data } = await api.get<Response>("/notes", {
    params: { page, search, perPage: 12 },
  })

  console.log("API response:", data)

  return data
}

export const createNote = async (newNote: CreateNote): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", newNote)

  return data
}

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${noteId}`)

  return data
}
