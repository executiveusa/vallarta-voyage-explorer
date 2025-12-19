import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const getCanonicalUrl = (pathname: string): string => {
  const siteUrl = import.meta.env.VITE_PUBLIC_SITE_URL || window.location.origin;
  // Ensure no trailing slash unless root, ensuring normalization
  const cleanPath = pathname === '/' ? '' : pathname.replace(/\/$/, '');
  return `${siteUrl}${cleanPath}`;
};

export const CanonicalTag = () => {
    const location = useLocation();
    const url = getCanonicalUrl(location.pathname);

    useEffect(() => {
        let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
        if (!link) {
            link = document.createElement('link');
            link.rel = 'canonical';
            document.head.appendChild(link);
        }
        link.href = url;
    }, [url]);

    return null; // Headless component
};
