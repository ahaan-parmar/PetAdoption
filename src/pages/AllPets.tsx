import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Filter, X, Clock } from "lucide-react";
import { PetFilters } from "@/components/pets/PetFilters";
import { PetGrid } from "@/components/pets/PetGrid";
import PetCard from "@/components/PetCard";
import { Database } from "@/types/supabase";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define Pet type based on Supabase schema directly in this file
type Pet = Database["public"]["Tables"]["pets"]["Row"];

const AllPets = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allPets, setAllPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [recentPets, setRecentPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    species: searchParams.get("type") || "",
    breed: searchParams.get("breed") || "",
    ageRange: [
      parseInt(searchParams.get("minAge") || "0"),
      parseInt(searchParams.get("maxAge") || "20")
    ],
    gender: searchParams.get("gender") || "",
    location: searchParams.get("location") || "",
  });

  useEffect(() => {
    const fetchAllPets = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('pets')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Error fetching all pets:", error);
          setAllPets([]);
          setRecentPets([]);
        } else {
          console.log("Fetched all pets:", data);
          setAllPets(data || []);
          setRecentPets((data || []).slice(0, 4));
        }
      } catch (err) {
        console.error("Exception fetching all pets:", err);
        setAllPets([]);
        setRecentPets([]);
      } finally {
      }
    };
    fetchAllPets();
  }, []);

  const getNumericAge = (ageString: string | null): number => {
    if (!ageString) return 0;
    const match = ageString.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  useEffect(() => {
    if (allPets.length === 0) {
        setFilteredPets([]);
        setIsLoading(false);
        return;
    }

    setIsLoading(true);
    let result = [...allPets];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        (pet) =>
          pet.name.toLowerCase().includes(searchTerm) ||
          (pet.breed && pet.breed.toLowerCase().includes(searchTerm)) ||
          (pet.species && pet.species.toLowerCase().includes(searchTerm)) ||
          (pet.location && pet.location.toLowerCase().includes(searchTerm))
      );
    }

    if (filters.species && filters.species !== 'all') {
      result = result.filter((pet) => pet.species?.toLowerCase() === filters.species.toLowerCase());
    }

    if (filters.breed) {
      result = result.filter((pet) => pet.breed?.toLowerCase() === filters.breed.toLowerCase());
    }

    result = result.filter((pet) => {
      const age = getNumericAge(pet.age);
      return age >= filters.ageRange[0] && age <= filters.ageRange[1];
    });

    if (filters.gender) {
      result = result.filter((pet) => pet.gender === filters.gender);
    }

    if (filters.location) {
      result = result.filter((pet) =>
        pet.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "age":
          return getNumericAge(a.age) - getNumericAge(b.age);
        case "oldest":
          return getNumericAge(b.age) - getNumericAge(a.age);
        case "newest":
        default:
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return dateB - dateA;
      }
    });

    setFilteredPets(result);
    setIsLoading(false);
  }, [filters, allPets, sortBy]);

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
    if (filters.species) newSearchParams.set("type", filters.species);
    if (filters.breed) newSearchParams.set("breed", filters.breed);
    if (filters.gender) newSearchParams.set("gender", filters.gender);
    if (filters.location) newSearchParams.set("location", filters.location);
    if (sortBy) newSearchParams.set("sort", sortBy);
    newSearchParams.set("minAge", filters.ageRange[0].toString());
    newSearchParams.set("maxAge", filters.ageRange[1].toString());
    
    setSearchParams(newSearchParams);
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      species: "",
      breed: "",
      ageRange: [0, 20],
      gender: "",
      location: "",
    });
    setSortBy("newest");
    setSearchParams({});
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">Recently Added</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Find Your Perfect Pet</h1>
          <p className="text-muted-foreground">
            Browse our available pets for adoption
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0 w-full sm:w-auto">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="age">Age: Youngest First</SelectItem>
              <SelectItem value="oldest">Age: Oldest First</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setIsFilterVisible(!isFilterVisible)}
          >
            {isFilterVisible ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
            {isFilterVisible ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>
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
  );
};

export default AllPets;
