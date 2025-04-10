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
    
    // About Page
    'about.mission.title': 'Our Mission',
    'about.mission.description': 'To support children\'s hospitals in Montréal (CHU Sainte-Justine and Montreal Children\'s Hospital) through raising awareness and funds.',
    'about.vision.title': 'Our Vision',
    'about.vision.description': 'A world where every child has access to quality healthcare.',
    'about.values.title': 'Our Values',
    'about.values.description': 'We believe in the power of unity and collaboration to make a difference.',
    'about.illustrationAlt': 'Open Peeps Illustration',
    
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
    'footer.milesForHope': 'MilesForHope Run',
    'footer.description': 'Making a difference in communities worldwide through sustainable development, education, and healthcare initiatives.',
    'footer.quickLinks': 'Quick Links',
    'footer.resources': 'Resources',
    'footer.copyright': '© {year} MilesForHope. All rights reserved.',
    
    // Language switcher
    'language.en': 'English',
    'language.fr': 'Français',
    
    // About Page Story Section
    'about.story.title': 'Our Story',
    'about.story.paragraph1': 'MilesForHope began in 2015 when a small group of passionate runners decided to combine their love for running with their desire to make a positive impact in their community. What started as a local 5K with just 50 participants has grown into an annual event that attracts hundreds of runners from across the region.',
    'about.story.paragraph2': 'Our founders believed that physical activity could be a powerful catalyst for social change. By bringing people together through running, we create a community of individuals committed to supporting important causes and making a difference in the lives of others.',
    'about.story.paragraph3': 'Over the years, MilesForHope has raised over $500,000 for various community initiatives, focusing on education, healthcare, and sustainable development. We\'ve funded scholarships for underprivileged students, supported local health clinics, and contributed to environmental conservation projects.',
    'about.story.paragraph4': 'Today, MilesForHope continues to grow, but our core mission remains the same: to harness the collective energy and goodwill of runners to create positive change in our communities. Every step taken in our charity run is a step toward a better, more equitable world.',
    
    // About Page Team Section
    'about.team.title': 'Our Team',
    'about.team.sarah.name': 'Sarah Johnson',
    'about.team.sarah.role': 'Founder & Executive Director',
    'about.team.sarah.description': 'Marathon runner and community advocate with 15 years of nonprofit experience.',
    'about.team.michael.name': 'Michael Chen',
    'about.team.michael.role': 'Event Director',
    'about.team.michael.description': 'Former Olympic athlete dedicated to creating inclusive sporting events.',
    'about.team.aisha.name': 'Aisha Patel',
    'about.team.aisha.role': 'Community Outreach Coordinator',
    'about.team.aisha.description': 'Social worker and running coach passionate about empowering communities.',
  },
  fr: {
    // Navigation
    'nav.about': 'À propos',
    'nav.charityRun': 'Course caritative',
    'nav.faq': 'FAQ',
    'nav.sponsors': 'Commanditaires',
    'nav.donate': 'Faire un don',
    'nav.contact': 'Contact',
    'nav.register': 'S\'inscrire',
    
    // About Page
    'about.mission.title': 'Notre Mission',
    'about.mission.description': 'Soutenir les hôpitaux pour enfants de Montréal (CHU Sainte-Justine et Hôpital de Montréal pour enfants) en sensibilisant et en recueillant des fonds.',
    'about.vision.title': 'Notre Vision',
    'about.vision.description': 'Un monde où chaque enfant a accès à des soins de santé de qualité.',
    'about.values.title': 'Nos Valeurs',
    'about.values.description': 'Nous croyons en la puissance de l\'unité et de la collaboration pour faire une différence.',
    'about.illustrationAlt': 'Illustration Open Peeps',
    
    // Hero Section
    'hero.title': 'Miles For Hope : Soutenir les hôpitaux pour enfants à Montréal.',
    'hero.description': 'Une course caritative dirigée par des étudiants pour amasser des fonds pour le CHU Sainte-Justine et l\'Hôpital de Montréal pour enfants. Chaque pas que vous faites aide à construire un avenir meilleur pour les enfants dans le besoin.',
    'hero.register': 'S\'inscrire',
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
    'footer.milesForHope': 'Course MilesForHope',
    'footer.description': 'Faire une différence dans les communautés du monde entier grâce à des initiatives de développement durable, d\'éducation et de soins de santé.',
    'footer.quickLinks': 'Liens Rapides',
    'footer.resources': 'Ressources',
    'footer.copyright': '© {year} MilesForHope. Tous droits réservés.',
    
    // Language switcher
    'language.en': 'English',
    'language.fr': 'Français',
    
    // About Page Story Section
    'about.story.title': 'Notre Histoire',
    'about.story.paragraph1': 'MilesForHope a débuté en 2015 lorsqu\'un petit groupe de coureurs passionnés a décidé de combiner leur amour de la course avec leur désir d\'avoir un impact positif dans leur communauté. Ce qui a commencé comme un 5K local avec seulement 50 participants est devenu un événement annuel qui attire des centaines de coureurs de toute la région.',
    'about.story.paragraph2': 'Nos fondateurs croyaient que l\'activité physique pouvait être un puissant catalyseur de changement social. En rassemblant les gens par la course, nous créons une communauté d\'individus engagés à soutenir des causes importantes et à faire une différence dans la vie des autres.',
    'about.story.paragraph3': 'Au fil des années, MilesForHope a amassé plus de 500 000 $ pour diverses initiatives communautaires, se concentrant sur l\'éducation, les soins de santé et le développement durable. Nous avons financé des bourses pour des étudiants défavorisés, soutenu des cliniques de santé locales et contribué à des projets de conservation de l\'environnement.',
    'about.story.paragraph4': 'Aujourd\'hui, MilesForHope continue de croître, mais notre mission fondamentale reste la même : exploiter l\'énergie collective et la bonne volonté des coureurs pour créer un changement positif dans nos communautés. Chaque pas franchi dans notre course caritative est un pas vers un monde meilleur et plus équitable.',
    
    // About Page Team Section
    'about.team.title': 'Notre Équipe',
    'about.team.sarah.name': 'Sarah Johnson',
    'about.team.sarah.role': 'Fondatrice et Directrice Exécutive',
    'about.team.sarah.description': 'Marathonienne et défenseure communautaire avec 15 ans d\'expérience dans le secteur sans but lucratif.',
    'about.team.michael.name': 'Michael Chen',
    'about.team.michael.role': 'Directeur de l\'Événement',
    'about.team.michael.description': 'Ancien athlète olympique dédié à la création d\'événements sportifs inclusifs.',
    'about.team.aisha.name': 'Aisha Patel',
    'about.team.aisha.role': 'Coordinatrice de l\'Engagement Communautaire',
    'about.team.aisha.description': 'Travailleuse sociale et entraîneuse de course passionnée par l\'autonomisation des communautés.',
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