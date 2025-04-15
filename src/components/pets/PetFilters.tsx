
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

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
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by name or breed"
              className="pl-10"
              value={filters.search}
              onChange={(e) => onFilterChange("search", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="species">Animal Type</Label>
          <Select
            value={filters.species}
            onValueChange={(value) => onFilterChange("species", value)}
          >
            <SelectTrigger id="species">
              <SelectValue placeholder="All animals" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All animals</SelectItem>
              <SelectItem value="Dog">Dogs</SelectItem>
              <SelectItem value="Cat">Cats</SelectItem>
              <SelectItem value="Bird">Birds</SelectItem>
              <SelectItem value="Small">Small Animals</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <Label>Age Range (years)</Label>
            <span className="text-sm text-muted-foreground">
              {filters.ageRange[0]} - {filters.ageRange[1]}
            </span>
          </div>
          <Slider
            defaultValue={[0, 10]}
            min={0}
            max={10}
            step={1}
            value={filters.ageRange}
            onValueChange={(value) => onFilterChange("ageRange", value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={filters.gender}
            onValueChange={(value) => onFilterChange("gender", value)}
          >
            <SelectTrigger id="gender">
              <SelectValue placeholder="Any gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any gender</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="City or state"
            value={filters.location}
            onChange={(e) => onFilterChange("location", e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full">Apply Filters</Button>
      </form>
    </div>
  );
};
