"use client";

import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();

interface CTAProps {
  title?: string;
  subtitle?: string;
}

// Amplify validation utilities
const validateField = (value: string, validations: any[]) => {
  for (const validation of validations) {
    if (value === undefined || value === '' || value === null) {
      if (validation.type === 'Required') {
        return {
          hasError: true,
          errorMessage: validation.validationMessage || 'The value is required',
        };
      } else {
        return {
          hasError: false,
        };
      }
    }
  }
  return { hasError: false };
};

const CTA: React.FC<CTAProps> = ({
  title = "Ready to Start Creating?",
  subtitle = "Join our community of storytellers and bring your children&apos;s books to life"
}) => {
  const initialValues = {
    parentName: '',
    parentEmail: '',
    childName: '',
    childAge: ''
  };

  const [parentName, setParentName] = useState(initialValues.parentName);
  const [parentEmail, setParentEmail] = useState(initialValues.parentEmail);
  const [childName, setChildName] = useState(initialValues.childName);
  const [childAge, setChildAge] = useState(initialValues.childAge);
  const [errors, setErrors] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validations = {
    parentName: [],
    parentEmail: [],
    childName: [],
    childAge: []
  };

  const resetStateValues = () => {
    setParentName(initialValues.parentName);
    setParentEmail(initialValues.parentEmail);
    setChildName(initialValues.childName);
    setChildAge(initialValues.childAge);
    setErrors({});
  };

  const runValidationTasks = async (fieldName: string, currentValue: string) => {
    const value = currentValue;
    let validationResponse = validateField(value, validations[fieldName as keyof typeof validations]);
    setErrors(errors => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const modelFields = {
      parentName,
      parentEmail,
      childName,
      childAge
    };

    // Run validations on all fields
    const validationResponses = await Promise.all(
      Object.keys(validations).reduce((promises: Promise<any>[], fieldName) => {
        if (Array.isArray(modelFields[fieldName as keyof typeof modelFields])) {
          promises.push(
            ...(modelFields[fieldName as keyof typeof modelFields] as any[]).map(item =>
              runValidationTasks(fieldName, item)
            )
          );
          return promises;
        }
        promises.push(
          runValidationTasks(fieldName, modelFields[fieldName as keyof typeof modelFields])
        );
        return promises;
      }, [])
    );

    if (validationResponses.some(r => r.hasError)) {
      return;
    }

    // Submit the form to AWS Amplify DataStore
    try {
      const { data: signup, errors } = await client.models.Signup.create({
        parentName: modelFields.parentName,
        parentEmail: modelFields.parentEmail,
        childName: modelFields.childName,
        childAge: parseInt(modelFields.childAge)
      });

      if (errors) {
        console.error("Form submission failed:", errors);
        return;
      }

      console.log("Form successfully submitted to Amplify:", signup);
      setIsSubmitted(true);
      resetStateValues();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section id="join-form" className="relative bg-[#121212] py-16">
      {/* Tech circuit lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1/4 h-px w-full bg-gradient-to-r from-transparent via-[#64F3FF]/30 to-transparent"></div>
        <div className="absolute right-0 top-3/4 h-px w-full bg-gradient-to-r from-transparent via-[#E3000B]/30 to-transparent"></div>
      </div>

      {/* Arc reactor glow */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-[#64F3FF]/10 to-[#0B6FFF]/10 blur-3xl"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#64F3FF] to-[#0B6FFF] bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-xl text-[#C5C5C5] mb-8">
            {subtitle}
          </p>

          {isSubmitted ? (
            <div className="relative max-w-md mx-auto">
              <div className="bg-[#2A2A2A]/80 border border-[#64F3FF]/20 rounded-lg p-8 backdrop-blur-sm">
                {/* Success icon/animation */}
                <div className="mb-6 relative">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[#64F3FF]/20 to-[#0B6FFF]/20 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#64F3FF] to-[#0B6FFF] flex items-center justify-center">
                      <svg 
                        className="w-8 h-8 text-white" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  {/* Decorative rings */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-[#64F3FF]/20 animate-pulse"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-[#64F3FF]/30"></div>
                </div>
                
                {/* Success message */}
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#64F3FF] to-[#0B6FFF] bg-clip-text text-transparent text-center">
                  Thank You for Joining!
                </h3>
                <p className="text-[#C5C5C5] text-center mb-6">
                  Get ready to embark on an amazing storytelling journey. We&apos;ll be in touch soon with your next steps.
                </p>
                
                {/* Tech circuit line */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#64F3FF]/30 to-transparent"></div>
              </div>
              
              {/* Background glow effect */}
              <div className="absolute -inset-4 -z-10 bg-gradient-to-r from-[#64F3FF]/5 to-[#0B6FFF]/5 rounded-lg blur-xl"></div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto"
            >
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="parentName"
                    value={parentName}
                    onChange={(e) => {
                      let { value } = e.target;
                      if (errors.parentName?.hasError) {
                        runValidationTasks("parentName", value);
                      }
                      setParentName(value);
                    }}
                    onBlur={() => runValidationTasks("parentName", parentName)}
                    placeholder="Parent&apos;s Name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[#C5C5C5]/20 bg-[#2A2A2A]/80 text-white placeholder-[#C5C5C5]/70 focus:outline-none focus:ring-2 focus:ring-[#64F3FF]/50 focus:border-[#64F3FF]/50"
                  />
                  {errors.parentName?.hasError && (
                    <p className="mt-1 text-sm text-red-400">{errors.parentName.errorMessage}</p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    name="parentEmail"
                    value={parentEmail}
                    onChange={(e) => {
                      let { value } = e.target;
                      if (errors.parentEmail?.hasError) {
                        runValidationTasks("parentEmail", value);
                      }
                      setParentEmail(value);
                    }}
                    onBlur={() => runValidationTasks("parentEmail", parentEmail)}
                    placeholder="Parent&apos;s Email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[#C5C5C5]/20 bg-[#2A2A2A]/80 text-white placeholder-[#C5C5C5]/70 focus:outline-none focus:ring-2 focus:ring-[#64F3FF]/50 focus:border-[#64F3FF]/50"
                  />
                  {errors.parentEmail?.hasError && (
                    <p className="mt-1 text-sm text-red-400">{errors.parentEmail.errorMessage}</p>
                  )}
                </div>
                <div className="pt-6 mt-2">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-[#64F3FF]/30 to-transparent"></div>
                </div>
                <div>
                  <input
                    type="text"
                    name="childName"
                    value={childName}
                    onChange={(e) => {
                      let { value } = e.target;
                      if (errors.childName?.hasError) {
                        runValidationTasks("childName", value);
                      }
                      setChildName(value);
                    }}
                    onBlur={() => runValidationTasks("childName", childName)}
                    placeholder="Child&apos;s Name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[#C5C5C5]/20 bg-[#2A2A2A]/80 text-white placeholder-[#C5C5C5]/70 focus:outline-none focus:ring-2 focus:ring-[#64F3FF]/50 focus:border-[#64F3FF]/50"
                  />
                  {errors.childName?.hasError && (
                    <p className="mt-1 text-sm text-red-400">{errors.childName.errorMessage}</p>
                  )}
                </div>
                <div>
                  <input
                    type="number"
                    name="childAge"
                    value={childAge}
                    onChange={(e) => {
                      let { value } = e.target;
                      if (errors.childAge?.hasError) {
                        runValidationTasks("childAge", value);
                      }
                      setChildAge(value);
                    }}
                    onBlur={() => runValidationTasks("childAge", childAge)}
                    placeholder="Child&apos;s Age"
                    required
                    min="0"
                    max="18"
                    className="w-full px-4 py-3 rounded-lg border border-[#C5C5C5]/20 bg-[#2A2A2A]/80 text-white placeholder-[#C5C5C5]/70 focus:outline-none focus:ring-2 focus:ring-[#64F3FF]/50 focus:border-[#64F3FF]/50"
                  />
                  {errors.childAge?.hasError && (
                    <p className="mt-1 text-sm text-red-400">{errors.childAge.errorMessage}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#64F3FF] to-[#0B6FFF] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition duration-200"
                >
                  Join Now
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA; 