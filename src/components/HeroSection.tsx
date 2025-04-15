
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PawPrint } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Find Your Perfect <span className="text-primary">Furry Friend</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl">
            Thousands of adoptable pets are looking for their forever homes. 
            Browse pets from shelters nationwide and find your perfect match.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/pets">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                <PawPrint className="w-5 h-5" />
                Find a Pet
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
            <img
              src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1"
              alt="Cute cat"
              className="w-full rounded-lg object-cover h-40 shadow-md transform -rotate-2"
            />
            <img
              src="https://images.unsplash.com/photo-1582562124811-c09040d0a901"
              alt="Cute dog"
              className="w-full rounded-lg object-cover h-48 mt-6 shadow-md transform rotate-3"
            />
            <img
              src="https://images.unsplash.com/photo-1465379941941-5f9fa6d702cf"
              alt="Cute rabbit"
              className="w-full rounded-lg object-cover h-48 shadow-md transform rotate-2"
            />
            <img
              src="https://images.unsplash.com/photo-1441057211199-ef20660aee0e"
              alt="Cute bird"
              className="w-full rounded-lg object-cover h-40 mt-6 shadow-md transform -rotate-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
