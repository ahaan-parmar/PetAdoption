import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface BreedFieldProps {
  value: string;
  onChange: (value: string) => void;
  species: string;
}

export const BreedField = ({ value, onChange, species }: BreedFieldProps) => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBreeds = async () => {
      if (!species || species === 'all') {
        setBreeds([]);
        return;
      }

      setIsLoading(true);
      try {
        // Fetch unique breeds for the selected species
        const { data, error } = await supabase
          .from('pets')
          .select('breed')
          .eq('species', species.charAt(0).toUpperCase() + species.slice(1)) // Capitalize first letter
          .not('breed', 'is', null);

        if (error) {
          console.error('Error fetching breeds:', error);
          return;
        }

        // Extract unique breeds and sort them
        const uniqueBreeds = Array.from(new Set(data.map(pet => pet.breed)))
          .filter(Boolean)
          .sort();

        setBreeds(uniqueBreeds);
      } catch (error) {
        console.error('Error fetching breeds:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBreeds();
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
        disabled={!species || species === 'all' || isLoading}
      >
        <SelectTrigger id="breed">
          <SelectValue 
            placeholder={
              isLoading ? "Loading breeds..." : 
              !species || species === 'all' ? "Select species first" : 
              "Select breed"
            } 
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All breeds</SelectItem>
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