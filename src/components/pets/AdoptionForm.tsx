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
  petId: string; // This should now be a valid UUID
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

    // Basic validation for notes
    if (!notes.trim()) {
       toast({
        title: "Notes Required",
        description: "Please tell us why you'd like to adopt this pet.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Removed the redundant pet check here, assuming PetDetail already verified availability
      
      // Submit the adoption application to 'adoptions' table
      const { data, error } = await supabase
        .from('adoptions')
        .insert({
          pet_id: petId,             // Use UUID from props
          user_id: user.id,          // Current user's UUID
          status: 'pending',         // Initial status
          application_date: new Date().toISOString(),
          notes: notes.trim()        // Trim notes
        })
        .select() // Optionally select the inserted row
        .single();

      if (error) {
        console.error('Supabase error submitting adoption:', error);
        // Provide more specific feedback if possible (e.g., check RLS policies)
        if (error.code === '23503') { // Foreign key violation
           throw new Error('Invalid pet or user ID referenced.');
        } else if (error.code === '42501') { // RLS policy violation
           throw new Error('Permission denied. Check database policies.');
        } else {
           throw new Error(error.message || 'Failed to submit application.');
        }
      }

      console.log('Adoption application submitted:', data); // Log success data

      toast({
        title: "Application submitted!",
        description: `Your application to adopt ${petName} has been submitted. We'll review it and get back to you soon.`,
      });

      setNotes(""); // Clear notes
      setIsOpen(false); // Close dialog
    } catch (error) {
      console.error('Error submitting adoption form:', error);
      toast({
        title: "Submission Error",
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
          {/* Optional: Add DialogDescription for accessibility */}
          {/* <DialogDescription> 
            Fill out the form below to apply for adoption.
          </DialogDescription> */}
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="adoptionNotes" className="block text-sm font-medium mb-2">
              Why would you like to adopt {petName}?
            </label>
            <Textarea
              id="adoptionNotes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tell us why you'd be a great match... (required)"
              rows={4}
              className="w-full"
              required // HTML5 required attribute
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
