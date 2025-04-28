"use client"
import React from 'react';

import HeroStyle2 from '../ui/Hero/HeroStyle2';
import Section from '../ui/Section';
import AboutSectionStyle3 from '../ui/Section/AboutSection/AboutSectionStyle3';
import BannerSectionStyle2 from '../ui/Section/BannerSection/BannerSectionStyle2';
import BlogSectionStyle3 from '../ui/Section/BlogSection/BlogSectionStyle3';
import BrandsSectionStyle2 from '../ui/Section/BrandsSection/BrandsSectionStyle2';
import DepartmentSectionStyle4 from '../ui/Section/DepartmentSection/DepartmentSectionStyle4';
import FaqSectionStyle2 from '../ui/Section/FaqSection/FaqSectionStyle2';
import TestimonialSectionStyle2 from '../ui/Section/TestimonialSection/TestimonialSectionStyle2';
import WorkingProcess from '../ui/Section/WorkingProcess';
import aboutImg from '../../../../../../public/images/home_2/about.jpeg'




const departmentData = [
  {
    title: 'Recherche & Développement',
    iconUrl: '/images/home_2/analysis.png',
    href: '/departments/department-details',
  },
  {
    title: 'Sécurité & Conformité',
    iconUrl: '/images/home_2/shield.png',
    href: '/departments/department-details',
  },
  {
    title: ' Partenariats & Relations Institutionnelles',
    iconUrl: '/images/home_2/strategic-alliances.png',
    href: '/departments/department-details',
  },
  {
    title: 'Support Client et Formation\n',
    iconUrl: '/images/home_2/sharing_1924691.png',
    href: '/departments/department-details',
  },
  {
    title: 'Médical et Pharmaceutique',
    iconUrl: '/images/home_2/medical_14140738.png',
    href: '/departments/department-details',
  },
  {
    title: 'Data Science & Intelligence Artificielle',
    iconUrl: '/images/home_2/department_icon_6.svg',
    href: '/departments/department-details',
  },
];
const testimonialData = [
  {
    text: 'I recently had to bring my child to ProHealth for a minor injury, and I was so impressed with the care he received. The pediatrician was great with him and made him feel at ease, and the entire staff was kind and attentive.”',
    ratingNumber: '5',
    avatarImgUrl: '/images/home_1/avatar_2.png',
    avatarName: 'PAULO HUBERT',
    avatarDesignation: 'New York, USA',
  },
  {
    text: 'I recently had to bring my child to ProHealth for a minor injury, and I was so impressed with the care he received. The pediatrician was great with him and made him feel at ease, and the entire staff was kind and attentive.”',
    ratingNumber: '4.5',
    avatarImgUrl: '/images/home_1/avatar_2.png',
    avatarName: 'PAULO HUBERT',
    avatarDesignation: 'New York, USA',
  },
  {
    text: 'I recently had to bring my child to ProHealth for a minor injury, and I was so impressed with the care he received. The pediatrician was great with him and made him feel at ease, and the entire staff was kind and attentive.”',
    ratingNumber: '5',
    avatarImgUrl: '/images/home_1/avatar_2.png',
    avatarName: 'PAULO HUBERT',
    avatarDesignation: 'New York, USA',
  },
  {
    text: 'I recently had to bring my child to ProHealth for a minor injury, and I was so impressed with the care he received. The pediatrician was great with him and made him feel at ease, and the entire staff was kind and attentive.”',
    ratingNumber: '4.5',
    avatarImgUrl: '/images/home_1/avatar_2.png',
    avatarName: 'PAULO HUBERT',
    avatarDesignation: 'New York, USA',
  },
];
const workingProcessData = [
  {
    title: 'Scan ou Upload  <br />du Document Médical',
    subTitle:
      'Vous téléversez vos documents  <br />(ordonnances, comptes-rendus, prescriptions)  <br />directement sur notre plateforme sécurisée.',
    iconUrl: '/images/home_2/add-post.png',
    number: '01',
  },
  {
    title: 'Analyse OCR  <br />et Extraction Automatique',
    subTitle:
      'Notre moteur d\'intelligence artificielle lit et interprète  <br />le contenu médical en quelques secondes.\n' +
      'Il identifie les médicaments, les dosages, les instructions et détecte automatiquement les informations clés..',
    iconUrl: '/images/home_2/ocr.png',
    number: '02',
  },
  {
    title: 'Enrichissement  <br /> et Vérification Médicale',
    subTitle:
      'Les données extraites sont croisées avec notre base de données certifiée.\n' +
      'OCR4Labs complète les informations (indications, contre-indications, interactions) et garantit leur fiabilité médicale.',
    iconUrl: '/images/home_2/artificial-intelligence.png',
    number: '03',
  },
  {
    title: 'Résultats Clairs et Exploitables\n',
    subTitle:
      'Vous obtenez une fiche de synthèse détaillée :\n <br />' +
      '\n' +
      'Médicaments identifiés\n<br />' +
      '\n' +
      'Posologies recommandées\n<br />' +
      '\n' +
      'Alertes sur interactions ou risques potentiels\n<br />' +
      '\n' +
      'Recommandations adaptées au contexte clinique.',
    iconUrl: '/images/home_2/wording_process_icon_4.svg',
    number: '04',
  },
  {
    title: 'Export, Intégration ou Partage',
    subTitle:
      'Selon vos besoins, vous pouvez :\n<br />' +
      '\n' +
      'Télécharger les résultats\n<br />' +
      '\n' +
      'Intégrer automatiquement les données dans votre logiciel médical\n<br />' +
      '\n' +
      'Partager l’analyse avec vos collaborateurs ou vos patients.',
    iconUrl: '/images/home_2/people.png',
    number: '05',
  },
];
const blogData = [
  {
    title: 'Pourquoi l\'interopérabilité des données de santé est cruciale en 2025',
    thumbUrl: '/images/home_1/post_1.jpeg',
    date: '01 Janv, 2025',
    href: '/home-v2'
  },
  {
    title: 'Comment l\'OCR médical révolutionne la gestion documentaire des laboratoires et des hôpitaux\n' +
      '\n',
    thumbUrl: '/images/home_1/post_2.jpeg',
    date: '02 Mars, 2025',
    href: '/home-v2'
  },
  {
    title: 'RGPD et Données de Santé : Ce que doivent savoir les établissements médicaux en 2025\n' +
      '\n',
    thumbUrl: '/images/home_1/post_3.jpeg',
    date: '16 Avril, 2025',
    href: '/blog/blog-details'
  },
];
const faqData = [
  {
    title: 'OCR4Labs est-il compatible avec mes outils de gestion médicale existants ?',
    content:
      'OCR4Labs a été conçu pour être totalement interopérable avec la majorité des logiciels métiers (DPI, ERP santé, CRM pharmaceutiques).\n' +
      'Notre solution propose des API standards et des formats d’exportation compatibles (HL7, FHIR, PDF, CSV, JSON).',
  },
  {
    title: 'Comment OCR4Labs facilite-t-il l\'échange de données entre différents établissements ou pays ?',
    content:
      'OCR4Labs respecte les normes internationales d’interopérabilité (HL7, FHIR) et les bonnes pratiques de la santé numérique européenne et internationale.\n' +
      'Nous garantissons ainsi que vos données circulent facilement entre hôpitaux, laboratoires, pharmacies et patients, sans friction ni perte d’information.',
  },
  {
    title: ' Est-ce que mes données seront sécurisées lors des échanges inter-systèmes ?',
    content:
      'Chaque transmission de données est chiffrée de bout en bout.\n' +
      'OCR4Labs applique les normes les plus strictes en matière de protection des données de santé (RGPD, HDS, HIPAA si besoin international).',
  },
  {
    title: 'Puis-je intégrer OCR4Labs directement dans mes propres applications ou plateformes ?',
    content:
      'Grâce à notre API REST sécurisée, OCR4Labs peut être intégré facilement dans vos propres systèmes métiers, applications mobiles ou plateformes en ligne, sans rupture technologique.\n' +
      '\n',
  },
  {
    title: 'OCR4Labs prend-il en charge plusieurs langues et systèmes médicaux ?',
    content:
      'Notre moteur est multilingue (français, anglais, arabe...) et s’adapte aux terminologies médicales locales et internationales.\n' +
      'Cela permet un usage fluide quel que soit le pays ou le système de santé concerné.',
  },
];
const brandData = [
  {
    imgUrl: '/images/ece-logo.png',
    imgAlt: 'Brand',
  },
  {
    imgUrl: '/images/crea-logo.png',
    imgAlt: 'Brand',
  },
  {
    imgUrl: '/images/data-logo.png',
    imgAlt: 'Brand',
  },
  {
    imgUrl: '/images/rtit-logo.png',
    imgAlt: 'Brand',
  },

];
export default function HomeStyle2() {
  return (
    <>
      <HeroStyle2
        title="Optimisez le Traitement des Prescriptions"
        subTitle="Simplifiez et accélérez le flux de travail de votre laboratoire médical avec notre plateforme de pointe. OCR4LABS garantit
        une extraction de données précise, réduit les efforts manuels et protège les informations des patients grâce à des mesures de sécurité robustes."
        bgUrl="/images/home_2/hero_bg.jpeg"
        imgUrl="/images/home_2/patents.png"
        videoBtnText="See how we work"
        videoUrl="https://www.youtube.com/embed/VcaAVWtP48A"
        btnText="Ocr4labs"
        btnUrl="/"
        funfactList={[
          { number: '+06', title: 'Années d\'expérience' },
          { number: '98,7%', title: 'de précision d\'extraction' },
          { number: '100%', title: 'interopérable' },
          { number: '100%', title: 'conforme RGPD & HDS' },
        ]}
      />
      <Section bottomMd={190} bottomLg={145} bottomXl={105}>
        <AboutSectionStyle3
          titleUp="Notre mission"
          title="l’accès rapide, fiable et sécurisé à l'information médicale "
          subTitle="Notre mission est de fournir aux professionnels de santé, aux laboratoires et aux patients des outils technologiques de pointe pour optimiser la prise en charge thérapeutique et renforcer la sécurité médicamenteuse."
          imgUrl={aboutImg}
        />
      </Section>

      <Section bottomMd={125} bottomLg={125} bottomXl={85}>
        <DepartmentSectionStyle4
          sectionTitle="Pour une santé éclairée par la technologie"
          sectionTitleUp="NOS DÉPARTEMENTS"
          data={departmentData}
        />
      </Section>

      <Section
        className="cs_bg_filed"
        style={{ backgroundImage: `url(/images/home_2/testimonial_bg.svg)` }}
        topMd={190}
        topLg={145}
        topXl={105}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
      >
        <TestimonialSectionStyle2
          sectionTitle="What Our Patients Say <br /> About Us"
          sectionTitleUp="TESTIMONIALS"
          data={testimonialData}
        />
      </Section>

      <Section
        topMd={185}
        topLg={140}
        topXl={100}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
      >
        <WorkingProcess
          sectionTitle="Comment ça marche"
          sectionTitleUp=""
          sectionTitleDown=""
          sectionSubTitle=""
          data={workingProcessData}
        />
      </Section>

      <Section>
        <BannerSectionStyle2
          bgUrl="/images/home_2/hero.jpg"
          title="OCR4Labs parce que chaque détail compte pour vous."
          subTitle="Réserver une démonstration !"
        />
      </Section>

      <Section topMd={190} topLg={145} topXl={105}>
        <BlogSectionStyle3
          sectionTitle="Dernière News"
          sectionTitleUp="ARTICLES DE BLOG"
          sectionTitleDown=""
          sectionSubTitle=""
          data={blogData}
        />
      </Section>

      <Section
        topMd={190}
        topLg={145}
        topXl={105}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
      >
        <FaqSectionStyle2
          data={faqData}
          sectionTitle="Fréquemment Posées"
          sectionTitleUp="Questions "
        />
      </Section>



      <Section
        topMd={200}
        topLg={150}
        topXl={110}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
      >
        <BrandsSectionStyle2 data={brandData} />
      </Section>
    </>
  );
}
