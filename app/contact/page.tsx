'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: 'Contact Us | G. Davis & Associates',
  description:
    'Get in touch with G. Davis & Associates for information about our architectural products and services.',
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 relative overflow-hidden">
        <div className="container space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[800px]"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-[700px]">
              We&apos;d love to hear from you. Reach out to our team with any
              questions about our products or services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="w-full py-12 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-8">
              <h2 className="text-3xl font-bold tracking-tighter">
                Get in Touch
              </h2>
              <p className="text-muted-foreground">
                Our team of experts is ready to assist you with product
                information, technical support, or any other inquiries you may
                have.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: <MapPin className="h-5 w-5" />,
                    title: 'Office Address',
                    content:
                      '123 Design Avenue, Suite 100\nMetropolitan Area, State 12345',
                  },
                  {
                    icon: <Phone className="h-5 w-5" />,
                    title: 'Phone',
                    content: '(555) 123-4567',
                  },
                  {
                    icon: <Mail className="h-5 w-5" />,
                    title: 'Email',
                    content: 'info@gdavisassociates.com',
                  },
                  {
                    icon: <Clock className="h-5 w-5" />,
                    title: 'Business Hours',
                    content:
                      'Monday-Friday: 8:00 AM - 5:00 PM\nSaturday-Sunday: Closed',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <div className="mt-1 text-primary">{item.icon}</div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {item.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" placeholder="Your Company Name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="example@company.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" placeholder="(555) 123-4567" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="interest">I&apos;m interested in</Label>
                      <select
                        id="interest"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="" disabled selected>
                          Select an option
                        </option>
                        <option value="windows-doors">Windows & Doors</option>
                        <option value="wall-systems">Wall Systems</option>
                        <option value="interior-finishes">
                          Interior Finishes
                        </option>
                        <option value="exterior-cladding">
                          Exterior Cladding
                        </option>
                        <option value="specialty-products">
                          Specialty Products
                        </option>
                        <option value="hardware-accessories">
                          Hardware & Accessories
                        </option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Please describe your project or inquiry"
                        rows={5}
                      />
                    </div>

                    <Button type="submit" className="w-full md:w-auto">
                      Submit Message
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full py-12 md:py-24 bg-secondary/10">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">
              Our Location
            </h2>
            <p className="text-muted-foreground md:text-lg max-w-[700px] mx-auto">
              Visit our office to speak with our team in person and explore our
              product displays.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-lg aspect-[16/9] md:aspect-[21/9]">
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">Interactive Map</span>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Offices */}
      <section className="w-full py-12 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">
              Regional Offices
            </h2>
            <p className="text-muted-foreground md:text-lg max-w-[700px] mx-auto">
              We have offices throughout the region to better serve our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                region: 'North Region',
                address:
                  '456 North Parkway, Suite 200\nNorthern City, State 23456',
                phone: '(555) 234-5678',
                email: 'north@gdavisassociates.com',
              },
              {
                region: 'South Region',
                address:
                  '789 South Boulevard, Suite 300\nSouthern City, State 34567',
                phone: '(555) 345-6789',
                email: 'south@gdavisassociates.com',
              },
              {
                region: 'West Region',
                address:
                  '321 West Avenue, Suite 400\nWestern City, State 45678',
                phone: '(555) 456-7890',
                email: 'west@gdavisassociates.com',
              },
            ].map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{office.region}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {office.address}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Phone className="h-5 w-5 text-primary shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        {office.phone}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Mail className="h-5 w-5 text-primary shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        {office.email}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Separator />
    </div>
  );
}
