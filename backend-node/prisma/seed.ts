import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Seed luxury businesses in Puerto Vallarta
  const businesses = [
    {
      nameEN: 'Casa Velas - Rooftop Bar',
      nameES: 'Casa Velas - Bar en la Azotea',
      descriptionEN: 'Elegant rooftop bar with panoramic ocean views, craft cocktails, and live jazz music during golden hour.',
      descriptionES: 'Elegante bar en la azotea con vistas panorámicas al océano, cócteles artesanales y música de jazz en vivo durante la hora dorada.',
      address: 'Av. Paseo Cocoteros 53, Marina Vallarta',
      city: 'Puerto Vallarta',
      latitude: 20.6740,
      longitude: -105.2401,
      phone: '+52 322 226 6688',
      website: 'https://hotelcasavelas.com',
      category: 'ROOFTOP_BAR',
      luxuryTier: 5,
      priceRange: '$$$$',
      bestForPhases: ['golden', 'night'],
      imageUrls: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800'
      ],
      tags: ['rooftop', 'ocean-view', 'romantic', 'live-music', 'cocktails'],
      slug: 'casa-velas-rooftop-bar',
      isFeatured: true,
      approvalStatus: 'APPROVED'
    },
    {
      nameEN: 'The Sanctuary - Beach Club',
      nameES: 'The Sanctuary - Club de Playa',
      descriptionEN: 'Exclusive beach club offering infinity pool, private cabanas, and farm-to-table dining with sunset views.',
      descriptionES: 'Club de playa exclusivo con piscina infinita, cabañas privadas y cocina de granja a mesa con vistas al atardecer.',
      address: 'Zona Hotelera Sur, Playa Conchas Chinas',
      city: 'Puerto Vallarta',
      latitude: 20.5890,
      longitude: -105.2520,
      phone: '+52 322 223 1234',
      website: 'https://sanctuary-pv.com',
      category: 'BEACH_CLUB',
      luxuryTier: 5,
      priceRange: '$$$$',
      bestForPhases: ['day', 'golden'],
      imageUrls: [
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
      ],
      tags: ['beach-club', 'infinity-pool', 'fine-dining', 'ocean-view', 'exclusive'],
      slug: 'sanctuary-beach-club',
      isFeatured: true,
      approvalStatus: 'APPROVED'
    },
    {
      nameEN: 'Garza Blanca Resort & Spa',
      nameES: 'Garza Blanca Resort & Spa',
      descriptionEN: 'Five-star oceanfront resort with spectacular pools, world-class spa, and three gourmet restaurants.',
      descriptionES: 'Resort de cinco estrellas frente al mar con piscinas espectaculares, spa de clase mundial y tres restaurantes gourmet.',
      address: 'Carretera a Barra de Navidad Km 7.5',
      city: 'Puerto Vallarta',
      latitude: 20.5432,
      longitude: -105.2789,
      phone: '+52 322 176 0700',
      website: 'https://garzablancaresort.com',
      category: 'HOTEL',
      luxuryTier: 5,
      priceRange: '$$$$',
      bestForPhases: ['day', 'golden', 'night'],
      imageUrls: [
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800'
      ],
      tags: ['luxury-hotel', 'spa', 'fine-dining', 'ocean-view', 'pools'],
      slug: 'garza-blanca-resort',
      isFeatured: true,
      approvalStatus: 'APPROVED'
    },
    {
      nameEN: 'La Leche Almacén Gourmet',
      nameES: 'La Leche Almacén Gourmet',
      descriptionEN: 'Innovative fine dining restaurant with avant-garde cuisine and an extensive wine cellar. Perfect for romantic dinners.',
      descriptionES: 'Restaurante de alta cocina innovadora con gastronomía de vanguardia y una amplia bodega de vinos. Perfecto para cenas románticas.',
      address: 'Guadalupe Sánchez 109, Col. Centro',
      city: 'Puerto Vallarta',
      latitude: 20.6119,
      longitude: -105.2318,
      phone: '+52 322 293 3900',
      website: 'https://lalecherestaurant.com',
      category: 'RESTAURANT',
      luxuryTier: 4,
      priceRange: '$$$',
      bestForPhases: ['night'],
      imageUrls: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800'
      ],
      tags: ['fine-dining', 'romantic', 'wine-cellar', 'innovative-cuisine'],
      slug: 'la-leche-gourmet',
      isFeatured: false,
      approvalStatus: 'APPROVED'
    },
    {
      nameEN: 'Mandala Nightclub',
      nameES: 'Mandala Nightclub',
      descriptionEN: 'Upscale nightclub with international DJs, VIP bottle service, and stunning light shows. The hottest spot after dark.',
      descriptionES: 'Discoteca exclusiva con DJs internacionales, servicio VIP de botellas y espectáculos de luces impresionantes. El lugar más popular después del anochecer.',
      address: 'Paseo Díaz Ordaz 600, Centro',
      city: 'Puerto Vallarta',
      latitude: 20.6090,
      longitude: -105.2310,
      phone: '+52 322 223 1234',
      website: 'https://mandala.com.mx',
      category: 'NIGHTCLUB',
      luxuryTier: 4,
      priceRange: '$$$',
      bestForPhases: ['night'],
      imageUrls: [
        'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800'
      ],
      tags: ['nightclub', 'dj', 'vip', 'dancing', 'bottle-service'],
      slug: 'mandala-nightclub',
      isFeatured: false,
      approvalStatus: 'APPROVED'
    },
    {
      nameEN: 'Vallarta Adventures - Sunset Yacht',
      nameES: 'Vallarta Adventures - Yate al Atardecer',
      descriptionEN: 'Luxury yacht charter for sunset cruises with premium open bar, gourmet appetizers, and breathtaking Bay views.',
      descriptionES: 'Alquiler de yate de lujo para cruceros al atardecer con barra libre premium, aperitivos gourmet y vistas impresionantes de la Bahía.',
      address: 'Marina Vallarta',
      city: 'Puerto Vallarta',
      latitude: 20.6850,
      longitude: -105.2540,
      phone: '+52 322 297 1212',
      website: 'https://vallarta-adventures.com',
      category: 'YACHT_CHARTER',
      luxuryTier: 5,
      priceRange: '$$$$',
      bestForPhases: ['golden'],
      imageUrls: [
        'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800'
      ],
      tags: ['yacht', 'sunset-cruise', 'luxury', 'romantic', 'ocean-view'],
      slug: 'vallarta-adventures-yacht',
      isFeatured: true,
      approvalStatus: 'APPROVED'
    },
    {
      nameEN: 'Secrets Vallarta Bay - Adults Only',
      nameES: 'Secrets Vallarta Bay - Solo Adultos',
      descriptionEN: 'Luxury all-inclusive adults-only resort with gourmet dining, infinity pools, and world-class spa services.',
      descriptionES: 'Resort de lujo todo incluido solo para adultos con gastronomía gourmet, piscinas infinitas y servicios de spa de clase mundial.',
      address: 'Blvd. Francisco Medina Ascencio 2121',
      city: 'Puerto Vallarta',
      latitude: 20.6550,
      longitude: -105.2450,
      phone: '+52 322 226 4444',
      website: 'https://secretsresorts.com',
      category: 'HOTEL',
      luxuryTier: 5,
      priceRange: '$$$$',
      bestForPhases: ['day', 'golden', 'night'],
      imageUrls: [
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
      ],
      tags: ['adults-only', 'all-inclusive', 'luxury-hotel', 'spa', 'ocean-view'],
      slug: 'secrets-vallarta-bay',
      isFeatured: true,
      approvalStatus: 'APPROVED'
    },
    {
      nameEN: 'Café des Artistes',
      nameES: 'Café des Artistes',
      descriptionEN: 'Iconic fine dining restaurant blending French cuisine with Mexican flavors. Art-filled dining rooms and tropical garden.',
      descriptionES: 'Icónico restaurante de alta cocina que fusiona la gastronomía francesa con sabores mexicanos. Salones llenos de arte y jardín tropical.',
      address: 'Guadalupe Sánchez 740, Centro',
      city: 'Puerto Vallarta',
      latitude: 20.6105,
      longitude: -105.2330,
      phone: '+52 322 222 3228',
      website: 'https://cafedesartistes.com',
      category: 'RESTAURANT',
      luxuryTier: 5,
      priceRange: '$$$$',
      bestForPhases: ['night'],
      imageUrls: [
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'
      ],
      tags: ['fine-dining', 'french-cuisine', 'romantic', 'art', 'garden'],
      slug: 'cafe-des-artistes',
      isFeatured: true,
      approvalStatus: 'APPROVED'
    }
  ];

  for (const business of businesses) {
    const created = await prisma.business.create({
      data: {
        ...business,
        features: {
          create: [
            { labelEN: 'Ocean View', labelES: 'Vista al Mar' },
            { labelEN: 'Romantic Atmosphere', labelES: 'Ambiente Romántico' },
            { labelEN: 'Premium Service', labelES: 'Servicio Premium' }
          ]
        }
      }
    });
    console.log(`✅ Created: ${created.nameEN}`);
  }

  // Seed a sample contest
  const contest = await prisma.contest.create({
    data: {
      titleEN: 'Golden Hour Photography Contest - December 2025',
      titleES: 'Concurso de Fotografía Hora Dorada - Diciembre 2025',
      descriptionEN: 'Capture the magic of Puerto Vallarta\'s golden hour! Submit your best sunset photo for a chance to win a 3-night stay at Casa Velas Resort.',
      descriptionES: '¡Captura la magia de la hora dorada de Puerto Vallarta! Envía tu mejor foto del atardecer para tener la oportunidad de ganar una estadía de 3 noches en Casa Velas Resort.',
      prizeEN: 'Grand Prize: 3-night luxury stay at Casa Velas Resort (value: $2,500 USD)',
      prizeES: 'Gran Premio: Estadía de lujo de 3 noches en Casa Velas Resort (valor: $2,500 USD)',
      startDate: new Date('2025-12-01'),
      endDate: new Date('2025-12-31'),
      isActive: true
    }
  });
  console.log(`✅ Created contest: ${contest.titleEN}`);

  // Seed landing page blueprint
  const blueprint = await prisma.landingPageBlueprint.create({
    data: {
      variant: 'sunset-upload',
      titleEN: 'Immortalize Your Perfect Sunset',
      titleES: 'Inmortaliza Tu Atardecer Perfecto',
      subtitleEN: 'Share your golden hour moments and compete for luxury prizes',
      subtitleES: 'Comparte tus momentos de hora dorada y compite por premios de lujo',
      hookEN: 'Every sunset in Puerto Vallarta tells a story. What\'s yours?',
      hookES: 'Cada atardecer en Puerto Vallarta cuenta una historia. ¿Cuál es la tuya?',
      questionsEN: {
        questions: [
          { id: 1, text: 'What brings you to Puerto Vallarta?', type: 'multiple_choice' }
        ]
      },
      questionsES: {
        questions: [
          { id: 1, text: '¿Qué te trae a Puerto Vallarta?', type: 'multiple_choice' }
        ]
      },
      isActive: true
    }
  });
  console.log(`✅ Created landing page blueprint: ${blueprint.variant}`);

  console.log('\n🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
