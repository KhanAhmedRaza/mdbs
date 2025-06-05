export interface Feature {
  title: string;
  description: string;
}

export interface Service {
  title: string;
  description: string;
  price: string;
}

export interface TranslationType {
  home: {
    hero: {
      title: string;
      subtitle: string;
      bookNow: string;
    };
    services: {
      title: string;
      viewAll: string;
    };
    about: {
      title: string;
      description: string;
    };
    features: {
      title: string;
      [key: string]: string | Feature;
    };
  };
  services: {
    services: {
      [key: string]: Service;
    };
  };
} 