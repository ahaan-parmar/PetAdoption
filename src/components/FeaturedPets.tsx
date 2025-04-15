
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PetCard, { Pet } from "./PetCard";

// Mock data for our initial application
const MOCK_PETS: Pet[] = [
  {
    id: "1",
    name: "Max",
    species: "Dog",
    breed: "Golden Retriever",
    age: "3 years",
    gender: "Male",
    image: "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01",
    location: "New York, NY"
  },
  {
    id: "2",
    name: "Luna",
    species: "Cat",
    breed: "Siamese",
    age: "2 years",
    gender: "Female",
    image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6",
    location: "Boston, MA"
  },
  {
    id: "3",
    name: "Buddy",
    species: "Dog",
    breed: "Beagle",
    age: "1 year",
    gender: "Male",
    image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8",
    location: "Chicago, IL"
  },
  {
    id: "4",
    name: "Mia",
    species: "Cat",
    breed: "Bengal",
    age: "4 years",
    gender: "Female",
    image: "https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a",
    location: "Austin, TX"
  },
  {
    id: "5",
    name: "Rocky",
    species: "Dog",
    breed: "German Shepherd",
    age: "5 years",
    gender: "Male",
    image: "https://images.unsplash.com/photo-1589941013454-f9536e427f6a",
    location: "Seattle, WA"
  },
  {
    id: "6",
    name: "Oliver",
    species: "Cat",
    breed: "Maine Coon",
    age: "3 years",
    gender: "Male",
    image: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91",
    location: "Denver, CO"
  },
  {
    id: "7",
    name: "Daisy",
    species: "Dog",
    breed: "Poodle",
    age: "2 years",
    gender: "Female",
    image: "https://images.unsplash.com/photo-1591946614720-90a587da4a36",
    location: "Portland, OR"
  },
  {
    id: "8",
    name: "Lola",
    species: "Cat",
    breed: "Ragdoll",
    age: "1 year",
    gender: "Female",
    image: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e",
    location: "Miami, FL"
  }
];

const FeaturedPets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data from an API
    const timer = setTimeout(() => {
      setPets(MOCK_PETS);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 container mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-2">Featured Pets</h2>
          <p className="text-muted-foreground">Meet some of our amazing pets waiting for their forever homes</p>
        </div>
        <Link to="/pets" className="mt-4 md:mt-0">
          <Button variant="outline">View All Pets</Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div 
              key={index} 
              className="bg-gray-100 rounded-lg h-[340px] animate-pulse-light"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedPets;
