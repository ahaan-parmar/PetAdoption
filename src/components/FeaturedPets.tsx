import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PetCard from "./PetCard";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/types/supabase";

// Define Pet type based on Supabase schema
type Pet = Database["public"]["Tables"]["pets"]["Row"];

const FeaturedPets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPets = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('pets')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(8);

        if (error) {
          console.error("Error fetching featured pets:", error);
          setPets([]);
        } else {
          setPets(data || []);
        }
      } catch (err) {
        console.error("Exception fetching featured pets:", err);
        setPets([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedPets();
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
