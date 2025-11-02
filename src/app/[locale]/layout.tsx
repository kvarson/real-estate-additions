import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: 'az' }, { locale: 'en' }, { locale: 'ru' }];
}

export const metadata = {
  title: "Alliance Properties",
  description: "Next.js application developed for Alians",
  icons: {
    icon: "/favicon.png",
  },
};


export default async function LocaleLayout(props: Props) {
  const params = await props.params;
  const locale = params.locale;
  
  console.log('Layout - Received locale:', locale);
  
  // Validate that the incoming locale parameter is valid
  if (!['az', 'en', 'ru'].includes(locale)) {
    notFound();
  }

  // Get messages for the specific locale
  const messages = await getMessages({locale});
  
  console.log('Layout - Messages keys:', Object.keys(messages || {}));
  console.log('Layout - Navigation messages:', messages?.navigation);

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {props.children}
    </NextIntlClientProvider>
  );
}