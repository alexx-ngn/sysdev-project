"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Define the translations type
type Translations = {
  [key: string]: string | { [key: string]: string };
};

// Default translations
const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.charityRun': 'Charity Run',
    'nav.faq': 'FAQ',
    'nav.sponsors': 'Sponsors',
    'nav.donate': 'Donate',
    'nav.contact': 'Contact',
    'nav.register': 'Register Now',
    
    // Hero Section
    'hero.title': 'Miles For Hope: Supporting children\'s hospitals in Montréal.',
    'hero.description': 'A student-led charity run raising funds for CHU Sainte-Justine and Montreal Children\'s Hospital. Every step you take helps build a better future for children in need.',
    'hero.register': 'Register Now',
    'hero.learnMore': 'Learn More',
    
    // Featured Sections
    'featured.about.title': 'About Us',
    'featured.about.description': 'Learn about our mission and impact',
    'featured.about.content': 'MilesForHope is a student-led charity run dedicated to raising funds for children\'s hospitals in Montréal, specifically supporting CHU Sainte-Justine and Montreal Children\'s Hospital.',
    'featured.about.readMore': 'Read More',
    
    'featured.run.title': 'Charity Run',
    'featured.run.description': 'Event details and schedule',
    'featured.run.content': 'Join us for a day of running, community, and making a difference. Participants can win medals, merchandise, and other goods while supporting a great cause. Every step counts!',
    'featured.run.viewDetails': 'View Details',
    
    'featured.involved.title': 'Get Involved',
    'featured.involved.description': 'Ways to support our cause',
    'featured.involved.content': 'There are many ways to support MilesForHope - register for the run, make a donation, or become a sponsor.',
    'featured.involved.support': 'Support Us',
    
    // Registration CTA
    'cta.title': 'Ready to Join Us?',
    'cta.description': 'Register today for the MilesForHope Run and be part of something meaningful. Every participant makes a difference.',
    'cta.register': 'Register Now',
    
    // Sponsors
    'sponsors.title': 'Our Sponsors',
    'sponsors.description': 'We\'re grateful to the organizations that make our charity run possible.',
    'sponsors.viewAll': 'View All Sponsors',
    
    // Footer
    'footer.description': 'Making a difference in communities worldwide through sustainable development, education, and healthcare initiatives.',
    'footer.quickLinks': 'Quick Links',
    'footer.resources': 'Resources',
    'footer.copyright': '© {year} MilesForHope. All rights reserved.',
    
    // Language switcher
    'language.en': 'English',
    'language.fr': 'Français',
  },
  fr: {
    // Navigation
    'nav.about': 'À propos',
    'nav.charityRun': 'Course caritative',
    'nav.faq': 'FAQ',
    'nav.sponsors': 'Commanditaires',
    'nav.donate': 'Faire un don',
    'nav.contact': 'Contact',
    'nav.register': 'S\'inscrire maintenant',
    
    // Hero Section
    'hero.title': 'Miles For Hope : Soutenir les hôpitaux pour enfants à Montréal.',
    'hero.description': 'Une course caritative dirigée par des étudiants pour amasser des fonds pour le CHU Sainte-Justine et l\'Hôpital de Montréal pour enfants. Chaque pas que vous faites aide à construire un avenir meilleur pour les enfants dans le besoin.',
    'hero.register': 'S\'inscrire maintenant',
    'hero.learnMore': 'En savoir plus',
    
    // Featured Sections
    'featured.about.title': 'À propos de nous',
    'featured.about.description': 'Découvrez notre mission et notre impact',
    'featured.about.content': 'MilesForHope est une course caritative dirigée par des étudiants dédiée à la collecte de fonds pour les hôpitaux pour enfants à Montréal, soutenant spécifiquement le CHU Sainte-Justine et l\'Hôpital de Montréal pour enfants.',
    'featured.about.readMore': 'Lire plus',
    
    'featured.run.title': 'Course caritative',
    'featured.run.description': 'Détails et horaire de l\'événement',
    'featured.run.content': 'Rejoignez-nous pour une journée de course, de communauté et de changement. Les participants peuvent gagner des médailles, des articles promotionnels et d\'autres biens tout en soutenant une excellente cause. Chaque pas compte !',
    'featured.run.viewDetails': 'Voir les détails',
    
    'featured.involved.title': 'Impliquez-vous',
    'featured.involved.description': 'Moyens de soutenir notre cause',
    'featured.involved.content': 'Il existe de nombreuses façons de soutenir MilesForHope - s\'inscrire à la course, faire un don ou devenir commanditaire.',
    'featured.involved.support': 'Nous soutenir',
    
    // Registration CTA
    'cta.title': 'Prêt à nous rejoindre ?',
    'cta.description': 'Inscrivez-vous aujourd\'hui pour la course MilesForHope et faites partie de quelque chose de significatif. Chaque participant fait une différence.',
    'cta.register': 'S\'inscrire maintenant',
    
    // Sponsors
    'sponsors.title': 'Nos commanditaires',
    'sponsors.description': 'Nous sommes reconnaissants aux organisations qui rendent notre course caritative possible.',
    'sponsors.viewAll': 'Voir tous les commanditaires',
    
    // Footer
    'footer.description': 'Faire une différence dans les communautés du monde entier grâce à des initiatives de développement durable, d\'éducation et de soins de santé.',
    'footer.quickLinks': 'Liens rapides',
    'footer.resources': 'Ressources',
    'footer.copyright': '© {year} MilesForHope. Tous droits réservés.',
    
    // Language switcher
    'language.en': 'English',
    'language.fr': 'Français',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // Initialize language from localStorage or browser preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
      setLanguage(savedLanguage);
    } else {
      // Check browser language preference
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'fr') {
        setLanguage('fr');
      }
    }
  }, []);

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
    // Update HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    // Direct lookup for flat keys
    if (key in translations[language]) {
      return translations[language][key] as string;
    }
    
    // For nested keys like 'hero.title'
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return the key if translation not found
      }
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 