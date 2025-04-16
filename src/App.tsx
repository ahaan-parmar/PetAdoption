import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { PrivateRoute } from "@/components/PrivateRoute";
import Layout from "@/components/Layout";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AllPets from "./pages/AllPets";
import PetDetail from "./pages/PetDetail";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Donate from "@/pages/Donate";
import Volunteer from "@/pages/Volunteer";

// Category Pages
import Dogs from "@/pages/categories/Dogs";
import Cats from "@/pages/categories/Cats";
import Birds from "@/pages/categories/Birds";
import SmallAnimals from "@/pages/categories/SmallAnimals";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Toaster />
          <Sonner />
          <Routes>
            <Route element={<Layout />}>
              {/* Public Routes */}
              <Route index element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pets" element={<AllPets />} />
              
              {/* Protected Routes */}
              <Route 
                path="/profile" 
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/pets/:id" 
                element={
                  <PrivateRoute>
                    <PetDetail />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/favorites" 
                element={
                  <PrivateRoute>
                    <Favorites />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/donate" 
                element={
                  <PrivateRoute>
                    <Donate />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/volunteer" 
                element={
                  <PrivateRoute>
                    <Volunteer />
                  </PrivateRoute>
                } 
              />

              {/* Category Routes */}
              <Route path="/categories/dogs" element={<Dogs />} />
              <Route path="/categories/cats" element={<Cats />} />
              <Route path="/categories/birds" element={<Birds />} />
              <Route path="/categories/small-animals" element={<SmallAnimals />} />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
