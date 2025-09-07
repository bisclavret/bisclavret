import { useState, useEffect, useRef } from 'react';

export const useDropdownMenu = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const submenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const openSubmenu = () => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
    }
    setActiveSubmenu('preferences');
  };

  const closeSubmenu = () => {
    submenuTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 100);
  };

  const toggleDropdown = (dropdownName: string) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const openDropdownOnHover = (dropdownName: string) => {
    if (activeDropdown) { // Only allow hover to open if a dropdown is already active
      setActiveDropdown(dropdownName);
    }
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setActiveSubmenu(null);
        if (submenuTimeoutRef.current) {
          clearTimeout(submenuTimeoutRef.current);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (submenuTimeoutRef.current) {
        clearTimeout(submenuTimeoutRef.current);
      }
    };
  }, []);

  return {
    activeDropdown,
    activeSubmenu,
    menuRef,
    openSubmenu,
    closeSubmenu,
    toggleDropdown,
    openDropdownOnHover
  };
};