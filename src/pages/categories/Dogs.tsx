import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dog } from "lucide-react";

const Dogs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to pets page with dogs filter
    navigate("/pets?type=dog");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Dog className="w-12 h-12 text-primary animate-pulse" />
    </div>
  );
};

export default Dogs; 