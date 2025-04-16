-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Admins can manage pets" ON public.pets;

-- Create a more permissive policy that allows all authenticated users to update pets
CREATE POLICY "Users can manage pets"
    ON public.pets FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Now try the update again
UPDATE public.pets
SET location = 'Mumbai, Maharashtra'
WHERE name = 'Max'; 