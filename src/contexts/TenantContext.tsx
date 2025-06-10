import React, { createContext, useContext, useState, useEffect } from 'react';
import { BusinessConfig, TenantContextType, BUSINESS_CONFIGS } from '../types/tenant';
import { useRouter } from 'next/router';

const TenantContext = createContext<TenantContextType>({
  currentTenant: BUSINESS_CONFIGS['md-barber'],
  setCurrentTenant: () => {},
});

export const useTenant = () => useContext(TenantContext);

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [currentTenant, setCurrentTenant] = useState<BusinessConfig>(BUSINESS_CONFIGS['md-barber']);

  useEffect(() => {
    // Get business ID from subdomain or query parameter
    const hostname = window.location.hostname;
    const subdomain = hostname.split('.')[0];
    
    // Use 'bid' (business ID) instead of 'tenant' in URL
    const businessId = router.query.bid as string || subdomain;

    // Map common subdomains to business IDs
    const subdomainMap: { [key: string]: string } = {
      'md': 'md-barber',
      'xyz': 'xyz-salon',
      'abc': 'abc-cuts',
      // Add more mappings as needed
    };

    // Try to get the business ID from the subdomain map first
    const mappedId = subdomainMap[businessId] || businessId;

    if (BUSINESS_CONFIGS[mappedId]) {
      setCurrentTenant(BUSINESS_CONFIGS[mappedId]);
    }
  }, [router.query.bid]);

  return (
    <TenantContext.Provider value={{ currentTenant, setCurrentTenant }}>
      {children}
    </TenantContext.Provider>
  );
}; 