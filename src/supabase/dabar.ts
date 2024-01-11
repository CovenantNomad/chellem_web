import { TSaveDabarRecord } from "@/types/dabar.types"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const supabase = createClientComponentClient<Database>()

export const getDabarCollections = async () => {
  const { data: dabar_collections } = await supabase
  .from('dabar_collections')
  .select('*')

  return dabar_collections
}

export const getDabarsByCollectionId = async (slug: string) => {
  const { data: dabarCollection } = await supabase
  .from('dabar')
  .select('*')
  .eq('collection_id', slug)
  .order('id')

  return dabarCollection
}

export const getDabarById =async (id: string) => {
  return await supabase
  .from('dabar')
  .select('scripture_passage, bible_reference')
  .eq('id', id)
  .single()
}

export const createDabarRecord = async (data: TSaveDabarRecord) => {
  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const { data: dabarRecord } = await supabase
      .from("dabar_user_records")
      .select('*')
      .eq('dabar_id', data.dabar_id)
      .eq('user_id', user.id,)
      .single()

      if (dabarRecord === null) {
        const { data: result, error } = await supabase.from("dabar_user_records").insert({
          user_id: user.id,
          dabar_id: data.dabar_id,
          isMemorized: data.isMemorized,
        })

        if (result) {
          return {
            success: true,
            message: "다바르 암송기록을 저장하였습니다."
          }
        } 

        if (error) {
          return {
            success: false,
            message: '다바르 암송기록이 저장되지 못했습니다.'
          }
        }
      } else {
        return 
      }
    }
    
  } catch (e) {
    return {
      success: false,
      message: '다바르 암송기록이 저장되지 못했습니다.'
    }
  }
}

export const getDabarRecords = async () => {
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    return await supabase
    .from('dabar_user_records')
    .select(`
      *,
      dabar (
        *,
        dabar_collections (
          *
        )
      )
    `)
    .eq('user_id', user.id)
  }
}