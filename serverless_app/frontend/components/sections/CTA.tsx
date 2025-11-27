"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CheckCircle, Loader2 } from 'lucide-react';

interface FormData {
  parentName: string;
  parentEmail: string;
  childName: string;
  childAge: string;
}

interface FormErrors {
  parentName?: string;
  parentEmail?: string;
  childName?: string;
  childAge?: string;
  submit?: string;
}

export default function CTA() {
  const [formData, setFormData] = useState<FormData>({
    parentName: '',
    parentEmail: '',
    childName: '',
    childAge: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Parent name is required';
    }

    if (!formData.parentEmail.trim()) {
      newErrors.parentEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail)) {
      newErrors.parentEmail = 'Please enter a valid email address';
    }

    if (!formData.childName.trim()) {
      newErrors.childName = 'Child name is required';
    }

    if (!formData.childAge) {
      newErrors.childAge = 'Child age is required';
    } else {
      const age = parseInt(formData.childAge, 10);
      if (isNaN(age) || age < 0 || age > 18) {
        newErrors.childAge = 'Age must be between 0 and 18';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

      const response = await fetch(`${apiUrl}/signups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parentName: formData.parentName.trim(),
          parentEmail: formData.parentEmail.trim().toLowerCase(),
          childName: formData.childName.trim(),
          childAge: parseInt(formData.childAge, 10),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      console.log('Signup successful:', data);
      setIsSubmitted(true);
      setFormData({ parentName: '', parentEmail: '', childName: '', childAge: '' });
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({
        submit: error instanceof Error ? error.message : 'Failed to submit. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="signup-form" className="py-20 bg-gradient-to-b from-enchanted-purple/5 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-enchanted-purple mb-4">
              Ready to Start Creating?
            </h2>
            <p className="text-lg text-night-sky/70">
              Join our community of young storytellers and entrepreneurs
            </p>
          </div>

          {isSubmitted ? (
            // Success state
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-imagination-green/20 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-imagination-green" />
              </div>
              <h3 className="text-2xl font-bold text-enchanted-purple mb-2">
                Thank You for Joining!
              </h3>
              <p className="text-night-sky/70 mb-6">
                Get ready to embark on an amazing storytelling journey. We&apos;ll be in touch soon with your next steps.
              </p>
              <Button
                variant="outline"
                onClick={() => setIsSubmitted(false)}
              >
                Sign Up Another Child
              </Button>
            </div>
          ) : (
            // Form
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
              <div className="space-y-5">
                <Input
                  label="Parent's Name"
                  name="parentName"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.parentName}
                  onChange={handleChange}
                  error={errors.parentName}
                  required
                />

                <Input
                  label="Parent's Email"
                  name="parentEmail"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.parentEmail}
                  onChange={handleChange}
                  error={errors.parentEmail}
                  required
                />

                <div className="pt-4 border-t border-night-sky/10">
                  <p className="text-sm text-night-sky/60 mb-4">Child Information</p>
                </div>

                <Input
                  label="Child's Name"
                  name="childName"
                  type="text"
                  placeholder="Enter child's name"
                  value={formData.childName}
                  onChange={handleChange}
                  error={errors.childName}
                  required
                />

                <Input
                  label="Child's Age"
                  name="childAge"
                  type="number"
                  placeholder="Enter child's age"
                  min="0"
                  max="18"
                  value={formData.childAge}
                  onChange={handleChange}
                  error={errors.childAge}
                  required
                />

                {errors.submit && (
                  <div className="p-3 rounded-lg bg-creative-coral/10 text-creative-coral text-sm">
                    {errors.submit}
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing Up...
                    </>
                  ) : (
                    'Join Now'
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
