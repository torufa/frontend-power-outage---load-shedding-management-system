import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

interface NavigationContextType {
  pathname: string;
  searchParams: URLSearchParams;
  push: (href: string) => void;
  replace: (href: string) => void;
  back: () => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUrl, setCurrentUrl] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname + window.location.search;
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentUrl(window.location.pathname + window.location.search);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const push = (href: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', href);
      setCurrentUrl(href);
      window.scrollTo(0, 0);
    }
  };

  const replace = (href: string) => {
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', href);
      setCurrentUrl(href);
    }
  };

  const back = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  const pathname = useMemo(() => {
    const [path] = currentUrl.split('?');
    return path || '/';
  }, [currentUrl]);

  const searchParams = useMemo(() => {
    const parts = currentUrl.split('?');
    return new URLSearchParams(parts[1] || '');
  }, [currentUrl]);

  return (
    <NavigationContext.Provider value={{ pathname, searchParams, push, replace, back }}>
      {children}
    </NavigationContext.Provider>
  );
};

export function useRouter() {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    return {
      push: (href: string) => {
        if (typeof window !== 'undefined') window.location.href = href;
      },
      replace: (href: string) => {
        if (typeof window !== 'undefined') window.location.replace(href);
      },
      back: () => {
        if (typeof window !== 'undefined') window.history.back();
      }
    };
  }
  return {
    push: ctx.push,
    replace: ctx.replace,
    back: ctx.back
  };
}

export function usePathname(): string {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    return typeof window !== 'undefined' ? window.location.pathname : '/';
  }
  return ctx.pathname;
}

export function useSearchParams(): URLSearchParams {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    return typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  }
  return ctx.searchParams;
}

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ href, className, children, onClick, ...props }) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
      e.preventDefault();
      router.push(href);
    }
  };

  return (
    <a href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};
