
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PawPrint, HeartHandshake } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-2xl mx-auto">
          Ready to Welcome a New Friend into Your Life?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Thousands of pets are waiting for their forever homes. Start your adoption journey today and change a life forever.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/pets">
            <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
              <PawPrint className="w-5 h-5" />
              Find a Pet
            </Button>
          </Link>
          <Link to="/volunteer">
            <Button size="lg" variant="outline" className="gap-2">
              <HeartHandshake className="w-5 h-5" />
              Volunteer
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
