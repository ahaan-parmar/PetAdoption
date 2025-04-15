
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { SearchField } from "./filters/SearchField";
import { SpeciesField } from "./filters/SpeciesField";
import { AgeRangeField } from "./filters/AgeRangeField";
import { GenderField } from "./filters/GenderField";
import { LocationField } from "./filters/LocationField";

interface FiltersState {
  search: string;
  species: string;
  ageRange: number[];
  gender: string;
  location: string;
}

interface PetFiltersProps {
  filters: FiltersState;
  onFilterChange: (key: string, value: string | number | number[]) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClear: () => void;
}

export const PetFilters = ({ 
  filters, 
  onFilterChange, 
  onSubmit, 
  onClear 
}: PetFiltersProps) => {
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-muted-foreground"
          onClick={onClear}
        >
          Clear all
        </Button>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <SearchField 
          value={filters.search}
          onChange={(value) => onFilterChange("search", value)}
        />

        <SpeciesField
          value={filters.species}
          onChange={(value) => onFilterChange("species", value)}
        />

        <AgeRangeField
          value={filters.ageRange}
          onChange={(value) => onFilterChange("ageRange", value)}
        />

        <GenderField
          value={filters.gender}
          onChange={(value) => onFilterChange("gender", value)}
        />

        <LocationField
          value={filters.location}
          onChange={(value) => onFilterChange("location", value)}
        />

        <Button type="submit" className="w-full">Apply Filters</Button>
      </form>
    </div>
  );
};
