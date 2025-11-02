// Contact form component

'use client';

import React from 'react';
import { Button, Input } from '@/components/ui';
import { useForm } from '@/hooks/useForm';
import { ContactForm as ContactFormType } from '@/types';
import { validateEmail, validatePhone } from '@/utils';
import { apiClient } from '@/lib/api';

const ContactForm: React.FC = () => {
     const { values, setValue, getFieldError, handleSubmit, isSubmitting } =
          useForm<ContactFormType>(
               {
                    name: '',
                    phone: '',
                    message: '',
               },
               {
                    name: (value: unknown) => {
                         const stringValue = value as string;
                         if (!stringValue || stringValue.trim().length < 2) {
                              return 'Name must be at least 2 characters long';
                         }
                         return null;
                    },
                    phone: (value: unknown) => {
                         const stringValue = value as string;
                         if (!stringValue || !validatePhone(stringValue)) {
                              return 'Please enter a valid phone number';
                         }
                         return null;
                    },
                    message: (value: unknown) => {
                         const stringValue = value as string;
                         if (!stringValue || stringValue.trim().length < 10) {
                              return 'Message must be at least 10 characters long';
                         }
                         return null;
                    },
               }
          );

     const onSubmit = async (data: ContactFormType) => {
          try {
               await apiClient.submitContactForm(data);
               alert('Message sent successfully!');
               // Reset form or redirect
          } catch (error) {
               console.error('Failed to send message:', error);
               alert('Failed to send message. Please try again.');
          }
     };

     return (
          <form
               className="space-y-4"
               onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit);
               }}
          >
               <Input
                    label="Name"
                    placeholder="Your name"
                    value={values.name}
                    onChange={(value) => setValue('name', value)}
                    error={getFieldError('name')}
                    required
               />

               <Input
                    label="Phone"
                    placeholder="Your phone number"
                    type="tel"
                    value={values.phone}
                    onChange={(value) => setValue('phone', value)}
                    error={getFieldError('phone')}
                    required
               />

               <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                         Message <span className="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                         placeholder="Your message"
                         value={values.message}
                         onChange={(e) => setValue('message', e.target.value)}
                         rows={4}
                         required
                    />
                    {getFieldError('message') && (
                         <p className="text-sm text-red-600">
                              {getFieldError('message')}
                         </p>
                    )}
               </div>

               <Button type="submit" loading={isSubmitting} className="w-full">
                    {isSubmitting ? 'Sending...' : 'Send Message →'}
               </Button>
          </form>
     );
};

export default ContactForm;
