-- Enable required extensions
create extension if not exists "moddatetime" schema extensions;

-- Create donations table
create table if not exists public.donations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id),
  amount decimal not null check (amount > 0),
  donor_name text not null,
  donor_email text not null,
  message text,
  status text not null default 'pending' check (status in ('pending', 'completed', 'failed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.donations enable row level security;

-- Create policies
create policy "Users can view their own donations"
  on public.donations for select
  using (auth.uid() = user_id);

create policy "Users can insert their own donations"
  on public.donations for insert
  with check (auth.uid() = user_id);

-- Create updated_at trigger
create trigger handle_updated_at before update on public.donations
  for each row execute procedure moddatetime (updated_at);

-- Grant access to authenticated users
grant all on public.donations to authenticated;
grant usage on sequence public.donations_id_seq to authenticated; 