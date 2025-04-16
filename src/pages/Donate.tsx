import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Heart, CreditCard, Banknote, Gift, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const donationFormSchema = z.object({
  amount: z.number().min(1, "Amount must be at least $1"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().optional(),
});

type DonationFormData = z.infer<typeof donationFormSchema>;

const Donate = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      amount: 1,
      name: user?.user_metadata?.full_name || "",
      email: user?.email || "",
    },
  });

  // Mock payment processing function
  const processDonation = async (donationId: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Randomly succeed or fail (80% success rate)
      const success = Math.random() < 0.8;
      
      if (success) {
        const { error } = await supabase
          .from('donations')
          .update({ status: 'completed' })
          .eq('id', donationId);

        if (error) {
          console.error('Error updating to completed:', error);
          throw error;
        }
        
        // Log successful update
        console.log('Donation marked as completed:', donationId);
        return true;
      } else {
        const { error } = await supabase
          .from('donations')
          .update({ status: 'failed' })
          .eq('id', donationId);

        if (error) {
          console.error('Error updating to failed:', error);
          throw error;
        }
        
        // Log failed update
        console.log('Donation marked as failed:', donationId);
        return false;
      }
    } catch (error) {
      console.error('Error in processDonation:', error);
      throw error;
    }
  };

  const onSubmit = async (data: DonationFormData) => {
    try {
      setIsProcessing(true);

      // Create initial donation record with 'pending' status
      const { data: donation, error } = await supabase
        .from('donations')
        .insert({
          amount: data.amount,
          donor_name: data.name,
          donor_email: data.email,
          message: data.message,
          user_id: user?.id || null,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating donation:', error);
        throw error;
      }

      console.log('Created donation with ID:', donation.id);

      // Show initial pending toast
      toast({
        title: "Processing donation...",
        description: "Please wait while we process your donation.",
      });

      // Process the donation
      const success = await processDonation(donation.id);
      console.log('Processing result:', success);

      if (success) {
        toast({
          title: "Thank you for your donation!",
          description: `Your donation of $${data.amount} has been successfully processed.`,
          variant: "default",
        });
        reset(); // Clear form on success
      } else {
        toast({
          title: "Donation failed",
          description: "There was an error processing your donation. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your donation.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Support Our Mission</h1>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto">
            Your donation helps us provide care, shelter, and love to pets in need.
          </p>
        </div>
      </section>

      {/* Donation Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <Heart className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">One-Time Donation</h3>
              <p className="text-muted-foreground mb-4">
                Make a single donation to support our immediate needs.
              </p>
              <Button className="w-full">Donate Now</Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <Gift className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Monthly Support</h3>
              <p className="text-muted-foreground mb-4">
                Become a monthly donor and help us plan for the future.
              </p>
              <Button className="w-full">Subscribe</Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <Banknote className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sponsor a Pet</h3>
              <p className="text-muted-foreground mb-4">
                Support a specific pet's care and medical needs.
              </p>
              <Button className="w-full">Learn More</Button>
            </div>
          </div>

          {/* Donation Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h2 className="text-2xl font-bold mb-6">Make a Donation</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium mb-2">
                    Amount ($)
                  </label>
                  <Input
                    id="amount"
                    type="number"
                    {...register("amount", { valueAsNumber: true })}
                    placeholder="Enter amount"
                  />
                  {errors.amount && (
                    <p className="text-sm text-red-500 mt-1">{errors.amount.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message (Optional)
                  </label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder="Add a message with your donation"
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>Your donation is secure and encrypted</span>
                </div>

                <Button type="submit" className="w-full" disabled={isProcessing}>
                  {isProcessing ? (
                    "Processing..."
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Donate Now
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Your Impact</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Pets Rescued</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <p className="text-muted-foreground">Happy Adoptions</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">200+</div>
              <p className="text-muted-foreground">Volunteers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Partner Shelters</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate; 