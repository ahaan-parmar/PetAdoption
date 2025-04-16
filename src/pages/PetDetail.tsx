import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Dna, 
  Ruler, 
  Info, 
  Phone, 
  Mail, 
  ChevronLeft, 
  Share2,
  User
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { AdoptionForm } from "@/components/pets/AdoptionForm";

interface Pet {
  id: string;
  owner_id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: string;
  location?: string; 
  description?: string;
  primary_image_url?: string;
  size?: string;
  health_status?: string;
  vaccination_status?: boolean;
  neutered?: boolean;
}

const PetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPetDetails = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const { data: petData, error } = await supabase
          .from('Pets')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error("Error fetching pet details:", error);
          toast({
            title: "Error",
            description: "Could not fetch pet details. Please try again.",
            variant: "destructive",
          });
          setPet(null);
        } else {
          setPet(petData as Pet);
        }
      } catch (err) {
        console.error("Unexpected error fetching pet:", err);
        toast({
            title: "Error",
            description: "An unexpected error occurred.",
            variant: "destructive",
          });
        setPet(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPetDetails();
  }, [id, toast]);

  const toggleFavorite = async () => {
    if (!user || !pet) {
        toast({ title: "Please log in to manage favorites.", variant: "destructive" });
        return;
    }
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: `${pet.name} has been ${isFavorite ? "removed from" : "added to"} your favorites.`,
      duration: 3000,
    });
  };

  const handleShare = () => {
    if (navigator.share && pet) {
      navigator.share({
        title: `Adopt ${pet.name} from Pet Adoption Platform`,
        text: `Check out ${pet.name}, a ${pet.breed} looking for a forever home!`, 
        url: window.location.href,
      }).catch(err => {
        console.error("Error sharing:", err);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "The link to this pet has been copied to your clipboard.",
        duration: 3000,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <p>Loading pet details...</p> 
        </main>
        <Footer />
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Pet Not Found</h1>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn't find the pet you're looking for or there was an error loading the data.
          </p>
          <Link to="/pets">
            <Button>Browse All Pets</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Link 
          to="/pets" 
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to all pets
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src={pet.primary_image_url || '/placeholder.svg'}
                alt={pet.name} 
                className="w-full h-[450px] object-cover"
              />
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">About {pet.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  {pet.description || "No description available."}
                </p>
                 <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center"><Calendar className="h-4 w-4 mr-2 text-muted-foreground"/> Age: {pet.age} years</div>
                    <div className="flex items-center"><User className="h-4 w-4 mr-2 text-muted-foreground"/> Gender: {pet.gender}</div>
                    <div className="flex items-center"><Dna className="h-4 w-4 mr-2 text-muted-foreground"/> Breed: {pet.breed}</div>
                    <div className="flex items-center"><Ruler className="h-4 w-4 mr-2 text-muted-foreground"/> Size: {pet.size || 'N/A'}</div>
                    <div className="flex items-center"><Info className="h-4 w-4 mr-2 text-muted-foreground"/> Neutered: {pet.neutered ? 'Yes' : 'No'}</div>
                    <div className="flex items-center"><Info className="h-4 w-4 mr-2 text-muted-foreground"/> Vaccinated: {pet.vaccination_status ? 'Yes' : 'No'}</div>
                    <div className="flex items-center col-span-2"><Info className="h-4 w-4 mr-2 text-muted-foreground"/> Health Status: {pet.health_status || 'N/A'}</div>
                 </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-6">
             <Card>
               <CardHeader>
                 <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-3xl">{pet.name}</CardTitle>
                      <CardDescription className="text-lg">{pet.breed}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={handleShare}
                        title="Share"
                        className="h-10 w-10"
                      >
                        <Share2 className="h-5 w-5" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={toggleFavorite}
                        title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                        className={`h-10 w-10 ${isFavorite ? "text-red-500 border-red-300 hover:bg-red-50 hover:text-red-600" : ""}`}
                      >
                        <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                 </div>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge>{pet.species}</Badge>
                    <Badge variant="secondary">{pet.age} years</Badge> 
                    <Badge variant="secondary">{pet.gender}</Badge>
                    {pet.size && <Badge variant="outline"><Ruler className="h-3 w-3 mr-1" /> {pet.size}</Badge>}
                    {pet.location && <Badge variant="outline"><MapPin className="h-3 w-3 mr-1" /> {pet.location}</Badge>}
                  </div>

                  {user ? (
                      <AdoptionForm petId={pet.id} petName={pet.name} ownerId={pet.owner_id} /> 
                  ) : (
                     <Button onClick={() => navigate('/login')} className="w-full mt-4">
                       Log in to Adopt
                     </Button>
                  )}
               </CardContent>
             </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PetDetail;
