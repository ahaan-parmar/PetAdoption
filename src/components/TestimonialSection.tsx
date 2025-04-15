
import { Card, CardContent } from "@/components/ui/card";
import { QuoteIcon } from "lucide-react";

const testimonials = [
  {
    quote: "Finding Max on PetPals was the best thing that ever happened to us. The adoption process was smooth, and now he's an irreplaceable part of our family.",
    author: "Sarah Johnson",
    pet: "Adopted Max, Golden Retriever",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956"
  },
  {
    quote: "I was nervous about adopting a cat, but PetPals made it so easy. Luna and I bonded instantly, and I can't imagine life without her now.",
    author: "Michael Chen",
    pet: "Adopted Luna, Siamese",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
  },
  {
    quote: "The team at PetPals was incredibly helpful. They answered all my questions and helped me find the perfect companion for my lifestyle.",
    author: "Emily Rodriguez",
    pet: "Adopted Buddy, Beagle",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-4">Happy Adoption Stories</h2>
        <p className="text-muted-foreground text-lg">
          Hear from some of the families who found their perfect companions through PetPals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="border-0 shadow-md">
            <CardContent className="p-6">
              <QuoteIcon className="w-10 h-10 text-primary mb-4 opacity-50" />
              <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.pet}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
