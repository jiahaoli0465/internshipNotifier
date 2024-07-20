import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://chbpqehacobwwcqjotjg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoYnBxZWhhY29id3djcWpvdGpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE0NTI4MDksImV4cCI6MjAzNzAyODgwOX0.8doe2icaVoDAwPxygpre6cdsjkzOb1PmCUKlY-KRqoA'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;