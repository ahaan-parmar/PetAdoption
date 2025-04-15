
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PetCard, { Pet } from "@/components/PetCard";
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
import { Search, Filter, X } from "lucide-react";

// Import the mock data from FeaturedPets
import { MOCK_PETS } from "@/data/mockPets";

const AllPets = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pets, setPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    species: searchParams.get("species") || "",
    ageRange: [0, 10],
    gender: searchParams.get("gender") || "",
    location: searchParams.get("location") || "",
  });
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    // Simulate loading data from an API
    const timer = setTimeout(() => {
      setPets(MOCK_PETS);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Apply filters whenever filters or pets change
  useEffect(() => {
    if (pets.length === 0) return;

    let result = [...pets];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        (pet) =>
          pet.name.toLowerCase().includes(searchTerm) ||
          pet.breed.toLowerCase().includes(searchTerm)
      );
    }

    // Apply species filter
    if (filters.species) {
      result = result.filter((pet) => pet.species === filters.species);
    }

    // Apply age range filter
    result = result.filter((pet) => {
      const age = parseInt(pet.age);
      return age >= filters.ageRange[0] && age <= filters.ageRange[1];
    });

    // Apply gender filter
    if (filters.gender) {
      result = result.filter((pet) => pet.gender === filters.gender);
    }

    // Apply location filter
    if (filters.location) {
      result = result.filter((pet) =>
        pet.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredPets(result);
  }, [filters, pets]);

  const handleFilterChange = (
    key: string,
    value: string | number | number[]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL search params
    const newSearchParams = new URLSearchParams();
    if (filters.search) newSearchParams.set("search", filters.search);
    if (filters.species) newSearchParams.set("species", filters.species);
    if (filters.gender) newSearchParams.set("gender", filters.gender);
    if (filters.location) newSearchParams.set("location", filters.location);
    
    setSearchParams(newSearchParams);
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      species: "",
      ageRange: [0, 10],
      gender: "",
      location: "",
    });
    setSearchParams({});
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Find Your Perfect Pet</h1>
            <p className="text-muted-foreground">
              Browse our available pets for adoption
            </p>
          </div>
          <Button
            variant="outline"
            className="mt-4 md:mt-0 gap-2"
            onClick={() => setIsFilterVisible(!isFilterVisible)}
          >
            {isFilterVisible ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
            {isFilterVisible ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters - visible on larger screens or when toggled */}
          <div className={`lg:block ${isFilterVisible ? "block" : "hidden"}`}>
            <div className="bg-white p-6 rounded-lg border shadow-sm sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-muted-foreground"
                  onClick={clearFilters}
                >
                  Clear all
                </Button>
              </div>

              <form onSubmit={handleSearch} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by name or breed"
                      className="pl-10"
                      value={filters.search}
                      onChange={(e) => handleFilterChange("search", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="species">Animal Type</Label>
                  <Select
                    value={filters.species}
                    onValueChange={(value) => handleFilterChange("species", value)}
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
                    onValueChange={(value) => handleFilterChange("ageRange", value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={filters.gender}
                    onValueChange={(value) => handleFilterChange("gender", value)}
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
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full">Apply Filters</Button>
              </form>
            </div>
          </div>

          {/* Pets grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-100 rounded-lg h-[340px] animate-pulse-light"
                  />
                ))}
              </div>
            ) : filteredPets.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No pets found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to find more pets.
                </p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPets.map((pet) => (
                  <PetCard key={pet.id} pet={pet} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllPets;
