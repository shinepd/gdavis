import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t">
      <div className="py-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">G. Davis & Associates</h3>
            <p className="text-sm text-muted-foreground">
              Finding the perfect architectural element shouldn&apos;t be the
              hardest part of your design.
            </p>
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>12004 Pawnee Lane, Leawood, KS 66209</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@gdavisassociates.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link
                href="/about"
                className="hover:text-primary transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/products"
                className="hover:text-primary transition-colors"
              >
                Products
              </Link>
              <Link
                href="/projects"
                className="hover:text-primary transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/contact"
                className="hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for product updates and industry news.
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="default">Subscribe</Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} G. Davis & Associates. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
