import Head from 'next/head';
import { ReactNode, useState } from 'react';
import '../../../app/globals.css'
import classes from '@/styles/Dashboard.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import ChatIcon from '@/components/atoms/Icons/ChatIcon';
import HomeIcon from '@/components/atoms/Icons/HomeIcon';
import SettingsIcon from '@/components/atoms/Icons/SettingsIcon';
import { useRouter } from 'next/router';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function DashboardLayout({ children, title = 'Dashboard | ProGraph' }: DashboardLayoutProps) {
  const [userName, setUserName] = useState('Name Last name');
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="ProGraph Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="dashboard-layout">
        <div className={classes.dashboard}>
          {/* Sidebar */}
          <aside className={classes.sidebar}>
            <div className={classes.sidebar__logo}>
              <Image
                src="/images/logo.png"
                alt="ProGraph"
                width={120}
                height={40}
              />
            </div>

            <nav className={classes.sidebar__nav}>
              <Link href="/dashboard" className={classes.sidebar__navItem + (router.route === ('/dashboard') ? (' ' + classes.sidebar__navItem_active) : '')}>
                <HomeIcon />
                <span>Home</span>
              </Link>
              <Link href="/dashboard/settings" className={classes.sidebar__navItem + (router.route.includes('/dashboard/settings') ? (' ' + classes.sidebar__navItem_active) : '')}>
                <SettingsIcon />
                <span>Settings</span>
              </Link>
              <Link href="/dashboard/chat" className={classes.sidebar__navItem + (router.route.includes('/dashboard/chat') ? (' ' + classes.sidebar__navItem_active) : '')}>
                <ChatIcon />
                <span>Chat</span>
              </Link>
            </nav>
          </aside>

          {/* Main content */}
          <main className={classes.content}>
            <header className={classes.header}>
              <div className={classes.header__user}>
                <div className={classes.header__userAvatar}>
                  <Image
                    src="/images/avatar-placeholder.png"
                    alt="User avatar"
                    width={40}
                    height={40}
                  />
                </div>
                <div className={classes.header__userName}>
                  {userName}
                  <span className={classes.header__userDropdown}>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </header>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}