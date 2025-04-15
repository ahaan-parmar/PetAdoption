
import { Pet } from "@/components/PetCard";
import PetCard from "@/components/PetCard";
import { Button } from "@/components/ui/button";

interface PetGridProps {
  isLoading: boolean;
  pets: Pet[];
  onClearFilters: () => void;
}

export const PetGrid = ({ isLoading, pets, onClearFilters }: PetGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <div 
            key={index} 
            className="bg-gray-100 rounded-lg h-[340px] animate-pulse-light"
          />
        ))}
      </div>
    );
  }

  if (pets.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No pets found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your filters to find more pets.
        </p>
        <Button onClick={onClearFilters}>Clear All Filters</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
};
