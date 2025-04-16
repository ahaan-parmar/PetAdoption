import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PetGrid } from "@/components/pets/PetGrid";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { Pet } from "@/components/PetCard";
import { MOCK_PETS } from "@/data/mockPets";

const Favorites = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [likedPets, setLikedPets] = useState<Pet[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadLikedPets();
  }, [user]);

  const loadLikedPets = async () => {
    try {
      setIsLoading(true);
      
      // First, get all the pet IDs that the user has liked
      const { data: likedPetIds, error: likesError } = await supabase
        .from('pet_likes')
        .select('pet_id')
        .eq('user_id', user?.id);

      if (likesError) throw likesError;

      if (!likedPetIds?.length) {
        setLikedPets([]);
        setIsLoading(false);
        return;
      }

      // For now, filter MOCK_PETS based on liked pet IDs
      // Later, this will be replaced with actual database queries
      const likedPetIdsSet = new Set(likedPetIds.map(like => like.pet_id));
      const filteredPets = MOCK_PETS.filter(pet => likedPetIdsSet.has(pet.id));
      setLikedPets(filteredPets);

    } catch (error) {
      console.error('Error loading liked pets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearFilters = () => {
    loadLikedPets();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Favorite Pets</h1>
          <p className="text-muted-foreground">
            Here are all the pets you've liked
          </p>
        </div>

        <PetGrid
          isLoading={isLoading}
          pets={likedPets}
          onClearFilters={handleClearFilters}
        />
      </main>
    </div>
  );
};

export default Favorites; 