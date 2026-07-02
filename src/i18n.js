import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navbar & Footer links
      home: "Home",
      faq: "FAQ",
      rfq: "RFQ",
      helpCenter: "Help Center",
      policies: "Policies",
      login: "Login",
      listCompany: "List Your Company",
      
      // Welcome
      welcomeTo: "WELCOME TO",
      wulfaraBrand: "WULFARA!!!!",
      wulfaraDesc: "WULFARA is an online marketplace website directory that connects suppliers and customers together through a smart business network.",
      learnMore: "Learn More",

      // Hero
      findSuppliersTitle: "Find Suppliers, Logistics, and Manufacturing Partners",
      heroSubtitle: "WULFARA is an online marketplace directory that connects suppliers and customers together.",
      searchPlaceholder: "Find suppliers, logistics, manufacturing...",
      searchBtn: "Search",
      freeSearch: "Free supplier search",
      requestQuotes: "Request quotes directly",
      globalSuppliers: "Suppliers from U.S. and other countries",
      matchmaking: "Business matchmaking",
      browseSuppliers: "Browse Suppliers",

      // Features
      rfqDesc: "Request a quote from suppliers",
      helpCenterDesc: "Get support and find answers",
      policiesDesc: "Read our platform guidelines",
      listCompanyDesc: "Add your business to directory",
      faqDesc: "Common questions answered",
      loginDesc: "Access your account dashboard",

      // FAQ
      faqSubtitle: "Common questions about how WULFARIA connects customers and suppliers.",
      viewFaq: "View FAQ",
      q1: "What does the company do?",
      a1: "We connect customers with suppliers so they can find products and services online. WULFARA serves as a high-fidelity bridge in the global B2B ecosystem, streamlining the matchmaking and procurement process.",
      q2: "Who are your suppliers?",
      a2: "Our suppliers include verified manufacturers, local wholesalers, and international logistics experts who pass our robust credential verification standards.",
      q3: "How does your service work?",
      a3: "Buyers can search for partners, request quotes (RFQs), or contact businesses directly. Suppliers get listed, build detailed profiles, and bid on matching buyer requests.",
      q4: "Where do products come from?",
      a4: "Products and services are offered by local US manufacturers, global logistics companies, and international suppliers across hundreds of industrial categories.",
      q5: "Do you sell products directly?",
      a5: "Wulfaria is a B2B directory and matchmaking network, not a direct retail shop. We provide the connections, tools, and platform to help you source products directly from partners.",
      q6: "How do I request a quote?",
      a6: "Simply head over to our RFQ section, fill in the requirements details of your logistics or manufacturing request, and submit it to receive customized quotes from certified suppliers.",
      q7: "Is it free to use?",
      a7: "Yes! Searching for suppliers and submitting RFQs is free for buyers. We also offer premium plans for companies wishing to highlight their services and boost visibility.",

      // CTA
      ctaTitle: "Ready to find the right supplier?",

      // Footer
      footerDesc: "WULFARA is a leading B2B marketplace directory connecting businesses with reliable suppliers, logistics, and manufacturing partners globally.",
      platform: "Platform",
      support: "Support",
      rightsReserved: "All rights reserved.",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service"
    }
  },
  nl: {
    translation: {
      // Navbar & Footer links
      home: "Home",
      faq: "Veelgestelde vragen",
      rfq: "Offerteaanvraag",
      helpCenter: "Helpcentrum",
      policies: "Beleid",
      login: "Inloggen",
      listCompany: "Vermeld uw bedrijf",

      // Welcome
      welcomeTo: "WELKOM BIJ",
      wulfaraBrand: "WULFARA!!!!",
      wulfaraDesc: "WULFARA is een online marktplaatsbedrijvengids die leveranciers en klanten met elkaar verbindt via een slim zakelijk netwerk.",
      learnMore: "Meer Informatie",

      // Hero
      findSuppliersTitle: "Vind leveranciers, logistiek en productiepartners",
      heroSubtitle: "WULFARA is een online marktplaatsgids die leveranciers en klanten met elkaar verbindt.",
      searchPlaceholder: "Vind leveranciers, logistiek, productie...",
      searchBtn: "Zoeken",
      freeSearch: "Gratis leveranciers zoeken",
      requestQuotes: "Direct offertes aanvragen",
      globalSuppliers: "Leveranciers uit de VS en andere landen",
      matchmaking: "Zakelijke matchmaking",
      browseSuppliers: "Blader door leveranciers",

      // Features
      rfqDesc: "Vraag een offerte aan bij leveranciers",
      helpCenterDesc: "Krijg ondersteuning en vind antwoorden",
      policiesDesc: "Lees onze platformrichtlijnen",
      listCompanyDesc: "Voeg uw bedrijf toe aan de gids",
      faqDesc: "Veelgestelde vragen beantwoord",
      loginDesc: "Krijg toegang tot uw accountdashboard",

      // FAQ
      faqSubtitle: "Veelgestelde vragen over hoe WULFARIA klanten en leveranciers verbindt.",
      viewFaq: "Bekijk Veelgestelde Vragen",
      q1: "Wat doet het bedrijf?",
      a1: "We verbinden klanten met leveranciers zodat ze online producten en diensten kunnen vinden. WULFARA dient als een hoogwaardige brug in het wereldwijde B2B-ecosysteem en stroomlijnt het matchmaking- en inkoopproces.",
      q2: "Wie zijn uw leveranciers?",
      a2: "Onze leveranciers omvatten geverifieerde fabrikanten, lokale groothandelaren en internationale logistieke experts die voldoen aan onze strenge verificatienormen.",
      q3: "Hoe werkt uw service?",
      a3: "Kopers kunnen zoeken naar partners, offertes aanvragen (RFQ's) of rechtstreeks contact opnemen met bedrijven. Leveranciers worden vermeld, maken gedetailleerde profielen aan en bieden op bijpassende kopersaanvragen.",
      q4: "Waar komen producten vandaan?",
      a4: "Producten en diensten worden aangeboden door lokale Amerikaanse fabrikanten, wereldwijde logistieke bedrijven en internationale leveranciers in honderden industriële categorieën.",
      q5: "Verkoopt u producten rechtstreeks?",
      a5: "Wulfaria is een B2B-gids en matchmaking-netwerk, geen directe retailwinkel. Wij bieden de verbindingen, tools en het platform om u te helpen producten rechtstreeks bij partners in te kopen.",
      q6: "Hoe vraag ik een offerte aan?",
      a6: "Ga naar onze RFQ-sectie, vul de vereiste details van uw logistieke of productieaanvraag in en dien deze in om offertes op maat te ontvangen van gecertificeerde leveranciers.",
      q7: "Is het gratis te gebruiken?",
      a7: "Ja! Het zoeken naar leveranciers en het indienen van RFQ's is gratis voor kopers. We bieden ook premium plannen voor bedrijven die hun diensten willen benadrukken en hun zichtbaarheid willen vergroten.",

      // CTA
      ctaTitle: "Klaar om de juiste leverancier te vinden?",

      // Footer
      footerDesc: "WULFARA is een toonaangevende B2B-marktplaatsgids die bedrijven wereldwijd verbindt met betrouwbare leveranciers, logistiek en productiepartners.",
      platform: "Platform",
      support: "Ondersteuning",
      rightsReserved: "Alle rechten voorbehouden.",
      privacyPolicy: "Privacybeleid",
      termsOfService: "Servicevoorwaarden"
    }
  },
  ar: {
    translation: {
      // Navbar & Footer links
      home: "الرئيسية",
      faq: "الأسئلة الشائعة",
      rfq: "طلب عرض سعر",
      helpCenter: "مركز المساعدة",
      policies: "السياسات",
      login: "تسجيل الدخول",
      listCompany: "أضف شركتك",

      // Welcome
      welcomeTo: "مرحباً بكم في",
      wulfaraBrand: "وولفارا!!!!",
      wulfaraDesc: "وولفارا هو دليل مواقع سوق إلكتروني يربط الموردين والعملاء معاً من خلال شبكة أعمال ذكية.",
      learnMore: "اعرف المزيد",

      // Hero
      findSuppliersTitle: "ابحث عن الموردين، الخدمات اللوجستية، وشركاء التصنيع",
      heroSubtitle: "وولفارا هو دليل سوق إلكتروني يربط الموردين والعملاء معاً.",
      searchPlaceholder: "ابحث عن الموردين، الخدمات اللوجستية، التصنيع...",
      searchBtn: "بحث",
      freeSearch: "بحث مجاني عن الموردين",
      requestQuotes: "طلب عروض الأسعار مباشرة",
      globalSuppliers: "موردون من الولايات المتحدة ودول أخرى",
      matchmaking: "توفيق الأعمال",
      browseSuppliers: "تصفح الموردين",

      // Features
      rfqDesc: "اطلب عرض سعر من الموردين",
      helpCenterDesc: "احصل على الدعم واعثر على الإجابات",
      policiesDesc: "اقرأ إرشادات منصتنا",
      listCompanyDesc: "أضف عملك إلى الدليل",
      faqDesc: "إجابات على الأسئلة الشائعة",
      loginDesc: "الوصول إلى لوحة التحكم الخاصة بك",

      // FAQ
      faqSubtitle: "أسئلة شائعة حول كيفية ربط وولفارا للعملاء والموردين.",
      viewFaq: "عرض الأسئلة الشائعة",
      q1: "ماذا تفعل الشركة؟",
      a1: "نحن نربط العملاء بالموردين حتى يتمكنوا من العثور على المنتجات والخدمات عبر الإنترنت. تعمل وولفارا كجسر عالي الدقة في نظام B2B العالمي، مما يسهل عملية توفيق الأعمال والمشتريات.",
      q2: "من هم موردوكم؟",
      a2: "يشمل موردونا المصانع المعتمدة، وتجار الجملة المحليين، وخبراء اللوجستيات الدوليين الذين يجتازون معايير التحقق القوية الخاصة بنا.",
      q3: "كيف تعمل خدمتكم؟",
      a3: "يمكن للمشترين البحث عن شركاء، أو تقديم طلبات عروض أسعار (RFQs), أو الاتصال بالشركات مباشرة. يتم إدراج الموردين، وبناء ملفات تعريف مفصلة، وتقديم عطاءات على طلبات المشترين المطابقة.",
      q4: "من أين تأتي المنتجات؟",
      a4: "يتم تقديم المنتجات والخدمات من قبل المصنعين المحليين في الولايات المتحدة، وشركات الخدمات اللوجستية العالمية، والموردين الدوليين عبر مئات الفئات الصناعية.",
      q5: "هل تبيعون المنتجات مباشرة؟",
      a5: "وولفارا هي دليل B2B وشبكة توفيق أعمال، وليست متجراً مباشراً للتجزئة. نحن نوفر الاتصالات والأدوات والمنصة لمساعدتك في الحصول على المنتجات مباشرة من الشركاء.",
      q6: "كيف يمكنني طلب عرض سعر؟",
      a6: "بساطة توجه إلى قسم طلبات عروض الأسعار (RFQ)، واملأ تفاصيل متطلبات اللوجستيات أو التصنيع الخاصة بك، وأرسلها لتلقي عروض أسعار مخصصة من موردين معتمدين.",
      q7: "هل استخدام المنصة مجاني؟",
      a7: "نعم! البحث عن الموردين وتقديم طلبات عروض الأسعار مجاني للمشترين. نقدم أيضاً خططاً مميزة للشركات التي ترغب في إبراز خدماتها وزيادة ظهورها.",

      // CTA
      ctaTitle: "جاهز للعثور على المورد المناسب؟",

      // Footer
      footerDesc: "وولفارا هي دليل سوق B2B رائد يربط الشركات بموردي الخدمات اللوجستية والتصنيع الموثوق بهم عالمياً.",
      platform: "المنصة",
      support: "الدعم",
      rightsReserved: "جميع الحقوق محفوظة.",
      privacyPolicy: "سياسة الخصوصية",
      termsOfService: "شروط الخدمة"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;
