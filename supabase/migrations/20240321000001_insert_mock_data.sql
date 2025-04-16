-- Insert mock pets into the pets table
INSERT INTO public.pets (id, name, species, breed, age, gender, image_url, location, status)
VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'Max', 'Dog', 'Golden Retriever', '3 years', 'Male', 'https://images.unsplash.com/photo-1605897472359-85e4b94d685d', 'New York, NY', 'available'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Luna', 'Cat', 'Siamese', '2 years', 'Female', 'https://images.unsplash.com/photo-1570824104453-508955ab713e', 'Boston, MA', 'available'),
  ('550e8400-e29b-41d4-a716-446655440004', 'Buddy', 'Dog', 'Beagle', '1 year', 'Male', 'https://images.unsplash.com/photo-1505628346881-b72b27e84530', 'Chicago, IL', 'available'),
  ('550e8400-e29b-41d4-a716-446655440006', 'Mia', 'Cat', 'Bengal', '4 years', 'Female', 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8', 'Austin, TX', 'available'),
  ('550e8400-e29b-41d4-a716-446655440008', 'Rocky', 'Dog', 'German Shepherd', '5 years', 'Male', 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95', 'Seattle, WA', 'available'),
  ('550e8400-e29b-41d4-a716-446655440010', 'Oliver', 'Cat', 'Maine Coon', '3 years', 'Male', 'https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb', 'Denver, CO', 'available'),
  ('550e8400-e29b-41d4-a716-446655440012', 'Daisy', 'Dog', 'Poodle', '2 years', 'Female', 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb', 'Portland, OR', 'available'),
  ('550e8400-e29b-41d4-a716-446655440014', 'Lola', 'Cat', 'Ragdoll', '1 year', 'Female', 'https://images.unsplash.com/photo-1583795128727-6ec3642408f8', 'Miami, FL', 'available'),
  ('550e8400-e29b-41d4-a716-446655440016', 'Charlie', 'Dog', 'Labrador Retriever', '4 years', 'Male', 'https://images.unsplash.com/photo-1543466835-00a7907e9de1', 'San Francisco, CA', 'available'),
  ('550e8400-e29b-41d4-a716-446655440018', 'Bella', 'Cat', 'Persian', '5 years', 'Female', 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55', 'Washington, DC', 'available'),
  ('550e8400-e29b-41d4-a716-446655440020', 'Cooper', 'Dog', 'Boxer', '2 years', 'Male', 'https://images.unsplash.com/photo-1553882809-a4f57e59501d', 'Atlanta, GA', 'available'),
  ('550e8400-e29b-41d4-a716-446655440022', 'Lucy', 'Bird', 'Parakeet', '1 year', 'Female', 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f', 'Dallas, TX', 'available'),
  ('550e8400-e29b-41d4-a716-446655440024', 'Hoppy', 'Rabbit', 'Holland Lop', '1 year', 'Male', 'https://images.unsplash.com/photo-1535241749838-299277b6305f', 'Phoenix, AZ', 'available');

-- Insert mock profiles for pet owners
INSERT INTO public.profiles (id, username, full_name)
VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'max_owner', 'John Smith'),
  ('550e8400-e29b-41d4-a716-446655440003', 'luna_owner', 'Sarah Johnson'),
  ('550e8400-e29b-41d4-a716-446655440005', 'buddy_owner', 'Michael Brown'),
  ('550e8400-e29b-41d4-a716-446655440007', 'mia_owner', 'Emily Davis'),
  ('550e8400-e29b-41d4-a716-446655440009', 'rocky_owner', 'David Wilson'),
  ('550e8400-e29b-41d4-a716-446655440011', 'oliver_owner', 'Jennifer Taylor'),
  ('550e8400-e29b-41d4-a716-446655440013', 'daisy_owner', 'Robert Anderson'),
  ('550e8400-e29b-41d4-a716-446655440015', 'lola_owner', 'Lisa Martinez'),
  ('550e8400-e29b-41d4-a716-446655440017', 'charlie_owner', 'James Thompson'),
  ('550e8400-e29b-41d4-a716-446655440019', 'bella_owner', 'Patricia Garcia'),
  ('550e8400-e29b-41d4-a716-446655440021', 'cooper_owner', 'Daniel Robinson'),
  ('550e8400-e29b-41d4-a716-446655440023', 'lucy_owner', 'Nancy Clark'),
  ('550e8400-e29b-41d4-a716-446655440025', 'hoppy_owner', 'Kevin Lewis'); 