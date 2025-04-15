import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bird } from "lucide-react";

const Birds = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to pets page with birds filter
    navigate("/pets?type=bird");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Bird className="w-12 h-12 text-primary animate-pulse" />
    </div>
  );
};

export default Birds; 