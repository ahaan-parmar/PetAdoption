
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { PetFilters } from "@/components/pets/PetFilters";
import { PetGrid } from "@/components/pets/PetGrid";
import { MOCK_PETS } from "@/data/mockPets";
import type { Pet } from "@/components/PetCard";

const AllPets = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pets, setPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    species: searchParams.get("species") || "",
    ageRange: [0, 10],
    gender: searchParams.get("gender") || "",
    location: searchParams.get("location") || "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setPets(MOCK_PETS);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (pets.length === 0) return;

    let result = [...pets];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        (pet) =>
          pet.name.toLowerCase().includes(searchTerm) ||
          pet.breed.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.species) {
      result = result.filter((pet) => pet.species === filters.species);
    }

    result = result.filter((pet) => {
      const age = parseInt(pet.age);
      return age >= filters.ageRange[0] && age <= filters.ageRange[1];
    });

    if (filters.gender) {
      result = result.filter((pet) => pet.gender === filters.gender);
    }

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
          <div className={`lg:block ${isFilterVisible ? "block" : "hidden"}`}>
            <PetFilters 
              filters={filters}
              onFilterChange={handleFilterChange}
              onSubmit={handleSearch}
              onClear={clearFilters}
            />
          </div>
          <div className="lg:col-span-3">
            <PetGrid 
              isLoading={isLoading}
              pets={filteredPets}
              onClearFilters={clearFilters}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllPets;
