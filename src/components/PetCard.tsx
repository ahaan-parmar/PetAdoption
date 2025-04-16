import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  gender: string;
  image: string;
  location: string;
  owner_id: string;
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
  }, [user, pet.id]);

  const checkIfLiked = async () => {
    const { data } = await supabase
      .from('pet_likes')
      .select('id')
      .eq('pet_id', pet.id)
      .eq('user_id', user?.id)
      .single();
    
    setIsFavorite(!!data);
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

    try {
      if (isFavorite) {
        await supabase
          .from('pet_likes')
          .delete()
          .eq('pet_id', pet.id)
          .eq('user_id', user.id);
      } else {
        await supabase
          .from('pet_likes')
          .insert([
            { pet_id: pet.id, user_id: user.id }
          ]);
      }

      setIsFavorite(!isFavorite);
      
      toast({
        title: isFavorite ? "Removed from favorites" : "Added to favorites",
        description: isFavorite 
          ? `${pet.name} has been removed from your favorites.` 
          : `${pet.name} has been added to your favorites.`,
        duration: 3000,
      });
    } catch (error) {
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
            src={pet.image}
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
