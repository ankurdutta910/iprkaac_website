// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eijrzxqqqhucpplebrxd.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpanJ6eHFxcWh1Y3BwbGVicnhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxNzMxMTMsImV4cCI6MjA4Mjc0OTExM30.oAfge9cQJFgS9eStrbqno3nYQZ1wELRnQi0UFKkJYzg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
