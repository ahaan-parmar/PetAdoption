import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
  Share2 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Pet } from "@/components/PetCard";
import { MOCK_PETS } from "@/data/mockPets";
import { AdoptionForm } from "@/components/pets/AdoptionForm";

const PetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API fetch
    setIsLoading(true);
    setTimeout(() => {
      const foundPet = MOCK_PETS.find((p) => p.id === id);
      console.log('Found pet:', foundPet);
      setPet(foundPet || null);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: pet 
        ? `${pet.name} has been ${isFavorite ? "removed from" : "added to"} your favorites.` 
        : "",
      duration: 3000,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: pet ? `Adopt ${pet.name} from PetPals` : "Adopt a pet from PetPals",
        text: pet ? `Check out ${pet.name}, a ${pet.breed} looking for a forever home!` : "",
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
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="animate-pulse-light">
            <div className="h-8 w-32 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-[400px] bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-10 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
                <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                <div className="h-32 w-full bg-gray-200 rounded mt-6"></div>
                <div className="h-10 w-full bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Pet Not Found</h1>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn't find the pet you're looking for.
          </p>
          <Link to="/pets">
            <Button>Browse All Pets</Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <Link 
          to="/pets" 
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to all pets
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pet Image */}
          <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden shadow-md">
            <img 
              src={pet.image} 
              alt={pet.name} 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Pet Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold">{pet.name}</h1>
                <p className="text-xl text-muted-foreground">{pet.breed}</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleShare}
                  className="h-10 w-10"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={toggleFavorite}
                  className={`h-10 w-10 ${isFavorite ? "text-red-500 border-red-200 hover:text-red-500" : ""}`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <Badge className="bg-primary text-white">{pet.species}</Badge>
              <Badge variant="outline">{pet.age}</Badge>
              <Badge variant="outline">{pet.gender}</Badge>
              <Badge variant="secondary">
                <MapPin className="h-3 w-3 mr-1" /> {pet.location}
              </Badge>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">About {pet.name}</CardTitle>
                <CardDescription>
                  Meet your potential new family member
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  {pet.name} is a loving {pet.age} {pet.gender.toLowerCase()} {pet.breed}. 
                  {pet.gender === "Male" ? "He" : "She"} is playful, friendly, and looking for a forever home. 
                  {pet.gender === "Male" ? "He" : "She"} gets along well with children and other pets.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                    <span>Age: {pet.age}</span>
                  </div>
                  <div className="flex items-center">
                    <Dna className="h-5 w-5 text-muted-foreground mr-2" />
                    <span>Breed: {pet.breed}</span>
                  </div>
                  <div className="flex items-center">
                    <Ruler className="h-5 w-5 text-muted-foreground mr-2" />
                    <span>Size: Medium</span>
                  </div>
                  <div className="flex items-center">
                    <Info className="h-5 w-5 text-muted-foreground mr-2" />
                    <span>Status: Available</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Interested in {pet.name}?</CardTitle>
                <CardDescription>
                  Contact the shelter to schedule a meet and greet
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>(123) 456-7890</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>adopt@petpals.com</span>
                </div>
                <AdoptionForm 
                  petId={pet.id} 
                  petName={pet.name}
                  ownerId={pet.owner_id} 
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PetDetail;
