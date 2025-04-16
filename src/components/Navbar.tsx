import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { 
  PawPrint, 
  Heart, 
  User, 
  Menu, 
  X, 
  LogIn,
  LogOut
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error logging out",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <PawPrint className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-primary">PetPals</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/pets" className="font-medium hover:text-primary transition-colors">
              Find Pets
            </Link>
            <Link to="/volunteer" className="font-medium hover:text-primary transition-colors">
              Volunteer
            </Link>
            <Link to="/donate" className="font-medium hover:text-primary transition-colors">
              Donate
            </Link>
            <Link to="/about" className="font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/favorites">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="w-5 h-5" />
              </Button>
            </Link>
            {user ? (
              <>
                <Link to="/profile">
                  <Button variant="outline" className="gap-2">
                    <User className="w-4 h-4" />
                    Profile
                  </Button>
                </Link>
                <Button onClick={handleLogout} className="gap-2">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="gap-2">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="gap-2 bg-primary hover:bg-primary/90">
                    <User className="w-4 h-4" />
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t mt-3">
            <Link 
              to="/pets" 
              className="block font-medium py-2 hover:bg-muted px-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Pets
            </Link>
            <Link 
              to="/volunteer" 
              className="block font-medium py-2 hover:bg-muted px-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Volunteer
            </Link>
            <Link 
              to="/donate" 
              className="block font-medium py-2 hover:bg-muted px-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Donate
            </Link>
            <Link 
              to="/about" 
              className="block font-medium py-2 hover:bg-muted px-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="block font-medium py-2 hover:bg-muted px-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-2 border-t flex gap-2">
              {user ? (
                <>
                  <Link to="/profile" className="w-1/2" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Profile</Button>
                  </Link>
                  <Button onClick={handleLogout} className="w-1/2">Sign Out</Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="w-1/2" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </Link>
                  <Link to="/signup" className="w-1/2" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-primary hover:bg-primary/90">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
