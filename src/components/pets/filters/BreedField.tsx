import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

interface BreedFieldProps {
  value: string;
  onChange: (value: string) => void;
  species: string;
}

// Breed options by species
const BREED_OPTIONS: Record<string, string[]> = {
  "Dog": [
    "Golden Retriever",
    "Labrador Retriever",
    "German Shepherd",
    "Beagle",
    "Poodle",
    "Boxer",
    "Bulldog",
    "Pug",
    "Husky",
    "Chihuahua"
  ],
  "Cat": [
    "Siamese",
    "Bengal",
    "Maine Coon",
    "Persian",
    "Ragdoll",
    "Sphynx",
    "British Shorthair",
    "Abyssinian",
    "Scottish Fold",
    "Russian Blue"
  ],
  "Bird": [
    "Parakeet",
    "Cockatiel",
    "Canary",
    "Lovebird",
    "Finch",
    "Parrot",
    "Budgie",
    "Dove",
    "Pigeon",
    "Cockatoo"
  ],
  "Small": [
    "Hamster",
    "Guinea Pig",
    "Rabbit",
    "Ferret",
    "Chinchilla",
    "Gerbil",
    "Mouse",
    "Rat",
    "Hedgehog",
    "Sugar Glider"
  ]
};

export const BreedField = ({ value, onChange, species }: BreedFieldProps) => {
  const [breeds, setBreeds] = useState<string[]>([]);

  useEffect(() => {
    // Update breeds based on species
    if (species && BREED_OPTIONS[species]) {
      setBreeds(BREED_OPTIONS[species]);
    } else {
      setBreeds([]);
    }
  }, [species]);

  // Reset value when species changes
  useEffect(() => {
    if (value && !species) {
      onChange("");
    }
  }, [species, value, onChange]);

  return (
    <div className="space-y-2">
      <Label htmlFor="breed">Breed</Label>
      <Select 
        value={value} 
        onValueChange={onChange}
        disabled={!species}
      >
        <SelectTrigger id="breed">
          <SelectValue placeholder={species ? "Select breed" : "Select species first"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All breeds</SelectItem>
          {breeds.map((breed) => (
            <SelectItem key={breed} value={breed}>
              {breed}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}; 