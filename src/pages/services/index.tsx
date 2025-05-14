import '../../app/globals.css';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PageHero from '@/components/molecules/PageHero/PageHero';
import ServicesList from '@/components/molecules/ServicesList/ServicesList';
import Head from 'next/head';
import { IService, serviceService } from '@/services/serviceService';

interface ServicesPageProps {
  services?: IService[];
}

export default function Services({ services }: ServicesPageProps) {
  return (
    <>
      <Head>
        <title>Our Services | ProGraph</title>
        <meta name="description" content="Find the service you need on our page" />
      </Head>
      <section>
        <PageHero title={'Our Services'} subtitle={'Find the service you need on our page'} />
        <ServicesList initialServices={services} />
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  try {
    const response = await serviceService.getMany({
      skip: 0,
      take: 10
    });

    // Ensure the response.list is an array and filter out any undefined or null values
    const services = Array.isArray(response.list) 
      ? response.list.filter(service => service !== null && service !== undefined)
      : [];

    return {
      props: {
        services,
        ...(await serverSideTranslations(locale, ['common']))
      },
      revalidate: 60 // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching services:', error);
    return {
      props: {
        services: [],
        ...(await serverSideTranslations(locale, ['common']))
      },
      revalidate: 60
    };
  }
}