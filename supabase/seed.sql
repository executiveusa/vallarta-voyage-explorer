-- Verified Vallarta™ — Seed Data
-- 10 real Puerto Vallarta businesses for demo
-- All personally verified by Ivette (simulated for demo)

INSERT INTO public.businesses (
  name_en, name_es, slug, description_en, description_es,
  category, area, phone, whatsapp_number, website,
  verified, verified_by, verified_at, approval_status,
  image_urls, sunset_view, luxury_tier, price_range,
  best_phases, golden_hour_special, is_featured
) VALUES

(
  'La Palapa', 'La Palapa',
  'la-palapa',
  'Iconic beachfront restaurant with spectacular sunset views and elevated Mexican cuisine. A Vallarta institution since 1975.',
  'Restaurante icónico frente al mar con vistas espectaculares al atardecer y cocina mexicana elevada. Una institución en Vallarta desde 1975.',
  'Restaurant', 'Zona Romántica',
  '+52-322-222-5225', '+52-322-222-5225',
  'https://lapalapa.com.mx',
  true, 'Ivette', NOW(), 'APPROVED',
  ARRAY['https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000'],
  true, 5, '$$$$',
  ARRAY['golden', 'night'],
  '2x1 en cócteles durante la hora dorada (5-7pm)',
  true
),

(
  'Vallarta Adventures', 'Vallarta Adventures',
  'vallarta-adventures',
  'Premier luxury tour operator. Sailing, whale watching, snorkeling at Marieta Islands, and exclusive sunset cruises.',
  'Operador turístico de lujo líder. Vela, avistamiento de ballenas, snorkel en Islas Marietas y cruceros exclusivos al atardecer.',
  'Tour', 'Marina Vallarta',
  '+52-322-221-0657', '+52-322-221-0657',
  'https://vallarta-adventures.com',
  true, 'Ivette', NOW(), 'APPROVED',
  ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1000'],
  true, 5, '$$$',
  ARRAY['day', 'golden'],
  'Crucero al atardecer con open bar — precio especial VV',
  true
),

(
  'Café des Artistes', 'Café des Artistes',
  'cafe-des-artistes',
  'Award-winning French-Mexican cuisine in a lush tropical garden. James Beard recognized. Reservations essential.',
  'Cocina franco-mexicana galardonada en un exuberante jardín tropical. Reconocido por James Beard. Reservaciones esenciales.',
  'Restaurant', 'Centro',
  '+52-322-222-3228', '+52-322-222-3228',
  'https://cafedesartistes.com',
  true, 'Ivette', NOW(), 'APPROVED',
  ARRAY['https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000'],
  false, 5, '$$$$',
  ARRAY['night'],
  null,
  true
),

(
  'Rhythms of the Night', 'Ritmos de la Noche',
  'rhythms-of-the-night',
  'Magical evening on a secluded beach accessible only by boat — dinner, show, thousands of candles. A once-in-a-lifetime experience.',
  'Velada mágica en una playa aislada accesible solo en barco — cena, espectáculo, miles de velas. Una experiencia irrepetible.',
  'Experience', 'Las Caletas',
  '+52-322-226-8413', '+52-322-226-8413',
  'https://rhythmsofthenight.com',
  true, 'Ivette', NOW(), 'APPROVED',
  ARRAY['https://images.unsplash.com/photo-1564594985205-4024bb3a0b6c?q=80&w=1000'],
  true, 5, '$$$$',
  ARRAY['night'],
  null,
  true
),

(
  'Hotel Mousai', 'Hotel Mousai',
  'hotel-mousai',
  'Ultra-luxury adults-only boutique hotel. Rooftop infinity pool with unobstructed Pacific sunset views. World-class spa.',
  'Hotel boutique de ultra lujo solo para adultos. Piscina infinita en la azotea con vistas despejadas al Pacífico. Spa de clase mundial.',
  'Hotel', 'Zona Hotelera Sur',
  '+52-322-226-9000', '+52-322-226-9000',
  'https://hotelmousai.com',
  true, 'Ivette', NOW(), 'APPROVED',
  ARRAY['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1000'],
  true, 5, '$$$$',
  ARRAY['golden', 'night'],
  'Hora dorada en la alberca rooftop — acceso para huéspedes VV',
  true
),

(
  'Turtle Release Experience', 'Liberación de Tortugas',
  'turtle-release',
  'Help baby sea turtles reach the ocean at sunset. A conservation experience you will never forget. Eco-certified.',
  'Ayuda a tortugas bebé a llegar al mar durante el atardecer. Una experiencia de conservación que nunca olvidarás. Certificado eco.',
  'Experience', 'Playa Mismaloya',
  '+52-322-209-0212', '+52-322-209-0212',
  null,
  true, 'Ivette', NOW(), 'APPROVED',
  ARRAY['https://images.unsplash.com/photo-1591025207163-942350e47db2?q=80&w=1000'],
  true, 3, '$$',
  ARRAY['golden'],
  'Temporada: junio — diciembre. Grupos máx 12 personas',
  false
),

(
  'Garbo Piano Bar', 'Garbo Piano Bar',
  'garbo-piano-bar',
  'Legendary intimate piano bar in the Romantic Zone. Live jazz every night. Classic cocktails. The heartbeat of old Vallarta.',
  'Legendario bar de piano íntimo en la Zona Romántica. Jazz en vivo todas las noches. Cócteles clásicos. El corazón del Viejo Vallarta.',
  'Bar', 'Zona Romántica',
  '+52-322-223-0290', '+52-322-223-0290',
  null,
  true, 'Ivette', NOW(), 'APPROVED',
  ARRAY['https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=1000'],
  false, 4, '$$$',
  ARRAY['night'],
  null,
  false
),

(
  'Marietas Islands Snorkeling', 'Snorkel Islas Marietas',
  'marietas-snorkeling',
  'Explore the hidden beach and vibrant marine life of the Marietas Islands UNESCO Biosphere Reserve. Limited daily permits.',
  'Explora la playa escondida y vida marina de las Islas Marietas, Reserva de la Biosfera UNESCO. Permisos diarios limitados.',
  'Tour', 'Punta de Mita',
  '+52-329-291-6298', '+52-329-291-6298',
  null,
  true, 'Ivette', NOW(), 'APPROVED',
  ARRAY['https://images.unsplash.com/photo-1501426026826-31c667bdf23d?q=80&w=1000'],
  false, 4, '$$$',
  ARRAY['day'],
  null,
  false
),

(
  'Olas Altas Wellness', 'Olas Altas Bienestar',
  'olas-altas-wellness',
  'Holistic spa and yoga studio by the sea. Traditional Mexican healing therapies, ocean-view yoga, and sound bath ceremonies.',
  'Spa holístico y estudio de yoga junto al mar. Terapias de sanación mexicanas tradicionales, yoga con vista al mar y ceremonias de baño de sonido.',
  'Spa', 'Zona Romántica',
  '+52-322-223-0315', '+52-322-223-0315',
  null,
  true, 'Ivette', NOW(), 'APPROVED',
  ARRAY['https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000'],
  false, 4, '$$$',
  ARRAY['day', 'golden'],
  'Sesión de yoga al atardecer en la terraza',
  false
),

(
  'El Barracuda Beach Club', 'El Barracuda Beach Club',
  'el-barracuda',
  'Laid-back luxury beach club on Los Muertos Beach. Sun beds, cocktails, fresh seafood, and the best vibe in the Romantic Zone.',
  'Beach club de lujo relajado en Playa Los Muertos. Camastros, cócteles, mariscos frescos y el mejor ambiente de la Zona Romántica.',
  'Bar', 'Zona Romántica',
  '+52-322-222-8400', '+52-322-222-8400',
  null,
  true, 'Ivette', NOW(), 'APPROVED',
  ARRAY['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000'],
  true, 4, '$$$',
  ARRAY['day', 'golden'],
  'Happy hour 3-6pm frente al mar',
  false
);
