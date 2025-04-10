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
    
    // Run Page
    'run.title': 'Charity Run Details',
    'run.description': 'Join our student-led charity run for a day of running, community, and making a difference. Every step you take helps us raise funds for CHU Sainte-Justine and Montreal Children\'s Hospital.',
    'run.date.title': 'Date',
    'run.date.value': 'Saturday, October 15, 2023',
    'run.time.title': 'Time',
    'run.time.checkin': 'Check-in: 6:00 AM',
    'run.time.start': 'Race Start: 7:00 AM',
    'run.location.title': 'Location',
    'run.location.address1': 'City Park',
    'run.location.address2': '123 Runner\'s Lane',
    'run.location.address3': 'Hopeville, State 12345',
    'run.courseInfo.title': 'Course Information',
    'run.courseInfo.subtitle': '5K Run/Walk',
    'run.courseInfo.description': 'Our 5K course is designed to be accessible for participants of all fitness levels. The route takes you through scenic City Park with beautiful views of the lake and gardens.',
    'run.courseInfo.terrain': 'Mostly flat terrain with gentle inclines',
    'run.courseInfo.paths': 'Paved paths throughout the course',
    'run.courseInfo.waterStations': 'Water stations at the 1.5K and 3K marks',
    'run.courseInfo.medicalSupport': 'Medical support available along the route',
    'run.courseInfo.map': 'Course Map',
    'run.schedule.title': 'Event Schedule',
    'run.schedule.checkin.time': '6:00 AM',
    'run.schedule.checkin.title': 'Check-in & Registration Opens',
    'run.schedule.checkin.description': 'Pick up your race packet and t-shirt',
    'run.schedule.warmup.time': '6:45 AM',
    'run.schedule.warmup.title': 'Pre-Race Warm-up',
    'run.schedule.warmup.description': 'Join our fitness instructor for a group warm-up',
    'run.schedule.start.time': '7:00 AM',
    'run.schedule.start.title': 'Race Start',
    'run.schedule.start.description': '5K run/walk begins',
    'run.schedule.awards.time': '8:30 AM',
    'run.schedule.awards.title': 'Awards Ceremony',
    'run.schedule.awards.description': 'Recognition of top finishers and fundraisers',
    'run.schedule.celebration.time': '9:00 AM',
    'run.schedule.celebration.title': 'Post-Race Celebration',
    'run.schedule.celebration.description': 'Refreshments, music, and community activities',
    'run.schedule.end.time': '11:00 AM',
    'run.schedule.end.title': 'Event Concludes',
    'run.bring.title': 'What to Bring',
    'run.bring.shoes': 'Comfortable running/walking shoes',
    'run.bring.clothing': 'Weather-appropriate clothing',
    'run.bring.water': 'Water bottle (water stations will also be available)',
    'run.bring.sunscreen': 'Sunscreen and hat',
    'run.bring.confirmation': 'Registration confirmation (digital or printed)',
    'run.bring.attitude': 'A positive attitude!',
    'run.amenities.title': 'Amenities',
    'run.amenities.parking': 'Free parking at City Park',
    'run.amenities.bagCheck': 'Bag check service',
    'run.amenities.waterStations': 'Water stations along the course',
    'run.amenities.refreshments': 'Post-race refreshments',
    
    // Run Page Awards Section
    'run.awards.title': 'Awards & Recognition',
    'run.awards.topFinishers': 'Top Finishers',
    'run.awards.topFinishersDescription': 'Awards for the top three male and female finishers in various age categories.',
    'run.awards.teamSpirit': 'Team Spirit',
    'run.awards.teamSpiritDescription': 'Recognition for the largest team and the team with the most creative theme.',
    'run.awards.topFundraisers': 'Top Fundraisers',
    'run.awards.topFundraisersDescription': 'Special recognition for individuals and teams who raise the most funds for our cause.',
    
    // Run Page Ready to Join Section
    'run.readyToJoin': 'Ready to Join Us?',
    'run.registerNow': 'Register Now',
    'run.registrationInfo': 'Registration is free and includes a t-shirt, race bib, and access to all event activities.',
    
    // Footer
    'footer.about': 'About Us',
    'footer.charityRun': 'Charity Run',
    'footer.faq': 'FAQ',
    'footer.sponsors': 'Sponsors',
    'footer.donate': 'Donate',
    'footer.register': 'Register',
    'footer.contact': 'Contact',
    'footer.rightsReserved': 'All rights reserved.',
    
    // FAQ Page
    'faq.title': 'Frequently Asked Questions',
    'faq.description': 'Find answers to common questions about the MilesForHope charity run.',
    'faq.contactPrompt': 'Don\'t see your question answered here? Feel free to contact us.',
    'faq.contactButton': 'Contact Us',
    
    // FAQ Questions and Answers
    'faq.q1.question': 'When and where is the charity run taking place?',
    'faq.q1.answer': 'The MilesForHope charity run will take place on Saturday, October 15, 2023, starting at 7:00 AM. The event will be held at City Park, 123 Runner\'s Lane, Hopeville, State 12345.',
    
    'faq.q2.question': 'How do I register for the run?',
    'faq.q2.answer': 'You can register for the run by filling out the registration form on our website. Simply click the "Register Now" button at the top of the page, or visit our registration page. You\'ll need to provide your first name, last name, phone number, and email address.',
    
    'faq.q3.question': 'Is there a registration fee?',
    'faq.q3.answer': 'No, registration for the MilesForHope Run is completely free. All participants will receive a t-shirt, race bib, and refreshments.',
    
    'faq.q4.question': 'What distance options are available?',
    'faq.q4.answer': 'This year, we\'re offering a 5K run/walk that\'s suitable for participants of all fitness levels. The course is designed to be accessible and enjoyable for everyone, whether you\'re an experienced runner or a casual walker.',
    
    'faq.q5.question': 'What should I bring on the day of the run?',
    'faq.q5.answer': 'We recommend bringing:',
    'faq.q5.item1': 'Comfortable running/walking shoes',
    'faq.q5.item2': 'Weather-appropriate clothing',
    'faq.q5.item3': 'Water bottle (water stations will also be available)',
    'faq.q5.item4': 'Sunscreen',
    'faq.q5.item5': 'Your registration confirmation (digital or printed)',
    'faq.q5.item6': 'A positive attitude!',
    
    'faq.q6.question': 'Can I participate if I\'m not a runner?',
    'faq.q6.answer': 'The MilesForHope event welcomes participants of all fitness levels. You can walk, jog, or run at your own pace. The most important thing is participating and supporting the cause.',
    
    'faq.q7.question': 'Where does the money raised go?',
    'faq.q7.answer': 'All proceeds from the MilesForHope run go directly to supporting our community initiatives in education, healthcare, and sustainable development. We\'re committed to transparency and publish an annual report detailing how funds are allocated.',
    
    'faq.q8.question': 'Can I volunteer instead of participating?',
    'faq.q8.answer': 'Yes! We always need volunteers to help make the event a success. Volunteers can assist with registration, water stations, course marshaling, and more. Please contact us through the form on our website if you\'re interested in volunteering.',
    
    'faq.q9.question': 'Is the event family-friendly?',
    'faq.q9.answer': 'Yes, the MilesForHope run is designed to be a family-friendly event. Children are welcome to participate with parental supervision. We\'ll also have activities and entertainment suitable for all ages.',
    
    'faq.q10.question': 'What happens if it rains?',
    'faq.q10.answer': 'The event will take place rain or shine. In case of severe weather conditions that might compromise participants\' safety, we may reschedule the event. Any changes will be communicated via email to registered participants and posted on our website and social media channels.',

    // Sponsors Page
    'sponsors.platinum.title': 'Platinum Sponsors',
    'sponsors.platinum.techcorp.description': 'Supporting our mission since 2018, TechCorp has been instrumental in providing technology solutions.',
    'sponsors.platinum.healthfirst.description': 'HealthFirst provides essential healthcare support for our initiatives and medical assistance during events.',
    'sponsors.platinum.sportsfit.description': 'SportsFit empowers our runners with top-quality training programs and athletic equipment.',
    'sponsors.gold.title': 'Gold Sponsors',
    'sponsors.silver.title': 'Silver Sponsors',
    'sponsors.silver.sponsor': 'Sponsor',
    'sponsors.sponsor': 'Partner',
    'sponsors.visitWebsite': 'Visit Website',
    'sponsors.contactUs': 'Contact Us',
    'sponsors.become.title': 'Become a Sponsor',
    'sponsors.become.description': 'Join our community of sponsors and help make a difference. We offer various sponsorship packages designed to provide visibility for your organization while supporting our charitable mission.',
    'sponsors.become.contact': 'Interested in becoming a sponsor? Contact our sponsorship team to discuss options.',
    'sponsors.become.contactTeam': 'Contact Sponsorship Team',
    'sponsors.packages.platinum.title': 'Platinum',
    'sponsors.packages.platinum.price': '$5,000+',
    'sponsors.packages.platinum.benefit1': 'Premium logo placement',
    'sponsors.packages.platinum.benefit2': 'Speaking opportunity',
    'sponsors.packages.platinum.benefit3': '10 free registrations',
    'sponsors.packages.platinum.benefit4': 'Social media promotion',
    'sponsors.packages.platinum.benefit5': 'Booth at the event',
    'sponsors.packages.gold.title': 'Gold',
    'sponsors.packages.gold.price': '$2,500+',
    'sponsors.packages.gold.benefit1': 'Logo on event materials',
    'sponsors.packages.gold.benefit2': '5 free registrations',
    'sponsors.packages.gold.benefit3': 'Social media mention',
    'sponsors.packages.gold.benefit4': 'Booth at the event',
    'sponsors.packages.silver.title': 'Silver',
    'sponsors.packages.silver.price': '$1,000+',
    'sponsors.packages.silver.benefit1': 'Logo on event website',
    'sponsors.packages.silver.benefit2': '2 free registrations',
    'sponsors.packages.silver.benefit3': 'Social media mention',

    // Donate Page
    'donate.title': 'Support Our',
    'donate.titleHighlight': 'Mission',
    'donate.description': 'Your donation helps us support CHU Sainte-Justine and Montreal Children\'s Hospital, making a difference in children\'s healthcare in Montréal.',
    'donate.oneTime.title': 'One-Time Donation',
    'donate.oneTime.subtitle': 'Support children\'s healthcare with a single contribution',
    'donate.oneTime.description': 'Your one-time donation directly supports medical care, research, and equipment for children at CHU Sainte-Justine and Montreal Children\'s Hospital. Every dollar makes a difference in a child\'s life.',
    'donate.oneTime.customAmount': 'Custom Amount',
    'donate.oneTime.enterAmount': 'Enter amount',
    'donate.oneTime.button': 'Donate Now',
    'donate.sponsor.title': 'Become a Sponsor',
    'donate.sponsor.subtitle': 'Support as an organization or business',
    'donate.sponsor.description': 'Sponsorship opportunities provide visibility for your organization while supporting children\'s healthcare. Various levels are available to match your organization\'s goals.',
    'donate.sponsor.benefit1': 'Logo on event materials',
    'donate.sponsor.benefit2': 'Recognition at the event',
    'donate.sponsor.benefit3': 'Social media mentions',
    'donate.sponsor.button': 'Learn More',
    'donate.impact.title': 'How Your Donation Helps',
    'donate.impact.supplies.title': 'Medical Supplies',
    'donate.impact.supplies.description': 'Provides essential medical supplies for pediatric care at the hospitals.',
    'donate.impact.research.title': 'Research Support',
    'donate.impact.research.description': 'Helps fund pediatric medical research and innovative treatments.',
    'donate.impact.equipment.title': 'Equipment Fund',
    'donate.impact.equipment.description': 'Contributes to specialized medical equipment for children\'s care.',
    'donate.contact.title': 'Contact Our Donation Team',
    'donate.contact.description': 'Have questions about donating or want to discuss other ways to support children\'s healthcare? Our team is here to help.',
    'donate.contact.name': 'Name',
    'donate.contact.namePlaceholder': 'Your Name',
    'donate.contact.email': 'Email',
    'donate.contact.emailPlaceholder': 'Your Email',
    'donate.contact.message': 'Message',
    'donate.contact.messagePlaceholder': 'Your Message',
    'donate.contact.button': 'Send Message'
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
    'sponsors.description': 'Nous sommes reconnaissants envers les organisations qui rendent notre course caritative possible.',
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
    
    // Run Page
    'run.title': 'Détails de la Course Caritative',
    'run.description': 'Rejoignez notre course caritative dirigée par des étudiants pour une journée de course, de communauté et de changement. Chaque pas que vous faites nous aide à recueillir des fonds pour le CHU Sainte-Justine et l\'Hôpital de Montréal pour enfants.',
    'run.date.title': 'Date',
    'run.date.value': 'Samedi 15 octobre 2023',
    'run.time.title': 'Heure',
    'run.time.checkin': 'Enregistrement : 6h00',
    'run.time.start': 'Début de la course : 7h00',
    'run.location.title': 'Lieu',
    'run.location.address1': 'Parc de la Ville',
    'run.location.address2': '123, avenue des Coureurs',
    'run.location.address3': 'Hopeville, État 12345',
    'run.courseInfo.title': 'Informations sur le Parcours',
    'run.courseInfo.subtitle': 'Course/Marche de 5K',
    'run.courseInfo.description': 'Notre parcours de 5K est conçu pour être accessible aux participants de tous niveaux de forme physique. L\'itinéraire vous fait traverser le pittoresque Parc de la Ville avec de belles vues sur le lac et les jardins.',
    'run.courseInfo.terrain': 'Terrain principalement plat avec des pentes douces',
    'run.courseInfo.paths': 'Chemins pavés tout au long du parcours',
    'run.courseInfo.waterStations': 'Points d\'eau aux marques 1,5K et 3K',
    'run.courseInfo.medicalSupport': 'Support médical disponible le long du parcours',
    'run.courseInfo.map': 'Carte du Parcours',
    'run.schedule.title': 'Horaire de l\'Événement',
    'run.schedule.checkin.time': '6h00',
    'run.schedule.checkin.title': 'Ouverture de l\'Enregistrement',
    'run.schedule.checkin.description': 'Récupérez votre dossard et votre t-shirt',
    'run.schedule.warmup.time': '6h45',
    'run.schedule.warmup.title': 'Échauffement Avant la Course',
    'run.schedule.warmup.description': 'Rejoignez notre instructeur de fitness pour un échauffement de groupe',
    'run.schedule.start.time': '7h00',
    'run.schedule.start.title': 'Début de la Course',
    'run.schedule.start.description': 'Début de la course/marche de 5K',
    'run.schedule.awards.time': '8h30',
    'run.schedule.awards.title': 'Cérémonie de Remise des Prix',
    'run.schedule.awards.description': 'Reconnaissance des meilleurs coureurs et collecteurs de fonds',
    'run.schedule.celebration.time': '9h00',
    'run.schedule.celebration.title': 'Célébration Après la Course',
    'run.schedule.celebration.description': 'Rafraîchissements, musique et activités communautaires',
    'run.schedule.end.time': '11h00',
    'run.schedule.end.title': 'Fin de l\'Événement',
    'run.bring.title': 'Ce Qu\'il Faut Apporter',
    'run.bring.shoes': 'Chaussures confortables pour courir/marcher',
    'run.bring.clothing': 'Vêtements adaptés à la météo',
    'run.bring.water': 'Gourde d\'eau (des points d\'eau seront également disponibles)',
    'run.bring.sunscreen': 'Crème solaire et chapeau',
    'run.bring.confirmation': 'Confirmation d\'inscription (numérique ou imprimée)',
    'run.bring.attitude': 'Une attitude positive !',
    'run.amenities.title': 'Services',
    'run.amenities.parking': 'Stationnement gratuit au Parc de la Ville',
    'run.amenities.bagCheck': 'Service de consigne',
    'run.amenities.waterStations': 'Points d\'eau le long du parcours',
    'run.amenities.refreshments': 'Rafraîchissements après la course',
    
    // Run Page Awards Section
    'run.awards.title': 'Prix et Reconnaissance',
    'run.awards.topFinishers': 'Meilleurs Arrivants',
    'run.awards.topFinishersDescription': 'Prix pour les trois meilleurs coureurs masculins et féminins dans différentes catégories d\'âge.',
    'run.awards.teamSpirit': 'Esprit d\'Équipe',
    'run.awards.teamSpiritDescription': 'Reconnaissance pour la plus grande équipe et l\'équipe avec le thème le plus créatif.',
    'run.awards.topFundraisers': 'Meilleurs Collecteurs de Fonds',
    'run.awards.topFundraisersDescription': 'Reconnaissance spéciale pour les individus et les équipes qui amassent le plus de fonds pour notre cause.',
    
    // Run Page Ready to Join Section
    'run.readyToJoin': 'Prêt à Nous Rejoindre ?',
    'run.registerNow': 'S\'inscrire Maintenant',
    'run.registrationInfo': 'L\'inscription est gratuite et comprend un t-shirt, un dossard et l\'accès à toutes les activités de l\'événement.',
    
    // Footer
    'footer.about': 'À Propos',
    'footer.charityRun': 'Course Caritative',
    'footer.faq': 'FAQ',
    'footer.sponsors': 'Commanditaires',
    'footer.donate': 'Faire un Don',
    'footer.register': 'S\'inscrire',
    'footer.contact': 'Contact',
    'footer.rightsReserved': 'Tous droits réservés.',
    
    // FAQ Page
    'faq.title': 'Questions Fréquemment Posées',
    'faq.description': 'Trouvez des réponses aux questions courantes sur la course caritative MilesForHope.',
    'faq.contactPrompt': 'Vous ne trouvez pas votre question ici ? N\'hésitez pas à nous contacter.',
    'faq.contactButton': 'Contactez-nous',
    
    // FAQ Questions and Answers
    'faq.q1.question': 'Quand et où se déroule la course caritative ?',
    'faq.q1.answer': 'La course caritative MilesForHope se déroulera le samedi 15 octobre 2023, à partir de 7h00. L\'événement aura lieu au Parc de la Ville, 123 avenue des Coureurs, Hopeville, État 12345.',
    
    'faq.q2.question': 'Comment m\'inscrire à la course ?',
    'faq.q2.answer': 'Vous pouvez vous inscrire à la course en remplissant le formulaire d\'inscription sur notre site web. Cliquez simplement sur le bouton "S\'inscrire" en haut de la page, ou visitez notre page d\'inscription. Vous devrez fournir votre prénom, nom, numéro de téléphone et adresse e-mail.',
    
    'faq.q3.question': 'Y a-t-il des frais d\'inscription ?',
    'faq.q3.answer': 'Non, l\'inscription à la course MilesForHope est entièrement gratuite. Tous les participants recevront un t-shirt, un dossard et des rafraîchissements.',
    
    'faq.q4.question': 'Quelles options de distance sont disponibles ?',
    'faq.q4.answer': 'Cette année, nous proposons une course/marche de 5K adaptée aux participants de tous niveaux de forme physique. Le parcours est conçu pour être accessible et agréable pour tous, que vous soyez un coureur expérimenté ou un marcheur occasionnel.',
    
    'faq.q5.question': 'Que dois-je apporter le jour de la course ?',
    'faq.q5.answer': 'Nous recommandons d\'apporter :',
    'faq.q5.item1': 'Des chaussures confortables pour courir/marcher',
    'faq.q5.item2': 'Des vêtements adaptés à la météo',
    'faq.q5.item3': 'Une gourde d\'eau (des points d\'eau seront également disponibles)',
    'faq.q5.item4': 'De la crème solaire',
    'faq.q5.item5': 'Votre confirmation d\'inscription (numérique ou imprimée)',
    'faq.q5.item6': 'Une attitude positive !',
    
    'faq.q6.question': 'Puis-je participer si je ne suis pas un coureur ?',
    'faq.q6.answer': 'L\'événement MilesForHope accueille les participants de tous niveaux de forme physique. Vous pouvez marcher, trottiner ou courir à votre propre rythme. L\'important est de participer et de soutenir la cause.',
    
    'faq.q7.question': 'Où va l\'argent collecté ?',
    'faq.q7.answer': 'Tous les bénéfices de la course MilesForHope vont directement à nos initiatives communautaires en matière d\'éducation, de soins de santé et de développement durable. Nous nous engageons à la transparence et publions un rapport annuel détaillant l\'allocation des fonds.',
    
    'faq.q8.question': 'Puis-je être bénévole au lieu de participer ?',
    'faq.q8.answer': 'Oui ! Nous avons toujours besoin de bénévoles pour faire de l\'événement un succès. Les bénévoles peuvent aider à l\'inscription, aux points d\'eau, à l\'encadrement du parcours, et plus encore. Veuillez nous contacter via le formulaire sur notre site web si vous êtes intéressé par le bénévolat.',
    
    'faq.q9.question': 'L\'événement est-il adapté aux familles ?',
    'faq.q9.answer': 'Oui, la course MilesForHope est conçue pour être un événement adapté aux familles. Les enfants sont les bienvenus pour participer sous la supervision d\'un parent. Nous aurons également des activités et des divertissements adaptés à tous les âges.',
    
    'faq.q10.question': 'Que se passe-t-il s\'il pleut ?',
    'faq.q10.answer': 'L\'événement se déroulera qu\'il pleuve ou qu\'il fasse beau. En cas de conditions météorologiques graves qui pourraient compromettre la sécurité des participants, nous pourrions reporter l\'événement. Tout changement sera communiqué par e-mail aux participants inscrits et publié sur notre site web et nos réseaux sociaux.',

    // Sponsors Page
    'sponsors.platinum.title': 'Commanditaires Platine',
    'sponsors.platinum.techcorp.description': 'Soutenant notre mission depuis 2018, TechCorp a joué un rôle déterminant dans la fourniture de solutions technologiques.',
    'sponsors.platinum.healthfirst.description': 'HealthFirst fournit un soutien essentiel en matière de soins de santé pour nos initiatives et une assistance médicale lors des événements.',
    'sponsors.platinum.sportsfit.description': 'SportsFit donne à nos coureurs les moyens de réussir avec des programmes d\'entraînement et des équipements sportifs de haute qualité.',
    'sponsors.gold.title': 'Commanditaires Or',
    'sponsors.silver.title': 'Commanditaires Argent',
    'sponsors.silver.sponsor': 'Commanditaire',
    'sponsors.sponsor': 'Partenaire',
    'sponsors.visitWebsite': 'Visiter le site',
    'sponsors.contactUs': 'Contactez-nous',
    'sponsors.become.title': 'Devenez Commanditaire',
    'sponsors.become.description': 'Rejoignez notre communauté de commanditaires et aidez à faire une différence. Nous proposons différents forfaits de parrainage conçus pour donner de la visibilité à votre organisation tout en soutenant notre mission caritative.',
    'sponsors.become.contact': 'Intéressé à devenir commanditaire? Contactez notre équipe de parrainage pour discuter des options.',
    'sponsors.become.contactTeam': 'Contacter l\'équipe de parrainage',
    'sponsors.packages.platinum.title': 'Platine',
    'sponsors.packages.platinum.price': '5 000$+',
    'sponsors.packages.platinum.benefit1': 'Placement premium du logo',
    'sponsors.packages.platinum.benefit2': 'Opportunité de présentation',
    'sponsors.packages.platinum.benefit3': '10 inscriptions gratuites',
    'sponsors.packages.platinum.benefit4': 'Promotion sur les réseaux sociaux',
    'sponsors.packages.platinum.benefit5': 'Stand à l\'événement',
    'sponsors.packages.gold.title': 'Or',
    'sponsors.packages.gold.price': '2 500$+',
    'sponsors.packages.gold.benefit1': 'Logo sur les supports événementiels',
    'sponsors.packages.gold.benefit2': '5 inscriptions gratuites',
    'sponsors.packages.gold.benefit3': 'Mention sur les réseaux sociaux',
    'sponsors.packages.gold.benefit4': 'Stand à l\'événement',
    'sponsors.packages.silver.title': 'Argent',
    'sponsors.packages.silver.price': '1 000$+',
    'sponsors.packages.silver.benefit1': 'Logo sur le site web',
    'sponsors.packages.silver.benefit2': '2 inscriptions gratuites',
    'sponsors.packages.silver.benefit3': 'Mention sur les réseaux sociaux',

    // Donate Page
    'donate.title': 'Soutenez Notre',
    'donate.titleHighlight': 'Mission',
    'donate.description': 'Votre don nous aide à soutenir le CHU Sainte-Justine et l\'Hôpital de Montréal pour enfants, faisant une différence dans les soins de santé des enfants à Montréal.',
    'donate.oneTime.title': 'Don Unique',
    'donate.oneTime.subtitle': 'Soutenez les soins de santé des enfants avec une contribution unique',
    'donate.oneTime.description': 'Votre don unique soutient directement les soins médicaux, la recherche et l\'équipement pour les enfants au CHU Sainte-Justine et à l\'Hôpital de Montréal pour enfants. Chaque dollar fait une différence dans la vie d\'un enfant.',
    'donate.oneTime.customAmount': 'Montant Personnalisé',
    'donate.oneTime.enterAmount': 'Entrez le montant',
    'donate.oneTime.button': 'Faire un Don',
    'donate.sponsor.title': 'Devenez Commanditaire',
    'donate.sponsor.subtitle': 'Soutenez en tant qu\'organisation ou entreprise',
    'donate.sponsor.description': 'Les opportunités de parrainage offrent de la visibilité à votre organisation tout en soutenant les soins de santé des enfants. Différents niveaux sont disponibles pour correspondre aux objectifs de votre organisation.',
    'donate.sponsor.benefit1': 'Logo sur les supports événementiels',
    'donate.sponsor.benefit2': 'Reconnaissance lors de l\'événement',
    'donate.sponsor.benefit3': 'Mentions sur les réseaux sociaux',
    'donate.sponsor.button': 'En Savoir Plus',
    'donate.impact.title': 'Comment Votre Don Aide',
    'donate.impact.supplies.title': 'Fournitures Médicales',
    'donate.impact.supplies.description': 'Fournit des fournitures médicales essentielles pour les soins pédiatriques dans les hôpitaux.',
    'donate.impact.research.title': 'Soutien à la Recherche',
    'donate.impact.research.description': 'Aide à financer la recherche médicale pédiatrique et les traitements innovants.',
    'donate.impact.equipment.title': 'Fonds d\'Équipement',
    'donate.impact.equipment.description': 'Contribue à l\'équipement médical spécialisé pour les soins des enfants.',
    'donate.contact.title': 'Contactez Notre Équipe de Dons',
    'donate.contact.description': 'Vous avez des questions sur les dons ou souhaitez discuter d\'autres façons de soutenir les soins de santé des enfants ? Notre équipe est là pour vous aider.',
    'donate.contact.name': 'Nom',
    'donate.contact.namePlaceholder': 'Votre Nom',
    'donate.contact.email': 'Courriel',
    'donate.contact.emailPlaceholder': 'Votre Courriel',
    'donate.contact.message': 'Message',
    'donate.contact.messagePlaceholder': 'Votre Message',
    'donate.contact.button': 'Envoyer le Message'
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