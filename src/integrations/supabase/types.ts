export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      events: {
        Row: {
          city: string | null
          created_at: string
          date: string
          id: string
          is_active: boolean
          list_url: string | null
          partner_id: string | null
          partner_name_cache: string | null
          ticket_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          city?: string | null
          created_at?: string
          date: string
          id?: string
          is_active?: boolean
          list_url?: string | null
          partner_id?: string | null
          partner_name_cache?: string | null
          ticket_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          city?: string | null
          created_at?: string
          date?: string
          id?: string
          is_active?: boolean
          list_url?: string | null
          partner_id?: string | null
          partner_name_cache?: string | null
          ticket_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      mediakit: {
        Row: {
          audience_age: string | null
          audience_gender: string | null
          audience_regions: string[] | null
          bio: string | null
          contact_label: string | null
          contact_url: string | null
          id: number
          location: string | null
          updated_at: string
        }
        Insert: {
          audience_age?: string | null
          audience_gender?: string | null
          audience_regions?: string[] | null
          bio?: string | null
          contact_label?: string | null
          contact_url?: string | null
          id?: number
          location?: string | null
          updated_at?: string
        }
        Update: {
          audience_age?: string | null
          audience_gender?: string | null
          audience_regions?: string[] | null
          bio?: string | null
          contact_label?: string | null
          contact_url?: string | null
          id?: number
          location?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      mediakit_formats: {
        Row: {
          created_at: string
          description: string | null
          id: string
          position: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          position?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          position?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      mediakit_stats: {
        Row: {
          created_at: string
          handle: string | null
          id: string
          platform: string
          position: number
          updated_at: string
          value: string | null
        }
        Insert: {
          created_at?: string
          handle?: string | null
          id?: string
          platform: string
          position?: number
          updated_at?: string
          value?: string | null
        }
        Update: {
          created_at?: string
          handle?: string | null
          id?: string
          platform?: string
          position?: number
          updated_at?: string
          value?: string | null
        }
        Relationships: []
      }
      partners: {
        Row: {
          accent: string | null
          city: string | null
          contact_url: string | null
          created_at: string
          id: string
          instagram: string | null
          is_active: boolean
          logo_url: string | null
          name: string
          position: number
          slug: string
          tagline: string | null
          updated_at: string
        }
        Insert: {
          accent?: string | null
          city?: string | null
          contact_url?: string | null
          created_at?: string
          id?: string
          instagram?: string | null
          is_active?: boolean
          logo_url?: string | null
          name: string
          position?: number
          slug: string
          tagline?: string | null
          updated_at?: string
        }
        Update: {
          accent?: string | null
          city?: string | null
          contact_url?: string | null
          created_at?: string
          id?: string
          instagram?: string | null
          is_active?: boolean
          logo_url?: string | null
          name?: string
          position?: number
          slug?: string
          tagline?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      short_links: {
        Row: {
          clicks: number
          created_at: string
          destination_url: string
          id: string
          is_active: boolean
          slug: string
          updated_at: string
        }
        Insert: {
          clicks?: number
          created_at?: string
          destination_url: string
          id?: string
          is_active?: boolean
          slug: string
          updated_at?: string
        }
        Update: {
          clicks?: number
          created_at?: string
          destination_url?: string
          id?: string
          is_active?: boolean
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          avatar_url: string | null
          bio: string | null
          business_contact_label: string | null
          business_contact_url: string | null
          display_name: string | null
          id: number
          location: string | null
          meta_description: string | null
          meta_title: string | null
          site_name: string | null
          tagline_short: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          business_contact_label?: string | null
          business_contact_url?: string | null
          display_name?: string | null
          id?: number
          location?: string | null
          meta_description?: string | null
          meta_title?: string | null
          site_name?: string | null
          tagline_short?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          business_contact_label?: string | null
          business_contact_url?: string | null
          display_name?: string | null
          id?: number
          location?: string | null
          meta_description?: string | null
          meta_title?: string | null
          site_name?: string | null
          tagline_short?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      socials: {
        Row: {
          created_at: string
          handle: string
          id: string
          is_active: boolean
          platform: string
          position: number
          updated_at: string
          url: string | null
          youtube_video_id: string | null
        }
        Insert: {
          created_at?: string
          handle: string
          id?: string
          is_active?: boolean
          platform: string
          position?: number
          updated_at?: string
          url?: string | null
          youtube_video_id?: string | null
        }
        Update: {
          created_at?: string
          handle?: string
          id?: string
          is_active?: boolean
          platform?: string
          position?: number
          updated_at?: string
          url?: string | null
          youtube_video_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
    },
  },
} as const
