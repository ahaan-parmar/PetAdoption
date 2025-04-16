import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/types/supabase";

type Pet = Database["public"]["Tables"]["pets"]["Row"];

// Explicitly define the structure expected for pet_likes
// Adjust columns if your actual pet_likes table is different
interface PetLike {
  id: string; // Assuming pet_likes has its own primary key
  user_id: string;
  pet_id: string;
  created_at: string;
}

interface PetCardProps {
  pet: Pet;
}

const PetCard = ({ pet }: PetCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      checkIfLiked();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, pet.id]);

  const checkIfLiked = async () => {
    if (!user?.id) return;
    try {
      console.log(`PetCard: Checking like status for pet ${pet.id}, user ${user.id}`);
      const { data, error } = await supabase
        .from('pet_likes')
        .select('pet_id')
        .eq('pet_id', pet.id)
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error("Error checking favorite status:", error);
        setIsFavorite(false);
      } else {
        console.log(`PetCard: Like status check result for pet ${pet.id}:`, data);
        setIsFavorite(!!data);
      }

    } catch (error) {
      console.error("Catch block error checking favorite status:", error);
      setIsFavorite(false);
    }
  };

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to save favorites",
        variant: "destructive",
      });
      return;
    }

    const currentPetId = pet.id;
    const currentUserId = user.id;

    try {
      let operationError: any = null;
      if (isFavorite) {
        const { error } = await supabase
          .from('pet_likes')
          .delete()
          .eq('pet_id', currentPetId)
          .eq('user_id', currentUserId);
        operationError = error;
        if (error) {
          // console.error("PetCard: Error deleting favorite:", error);
        } else {
          // console.log("PetCard: Successfully deleted favorite record (or no record found to delete).");
        }
      } else {
        const { error } = await supabase
          .from('pet_likes')
          .insert({ pet_id: currentPetId, user_id: currentUserId })
          .select();
        operationError = error;
         if (error) {
           // console.error("PetCard: Error inserting favorite:", error);
         } else {
          // console.log("PetCard: Successfully inserted favorite record.");
         }
      }

      if (operationError) {
        throw operationError; 
      }

      const newState = !isFavorite;
      setIsFavorite(newState);
      toast({
        title: isFavorite ? "Removed from favorites" : "Added to favorites",
        description: `${pet.name} has been ${isFavorite ? 'removed from' : 'added to'} your favorites.`,
        duration: 3000,
      });

    } catch (error) {
      console.error("Error updating favorite:", error);
      toast({
        title: "Error",
        description: "There was an error updating your favorites",
        variant: "destructive",
      });
    }
  };

  return (
    <Link to={`/pets/${pet.id}`}>
      <Card className="overflow-hidden pet-card h-full flex flex-col">
        <div className="relative">
          <img
            src={pet.image_url || 'default-placeholder.png'}
            alt={pet.name}
            className="w-full h-48 object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white/90 ${
              isFavorite ? "text-red-500" : "text-gray-500"
            }`}
            onClick={toggleFavorite}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
          <Badge className="absolute bottom-2 left-2 bg-primary text-white">
            {pet.species}
          </Badge>
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-semibold text-lg">{pet.name}</h3>
          <p className="text-muted-foreground text-sm">{pet.breed}</p>
          <div className="mt-2 flex items-center text-sm gap-2">
            <Badge variant="outline">{pet.age}</Badge>
            <Badge variant="outline">{pet.gender}</Badge>
          </div>
          <p className="mt-auto pt-3 text-sm text-muted-foreground flex items-center gap-1">
            <span>{pet.location}</span>
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default PetCard;
