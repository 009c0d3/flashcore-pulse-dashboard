
-- Drop existing trigger and function if they exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create table for dashboard activity logs
CREATE TABLE public.dashboard_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  action TEXT NOT NULL,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on dashboard_logs
ALTER TABLE public.dashboard_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own logs
CREATE POLICY "Users can view their own logs"
  ON public.dashboard_logs
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy for users to insert their own logs
CREATE POLICY "Users can create their own logs"
  ON public.dashboard_logs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create table for mail activity tracking
CREATE TABLE public.mail_activity (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email_type TEXT NOT NULL,
  recipient_email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'sent',
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on mail_activity
ALTER TABLE public.mail_activity ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own mail activity
CREATE POLICY "Users can view their own mail activity"
  ON public.mail_activity
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy for users to insert their own mail activity
CREATE POLICY "Users can create their own mail activity"
  ON public.mail_activity
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create table for user progress tracking
CREATE TABLE public.user_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  current_rank TEXT NOT NULL DEFAULT 'Bronze',
  mails_sent INTEGER NOT NULL DEFAULT 0,
  progress_percentage INTEGER NOT NULL DEFAULT 0,
  referral_count INTEGER NOT NULL DEFAULT 0,
  referral_earnings DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  total_earnings DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on user_progress
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own progress
CREATE POLICY "Users can view their own progress"
  ON public.user_progress
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy for users to update their own progress
CREATE POLICY "Users can update their own progress"
  ON public.user_progress
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policy for users to insert their own progress
CREATE POLICY "Users can insert their own progress"
  ON public.user_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Enhanced function to handle new user creation (profiles + progress)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'firstName', NEW.raw_user_meta_data ->> 'lastName');
  
  -- Insert into user_progress table
  INSERT INTO public.user_progress (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user handling
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
