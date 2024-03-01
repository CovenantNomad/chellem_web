export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bibles: {
        Row: {
          book: Database["public"]["Enums"]["BOOK_TYPE"]
          chapter: string
          content: string
          id: string
          verse: number
          version: Database["public"]["Enums"]["VERSON_OF_BIBLE"]
        }
        Insert: {
          book: Database["public"]["Enums"]["BOOK_TYPE"]
          chapter: string
          content: string
          id?: string
          verse: number
          version?: Database["public"]["Enums"]["VERSON_OF_BIBLE"]
        }
        Update: {
          book?: Database["public"]["Enums"]["BOOK_TYPE"]
          chapter?: string
          content?: string
          id?: string
          verse?: number
          version?: Database["public"]["Enums"]["VERSON_OF_BIBLE"]
        }
        Relationships: []
      }
      dabar: {
        Row: {
          bible_reference: string
          book: Database["public"]["Enums"]["BOOK_TYPE"]
          capters: string
          collection_id: string
          created_at: string
          id: number
          scripture_passage: string
          verses: number[]
        }
        Insert: {
          bible_reference: string
          book: Database["public"]["Enums"]["BOOK_TYPE"]
          capters: string
          collection_id: string
          created_at?: string
          id?: number
          scripture_passage: string
          verses: number[]
        }
        Update: {
          bible_reference?: string
          book?: Database["public"]["Enums"]["BOOK_TYPE"]
          capters?: string
          collection_id?: string
          created_at?: string
          id?: number
          scripture_passage?: string
          verses?: number[]
        }
        Relationships: [
          {
            foreignKeyName: "dabar_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "dabar_collections"
            referencedColumns: ["id"]
          }
        ]
      }
      dabar_collections: {
        Row: {
          created_at: string
          id: string
          name: string
          releaseStatus: boolean
          theme: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          releaseStatus?: boolean
          theme?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          releaseStatus?: boolean
          theme?: string | null
        }
        Relationships: []
      }
      dabar_user_records: {
        Row: {
          created_at: string
          dabar_id: number
          id: string
          isMemorized: boolean
          user_id: string
        }
        Insert: {
          created_at?: string
          dabar_id: number
          id?: string
          isMemorized?: boolean
          user_id: string
        }
        Update: {
          created_at?: string
          dabar_id?: number
          id?: string
          isMemorized?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dabar_user_records_dabar_id_fkey"
            columns: ["dabar_id"]
            isOneToOne: false
            referencedRelation: "dabar"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dabar_user_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      notes: {
        Row: {
          book: Database["public"]["Enums"]["BOOK_TYPE"] | null
          chapters: string[] | null
          content: string
          created_at: string
          date: string
          deleted_at: string | null
          id: string
          is_deleted: boolean
          script: string | null
          service_type: Database["public"]["Enums"]["SERVICE_TYPE"] | null
          tags: string[] | null
          title: string | null
          type: Database["public"]["Enums"]["NOTE_TYPE"]
          updated_at: string
          user_id: string
        }
        Insert: {
          book?: Database["public"]["Enums"]["BOOK_TYPE"] | null
          chapters?: string[] | null
          content: string
          created_at?: string
          date: string
          deleted_at?: string | null
          id?: string
          is_deleted?: boolean
          script?: string | null
          service_type?: Database["public"]["Enums"]["SERVICE_TYPE"] | null
          tags?: string[] | null
          title?: string | null
          type: Database["public"]["Enums"]["NOTE_TYPE"]
          updated_at?: string
          user_id: string
        }
        Update: {
          book?: Database["public"]["Enums"]["BOOK_TYPE"] | null
          chapters?: string[] | null
          content?: string
          created_at?: string
          date?: string
          deleted_at?: string | null
          id?: string
          is_deleted?: boolean
          script?: string | null
          service_type?: Database["public"]["Enums"]["SERVICE_TYPE"] | null
          tags?: string[] | null
          title?: string | null
          type?: Database["public"]["Enums"]["NOTE_TYPE"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      pastors: {
        Row: {
          id: number
          name: string
          position: string | null
        }
        Insert: {
          id?: number
          name: string
          position?: string | null
        }
        Update: {
          id?: number
          name?: string
          position?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string
          email: string | null
          id: string
          name: string | null
          username: string
        }
        Insert: {
          avatar_url: string
          email?: string | null
          id: string
          name?: string | null
          username: string
        }
        Update: {
          avatar_url?: string
          email?: string | null
          id?: string
          name?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tags: {
        Row: {
          created_at: string
          id: string
          note_id: string | null
          tag: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          note_id?: string | null
          tag?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          note_id?: string | null
          tag?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tags_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tags_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      worships: {
        Row: {
          book: Database["public"]["Enums"]["BOOK_TYPE"] | null
          chapter: string[] | null
          created_at: string
          id: string
          invited_lecturer: string | null
          pastor_id: number
          script: string | null
          serviceDate: string
          serviceDateString: string
          serviceType: Database["public"]["Enums"]["SERVICE_TYPE"]
          title: string | null
          verses: number[] | null
          youtube_url: string | null
        }
        Insert: {
          book?: Database["public"]["Enums"]["BOOK_TYPE"] | null
          chapter?: string[] | null
          created_at?: string
          id?: string
          invited_lecturer?: string | null
          pastor_id: number
          script?: string | null
          serviceDate: string
          serviceDateString: string
          serviceType: Database["public"]["Enums"]["SERVICE_TYPE"]
          title?: string | null
          verses?: number[] | null
          youtube_url?: string | null
        }
        Update: {
          book?: Database["public"]["Enums"]["BOOK_TYPE"] | null
          chapter?: string[] | null
          created_at?: string
          id?: string
          invited_lecturer?: string | null
          pastor_id?: number
          script?: string | null
          serviceDate?: string
          serviceDateString?: string
          serviceType?: Database["public"]["Enums"]["SERVICE_TYPE"]
          title?: string | null
          verses?: number[] | null
          youtube_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "worships_pastor_id_fkey"
            columns: ["pastor_id"]
            isOneToOne: false
            referencedRelation: "pastors"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      BOOK_TYPE:
        | "Gen"
        | "Ex"
        | "Lev"
        | "Num"
        | "Deut"
        | "Josh"
        | "Judg"
        | "Ruth"
        | "1 Sam"
        | "2 Sam"
        | "1 Kings"
        | "2 Kings"
        | "1 Chron"
        | "2 Chron"
        | "Ezra"
        | "Neh"
        | "Esth"
        | "Job"
        | "Ps"
        | "Prov"
        | "Eccl"
        | "Song"
        | "Isa"
        | "Jer"
        | "Lam"
        | "Ezek"
        | "Dan"
        | "Hos"
        | "Joel"
        | "Amos"
        | "Obad"
        | "Jonah"
        | "Mic"
        | "Nah"
        | "Hab"
        | "Zeph"
        | "Hag"
        | "Zech"
        | "Mal"
        | "Matt"
        | "Mark"
        | "Luke"
        | "John"
        | "Acts"
        | "Rom"
        | "1 Cor"
        | "2 Cor"
        | "Gal"
        | "Eph"
        | "Phil"
        | "Col"
        | "1 Thess"
        | "2 Thess"
        | "1 Tim"
        | "2 Tim"
        | "Titus"
        | "Philem"
        | "Heb"
        | "James"
        | "1 Pet"
        | "2 Pet"
        | "1 John"
        | "2 John"
        | "3 John"
        | "Jude"
        | "Rev"
      NOTE_TYPE: "QT" | "SERMON" | "THANKS" | "DIARY" | "CONTEMPLATION"
      SERVICE_TYPE:
        | "SUNDAY SERVICE"
        | "WEDNESDAY SERVICE"
        | "FRIDAY SERVICE"
        | "DAYBREAK SERVICE"
        | "NEW MOON SERVICE"
        | "SPECIAL DAYBREAK SERVICE"
        | "SPECIAL SERVICE"
      VERSON_OF_BIBLE:
        | "개역한글"
        | "개역개정"
        | "표준새번역"
        | "KJV"
        | "NIV"
        | "NLT"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
