'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import emailjs from '@emailjs/browser';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Container } from '@/components/ui/container';

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus({
        type: 'error',
        message: 'Please fix the errors above and try again.',
      });
      return;
    }

    setStatus({ type: 'loading', message: 'Sending message...' });

    try {
      // Initialize EmailJS with environment variables
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_KEY!);

      const templateParams = {
        from_name: formData.name,
        from_company: formData.company,
        from_email: formData.email,
        from_phone: formData.phone,
        message: formData.message,
        to_name: 'G. Davis & Associates',
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams
      );

      setStatus({
        type: 'success',
        message:
          "Thank you! Your message has been sent successfully. We'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus({
        type: 'error',
        message:
          'Sorry, there was an error sending your message. Please try again or contact us directly.',
      });
    }
  };

  return (
    <section className="w-full py-8 md:py-12">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <div className="space-y-8">
              {/* Office Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-primary">Office Address</h3>
                </div>
                <div className="pl-4 space-y-3">
                  <div className="flex gap-3">
                    <MapPin className="h-5 w-5 text-primary" />

                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      12004 Pawnee Lane{'\n'}Leawood, KS 66209
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Exteriors Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                <h3 className="font-semibold text-primary">Exteriors</h3>
                <div className="pl-4 space-y-3">
                  <div className="flex gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">George Davis</p>
                      <p className="text-sm text-muted-foreground">
                        (913) 231-8071
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        george@gdavisassociates.com
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Interiors Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                <h3 className="font-semibold text-primary">Interiors</h3>
                <div className="pl-4 space-y-3">
                  <div className="flex gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Maddie Shine</p>
                      <p className="text-sm text-muted-foreground">
                        (913) 744-0191
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        maddie@gdavisassociates.com
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
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
                >
                  {/* Status Message */}
                  {status.type !== 'idle' && (
                    <div
                      className={`mb-6 p-4 rounded-md flex items-center gap-2 ${
                        status.type === 'success'
                          ? 'bg-green-50 text-green-800 border border-green-200'
                          : status.type === 'error'
                            ? 'bg-red-50 text-red-800 border border-red-200'
                            : 'bg-blue-50 text-blue-800 border border-blue-200'
                      }`}
                    >
                      {status.type === 'success' && (
                        <CheckCircle className="h-5 w-5" />
                      )}
                      {status.type === 'error' && (
                        <AlertCircle className="h-5 w-5" />
                      )}
                      {status.type === 'loading' && (
                        <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      )}
                      <span>{status.message}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && (
                          <p className="text-sm text-red-600">{errors.name}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Your Company Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="example@company.com"
                          className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please describe your project or inquiry"
                        rows={5}
                        className={errors.message ? 'border-red-500' : ''}
                      />
                      {errors.message && (
                        <p className="text-sm text-red-600">{errors.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="default"
                      disabled={status.type === 'loading'}
                      className="w-full md:w-auto"
                    >
                      {status.type === 'loading' ? (
                        <>
                          <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Message
                        </>
                      )}
                    </Button>
                  </form>
                </motion.div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
