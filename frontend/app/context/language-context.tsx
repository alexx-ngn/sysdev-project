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
    'featured.about.learnMore': 'Learn More',
    
    'featured.run.title': 'Charity Run',
    'featured.run.description': 'Event details and schedule',
    'featured.run.content': 'Join us for a day of running, community, and making a difference. Participants can win medals, merchandise, and other goods while supporting a great cause. Every step counts!',
    'featured.run.viewDetails': 'View Details',
    
    'featured.involved.title': 'Get Involved',
    'featured.involved.description': 'Ways to support our cause',
    'featured.involved.content': 'There are many ways to support MilesForHope - register for the run, make a donation, or even spreading the word!',
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
    'about.story.paragraph1': 'MilesForHope was founded in 2025 by a group of students who shared a common vision: to support children in need in our local community. Starting as a small campus initiative, we are building connections between students and local families to make a difference in children\'s lives right here in our neighborhood.',
    'about.story.paragraph2': 'Our student founders believe that even small actions can create meaningful change. Through local charity runs and community events, we aim to bring together our neighbors to support children\'s healthcare and education in our area.',
    'about.story.paragraph3': 'As a new local organization, we are committed to supporting our community\'s children\'s hospital and nearby schools. Our goal is to help provide medical supplies for pediatric care, support local children\'s educational needs, and create after-school programs that promote health and wellness in our community.',
    'about.story.paragraph4': 'MilesForHope is just beginning its journey in our community, but our mission is clear: to bring together local students and residents to make a difference in the lives of children in our neighborhood. Every step taken in our charity run represents our commitment to building a brighter future for the children in our community.',
    
    
    // Run Page
    'run.title': 'Charity Run Details',
    'run.description': 'Join our student-led charity run for a day of running, community, and making a difference. Every step you take helps us raise funds for CHU Sainte-Justine and Montreal Children\'s Hospital.',
    'run.date.title': 'Date',
    'run.date.value': 'TBD',
    'run.time.title': 'Time',
    'run.time.checkin': 'Check-in: 9:00 AM',
    'run.time.start': 'Race Start: 10:00 AM',
    'run.location.title': 'Location',
    'run.location.address1': 'CHU Sainte-Justine',
    'run.location.address2': '3175 Chem. de la Côte-Sainte-Catherine',
    'run.location.address3': 'Montréal, QC H3T 1C5',
    'run.courseInfo.title': 'Course Information',
    'run.courseInfo.subtitle': '5K Run/Walk',
    'run.courseInfo.description': 'Our 5K course is designed to be accessible for participants of all fitness levels. The start is at CHU Sainte-Justine and the finish is at Montreal Children\'s Hospital.',
    'run.courseInfo.terrain': 'Mostly flat terrain with gentle inclines',
    'run.courseInfo.paths': 'Paved paths throughout the course',
    'run.courseInfo.waterStations': 'Water stations at the 1.5K and 3K marks',
    'run.courseInfo.medicalSupport': 'Medical support available along the route',
    'run.courseInfo.map': 'Course Map',
    'run.schedule.title': 'Event Schedule',
    'run.schedule.checkin.time': '9:00 AM',
    'run.schedule.checkin.title': 'Check-in & Registration Opens',
    'run.schedule.checkin.description': 'Pick up your race packet and t-shirt',
    'run.schedule.warmup.time': '9:45 AM',
    'run.schedule.warmup.title': 'Pre-Race Warm-up',
    'run.schedule.warmup.description': 'Join us for a group warm-up!',
    'run.schedule.start.time': '10:00 AM',
    'run.schedule.start.title': 'Race Start',
    'run.schedule.start.description': '5K run/walk begins',
    'run.schedule.awards.time': '11:00 AM',
    'run.schedule.awards.title': 'Awards Ceremony',
    'run.schedule.awards.description': 'Recognition of top finishers and fundraisers',
    'run.schedule.celebration.time': '11:30 AM',
    'run.schedule.celebration.title': 'Post-Race Celebration',
    'run.schedule.celebration.description': 'Refreshments and community activities',
    'run.schedule.end.time': '12:00 PM',
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
    
    
    // Run Page Ready to Join Section
    'run.readyToJoin': 'Ready to Join Us?',
    'run.registerNow': 'Register Now',
    
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
    'donate.oneTime.customAmount': 'Amount',
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
    'donate.impact.supplies.title': 'Healthy Snacks for Kids',
    'donate.impact.supplies.description': 'Provides nutritious snacks for children at local community events and after-school programs.',
    'donate.impact.research.title': 'School Supplies',
    'donate.impact.research.description': 'Helps purchase backpacks, notebooks, and other essentials for children in need at local schools.',
    'donate.impact.equipment.title': 'Activity Fund',
    'donate.impact.equipment.description': 'Supports sports, arts, and enrichment activities for kids in the neighborhood.',
    'donate.contact.title': 'Contact Our Donation Team',
    'donate.contact.description': 'Have questions about donating or want to discuss other ways to support children\'s healthcare? Our team is here to help.',
    'donate.contact.name': 'Name',
    'donate.contact.namePlaceholder': 'Your Name',
    'donate.contact.email': 'Email',
    'donate.contact.emailPlaceholder': 'Your Email',
    'donate.contact.message': 'Message',
    'donate.contact.messagePlaceholder': 'Your Message',
    'donate.contact.button': 'Send Message',

    // Donation Success Page
    'donate.success.title': 'Donation Successful!',
    'donate.success.subtitle': 'Thank you for your generous support',
    'donate.success.verifying': 'Verifying your donation...',
    'donate.success.message': 'Your donation has been successfully processed. We appreciate your support in helping children\'s healthcare in Montréal.',
    'donate.success.backButton': 'Back to Donations',

    // Donation Cancel Page
    'donate.cancel.title': 'Donation Cancelled',
    'donate.cancel.subtitle': 'Your donation was not processed',
    'donate.cancel.message': 'No charges were made. If you experienced any issues, please try again or contact our support team.',
    'donate.cancel.backButton': 'Back to Donations',
    'donate.cancel.supportButton': 'Contact Support',

    // Contact Page
    'contact.title': 'Contact Us',
    'contact.description': 'Have questions or want to get involved? We\'d love to hear from you.',
    'contact.getInTouch': 'Get in Touch',
    'contact.email.title': 'Email',
    'contact.email.value': 'info@milesforhope.org',
    'contact.phone.title': 'Phone',
    'contact.phone.value': '(555) 123-4567',
    'contact.address.title': 'Office Address',
    'contact.address.line1': '456 Community Lane',
    'contact.address.line2': 'Hopeville, State 12345',
    'contact.form.title': 'Send us a message',
    'contact.form.name': 'Name',
    'contact.form.namePlaceholder': 'Your Name',
    'contact.form.email': 'Email',
    'contact.form.emailPlaceholder': 'Your Email',
    'contact.form.subject': 'Subject',
    'contact.form.subjectPlaceholder': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.messagePlaceholder': 'Your Message',
    'contact.form.submit': 'Send Message',
    'contact.inquiries.title': 'Specific Inquiries',
    'contact.inquiries.registration.title': 'Registration Support',
    'contact.inquiries.registration.subtitle': 'Questions about registering for the run',
    'contact.inquiries.registration.description': 'For help with registration, technical issues, or changes to your registration.',
    'contact.inquiries.registration.email': 'registration@milesforhope.org',
    'contact.inquiries.sponsorship.title': 'Sponsorship Opportunities',
    'contact.inquiries.sponsorship.subtitle': 'Partner with us as a sponsor',
    'contact.inquiries.sponsorship.description': 'Learn about our sponsorship packages and how your organization can get involved.',
    'contact.inquiries.sponsorship.email': 'sponsors@milesforhope.org',
    'contact.inquiries.volunteer.title': 'Volunteer Coordination',
    'contact.inquiries.volunteer.subtitle': 'Join our volunteer team',
    'contact.inquiries.volunteer.description': 'Find out how you can help make our event a success by volunteering your time.',
    'contact.inquiries.volunteer.email': 'volunteer@milesforhope.org',
    'contact.social.title': 'Follow Us',
    'contact.social.description': 'Stay connected with us on social media for updates, stories, and more.',
    'contact.social.facebook': 'Facebook',
    'contact.social.twitter': 'Twitter',
    
    // Register Page
    'register.title': 'Register',
    'register.titleHighlight': 'for the MilesForHope Run',
    'register.description': 'Join us for a day of running, community, and making a difference. Complete the form below to secure your spot.',
    'register.eventDetails.title': 'Event Details',
    'register.eventDetails.dateTime.title': 'Date & Time',
    'register.eventDetails.dateTime.value1': 'TBD',
    'register.eventDetails.dateTime.value2': 'Starting at 9:00 AM',
    'register.eventDetails.location.title': 'Location',
    'register.eventDetails.location.value1': 'CHU Sainte-Justine',
    'register.eventDetails.location.value2': '3175 Chem. de la Côte-Sainte-Catherine',
    'register.eventDetails.location.value3': 'Montréal, QC H3T 1C5',
    'register.includes.title': 'Registration Includes:',
    'register.includes.item1': 'Official MilesForHope Run t-shirt',
    'register.includes.item2': 'Race bib with timing chip',
    'register.includes.item3': 'Finisher\'s medal',
    'register.includes.item4': 'Post-race refreshments',
    'register.includes.item5': 'Access to event photos',
    'register.form.title': 'Registration Form',
    'register.faq.title': 'Frequently Asked Questions',
    'register.faq.q1.question': 'What should I bring on race day?',
    'register.faq.q1.answer': 'Comfortable running/walking shoes, weather-appropriate clothing, water bottle, sunscreen, and your registration confirmation.',
    'register.faq.q2.question': 'Is there parking available?',
    'register.faq.q2.answer': 'Yes, free parking is available at City Park. We recommend carpooling if possible to reduce congestion.',
    'register.faq.q3.question': 'Can I register on the day of the event?',
    'register.faq.q3.answer': 'Yes, same-day registration will be available starting at 6:00 AM, but we recommend registering in advance to secure your spot and t-shirt size.',
    'register.faq.q4.question': 'Is the course accessible for all fitness levels?',
    'register.faq.q4.answer': 'Yes, the 5K course is designed to be accessible for participants of all fitness levels, whether you\'re running or walking.',
    'register.faq.moreQuestions': 'Have more questions? Check our comprehensive FAQ page or contact us.',
    'register.faq.viewAll': 'View All FAQs',
    'register.faq.contact': 'Contact Us',
    'footer.organization': 'MilesForHope Run',

    // Registration Form
    'register.form.firstName': 'First Name',
    'register.form.lastName': 'Last Name',
    'register.form.phoneNumber': 'Phone Number',
    'register.form.email': 'Email',
    'register.form.submit': 'Register Now',
    'register.form.submitting': 'Registering...',
    'register.successMessage': 'Registration successful! Please check your email for a confirmation message.',
    'register.errorMessage': 'Registration failed. Please try again.',

    // Confirmation Page
    'confirm.loading': 'Confirming your registration...',
    'confirm.success': 'Registration Confirmed!',
    'confirm.error': 'Confirmation Failed',
    'confirm.returnHome': 'Return to Home',
    'confirm.tryAgain': 'Try Again'
  },
  fr: {
    // Navigation
    'nav.about': 'À propos',
    'nav.charityRun': 'Course de bienfaisance',
    'nav.faq': 'FAQ',
    'nav.sponsors': 'Commanditaires',
    'nav.donate': 'Faire un don',
    'nav.contact': 'Contact',
    'nav.register': 'S\'inscrire maintenant',
    
    // About Page
    'about.mission.title': 'Notre mission',
    'about.mission.description': 'Soutenir les hôpitaux pour enfants de Montréal (CHU Sainte-Justine et l\'Hôpital des enfants de Montréal) en sensibilisant et en levant des fonds.',
    'about.vision.title': 'Notre vision',
    'about.vision.description': 'Un monde où chaque enfant a accès à des soins de santé de qualité.',
    'about.values.title': 'Nos valeurs',
    'about.values.description': 'Nous croyons au pouvoir de l\'unité et de la collaboration pour faire une différence.',
    'about.illustrationAlt': 'Illustration Open Peeps',
    
    // Hero Section
    'hero.title': 'Miles For Hope : Soutenir les hôpitaux pour enfants de Montréal.',
    'hero.description': 'Une course de bienfaisance organisée par des étudiants pour lever des fonds pour le CHU Sainte-Justine et l\'Hôpital des enfants de Montréal. Chaque pas que vous faites contribue à construire un avenir meilleur pour les enfants dans le besoin.',
    'hero.register': 'S\'inscrire maintenant',
    'hero.learnMore': 'En savoir plus',
    
    // Featured Sections
    'featured.about.title': 'À propos de nous',
    'featured.about.description': 'Découvrez notre mission et notre impact',
    'featured.about.content': 'MilesForHope est une course de bienfaisance organisée par des étudiants, dont le but est de lever des fonds pour les hôpitaux pour enfants de Montréal, en soutenant spécifiquement le CHU Sainte-Justine et l\'Hôpital des enfants de Montréal.',
    'featured.about.readMore': 'Lire la suite',
    'featured.about.learnMore': 'En savoir plus',
    'featured.run.title': 'Course de bienfaisance',
    'featured.run.description': 'Détails et horaire de l\'événement',
    'featured.run.content': 'Rejoignez-nous pour une journée de course, de communauté et de changement. Les participants peuvent gagner des médailles, des articles de merchandising et d\'autres biens tout en soutenant une grande cause. Chaque pas compte !',
    'featured.run.viewDetails': 'Voir les détails',
    
    'featured.involved.title': 'S\'impliquer',
    'featured.involved.description': 'Façons de soutenir notre cause',
    'featured.involved.content': 'Il existe de nombreuses façons de soutenir MilesForHope - inscrivez-vous à la course, faites un don ou devenez un commanditaire.',
    'featured.involved.support': 'Nous soutenir',
    
    // Registration CTA
    'cta.title': 'Prêt à nous rejoindre ?',
    'cta.description': 'Inscrivez-vous dès aujourd\'hui à la course MilesForHope et faites partie de quelque chose de significatif. Chaque participant fait une différence.',
    'cta.register': 'S\'inscrire maintenant',
    
    // Sponsors
    'sponsors.title': 'Nos commanditaires',
    'sponsors.description': 'Nous sommes reconnaissants envers les organisations qui rendent notre course de bienfaisance possible.',
    'sponsors.viewAll': 'Voir tous les commanditaires',
    
    // Footer
    'footer.milesForHope': 'Course MilesForHope',
    'footer.description': 'Faire une différence dans les communautés du monde entier grâce à des initiatives de développement durable, d\'éducation et de santé.',
    'footer.quickLinks': 'Liens rapides',
    'footer.resources': 'Ressources',
    'footer.copyright': '© {year} MilesForHope. Tous droits réservés.',
    
    // Language switcher
    'language.en': 'Anglais',
    'language.fr': 'Français',
    
    // About Page Story Section
    'about.story.title': 'Notre histoire',
    'about.story.paragraph1': 'MilesForHope a débuté en 2025 lorsqu\'un petit groupe de coureurs passionnés a décidé de combiner leur amour de la course avec leur désir de faire une différence positive dans leur communauté. Ce qui a commencé comme un 5K local avec seulement 50 participants est devenu un événement annuel qui attire des centaines de coureurs de toute la région.',
    'about.story.paragraph2': 'Nos fondateurs croyaient que l\'activité physique pouvait être un catalyseur puissant pour le changement social. En rassemblant les gens par la course, nous créons une communauté d\'individus engagés à soutenir des causes importantes et à faire une différence dans la vie des autres.',
    'about.story.paragraph3': 'Au fil des années, MilesForHope a levé plus de 500 000 $ pour diverses initiatives communautaires, se concentrant sur l\'éducation, la santé et le développement durable. Nous avons financé des bourses pour des étudiants défavorisés, soutenu des cliniques de santé locales et contribué à des projets de conservation de l\'environnement.',
    'about.story.paragraph4': 'Aujourd\'hui, MilesForHope continue de croître, mais notre mission de base reste la même : mobiliser l\'énergie et la bienveillance collectives des coureurs pour créer un changement positif dans nos communautés. Chaque pas effectué dans notre course de bienfaisance est un pas vers un monde meilleur et plus équitable.',
    
    // About Page Team Section
    'about.team.title': 'Notre équipe',
    'about.team.sarah.name': 'Sarah Johnson',
    'about.team.sarah.role': 'Fondatrice et directrice exécutive',
    'about.team.sarah.description': 'Marathonienne et militante communautaire avec 15 ans d\'expérience dans le secteur à but non lucratif.',
    'about.team.michael.name': 'Michael Chen',
    'about.team.michael.role': 'Directeur de l\'événement',
    'about.team.michael.description': 'Ancien athlète olympique dévoué à la création d\'événements sportifs inclusifs.',
    'about.team.aisha.name': 'Aisha Patel',
    'about.team.aisha.role': 'Coordinatrice de la sensibilisation communautaire',
    'about.team.aisha.description': 'Travailleuse sociale et entraîneure de course passionnée par l\'empowerment des communautés.',
    
    // Run Page
    'run.title': 'Détails de la course de bienfaisance',
    'run.description': 'Rejoignez notre course de bienfaisance organisée par des étudiants pour une journée de course, de communauté et de changement. Chaque pas que vous faites nous aide à lever des fonds pour le CHU Sainte-Justine et l\'Hôpital des enfants de Montréal.',
    'run.date.title': 'Date',
    'run.date.value': 'Samedi 15 octobre 2023',
    'run.time.title': 'Heure',
    'run.time.checkin': 'Enregistrement : 6h00',
    'run.time.start': 'Départ de la course : 7h00',
    'run.location.title': 'Lieu',
    'run.location.address1': 'CHU Sainte-Justine',
    'run.location.address2': '3175 Chem. de la Côte-Sainte-Catherine',
    'run.location.address3': 'Montréal, QC H3T 1C5',
    'run.courseInfo.title': 'Informations sur le parcours',
    'run.courseInfo.subtitle': '5K Course à pied/marche',
    'run.courseInfo.description': 'Notre parcours de 5K est conçu pour être accessible aux participants de tous les niveaux de forme physique. Le parcours vous mènera à travers le magnifique Parc de la Ville avec de superbes vues sur le lac et les jardins.',
    'run.courseInfo.terrain': 'Terrain principalement plat avec de légères pentes',
    'run.courseInfo.paths': 'Sentiers pavés tout au long du parcours',
    'run.courseInfo.waterStations': 'Stations d\'eau aux 1,5 km et 3 km',
    'run.courseInfo.medicalSupport': 'Assistance médicale disponible le long du parcours',
    'run.courseInfo.map': 'Carte du parcours',
    'run.schedule.title': 'Horaire de l\'événement',
    'run.schedule.checkin.time': '6h00',
    'run.schedule.checkin.title': 'Enregistrement et ouverture',
    'run.schedule.checkin.description': 'Récupérez votre dossard et votre t-shirt',
    'run.schedule.warmup.time': '6h45',
    'run.schedule.warmup.title': 'Échauffement pré-course',
    'run.schedule.warmup.description': 'Rejoignez notre instructeur de fitness pour un échauffement en groupe',
    'run.schedule.start.time': '7h00',
    'run.schedule.start.title': 'Départ de la course',
    'run.schedule.start.description': 'Début de la course à pied/marche de 5 km',
    'run.schedule.awards.time': '8h30',
    'run.schedule.awards.title': 'Cérémonie de remise des prix',
    'run.schedule.awards.description': 'Reconnaissance des meilleurs finishers et des meilleurs levées de fonds',
    'run.schedule.celebration.time': '9h00',
    'run.schedule.celebration.title': 'Célébration post-course',
    'run.schedule.celebration.description': 'Rafraîchissements, musique et activités communautaires',
    'run.schedule.end.time': '11h00',
    'run.schedule.end.title': 'Fin de l\'événement',
    'run.bring.title': 'À apporter',
    'run.bring.shoes': 'Chaussures de course/marche confortables',
    'run.bring.clothing': 'Vêtements adaptés à la météo',
    'run.bring.water': 'Gourde (stations d\'eau disponibles)',
    'run.bring.sunscreen': 'Crème solaire et chapeau',
    'run.bring.confirmation': 'Confirmation d\'inscription (numérique ou imprimée)',
    'run.bring.attitude': 'Une attitude positive !',
    'run.amenities.title': 'Services',
    'run.amenities.parking': 'Stationnement gratuit au Parc de la Ville',
    'run.amenities.bagCheck': 'Service de consigne pour les bagages',
    'run.amenities.waterStations': 'Stations d\'eau le long du parcours',
    'run.amenities.refreshments': 'Rafraîchissements après la course',
    
    // Run Page Awards Section
    'run.awards.title': 'Prix et reconnaissance',
    'run.awards.topFinishers': 'Meilleurs finishers',
    'run.awards.topFinishersDescription': 'Prix pour les trois premiers hommes et femmes dans différentes catégories d\'âge.',
    'run.awards.teamSpirit': 'Esprit d\'équipe',
    'run.awards.teamSpiritDescription': 'Reconnaissance pour l\'équipe la plus nombreuse et pour l\'équipe avec le thème le plus créatif.',
    'run.awards.topFundraisers': 'Meilleurs levées de fonds',
    'run.awards.topFundraisersDescription': 'Reconnaissance spéciale pour les individus et les équipes qui ont levé le plus de fonds pour notre cause.',
    
    // Run Page Ready to Join Section
    'run.readyToJoin': 'Prêt à nous rejoindre ?',
    'run.registerNow': 'S\'inscrire maintenant',
    'run.registrationInfo': 'L\'inscription est gratuite et comprend un t-shirt, un dossard et un accès à toutes les activités de l\'événement.',
    
    // Footer
    'footer.about': 'À propos de nous',
    'footer.charityRun': 'Course de bienfaisance',
    'footer.faq': 'FAQ',
    'footer.sponsors': 'Commanditaires',
    'footer.donate': 'Faire un don',
    'footer.register': 'S\'inscrire',
    'footer.contact': 'Contact',
    'footer.rightsReserved': 'Tous droits réservés.',
    
    // FAQ Page
    'faq.title': 'Questions fréquemment posées',
    'faq.description': 'Trouvez des réponses aux questions courantes sur la course de bienfaisance MilesForHope.',
    'faq.contactPrompt': 'Vous ne trouvez pas votre question ici ? N\'hésitez pas à nous contacter.',
    'faq.contactButton': 'Nous contacter',
    
    // FAQ Questions and Answers
    'faq.q1.question': 'Quand et où aura lieu la course de bienfaisance ?',
    'faq.q1.answer': 'La course de bienfaisance MilesForHope aura lieu le samedi 15 octobre 2023, à partir de 7h00. L\'événement se déroulera au Parc de la Ville, 123 avenue des Coureurs, Hopeville, État 12345.',
    
    'faq.q2.question': 'Comment m\'inscrire à la course ?',
    'faq.q2.answer': 'Vous pouvez vous inscrire à la course en remplissant le formulaire d\'inscription sur notre site web. Il suffit de cliquer sur le bouton "S\'inscrire maintenant" en haut de la page, ou de visiter notre page d\'inscription. Vous devrez fournir votre prénom, votre nom de famille, votre numéro de téléphone et votre adresse e-mail.',
    
    'faq.q3.question': 'Y a-t-il un frais d\'inscription ?',
    'faq.q3.answer': 'Non, l\'inscription à la course MilesForHope est entièrement gratuite. Tous les participants recevront un t-shirt, un dossard et des rafraîchissements.',
    
    'faq.q4.question': 'Quelles options de distance sont disponibles ?',
    'faq.q4.answer': 'Cette année, nous proposons un 5K course à pied/marche adapté à tous les niveaux de forme physique. Le parcours est conçu pour être accessible et agréable pour tout le monde, que vous soyez un coureur expérimenté ou un marcheur occasionnel.',
    
    'faq.q5.question': 'Que dois-je apporter le jour de la course ?',
    'faq.q5.answer': 'Nous vous recommandons d\'apporter :',
    'faq.q5.item1': 'Des chaussures de course/marche confortables',
    'faq.q5.item2': 'Des vêtements adaptés à la météo',
    'faq.q5.item3': 'Une gourde (des stations d\'eau seront également disponibles)',
    'faq.q5.item4': 'De la crème solaire',
    'faq.q5.item5': 'Votre confirmation d\'inscription (numérique ou imprimée)',
    'faq.q5.item6': 'Une attitude positive !',
    
    'faq.q6.question': 'Puis-je participer si je ne suis pas un coureur ?',
    'faq.q6.answer': 'L\'événement MilesForHope accueille des participants de tous les niveaux de forme physique. Vous pouvez marcher, courir ou courir à votre rythme. Ce qui est le plus important, c\'est de participer et de soutenir la cause.',
    
    'faq.q7.question': 'Où va l\'argent levé ?',
    'faq.q7.answer': 'Tous les fonds levés lors de la course MilesForHope sont directement utilisés pour soutenir nos initiatives communautaires dans les domaines de l\'éducation, de la santé et du développement durable. Nous sommes engagés dans la transparence et publions un rapport annuel détaillant l\'affectation des fonds.',
    
    'faq.q8.question': 'Puis-je devenir bénévole à la place de participer ?',
    'faq.q8.answer': 'Oui ! Nous avons toujours besoin de bénévoles pour aider à rendre l\'événement un succès. Les bénévoles peuvent assister à l\'enregistrement, aux stations d\'eau, au marquage du parcours, etc. Veuillez nous contacter via le formulaire sur notre site web si vous êtes intéressé pour devenir bénévole.',
    
    'faq.q9.question': 'L\'événement est-il familial ?',
    'faq.q9.answer': 'Oui, la course MilesForHope est conçue pour être un événement familial. Les enfants sont les bienvenus pour participer avec la supervision d\'un adulte. Nous aurons également des activités et des divertissements adaptés à tous les âges.',
    
    'faq.q10.question': 'Et si ça pleut ?',
    'faq.q10.answer': 'L\'événement aura lieu sous la pluie ou le beau temps. En cas de conditions météorologiques sévères qui pourraient compromettre la sécurité des participants, nous pourrions reporter l\'événement. Tous les changements seront communiqués par e-mail aux participants inscrits et publiés sur notre site web et nos réseaux sociaux.',

    // Sponsors Page
    'sponsors.platinum.title': 'Commanditaires Platine',
    'sponsors.platinum.techcorp.description': 'Soutenant notre mission depuis 2018, TechCorp a été un acteur clé dans la fourniture de solutions technologiques.',
    'sponsors.platinum.healthfirst.description': 'HealthFirst fournit un soutien essentiel en matière de santé pour nos initiatives et une assistance médicale lors des événements.',
    'sponsors.platinum.sportsfit.description': 'SportsFit donne aux coureurs un accès à des programmes d\'entraînement de haute qualité et à du matériel sportif.',
    'sponsors.gold.title': 'Commanditaires Or',
    'sponsors.silver.title': 'Commanditaires Argent',
    'sponsors.silver.sponsor': 'Commanditaire',
    'sponsors.sponsor': 'Partenaire',
    'sponsors.visitWebsite': 'Visiter le site web',
    'sponsors.contactUs': 'Nous contacter',
    'sponsors.become.title': 'Devenir un commanditaire',
    'sponsors.become.description': 'Rejoignez notre communauté de commanditaires et aidez à faire une différence. Nous proposons divers packages de commanditaires conçus pour offrir une visibilité à votre organisation tout en soutenant notre mission caritative.',
    'sponsors.become.contact': 'Intéressé à devenir un commanditaire ? Contactez notre équipe de commanditaires pour discuter des options.',
    'sponsors.become.contactTeam': 'Contacter l\'équipe de commanditaires',
    'sponsors.packages.platinum.title': 'Platine',
    'sponsors.packages.platinum.price': '5 000 $+',
    'sponsors.packages.platinum.benefit1': 'Placement de logo premium',
    'sponsors.packages.platinum.benefit2': 'Opportunité de parole',
    'sponsors.packages.platinum.benefit3': '10 inscriptions gratuites',
    'sponsors.packages.platinum.benefit4': 'Promotion sur les réseaux sociaux',
    'sponsors.packages.platinum.benefit5': 'Kiosque à l\'événement',
    'sponsors.packages.gold.title': 'Or',
    'sponsors.packages.gold.price': '2 500 $+',
    'sponsors.packages.gold.benefit1': 'Logo sur les supports de l\'événement',
    'sponsors.packages.gold.benefit2': '5 inscriptions gratuites',
    'sponsors.packages.gold.benefit3': 'Mention sur les réseaux sociaux',
    'sponsors.packages.gold.benefit4': 'Kiosque à l\'événement',
    'sponsors.packages.silver.title': 'Argent',
    'sponsors.packages.silver.price': '1 000 $+',
    'sponsors.packages.silver.benefit1': 'Logo sur le site web de l\'événement',
    'sponsors.packages.silver.benefit2': '2 inscriptions gratuites',
    'sponsors.packages.silver.benefit3': 'Mention sur les réseaux sociaux',

    // Donate Page
    'donate.title': 'Soutenez notre',
    'donate.titleHighlight': 'mission',
    'donate.description': 'Votre don nous aide à soutenir le CHU Sainte-Justine et l\'Hôpital des enfants de Montréal, faisant une différence dans la santé des enfants à Montréal.',
    'donate.oneTime.title': 'Don unique',
    'donate.oneTime.subtitle': 'Soutenez les soins de santé des enfants avec une contribution unique',
    'donate.oneTime.description': 'Votre don unique soutient directement les soins médicaux, la recherche et l\'équipement pour les enfants au CHU Sainte-Justine et à l\'Hôpital de Montréal pour enfants. Chaque dollar fait une différence dans la vie d\'un enfant.',
    'donate.oneTime.customAmount': 'Montant',
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
    'donate.impact.supplies.title': 'Healthy Snacks for Kids',
    'donate.impact.supplies.description': 'Provides nutritious snacks for children at local community events and after-school programs.',
    'donate.impact.research.title': 'School Supplies',
    'donate.impact.research.description': 'Helps purchase backpacks, notebooks, and other essentials for children in need at local schools.',
    'donate.impact.equipment.title': 'Activity Fund',
    'donate.impact.equipment.description': 'Supports sports, arts, and enrichment activities for kids in the neighborhood.',
    'donate.contact.title': 'Contactez Notre Équipe de Dons',
    'donate.contact.description': 'Vous avez des questions sur les dons ou souhaitez discuter d\'autres façons de soutenir les soins de santé des enfants ? Notre équipe est là pour vous aider.',
    'donate.contact.name': 'Nom',
    'donate.contact.namePlaceholder': 'Votre Nom',
    'donate.contact.email': 'Courriel',
    'donate.contact.emailPlaceholder': 'Votre Courriel',
    'donate.contact.message': 'Message',
    'donate.contact.messagePlaceholder': 'Votre Message',
    'donate.contact.button': 'Envoyer le Message',

    // Donation Success Page
    'donate.success.title': 'Don réussi !',
    'donate.success.subtitle': 'Merci pour votre généreux soutien',
    'donate.success.verifying': 'Vérification de votre don...',
    'donate.success.message': 'Votre don a été traité avec succès. Nous apprécions votre soutien pour aider les soins de santé des enfants à Montréal.',
    'donate.success.backButton': 'Retour aux dons',

    // Donation Cancel Page
    'donate.cancel.title': 'Don annulé',
    'donate.cancel.subtitle': 'Votre don n\'a pas été traité',
    'donate.cancel.message': 'Aucun frais n\'a été facturé. Si vous avez rencontré des problèmes, veuillez réessayer ou contacter notre équipe de support.',
    'donate.cancel.backButton': 'Retour aux dons',
    'donate.cancel.supportButton': 'Contacter le support',

    // Contact Page
    'contact.title': 'Contactez-nous',
    'contact.description': 'Vous avez des questions ou vous souhaitez vous impliquer ? Nous aimerions avoir de vos nouvelles.',
    'contact.getInTouch': 'Entrer en Contact',
    'contact.email.title': 'Courriel',
    'contact.email.value': 'info@milesforhope.org',
    'contact.phone.title': 'Téléphone',
    'contact.phone.value': '(555) 123-4567',
    'contact.address.title': 'Adresse du Bureau',
    'contact.address.line1': '456 rue Communautaire',
    'contact.address.line2': 'Hopeville, État 12345',
    'contact.form.title': 'Envoyez-nous un message',
    'contact.form.name': 'Nom',
    'contact.form.namePlaceholder': 'Votre Nom',
    'contact.form.email': 'Courriel',
    'contact.form.emailPlaceholder': 'Votre Courriel',
    'contact.form.subject': 'Sujet',
    'contact.form.subjectPlaceholder': 'Sujet',
    'contact.form.message': 'Message',
    'contact.form.messagePlaceholder': 'Votre Message',
    'contact.form.submit': 'Envoyer le Message',
    'contact.inquiries.title': 'Demandes Spécifiques',
    'contact.inquiries.registration.title': 'Support d\'Inscription',
    'contact.inquiries.registration.subtitle': 'Questions sur l\'inscription à la course',
    'contact.inquiries.registration.description': 'Pour de l\'aide avec l\'inscription, les problèmes techniques ou les modifications de votre inscription.',
    'contact.inquiries.registration.email': 'registration@milesforhope.org',
    'contact.inquiries.sponsorship.title': 'Opportunités de Parrainage',
    'contact.inquiries.sponsorship.subtitle': 'Devenez partenaire en tant que commanditaire',
    'contact.inquiries.sponsorship.description': 'Découvrez nos forfaits de parrainage et comment votre organisation peut s\'impliquer.',
    'contact.inquiries.sponsorship.email': 'sponsors@milesforhope.org',
    'contact.inquiries.volunteer.title': 'Coordination des Bénévoles',
    'contact.inquiries.volunteer.subtitle': 'Rejoignez notre équipe de bénévoles',
    'contact.inquiries.volunteer.description': 'Découvrez comment vous pouvez aider à faire de notre événement un succès en donnant de votre temps.',
    'contact.inquiries.volunteer.email': 'volunteer@milesforhope.org',
    'contact.social.title': 'Suivez-nous',
    'contact.social.description': 'Restez connecté avec nous sur les réseaux sociaux pour les mises à jour, les histoires et plus encore.',
    'contact.social.facebook': 'Facebook',
    'contact.social.twitter': 'Twitter',
    
    // Register Page
    'register.title': 'S\'inscrire',
    'register.titleHighlight': 'à la Course MilesForHope',
    'register.description': 'Rejoignez-nous pour une journée de course, de communauté et de changement. Complétez le formulaire ci-dessous pour réserver votre place.',
    'register.eventDetails.title': 'Détails de l\'événement',
    'register.eventDetails.dateTime.title': 'Date et Heure',
    'register.eventDetails.dateTime.value1': 'Samedi 15 octobre 2023',
    'register.eventDetails.dateTime.value2': 'Début à 7h00',
    'register.eventDetails.location.title': 'Lieu',
    'register.eventDetails.location.value1': 'Parc de la Ville',
    'register.eventDetails.location.value2': '123 avenue des Coureurs',
    'register.eventDetails.location.value3': 'Hopeville, État 12345',
    'register.includes.title': 'L\'inscription comprend :',
    'register.includes.item1': 'T-shirt officiel de la Course MilesForHope',
    'register.includes.item2': 'Dossard avec puce de chronométrage',
    'register.includes.item3': 'Médaille de finisseur',
    'register.includes.item4': 'Rafraîchissements après la course',
    'register.includes.item5': 'Accès aux photos de l\'événement',
    'register.form.title': 'Formulaire d\'inscription',
    'register.faq.title': 'Questions fréquemment posées',
    'register.faq.q1.question': 'Que dois-je apporter le jour de la course ?',
    'register.faq.q1.answer': 'Des chaussures de course/marche confortables, des vêtements adaptés à la météo, une gourde, de la crème solaire et votre confirmation d\'inscription.',
    'register.faq.q2.question': 'Y a-t-il un stationnement disponible ?',
    'register.faq.q2.answer': 'Oui, un stationnement gratuit est disponible au Parc de la Ville. Nous recommandons le covoiturage si possible pour réduire la congestion.',
    'register.faq.q3.question': 'Puis-je m\'inscrire le jour de l\'événement ?',
    'register.faq.q3.answer': 'Oui, l\'inscription le jour même sera disponible à partir de 6h00, mais nous recommandons de s\'inscrire à l\'avance pour garantir votre place et votre taille de t-shirt.',
    'register.faq.q4.question': 'Le parcours est-il accessible à tous les niveaux de forme physique ?',
    'register.faq.q4.answer': 'Oui, le parcours de 5K est conçu pour être accessible aux participants de tous les niveaux de forme physique, que vous couriez ou marchiez.',
    'register.faq.moreQuestions': 'Vous avez d\'autres questions ? Consultez notre page FAQ complète ou contactez-nous.',
    'register.faq.viewAll': 'Voir toutes les FAQ',
    'register.faq.contact': 'Nous contacter',
    'footer.organization': 'Course MilesForHope',

    // Registration Form
    'register.form.firstName': 'Prénom',
    'register.form.lastName': 'Nom de famille',
    'register.form.phoneNumber': 'Numéro de téléphone',
    'register.form.email': 'Courriel',
    'register.form.submit': 'S\'inscrire maintenant',
    'register.form.submitting': 'Inscription en cours...',
    'register.successMessage': 'Inscription réussie ! Veuillez vérifier votre courriel pour un message de confirmation.',
    'register.errorMessage': 'L\'inscription a échoué. Veuillez réessayer.',

    // Confirmation Page
    'confirm.loading': 'Confirmation de votre inscription...',
    'confirm.success': 'Inscription confirmée !',
    'confirm.error': 'La confirmation a échoué',
    'confirm.returnHome': 'Retour à l\'accueil',
    'confirm.tryAgain': 'Réessayer'
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