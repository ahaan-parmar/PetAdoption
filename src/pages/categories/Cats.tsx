import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Cat } from "lucide-react";

const Cats = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to pets page with cats filter
    navigate("/pets?type=cat");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Cat className="w-12 h-12 text-primary animate-pulse" />
    </div>
  );
};

export default Cats; 