import { GetExistingNoteProps, TQtNoteData } from "@/types/worship.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient<Database>()

export const getTodayWorships = async (selectedDate: string) => {
  const { data: worship } = await supabase
  .from('worships')
  .select(`
    id,
    script,
    title,
    serviceDate,
    serviceType,
    invited_lecturer,
    pastors (
      id,
      name, 
      position
    )
  `).eq('serviceDateString', selectedDate)

  return worship
}

export const getBibleScriptList = async ({ book, firstChapter, secondChapter, firstStart, firstEnd, secondStart, secondEnd} : { book: string, firstChapter: string, secondChapter?: string, firstStart: number, firstEnd?: number, secondStart?: number, secondEnd?: number }) => {
  let tempVerseList = []

  if (book && firstChapter && firstStart) {
    if (secondChapter && secondStart) {
      
      if (secondEnd) {
        const { data: verseOne } = await supabase
          .from('bibles')
          .select('id, book, chapter, verse, content')
          .eq('book', book)
          .eq('chapter', firstChapter)
          .gte('verse', firstStart)
          .lte('verse', firstEnd)
        
        if (verseOne) {
          tempVerseList.push(...verseOne)
        }
  
        const { data: verseTwo } = await supabase
          .from('bibles')
          .select('id, book, chapter, verse, content')
          .eq('book', book)
          .eq('chapter', secondChapter)
          .gte('verse', secondStart)
          .lte('verse', secondEnd)
        
        if (verseTwo) {
          tempVerseList.push(...verseTwo)
        }
    
      } else {
        const { data: verseOne } = await supabase
          .from('bibles')
          .select('id, book, chapter, verse, content')
          .eq('book', book)
          .eq('chapter', firstChapter)
          .gte('verse', firstStart)
          .lte('verse', firstEnd)
        
        if (verseOne) {
          tempVerseList.push(...verseOne)
        }
  
        const { data: verseTwo } = await supabase
          .from('bibles')
          .select('id, book, chapter, verse, content')
          .eq('book', book)
          .eq('chapter', secondChapter)
          .eq('verse', secondStart)
  
        if (verseTwo) {
          tempVerseList.push(...verseTwo)
        }
      }

      return tempVerseList
  
    } else {
      if (firstEnd) {
        const { data: verse } = await supabase
          .from('bibles')
          .select('id, book, chapter, verse, content')
          .eq('book', book)
          .eq('chapter', firstChapter)
          .gte('verse', firstStart)
          .lte('verse', firstEnd)
        
        return verse
    
      } else {
        const { data: verse } = await supabase
          .from('bibles')
          .select('id, book, chapter, verse, content')
          .eq('book', book)
          .eq('chapter', firstChapter)
          .eq('verse', firstStart)
    
        return verse
      }
    }

  } else {

    return null
  }
    
}


export const createQtNote = async (NoteFormData: TQtNoteData) => {
  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      if (NoteFormData !== null) {
        const { data: existing, error: existingError } = await supabase
          .from("notes")
          .select("*")
          .eq("user_id", user.id)
          .eq("date", NoteFormData.date)
          .eq("type", NoteFormData.type)
          .single();

        if (!existing) {
          const { data: inserted, error: insertError } = await supabase
            .from("notes")
            .insert({
              user_id: user.id,
              type: NoteFormData.type,
              content: NoteFormData.content,
              date: NoteFormData.date,
              is_deleted: NoteFormData.is_deleted,
              updated_at: NoteFormData.updated_at,
              book: NoteFormData.book,
              chapters: NoteFormData.chapters,
              script: NoteFormData.script,
              service_type: NoteFormData.serviceType,
              title: NoteFormData.title
            })
            .single();

          return { data: inserted, error: insertError };
        } else {
          const { data: updated, error: updateError } = await supabase
            .from("notes")
            .update({
              date: NoteFormData.date,
              content: NoteFormData.content,
              title: NoteFormData.title,
              script: NoteFormData.script,
              book: NoteFormData.book,
              chapters: NoteFormData.chapters,
              updated_at: NoteFormData.updated_at,
            })
            .eq("id", existing.id)
            .single();

          return { data: updated, error: updateError };
        }

      } else {
        console.error('로그인 유저가 없습니다')
        throw new Error('로그인 유저가 없습니다')
      }
    }
    
  } catch (e) {
    console.error(e)
    throw new Error('서버와 통신 중 문제가 발생하였습니다')
  }
}

export const getExistingNote = async ({ date, type}: GetExistingNoteProps) => {
  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const { data: existing, error: existingError } = await supabase
        .from("notes")
        .select("*")
        .eq("user_id", user.id)
        .eq("date", date)
        .eq("type", type)
        .single();

      return { data: existing, error: existingError }

    } else {
      console.error('로그인 유저가 없습니다')
      throw new Error('로그인 유저가 없습니다')
    }

  } catch (error) {
    console.error(error)
    throw new Error('서버와 통신 중 문제가 발생하였습니다')
  }
  
}

export const createSimpleNote = async (NoteFormData: TQtNoteData) => {
  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      if (NoteFormData !== null) {
        const { data: existing, error: existingError } = await supabase
          .from("notes")
          .select("*")
          .eq("user_id", user.id)
          .eq("date", NoteFormData.date)
          .eq("type", NoteFormData.type)
          .single();

        if (!existing) {
          const { data: inserted, error: insertError } = await supabase
            .from("notes")
            .insert({
              user_id: user.id,
              type: NoteFormData.type,
              content: NoteFormData.content,
              date: NoteFormData.date,
              is_deleted: NoteFormData.is_deleted,
              updated_at: NoteFormData.updated_at,
              book: NoteFormData.book,
              chapters: NoteFormData.chapters,
              script: NoteFormData.script,
              service_type: NoteFormData.serviceType,
              title: NoteFormData.title
            })
            .single();

          return { data: inserted, error: insertError };
        } else {
          const { data: updated, error: updateError } = await supabase
            .from("notes")
            .update({
              date: NoteFormData.date,
              content: NoteFormData.content,
              title: NoteFormData.title,
              script: NoteFormData.script,
              book: NoteFormData.book,
              chapters: NoteFormData.chapters,
              updated_at: NoteFormData.updated_at,
            })
            .eq("id", existing.id)
            .single();

          return { data: updated, error: updateError };
        }

      } else {
        console.error('로그인 유저가 없습니다')
        throw new Error('로그인 유저가 없습니다')
      }
    }
    
  } catch (e) {
    console.error(e)
    throw new Error('서버와 통신 중 문제가 발생하였습니다')
  }
}