-- Dashboard Realtime Migration
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/jxhlckuvkofnlvhxqhoa/sql
-- This script enables Realtime on your existing multi-agent dashboard tables

-- No table creation needed - they already exist!
-- Just enabling Realtime for live updates on the dashboard

-- ============================================
-- ENABLE REALTIME FOR ALL DASHBOARD TABLES
-- ============================================
-- This enables live updates on the dashboard via Supabase Realtime

-- Enable Realtime on all dashboard tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.agents;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tasks;
ALTER PUBLICATION supabase_realtime ADD TABLE public.task_assignees;
ALTER PUBLICATION supabase_realtime ADD TABLE public.documents;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.activities;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- That's it! Your dashboard will now receive live updates when any of these tables change.
