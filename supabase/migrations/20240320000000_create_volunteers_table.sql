-- Create volunteers table
CREATE TABLE IF NOT EXISTS volunteers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    experience TEXT,
    availability TEXT NOT NULL,
    interests TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS volunteers_email_idx ON volunteers(email);

-- Enable Row Level Security
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to insert their own volunteer applications
CREATE POLICY "Users can insert their own volunteer applications"
    ON volunteers FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() IS NOT NULL);

-- Create policy to allow admins to view all volunteer applications
CREATE POLICY "Admins can view all volunteer applications"
    ON volunteers FOR SELECT
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin');

-- Create policy to allow admins to update volunteer applications
CREATE POLICY "Admins can update volunteer applications"
    ON volunteers FOR UPDATE
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin');

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_volunteers_updated_at
    BEFORE UPDATE ON volunteers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 