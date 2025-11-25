import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create services
  const services = [
    {
      id: 'facial-signature',
      name: 'Signature Facial Treatment',
      nameNL: 'Signature Gezichtsbehandeling',
      nameAR: 'علاج الوجه المميز',
      description: 'Deep cleansing, hydrating, and rejuvenating facial treatment',
      descriptionNL: 'Diep reinigende, hydraterende en verjongende gezichtsbehandeling',
      descriptionAR: 'علاج وجه مطهر ومرطب ومجدد للشباب بعمق',
      price: 89.00,
      duration: 60,
      category: 'facial',
      imageUrl: '/services/facial.jpg'
    },
    {
      id: 'skincare-advanced',
      name: 'Advanced Skincare',
      nameNL: 'Geavanceerde Huidverzorging',
      nameAR: 'العناية المتقدمة بالبشرة',
      description: 'Professional skincare solutions for all skin types',
      descriptionNL: 'Professionele huidverzorgingsoplossingen voor alle huidtypes',
      descriptionAR: 'حلول العناية بالبشرة المهنية لجميع أنواع البشرة',
      price: 120.00,
      duration: 75,
      category: 'skincare',
      imageUrl: '/services/skincare.jpg'
    },
    {
      id: 'antiaging',
      name: 'Anti-Aging Treatment',
      nameNL: 'Anti-Aging Behandeling',
      nameAR: 'علاج مكافحة الشيخوخة',
      description: 'Revolutionary treatments to reduce signs of aging',
      descriptionNL: 'Revolutionaire behandelingen om tekenen van veroudering te verminderen',
      descriptionAR: 'علاجات ثورية لتقليل علامات الشيخوخة',
      price: 150.00,
      duration: 90,
      category: 'antiaging',
      imageUrl: '/services/antiaging.jpg'
    },
    {
      id: 'acne-treatment',
      name: 'Acne Treatment',
      nameNL: 'Acne Behandeling',
      nameAR: 'علاج حب الشباب',
      description: 'Effective solutions for acne-prone skin',
      descriptionNL: 'Effectieve oplossingen voor acne-gevoelige huid',
      descriptionAR: 'حلول فعالة للبشرة المعرضة لحب الشباب',
      price: 95.00,
      duration: 60,
      category: 'acne',
      imageUrl: '/services/acne.jpg'
    },
    {
      id: 'hydrafacial',
      name: 'HydraFacial',
      nameNL: 'HydraFacial',
      nameAR: 'هيدرا فيشال',
      description: 'Deep cleansing and hydrating facial treatment',
      descriptionNL: 'Diep reinigende en hydraterende gezichtsbehandeling',
      descriptionAR: 'علاج وجه مطهر ومرطب بعمق',
      price: 135.00,
      duration: 45,
      category: 'hydrafacial',
      imageUrl: '/services/hydrafacial.jpg'
    },
    {
      id: 'chemical-peel',
      name: 'Chemical Peel',
      nameNL: 'Chemische Peeling',
      nameAR: 'التقشير الكيميائي',
      description: 'Professional chemical peels for skin renewal',
      descriptionNL: 'Professionele chemische peelings voor huidvernieuwing',
      descriptionAR: 'تقشير كيميائي مهني لتجديد البشرة',
      price: 110.00,
      duration: 45,
      category: 'chemical',
      imageUrl: '/services/chemical.jpg'
    }
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.id },
      update: service,
      create: service,
    })
  }

  // Create staff members
  const staff = [
    {
      id: 'sarah-beauty',
      name: 'Sarah van der Berg',
      email: 'sarah@pureaura.clinic',
      phone: '+31 6 1234 5001',
      role: 'Senior Beautician',
      bio: 'Sarah has over 10 years of experience in advanced skincare treatments and is certified in multiple beauty therapy techniques.',
      imageUrl: '/staff/sarah.jpg',
      languages: JSON.stringify(['nl', 'en']),
      specialties: JSON.stringify(['Anti-Aging', 'HydraFacial', 'Chemical Peels'])
    },
    {
      id: 'amira-specialist',
      name: 'Amira Hassan',
      email: 'amira@pureaura.clinic',
      phone: '+31 6 1234 5002',
      role: 'Beauty Specialist',
      bio: 'Amira specializes in facial treatments and acne solutions. She speaks Dutch, English, and Arabic fluently.',
      imageUrl: '/staff/amira.jpg',
      languages: JSON.stringify(['nl', 'en', 'ar']),
      specialties: JSON.stringify(['Facial Treatments', 'Acne Treatment', 'Skincare Consultation'])
    },
    {
      id: 'emma-therapist',
      name: 'Emma Johnson',
      email: 'emma@pureaura.clinic',
      phone: '+31 6 1234 5003',
      role: 'Beauty Therapist',
      bio: 'Emma is passionate about personalized skincare and helps clients achieve their beauty goals through customized treatment plans.',
      imageUrl: '/staff/emma.jpg',
      languages: JSON.stringify(['nl', 'en']),
      specialties: JSON.stringify(['Signature Facials', 'Skincare Analysis', 'Beauty Consultation'])
    }
  ]

  for (const member of staff) {
    await prisma.staff.upsert({
      where: { id: member.id },
      update: member,
      create: member,
    })
  }

  // Create gallery items
  const gallery = [
    {
      id: 'clinic-interior',
      title: 'Pure Aura Clinic Interior',
      titleNL: 'Pure Aura Clinic Interieur',
      titleAR: 'داخل عيادة بيور أورا',
      description: 'Our luxurious and modern clinic space',
      descriptionNL: 'Onze luxueuze en moderne kliniekruimte',
      descriptionAR: 'مساحة عيادتنا الفاخرة والحديثة',
      imageUrl: '/gallery/clinic-interior.jpg',
      category: 'clinic',
      order: 1
    },
    {
      id: 'treatment-room',
      title: 'Treatment Room',
      titleNL: 'Behandelkamer',
      titleAR: 'غرفة العلاج',
      description: 'Professional treatment room with state-of-the-art equipment',
      descriptionNL: 'Professionele behandelkamer met state-of-the-art apparatuur',
      descriptionAR: 'غرفة علاج مهنية مع أحدث المعدات',
      imageUrl: '/gallery/treatment-room.jpg',
      category: 'facilities',
      order: 2
    },
    {
      id: 'products-display',
      title: 'Premium Skincare Products',
      titleNL: 'Premium Huidverzorgingsproducten',
      titleAR: 'منتجات العناية بالبشرة المتميزة',
      description: 'High-quality products used in our treatments',
      descriptionNL: 'Hoogwaardige producten gebruikt in onze behandelingen',
      descriptionAR: 'منتجات عالية الجودة تستخدم في علاجاتنا',
      imageUrl: '/gallery/products.jpg',
      category: 'products',
      order: 3
    }
  ]

  for (const item of gallery) {
    await prisma.gallery.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    })
  }

  // Create sample reviews
  const reviews = [
    {
      id: 'review-1',
      name: 'Sarah van der Berg',
      email: 'sarah@example.com',
      rating: 5,
      title: 'Fantastische ervaring!',
      content: 'De HydraFacial behandeling was geweldig. Mijn huid straalt weer en het personeel was zeer professioneel. Zeker een aanrader!',
      serviceId: 'hydrafacial',
      isApproved: true,
      isFeature: true,
      language: 'nl'
    },
    {
      id: 'review-2',
      name: 'Ahmed Al-Rashid',
      email: 'ahmed@example.com',
      rating: 5,
      title: 'Professional and welcoming',
      content: 'The staff speaks Arabic which made me feel very comfortable. The anti-aging treatment exceeded my expectations. Will definitely come back!',
      serviceId: 'antiaging',
      isApproved: true,
      isFeature: true,
      language: 'en'
    },
    {
      id: 'review-3',
      name: 'Emma Johnson',
      email: 'emma@example.com',
      rating: 4,
      title: 'Great results',
      content: 'Very happy with my chemical peel treatment. The results were visible immediately and the aftercare instructions were clear.',
      serviceId: 'chemical-peel',
      isApproved: true,
      isFeature: false,
      language: 'en'
    },
    {
      id: 'review-4',
      name: 'Lisa de Wit',
      email: 'lisa@example.com',
      rating: 5,
      title: 'Uitstekende service',
      content: 'Pure Aura Clinic heeft mijn verwachtingen overtroffen. De gezichtsbehandeling was ontspannend en effectief. Het team is zeer kundig.',
      serviceId: 'facial-signature',
      isApproved: true,
      isFeature: true,
      language: 'nl'
    },
    {
      id: 'review-5',
      name: 'Michael Chen',
      email: 'michael@example.com',
      rating: 4,
      title: 'Clean and professional',
      content: 'First time visiting a beauty clinic and I was impressed. Clean facility, professional staff, and great results from my skincare treatment.',
      serviceId: 'skincare-advanced',
      isApproved: true,
      isFeature: false,
      language: 'en'
    },
    {
      id: 'review-6',
      name: 'Fatima Hassan',
      email: 'fatima@example.com',
      rating: 5,
      title: 'تجربة رائعة',
      content: 'خدمة ممتازة وطاقم متخصص. العلاج كان فعالاً جداً وأنصح الجميع بزيارة هذه العيادة.',
      serviceId: 'facial-signature',
      isApproved: true,
      isFeature: true,
      language: 'ar'
    }
  ];

  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: review,
      create: review,
    })
  }

  // Create settings
  const settings = [
    { key: 'clinic_name', value: 'Pure Aura Clinic' },
    { key: 'clinic_address', value: 'Schoutstraat 29, 1315EV Almere Stad, Netherlands' },
    { key: 'clinic_phone', value: '+31 6 84664822' },
    { key: 'clinic_email', value: 'info@pureaura.clinic' },
    { key: 'opening_hours', value: 'Mon-Fri: 9:00-18:00, Sat: 10:00-16:00, Sun: Closed' },
    { key: 'booking_advance_days', value: '90' },
    { key: 'booking_cancellation_hours', value: '24' },
    { key: 'default_language', value: 'nl' },
    { key: 'supported_languages', value: 'nl,en,ar' },
    { key: 'currency', value: 'EUR' },
    { key: 'currency_symbol', value: '€' },
    { key: 'timezone', value: 'Europe/Amsterdam' }
  ]

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    })
  }

  console.log('Database seeded successfully! 🌱')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })