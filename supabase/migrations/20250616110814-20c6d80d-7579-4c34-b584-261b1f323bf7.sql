
-- Create enum for subscription tiers
CREATE TYPE public.subscription_tier AS ENUM ('basic', 'pro', 'enterprise');

-- Create enum for license status
CREATE TYPE public.license_status AS ENUM ('active', 'expired', 'suspended', 'pending');

-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('admin', 'user');

-- Update profiles table to include role
ALTER TABLE public.profiles ADD COLUMN role user_role DEFAULT 'user';

-- Create subscribers table for subscription management
CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT false,
  subscription_tier subscription_tier,
  subscription_end TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create license_keys table
CREATE TABLE public.license_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key_value TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_tier subscription_tier NOT NULL,
  status license_status DEFAULT 'pending',
  expires_at TIMESTAMPTZ,
  activated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create orders table for payment tracking
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_session_id TEXT UNIQUE,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'usd',
  subscription_tier subscription_tier NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create admin_logs table for audit trail
CREATE TABLE public.admin_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  target_table TEXT,
  target_id UUID,
  details JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.license_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscribers
CREATE POLICY "Users can view their own subscription" ON public.subscribers
FOR SELECT USING (user_id = auth.uid() OR email = auth.email());

CREATE POLICY "Admins can view all subscriptions" ON public.subscribers
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "System can update subscriptions" ON public.subscribers
FOR UPDATE USING (true);

CREATE POLICY "System can insert subscriptions" ON public.subscribers
FOR INSERT WITH CHECK (true);

-- RLS Policies for license_keys
CREATE POLICY "Users can view their own license keys" ON public.license_keys
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can view all license keys" ON public.license_keys
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can manage license keys" ON public.license_keys
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "System can insert license keys" ON public.license_keys
FOR INSERT WITH CHECK (true);

-- RLS Policies for orders
CREATE POLICY "Users can view their own orders" ON public.orders
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can view all orders" ON public.orders
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "System can manage orders" ON public.orders
FOR ALL USING (true);

-- RLS Policies for admin_logs
CREATE POLICY "Admins can view admin logs" ON public.admin_logs
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "System can insert admin logs" ON public.admin_logs
FOR INSERT WITH CHECK (true);

-- Function to generate license key
CREATE OR REPLACE FUNCTION public.generate_license_key()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..20 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    IF i % 4 = 0 AND i < 20 THEN
      result := result || '-';
    END IF;
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to activate license key
CREATE OR REPLACE FUNCTION public.activate_license_key(key_value TEXT, user_email TEXT)
RETURNS JSONB AS $$
DECLARE
  license_record RECORD;
  user_record RECORD;
  result JSONB;
BEGIN
  -- Get user by email
  SELECT id INTO user_record FROM auth.users WHERE email = user_email;
  
  IF user_record IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'User not found');
  END IF;
  
  -- Get license key
  SELECT * INTO license_record FROM public.license_keys 
  WHERE key_value = activate_license_key.key_value AND status = 'pending';
  
  IF license_record IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'Invalid or already activated license key');
  END IF;
  
  -- Update license key
  UPDATE public.license_keys 
  SET 
    user_id = user_record.id,
    status = 'active',
    activated_at = now(),
    expires_at = now() + INTERVAL '1 year'
  WHERE id = license_record.id;
  
  -- Update or insert subscriber record
  INSERT INTO public.subscribers (user_id, email, subscribed, subscription_tier, subscription_end)
  VALUES (user_record.id, user_email, true, license_record.subscription_tier, now() + INTERVAL '1 year')
  ON CONFLICT (email) DO UPDATE SET
    subscribed = true,
    subscription_tier = license_record.subscription_tier,
    subscription_end = now() + INTERVAL '1 year',
    updated_at = now();
  
  RETURN jsonb_build_object('success', true, 'message', 'License activated successfully', 'tier', license_record.subscription_tier);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
