import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import classes from './style.module.scss';
import cn from 'classnames';
import { LightIcon } from '../Icons/LightIcon';
import { DarkIcon } from '../Icons/DarkIcon';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className={cn(classes.themeToggle, {
        [classes.dark]: theme === 'dark',
      })}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      <div className={classes.toggleTrack}>
        <div className={classes.icons}>
          <div className={classes.iconSun}>
            <LightIcon />
          </div>
          <div className={classes.iconMoon}>
            <DarkIcon />
          </div>
        </div>
        <div className={classes.toggleThumb} />
      </div>
    </button>
  );
};