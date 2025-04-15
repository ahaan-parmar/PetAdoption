import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, Users, PawPrint, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-4">About PetPals</h1>
            <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto">
              We're on a mission to connect loving homes with pets in need, making the adoption process simple, transparent, and joyful.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <Heart className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                <p className="text-muted-foreground">
                  To provide every pet with a loving home and every family with a perfect companion.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <Users className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Our Community</h3>
                <p className="text-muted-foreground">
                  A network of passionate pet lovers, shelters, and volunteers working together.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <Shield className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Our Promise</h3>
                <p className="text-muted-foreground">
                  Ensuring the well-being of every pet through careful screening and support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="bg-primary/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  PetPals was founded in 2024 with a simple yet powerful vision: to make pet adoption accessible, transparent, and joyful for everyone involved.
                </p>
                <p>
                  What started as a small initiative has grown into a trusted platform connecting thousands of pets with their forever homes. We work closely with shelters, rescue organizations, and pet lovers to ensure every adoption is a success story.
                </p>
                <p>
                  Our team is made up of passionate animal lovers, tech enthusiasts, and adoption advocates who believe that every pet deserves a loving home and every family deserves the perfect companion.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <PawPrint className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Compassion</h3>
                <p className="text-muted-foreground">
                  We treat every pet and person with kindness and understanding.
                </p>
              </div>
              <div className="text-center">
                <PawPrint className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Transparency</h3>
                <p className="text-muted-foreground">
                  We believe in open communication and honest information.
                </p>
              </div>
              <div className="text-center">
                <PawPrint className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Responsibility</h3>
                <p className="text-muted-foreground">
                  We ensure every adoption is a well-considered decision.
                </p>
              </div>
              <div className="text-center">
                <PawPrint className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-muted-foreground">
                  We foster a supportive network of pet lovers and advocates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pet Categories Section */}
        <section className="bg-primary/5 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Pet Categories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                <PawPrint className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Dogs</h3>
                <p className="text-muted-foreground">
                  Find your perfect canine companion from various breeds and ages.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                <PawPrint className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Cats</h3>
                <p className="text-muted-foreground">
                  Discover loving feline friends waiting for their forever homes.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                <PawPrint className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Birds</h3>
                <p className="text-muted-foreground">
                  Meet colorful and charming birds looking for caring owners.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                <PawPrint className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Small Pets</h3>
                <p className="text-muted-foreground">
                  Adopt adorable small pets like rabbits, hamsters, and more.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Quick Links</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Adoption</h3>
                <ul className="space-y-2">
                  <li><Link to="/pets" className="hover:text-primary">Browse Pets</Link></li>
                  <li><Link to="/pets?type=dog" className="hover:text-primary">Dogs</Link></li>
                  <li><Link to="/pets?type=cat" className="hover:text-primary">Cats</Link></li>
                  <li><Link to="/pets?type=bird" className="hover:text-primary">Birds</Link></li>
                  <li><Link to="/pets?type=small" className="hover:text-primary">Small Pets</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Resources</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
                  <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
                  <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
                  <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Support</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link to="/help" className="hover:text-primary">Help Center</Link></li>
                  <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="hover:text-primary">Terms of Service</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Get Involved</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link to="/volunteer" className="hover:text-primary">Volunteer</Link></li>
                  <li><Link to="/donate" className="hover:text-primary">Donate</Link></li>
                  <li><Link to="/foster" className="hover:text-primary">Become a Foster</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Make a Difference?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Join our community of pet lovers and help us create more happy endings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Adopt a Pet
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 text-white hover:bg-white/20">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About; 