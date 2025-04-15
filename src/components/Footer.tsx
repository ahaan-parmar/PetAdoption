
import { Link } from "react-router-dom";
import { PawPrint, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <PawPrint className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-primary">PetPals</span>
            </div>
            <p className="text-muted-foreground">
              Connecting loving homes with pets in need since 2023.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/pets" className="text-muted-foreground hover:text-primary transition-colors">
                  Find a Pet
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-muted-foreground hover:text-primary transition-colors">
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Pet Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/pets?type=dog" className="text-muted-foreground hover:text-primary transition-colors">
                  Dogs
                </Link>
              </li>
              <li>
                <Link to="/pets?type=cat" className="text-muted-foreground hover:text-primary transition-colors">
                  Cats
                </Link>
              </li>
              <li>
                <Link to="/pets?type=bird" className="text-muted-foreground hover:text-primary transition-colors">
                  Birds
                </Link>
              </li>
              <li>
                <Link to="/pets?type=small" className="text-muted-foreground hover:text-primary transition-colors">
                  Small Animals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">contact@petpals.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">(123) 456-7890</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                <span className="text-muted-foreground">123 Adoption Street<br />Pet City, PC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PetPals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
