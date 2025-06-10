export interface BusinessConfig {
  id: string;
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  stores: Store[];
  currency: string;
  dateFormat: string;
  timeZone: string;
  features: {
    marketing: boolean;
    finance: boolean;
    inventory: boolean;
    scheduling: boolean;
    reviews: boolean;
    referrals: boolean;
  };
}

export interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface TenantContextType {
  currentTenant: BusinessConfig;
  setCurrentTenant: (config: BusinessConfig) => void;
}

// Sample business configurations
export const BUSINESS_CONFIGS: { [key: string]: BusinessConfig } = {
  'md-barber': {
    id: 'md-barber',
    name: 'MD Barber Club',
    logo: '/logos/md-barber.png',
    primaryColor: '#1976d2',
    secondaryColor: '#dc004e',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    timeZone: 'America/New_York',
    stores: [
      {
        id: 'raleigh',
        name: 'Raleigh',
        address: '123 Main St, Raleigh, NC',
        phone: '(919) 555-0123',
        email: 'raleigh@mdbarber.com'
      },
      {
        id: 'charlotte',
        name: 'Charlotte',
        address: '456 Oak Ave, Charlotte, NC',
        phone: '(704) 555-0456',
        email: 'charlotte@mdbarber.com'
      },
      {
        id: 'durham',
        name: 'Durham',
        address: '789 Pine Rd, Durham, NC',
        phone: '(919) 555-0789',
        email: 'durham@mdbarber.com'
      }
    ],
    features: {
      marketing: true,
      finance: true,
      inventory: true,
      scheduling: true,
      reviews: true,
      referrals: true
    }
  },
  'xyz-salon': {
    id: 'xyz-salon',
    name: 'XYZ Luxury Salon',
    logo: '/logos/xyz-salon.png',
    primaryColor: '#2e7d32',
    secondaryColor: '#f57c00',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    timeZone: 'America/Chicago',
    stores: [
      {
        id: 'downtown',
        name: 'Downtown',
        address: '100 State St, Chicago, IL',
        phone: '(312) 555-0100',
        email: 'downtown@xyzsalon.com'
      },
      {
        id: 'northside',
        name: 'Northside',
        address: '200 North Ave, Chicago, IL',
        phone: '(312) 555-0200',
        email: 'northside@xyzsalon.com'
      }
    ],
    features: {
      marketing: true,
      finance: true,
      inventory: false,
      scheduling: true,
      reviews: true,
      referrals: false
    }
  },
  'abc-cuts': {
    id: 'abc-cuts',
    name: 'ABC Premium Cuts',
    logo: '/logos/abc-cuts.png',
    primaryColor: '#6a1b9a',
    secondaryColor: '#00838f',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    timeZone: 'America/Los_Angeles',
    stores: [
      {
        id: 'beverly',
        name: 'Beverly Hills',
        address: '300 Beverly Dr, Beverly Hills, CA',
        phone: '(310) 555-0300',
        email: 'beverly@abccuts.com'
      },
      {
        id: 'santa-monica',
        name: 'Santa Monica',
        address: '400 Ocean Ave, Santa Monica, CA',
        phone: '(310) 555-0400',
        email: 'santamonica@abccuts.com'
      },
      {
        id: 'hollywood',
        name: 'Hollywood',
        address: '500 Sunset Blvd, Los Angeles, CA',
        phone: '(323) 555-0500',
        email: 'hollywood@abccuts.com'
      }
    ],
    features: {
      marketing: true,
      finance: true,
      inventory: true,
      scheduling: true,
      reviews: true,
      referrals: true
    }
  }
}; 