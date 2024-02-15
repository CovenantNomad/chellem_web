import { TSaveDabarRecord } from "@/types/dabar.types"
import { Enums, Tables } from "@/types/database.types"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const supabase = createClientComponentClient<Database>()

export const getNoteCollections = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const { data } = await supabase
      .from('notes')
      .select("*")
      .eq('user_id', user.id)
  
      if (data) {
        return [
          { id: 0, name: '큐티노트', type: 'QT', num: data.filter(note => note.type === 'QT').length },
          { id: 1, name: '설교노트', type: 'SERMON', num: data.filter(note => note.type === 'SERMON').length },
          { id: 2, name: '감사노트', type: 'THANKS', num: data.filter(note => note.type === 'THANKS').length },
          { id: 3, name: '영성일기', type: 'DIARY', num: data.filter(note => note.type === 'DIARY').length },
          { id: 4, name: '묵상노트', type: 'CONTEMPLATION', num: data.filter(note => note.type === 'CONTEMPLATION').length },
        ]
      } else {
        return null

      }

    } else {
      return null

    }

  } catch (error) {
    console.error(error)
    return null

  }
}

export const getNotes = async (type: Enums<'NOTE_TYPE'>) => {
  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const { data } = await supabase
      .from('notes')
      .select("*")
      .eq('user_id', user.id)
      .eq('type', type)
      .order('date', { ascending: false })
      .returns<Tables<'notes'>[]>()
  
      return data 

    } else {
      return null

    }

  } catch (error) {
    console.error(error)
    return null

  }
}


export const getSearchNotesByKeyword = async ({ keyword }:{ keyword: string }) => {
  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const { data, error } = await supabase
      .from('notes')
      .select()
      .textSearch('content', `${keyword}`)

      return data 

    } else {

      return null
    }

  } catch (error) {
    console.error(error)
    return null

  }
}

