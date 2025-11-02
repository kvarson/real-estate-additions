// CTA (Call to Action) section component
"use client";

import React from 'react';
import { Button } from '@/components/ui';
import { MailIcon, Phone, MapPin, ArrowRight } from "lucide-react";
import { useTranslations } from 'next-intl';


const ContactSectionContent: React.FC = () => {
  const t = useTranslations('contactForm');

  return (
  <div className="bg-white text-black">
            <div className="container mx-auto px-12 py-20 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24 items-start">
                    {/* Sol Taraf - Bilgi */}
                    <div className="lg:col-span-2">
                        <h2 className="text-4xl md:text-5xl font-semibold tracking-wider">{t('title')}</h2>
                        <p className="mt-4 text-zinc-600 max-w-md">{t('description')}</p>
                        <div className="mt-8 space-y-4">
                            <div className="flex items-center">
                                <MailIcon className="w-5 h-5 text-zinc-500 mr-3"/>
                                <div>
                                    <h4 className="font-semibold">{t('email.label')}</h4>
                                    <a href="mailto:info@alians.az" className="text-zinc-600 hover:text-black">{t('email.value')}</a>
                                </div>
                            </div>
                             <div className="flex items-center">
                                <Phone className="w-5 h-5 text-zinc-500 mr-3"/>
                                <div>
                                    <h4 className="font-semibold">{t('phone.label')}</h4>
                                    <p className="text-zinc-600">{t('phone.value')}</p>
                                </div>
                            </div>
                             <div className="flex items-center">
                                <MapPin className="w-5 h-5 text-zinc-500 mr-3"/>
                                <div>
                                    <h4 className="font-semibold">{t('address.label')}</h4>
                                    <p className="text-zinc-600">{t('address.value')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Sağ Taraf - Form */}
                    <div className="lg:col-span-3">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-zinc-700">{t('form.name')}</label>
                                    <input type="text" id="name" className="mt-1 block w-full bg-zinc-100 border-zinc-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"/>
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-zinc-700">{t('form.phone')}</label>
                                    <input type="text" id="phone" placeholder="+994(50)" className="mt-1 block w-full bg-zinc-100 border-zinc-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="question" className="block text-sm font-medium text-zinc-700">{t('form.question')}</label>
                                <textarea id="question" rows={5} placeholder={t('form.placeholder')} className="mt-1 block w-full bg-zinc-100 border-zinc-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full flex justify-center items-center px-6 py-4 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-zinc-800 transition-colors">
                                    {t('form.submit')} <ArrowRight className="ml-2 h-5 w-5" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Harita Bölümü */}
                <div className="mt-16 md:mt-24 w-full h-[400px] md:h-[500px]">
                <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48582.25141011883!2d49.91421712497099!3d40.43003023028334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4030853865622835%3A0x1816e6e87f86434!2sSabunchi%2C%20Baku%2C%20Azerbaijan!5e0!3m2!1sen!2s!4v1695904818783!5m2!1sen!2s"
  width="100%"
  height="100%"
  style={{ border: 0 }}
  allowFullScreen={true}
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  className="filter grayscale invert brightness-80 contrast-120"
/>

                </div>
            </div>
        </div>


  );
};

export default ContactSectionContent;