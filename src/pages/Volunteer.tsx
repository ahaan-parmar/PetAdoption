import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, Clock, MapPin, User, HeartHandshake, PawPrint } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Volunteer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    experience: "",
    availability: "",
    interests: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to submit a volunteer application.",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      const { error } = await supabase
        .from("volunteers")
        .insert([
          {
            ...formData,
            user_id: user.id,
            status: "pending"
          },
        ]);

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest in volunteering. We'll be in touch soon.",
      });
      navigate("/");
    } catch (error) {
      console.error("Error submitting volunteer application:", error);
      toast({
        title: "Error",
        description: "Failed to submit volunteer application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Become a Volunteer</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-primary/5 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Why Volunteer?</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Make a Difference</h3>
                  <p className="text-muted-foreground">Help animals find their forever homes</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <User className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Gain Experience</h3>
                  <p className="text-muted-foreground">Learn about animal care and welfare</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Flexible Hours</h3>
                  <p className="text-muted-foreground">Choose shifts that work for you</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Multiple Locations</h3>
                  <p className="text-muted-foreground">Volunteer at our shelters or events</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-primary/5 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Volunteer Roles</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <PawPrint className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Animal Care</h3>
                  <p className="text-muted-foreground">Feeding, grooming, and exercise</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Event Support</h3>
                  <p className="text-muted-foreground">Help at adoption events and fundraisers</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <User className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Administrative</h3>
                  <p className="text-muted-foreground">Office support and data entry</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Foster Care</h3>
                  <p className="text-muted-foreground">Temporary home for animals in need</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Previous Experience (if any)</Label>
            <Textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="availability">Availability</Label>
            <Textarea
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              rows={2}
              placeholder="e.g., Weekends, Evenings, etc."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interests">Areas of Interest</Label>
            <Textarea
              id="interests"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              rows={2}
              placeholder="e.g., Animal care, Events, Administration, etc."
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Volunteer; 