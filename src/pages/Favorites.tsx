import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PetGrid } from "@/components/pets/PetGrid";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/types/supabase";

// Define Pet type based on Supabase schema
type Pet = Database["public"]["Tables"]["pets"]["Row"];
// Define PetLike type explicitly if needed, or assume it has pet_id
// interface PetLike { pet_id: string; /* ... other columns ... */ }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadLikedPets = async () => {
    if (!user?.id) {
      // console.log("Favorites: User not available, cannot load liked pets.");
      return;
    }
    // console.log("Favorites: loadLikedPets called for user:", user.id);
    try {
      setIsLoading(true);
      
      // console.log("Favorites: Fetching liked pet IDs from pet_likes...");
      const { data: likeEntries, error: likesError } = await supabase
        .from('pet_likes')
        .select('pet_id')
        .eq('user_id', user.id);

      if (likesError) {
        console.error("Favorites: Error fetching pet_likes entries:", likesError); // Keep error log
        throw likesError;
      }

      // console.log("Favorites: Fetched like entries:", likeEntries);
      const likedPetIds = likeEntries?.map(like => like.pet_id).filter(id => id) || [];
      const uniqueLikedPetIds = [...new Set(likedPetIds)];
      // console.log("Favorites: Unique liked pet IDs:", uniqueLikedPetIds);

      if (uniqueLikedPetIds.length === 0) {
        // console.log("Favorites: No liked pet IDs found for this user.");
        setLikedPets([]);
        setIsLoading(false);
        return;
      }

      // console.log("Favorites: Fetching pet details for IDs:", uniqueLikedPetIds);
      const { data: petsData, error: petsError } = await supabase
        .from('pets')
        .select('*')
        .in('id', uniqueLikedPetIds);

      if (petsError) {
        console.error("Favorites: Error fetching pet details:", petsError); // Keep error log
        throw petsError;
      }

      // console.log("Favorites: Fetched pet details data:", petsData);
      setLikedPets(petsData || []);

    } catch (error) {
      // Error already logged in the try block
      // console.error('Favorites: Catch block error in loadLikedPets:', error);
      setLikedPets([]); // Still clear pets on error
    } finally {
      setIsLoading(false);
      // console.log("Favorites: Finished loading liked pets.");
    }
  };

  // Function to refetch data
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