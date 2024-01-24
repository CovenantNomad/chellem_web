import { Enums } from "./database.types"

export type TWorshipCard = {
  id: string;
  script : string | null;
  title: string | null;
  serviceDate : string;
  serviceType : Enums<'SERVICE_TYPE'>;
  pastors: { id: number; name: string; position: string | null; } | null;
  invited_lecturer: string | null;
}

export type TWorshipData = {
  id: string
  serviceType: Database["public"]["Enums"]["SERVICE_TYPE"]
  pastor_id: number
  book: Database["public"]["Enums"]["BOOK_TYPE"] | null
  chapter: string[] | null
  created_at: string
  invited_lecturer: string | null
  script: string | null
  serviceDate: string
  serviceDateString: string
  title: string | null
  verses: string[] | null
  youtube_url: string
  pastors: { id: number, name: string, position: string }
}

export type TQtNoteData = {
  type: Database["public"]["Enums"]["NOTE_TYPE"]
  content: string
  date: string
  is_deleted: boolean
  updated_at?: string
  book: Database["public"]["Enums"]["BOOK_TYPE"] | null
  chapters: string[] | null
  script: string | null
  serviceType: Database["public"]["Enums"]["SERVICE_TYPE"] | null
  title: string | null
}

export type GetExistingNoteProps = {
  type: Database["public"]["Enums"]["NOTE_TYPE"]
  date: string
}