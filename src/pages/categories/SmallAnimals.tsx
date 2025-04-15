import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Rabbit } from "lucide-react";

const SmallAnimals = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to pets page with small animals filter
    navigate("/pets?type=small");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Rabbit className="w-12 h-12 text-primary animate-pulse" />
    </div>
  );
};

export default SmallAnimals; 