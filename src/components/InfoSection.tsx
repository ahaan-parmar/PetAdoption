
import {
  PawPrint,
  Heart,
  UserCheck,
  Home
} from "lucide-react";

const features = [
  {
    icon: <PawPrint className="w-10 h-10 text-primary" />,
    title: "Wide Selection",
    description: "Browse thousands of adoptable pets from shelters and rescues across the country."
  },
  {
    icon: <Heart className="w-10 h-10 text-primary" />,
    title: "Perfect Match",
    description: "Our matching system helps you find the pet that best fits your lifestyle and preferences."
  },
  {
    icon: <UserCheck className="w-10 h-10 text-primary" />,
    title: "Verified Shelters",
    description: "All our partner shelters and rescues are verified to ensure the best care for animals."
  },
  {
    icon: <Home className="w-10 h-10 text-primary" />,
    title: "Support After Adoption",
    description: "We provide resources and guidance to help you and your new pet adjust to life together."
  }
];

const InfoSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose PetPals?</h2>
          <p className="text-muted-foreground text-lg">
            We're dedicated to connecting loving homes with pets in need. Our platform makes the adoption process simple, transparent, and rewarding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
