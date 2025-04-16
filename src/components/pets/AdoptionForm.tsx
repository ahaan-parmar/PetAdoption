import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AdoptionFormProps {
  petId: string;
  petName: string;
}

export const AdoptionForm = ({ petId, petName }: AdoptionFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to apply for adoption",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      console.log('Submitting adoption application:', {
        pet_id: petId,
        user_id: user.id,
        notes: notes,
        status: 'pending',
        application_date: new Date().toISOString()
      });

      const { data, error } = await supabase
        .from('adoptions')
        .insert({
          pet_id: petId, // Don't convert to string - keep as UUID
          user_id: user.id,
          notes: notes,
          status: 'pending',
          application_date: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Adoption application submitted:', data);

      toast({
        title: "Application submitted!",
        description: `Your application to adopt ${petName} has been submitted. We'll review it and get back to you soon.`,
      });

      setNotes("");
      setIsOpen(false);
    } catch (error) {
      console.error('Error details:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full mt-2 bg-primary hover:bg-primary/90">
          Apply to Adopt
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adopt {petName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Why would you like to adopt {petName}?
            </label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tell us why you'd be a great match..."
              rows={4}
              className="w-full"
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
      </DialogContent>
    </Dialog>
  );
};

// In your parent component where AdoptionForm is used
// Ensure petId is a real UUID like "550e8400-e29b-41d4-a716-446655440000"
const pet = {
  id: "550e8400-e29b-41d4-a716-446655440000", // Replace with a valid UUID
  name: "Buddy", // Replace with the pet's name
};

<AdoptionForm petId={pet.id} petName={pet.name} />;
