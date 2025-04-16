export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      pets: {
        Row: {
          id: string
          name: string
          species: string
          breed: string | null
          age: string | null
          gender: string | null
          description: string | null
          image_url: string | null
          location: string | null
          status: 'available' | 'adopted' | 'pending'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          species: string
          breed?: string | null
          age?: string | null
          gender?: string | null
          description?: string | null
          image_url?: string | null
          location?: string | null
          status?: 'available' | 'adopted' | 'pending'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          species?: string
          breed?: string | null
          age?: string | null
          gender?: string | null
          description?: string | null
          image_url?: string | null
          location?: string | null
          status?: 'available' | 'adopted' | 'pending'
          created_at?: string
          updated_at?: string
        }
      }
      volunteers: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string
          phone: string
          address: string
          experience: string | null
          availability: string
          interests: string
          status: 'pending' | 'approved' | 'rejected'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email: string
          phone: string
          address: string
          experience?: string | null
          availability: string
          interests: string
          status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          email?: string
          phone?: string
          address?: string
          experience?: string | null
          availability?: string
          interests?: string
          status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
          updated_at?: string
        }
      }
      donations: {
        Row: {
          id: string
          user_id: string
          amount: number
          payment_method: string
          status: 'pending' | 'completed' | 'failed'
          transaction_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          payment_method: string
          status?: 'pending' | 'completed' | 'failed'
          transaction_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          payment_method?: string
          status?: 'pending' | 'completed' | 'failed'
          transaction_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      adoptions: {
        Row: {
          id: string
          user_id: string
          pet_id: string
          status: 'pending' | 'approved' | 'rejected'
          application_date: string
          approval_date: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          pet_id: string
          status?: 'pending' | 'approved' | 'rejected'
          application_date?: string
          approval_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          pet_id?: string
          status?: 'pending' | 'approved' | 'rejected'
          application_date?: string
          approval_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          pet_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          pet_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          pet_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 