import Head from 'next/head';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classes from '@/styles/Dashboard.module.scss';
import HomeIcon from '@/components/atoms/Icons/HomeIcon';
import SettingsIcon from '@/components/atoms/Icons/SettingsIcon';
import ChatIcon from '@/components/atoms/Icons/ChatIcon';
import DashboardLayout from '@/components/layouts/DashboardLayout/DashboardLayout';

export default function DashboardSettings() {
  const [userName, setUserName] = useState('Name Last name');
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    company: 'ProGraph',
    address: '123 Main St, New York, NY 10001'
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings logic would go here
    alert('Settings saved!');
  };
  
  return (
    <>
      <Head>
        <title>Settings | Dashboard | ProGraph</title>
        <meta name="description" content="ProGraph Dashboard Settings" />
      </Head>

      <DashboardLayout>   
          <div className={classes.dashboard__content}>
            <div className={classes.settings}>
              <h1 className={classes.settings__title}>Account Settings</h1>
              
              <div className={classes.settings__card}>
                <form onSubmit={handleSubmit} className={classes.settings__form}>
                  <div className={classes.settings__formRow}>
                    <div className={classes.settings__formGroup}>
                      <label className={classes.settings__label}>First Name</label>
                      <input 
                        type="text" 
                        name="firstName" 
                        value={formData.firstName} 
                        onChange={handleChange}
                        className={classes.settings__input}
                      />
                    </div>
                    <div className={classes.settings__formGroup}>
                      <label className={classes.settings__label}>Last Name</label>
                      <input 
                        type="text" 
                        name="lastName" 
                        value={formData.lastName} 
                        onChange={handleChange}
                        className={classes.settings__input}
                      />
                    </div>
                  </div>
                  
                  <div className={classes.settings__formRow}>
                    <div className={classes.settings__formGroup}>
                      <label className={classes.settings__label}>Email</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange}
                        className={classes.settings__input}
                      />
                    </div>
                    <div className={classes.settings__formGroup}>
                      <label className={classes.settings__label}>Phone</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange}
                        className={classes.settings__input}
                      />
                    </div>
                  </div>
                  
                  <div className={classes.settings__formRow}>
                    <div className={classes.settings__formGroup}>
                      <label className={classes.settings__label}>Company</label>
                      <input 
                        type="text" 
                        name="company" 
                        value={formData.company} 
                        onChange={handleChange}
                        className={classes.settings__input}
                      />
                    </div>
                    <div className={classes.settings__formGroup}>
                      <label className={classes.settings__label}>Address</label>
                      <input 
                        type="text" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleChange}
                        className={classes.settings__input}
                      />
                    </div>
                  </div>
                  
                  <div className={classes.settings__formActions}>
                    <button type="submit" className={classes.settings__saveButton}>
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
      </DashboardLayout>
    </>
  );
}