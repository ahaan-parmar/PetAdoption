import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Heart, CreditCard, Banknote, Gift, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const donationFormSchema = z.object({
  amount: z.number().min(1, "Amount must be at least $1"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().optional(),
});

type DonationFormData = z.infer<typeof donationFormSchema>;

const Donate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationFormSchema),
  });

  const onSubmit = async (data: DonationFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Thank you for your donation!",
        description: "Your contribution will help us save more pets.",
      });
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error processing your donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
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
                    <Input
                      id="message"
                      {...register("message")}
                      placeholder="Add a message with your donation"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>Your donation is secure and encrypted</span>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
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
      </main>
      <Footer />
    </div>
  );
};

export default Donate; 