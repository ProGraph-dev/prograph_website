import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import classes from '@/styles/Dashboard.module.scss';
import ProjectProgress from '@/components/molecules/Dashboard/ProjectProgress/ProjectProgress';
import ProjectLikes from '@/components/molecules/Dashboard/ProjectLikes/ProjectLikes';
import ProjectHistory from '@/components/molecules/Dashboard/ProjectHistory/ProjectHistory';
import DashboardLayout from '@/components/layouts/DashboardLayout/DashboardLayout';

export default function Dashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState('Name Last name');

  return (
    <>
      <Head>
        <title>Dashboard | ProGraph</title>
        <meta name="description" content="ProGraph Dashboard" />
      </Head>


      <DashboardLayout>
        <div className={classes.dashboard__content}>
          <div className={classes.dashboard__section}>
            <ProjectProgress
              title="My Project"
              projectName="Branding for it company"
              currentStep={2}
              steps={[
                { name: "Design development", completed: true },
                { name: "Confirmation", completed: true },
                { name: "Programming", completed: false },
                { name: "Finished", completed: false },
                { name: "Payment", completed: false }
              ]}
            />
          </div>

          <div className={classes.dashboard__section}>
            <ProjectLikes
              likes={[
                {
                  id: 1,
                  title: "Landing page",
                  image: "/images/dashboard/project-1.jpg",
                  views: 50,
                  likes: 30
                },
                {
                  id: 2,
                  title: "Jewelry web site",
                  image: "/images/dashboard/project-2.jpg",
                  views: 50,
                  likes: 30
                },
                {
                  id: 3,
                  title: "Banking app",
                  image: "/images/dashboard/project-3.jpg",
                  views: 50,
                  likes: 30
                }
              ]}
            />
          </div>

          <div className={classes.dashboard__section}>
            <ProjectHistory
              history={[
                {
                  id: 1,
                  name: "Logo design",
                  date: "02.10.2023",
                  price: "$50"
                },
                {
                  id: 2,
                  name: "Web site for IT company",
                  date: "10.10.2023",
                  price: "$5000"
                }
              ]}
            />
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}