import '../../../app/globals.css';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PageHero from '@/components/molecules/PageHero/PageHero';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import api from '@/services/api'; // Import the API service
import classes from './style.module.scss';
import cn from 'classnames';
import ServicesItem from '@/components/atoms/ServicesItem/ServicesItem';
import ServiceItem from "@/components/atoms/ServiceItem/ServiceItem";

// Define the Service interface
interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  relatedServices?: RelatedService[];
}

interface RelatedService {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: 'landing-page' | 'jewelry-web-site' | 'banking-app' | 'mobile-app' | 'landing-page-2';
}

interface ServiceDetailProps {
  service?: Service;
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  const router = useRouter();
  const { slug } = router.query;
  const [loading, setLoading] = useState(!service);
  const [serviceData, setServiceData] = useState<Service | null>(service || null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If we don't have service data from SSR, fetch it client-side
    if (!service && slug) {
      setLoading(true);
      
      // Use API service instead of fetch
      api.get(`/api/services/${slug}`)
        .then(response => {
          setServiceData(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.response?.data?.message || 'Service not found');
          setLoading(false);
        });
    }
  }, [slug, service]);

  // Handle loading state
  if (loading) {
    return (
      <div className={cn('container', classes.loadingContainer)}>
        <h2>Loading service information...</h2>
      </div>
    );
  }

  // Handle error state
  if (error || !serviceData) {
    return (
      <div className={cn('container', classes.errorContainer)}>
        <h2>Service not found</h2>
        <p>{error || 'The requested service could not be found.'}</p>
        <button 
          onClick={() => router.push('/services')}
          className={classes.backButton}
        >
          Back to Services
        </button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{serviceData.title} | ProGraph</title>
        <meta name="description" content={serviceData.description.substring(0, 160)} />
      </Head>
      
      <section>
        <PageHero 
          title={serviceData.title} 
          subtitle={serviceData.description.substring(0, 120) + '...'} 
        />
        
        <div className={cn('container', classes.serviceDetail__container)}>
          
          {/* Grid view for related services */}
          <div className={classes.serviceDetail__relatedServices}>
            <div className={classes.serviceDetail__grid}>
              <ServiceItem
                title="Jewelery Design"
                type="Landing page"
                likes={15}
                views={20}
                id={1}
                image='/test'
              />
              <ServiceItem
                  title="Jewelery Design"
                  type="Landing page"
                  likes={15}
                  views={20}
                  id={1}
                  image='/test'
              />
              <ServiceItem
                  title="Jewelery Design"
                  type="Landing page"
                  likes={15}
                  views={20}
                  id={1}
                  image='/test'
              />
              <ServiceItem
                  title="Jewelery Design"
                  type="Landing page"
                  likes={15}
                  views={20}
                  id={1}
                  image='/test'
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale = 'en', params } = context;
  const slug = params?.slug as string;

  try {
    // Use API service for server-side requests
    // In a real application, you would use this to fetch data
    // const response = await api.get(`/api/services/${slug}`);
    // const service = response.data;
    
    // Mock data for demonstration
    const mockServices: Record<string, Service> = {
      'web-development': {
        id: '1',
        slug: 'web-development',
        title: 'Web Development',
        description: 'Professional web development services tailored to your business needs. We create responsive, user-friendly websites that help you achieve your goals.',
        features: [
          'Responsive design for all devices',
          'SEO optimization',
          'Performance optimization',
          'Content management systems',
          'E-commerce solutions'
        ],
        image: '/images/services/web-development.jpg'
      },
      'mobile-apps': {
        id: '2',
        slug: 'mobile-apps',
        title: 'Mobile App Development',
        description: 'Mobile Apps',
        features: [
          'Native iOS and Android development',
          'Cross-platform solutions',
          'UI/UX design',
          'App store optimization',
          'Ongoing maintenance and support'
        ],
        image: '/images/services/mobile-apps.jpg'
      },
      'graphic-design': {
        id: '3',
        slug: 'graphic-design',
        title: 'Graphic Design',
        description: 'Graphic Design',
        features: [
          'Brand identity design',
          'Logo design',
          'Marketing materials',
          'Social media graphics',
          'Print design'
        ],
        image: '/images/services/graphic-design.jpg'
      }
    };
    
    const service = mockServices[slug];
    
    if (!service) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        service
      },
    };
  } catch (error) {
    console.error('Error fetching service:', error);
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  }
};