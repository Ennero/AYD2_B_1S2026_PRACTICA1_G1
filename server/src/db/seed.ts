import DB from './db.ts';
import { InvitationState, PropertyState, PropertyType, UserType } from '../store/enums.ts';
import bcrypt from 'bcryptjs';

const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
};

// Función para generar fechas aleatorias entre enero y febrero 2026
const randomDate = (start: Date, end: Date): Date => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

async function main() {
    console.log('🌱 Starting database seeding...');

    // Limpiar datos existentes
    console.log('🧹 Cleaning existing data...');
    await DB.record.deleteMany();
    await DB.invitation.deleteMany();
    await DB.image.deleteMany();
    await DB.favorite.deleteMany();
    await DB.property.deleteMany();
    await DB.uSER.deleteMany();

    const startDate = new Date('2026-01-01');
    const endDate = new Date('2026-02-28');

    // Crear usuarios
    console.log('👥 Creating users...');

    // 1 Admin - Rosita
    const admin = await DB.uSER.create({
        data: {
            email: 'admin@homefinder.com',
            password: await hashPassword('Admin123!'),
            gender: 2,
            type: UserType.Admin,
            name: 'Rosita',
            last_name: 'Administradora',
            url_img: 'https://i.pravatar.cc/300?img=47',
            phone: '55551234',
            created_at: new Date('2026-01-01T08:00:00Z')
        }
    });

    // 6 Agentes - María López es la agente principal para presentación
    const agents = await Promise.all([
        DB.uSER.create({
            data: {
                email: 'maria.lopez@homefinder.com',
                password: await hashPassword('Agent123!'),
                gender: 2,
                type: UserType.Agent,
                name: 'María',
                last_name: 'López',
                url_img: 'https://i.pravatar.cc/300?img=47',
                phone: '55557001',
                created_at: new Date('2026-01-05T10:00:00Z')
            }
        }),
        DB.uSER.create({
            data: {
                email: 'juan.perez@homefinder.com',
                password: await hashPassword('Agent123!'),
                gender: 1,
                type: UserType.Agent,
                name: 'Juan',
                last_name: 'Pérez',
                url_img: 'https://i.pravatar.cc/300?img=33',
                phone: '55557002',
                created_at: randomDate(new Date('2026-01-02'), new Date('2026-01-05'))
            }
        }),
        DB.uSER.create({
            data: {
                email: 'ana.martinez@homefinder.com',
                password: await hashPassword('Agent123!'),
                gender: 2,
                type: UserType.Agent,
                name: 'Ana',
                last_name: 'Martínez',
                url_img: 'https://i.pravatar.cc/300?img=45',
                phone: '55557003',
                created_at: randomDate(new Date('2026-01-03'), new Date('2026-01-06'))
            }
        }),
        DB.uSER.create({
            data: {
                email: 'roberto.garcia@homefinder.com',
                password: await hashPassword('Agent123!'),
                gender: 1,
                type: UserType.Agent,
                name: 'Roberto',
                last_name: 'García',
                url_img: 'https://i.pravatar.cc/300?img=15',
                phone: '55557004',
                created_at: randomDate(new Date('2026-01-04'), new Date('2026-01-07'))
            }
        }),
        DB.uSER.create({
            data: {
                email: 'laura.fernandez@homefinder.com',
                password: await hashPassword('Agent123!'),
                gender: 2,
                type: UserType.Agent,
                name: 'Laura',
                last_name: 'Fernández',
                url_img: 'https://i.pravatar.cc/300?img=48',
                phone: '55557005',
                created_at: randomDate(new Date('2026-01-05'), new Date('2026-01-08'))
            }
        }),
        DB.uSER.create({
            data: {
                email: 'diego.rodriguez@homefinder.com',
                password: await hashPassword('Agent123!'),
                gender: 1,
                type: UserType.Agent,
                name: 'Diego',
                last_name: 'Rodríguez',
                url_img: 'https://i.pravatar.cc/300?img=68',
                phone: '55557006',
                created_at: randomDate(new Date('2026-01-06'), new Date('2026-01-09'))
            }
        })
    ]);

    // 20 Clientes
    const clients = await Promise.all([
        DB.uSER.create({
            data: {
                email: 'sofia.gomez@gmail.com',
                password: await hashPassword('Client123!'),
                gender: 2,
                type: UserType.Client,
                name: 'Sofía',
                last_name: 'Gómez',
                url_img: 'https://i.pravatar.cc/300?img=5',
                phone: '55558001',
                created_at: randomDate(new Date('2026-01-10'), new Date('2026-01-15'))
            }
        }),
        // Pedro Sánchez - Cliente principal para presentación
        DB.uSER.create({
            data: {
                email: 'pedro.sanchez@gmail.com',
                password: await hashPassword('Client123!'),
                gender: 1,
                type: UserType.Client,
                name: 'Pedro',
                last_name: 'Sánchez',
                url_img: 'https://i.pravatar.cc/300?img=13',
                phone: '55558002',
                created_at: randomDate(new Date('2026-01-10'), new Date('2026-01-15'))
            }
        }),
        DB.uSER.create({
            data: {
                email: 'carmen.diaz@gmail.com',
                password: await hashPassword('Client123!'),
                gender: 2,
                type: UserType.Client,
                name: 'Carmen',
                last_name: 'Díaz',
                url_img: 'https://i.pravatar.cc/300?img=10',
                phone: '55558003',
                created_at: randomDate(new Date('2026-01-12'), new Date('2026-01-17'))
            }
        }),
        DB.uSER.create({
            data: {
                email: 'miguel.torres@gmail.com',
                password: await hashPassword('Client123!'),
                gender: 1,
                type: UserType.Client,
                name: 'Miguel',
                last_name: 'Torres',
                url_img: 'https://i.pravatar.cc/300?img=52',
                phone: '55558004',
                created_at: randomDate(new Date('2026-01-13'), new Date('2026-01-18'))
            }
        }),
        DB.uSER.create({
            data: {
                email: 'isabel.ramirez@gmail.com',
                password: await hashPassword('Client123!'),
                gender: 2,
                type: UserType.Client,
                name: 'Isabel',
                last_name: 'Ramírez',
                url_img: 'https://i.pravatar.cc/300?img=20',
                phone: '55558005',
                created_at: randomDate(new Date('2026-01-14'), new Date('2026-01-19'))
            }
        }),
        DB.uSER.create({
            data: {
                email: 'francisco.castro@gmail.com',
                password: await hashPassword('Client123!'),
                gender: 1,
                type: UserType.Client,
                name: 'Francisco',
                last_name: 'Castro',
                url_img: 'https://i.pravatar.cc/300?img=59',
                phone: '55558006',
                created_at: randomDate(new Date('2026-01-15'), new Date('2026-01-20'))
            }
        }),
        DB.uSER.create({
            data: {
                email: 'lucia.morales@gmail.com',
                password: await hashPassword('Client123!'),
                gender: 2,
                type: UserType.Client,
                name: 'Lucía',
                last_name: 'Morales',
                url_img: 'https://i.pravatar.cc/300?img=44',
                phone: '55558007',
                created_at: randomDate(new Date('2026-01-16'), new Date('2026-01-21'))
            }
        }),
        DB.uSER.create({
            data: {
                email: 'antonio.jimenez@gmail.com',
                password: await hashPassword('Client123!'),
                gender: 1,
                type: UserType.Client,
                name: 'Antonio',
                last_name: 'Jiménez',
                url_img: 'https://i.pravatar.cc/300?img=51',
                phone: '55558008',
                created_at: randomDate(new Date('2026-01-17'), new Date('2026-01-22'))
            }
        }),
        DB.uSER.create({
            data: {
                email: 'elena.ruiz@gmail.com',
                password: await hashPassword('Client123!'),
                gender: 2,
                type: UserType.Client,
                name: 'Elena',
                last_name: 'Ruiz',
                url_img: 'https://i.pravatar.cc/300?img=26',
                phone: '55558009',
                created_at: randomDate(new Date('2026-01-18'), new Date('2026-01-23'))
            }
        }),
        DB.uSER.create({
            data: {
                email: 'javier.hernandez@gmail.com',
                password: await hashPassword('Client123!'),
                gender: 1,
                type: UserType.Client,
                name: 'Javier',
                last_name: 'Hernández',
                url_img: 'https://i.pravatar.cc/300?img=57',
                phone: '55558010',
                created_at: randomDate(new Date('2026-01-19'), new Date('2026-01-24'))
            }
        }),
        DB.uSER.create({
            data: {
                email: 'beatriz.navarro@gmail.com',
                password: await hashPassword('Client123!'),
                gender: 2,
                type: UserType.Client,
                name: 'Beatriz',
                last_name: 'Navarro',
                url_img: 'https://i.pravatar.cc/300?img=43',
                phone: '55558011',
                created_at: randomDate(new Date('2026-01-20'), new Date('2026-01-25'))
            }
        }),
        DB.uSER.create({
            data: {
                email: 'raul.alvarez@gmail.com',
                password: await hashPassword('Client123!'),
                gender: 1,
                type: UserType.Client,
                name: 'Raúl',
                last_name: 'Álvarez',
                url_img: 'https://i.pravatar.cc/300?img=54',
                phone: '55558012',
                created_at: randomDate(new Date('2026-01-21'), new Date('2026-01-26'))
            }
        }),
        DB.uSER.create({
            data: {
                email: 'rosa.ortiz@gmail.com',
                password: await hashPassword('Client123!'),
                gender: 2,
                type: UserType.Client,
                name: 'Rosa',
                last_name: 'Ortiz',
                url_img: 'https://i.pravatar.cc/300?img=49',
                phone: '55558013',
                created_at: randomDate(new Date('2026-01-22'), new Date('2026-01-27'))
            }
        }),
        DB.uSER.create({
            data: {
                email: 'sergio.gil@gmail.com',
                password: await hashPassword('Client123!'),
                gender: 1,
                type: UserType.Client,
                name: 'Sergio',
                last_name: 'Gil',
                url_img: 'https://i.pravatar.cc/300?img=60',
                phone: '55558014',
                created_at: randomDate(new Date('2026-01-23'), new Date('2026-01-28'))
            }
        }),
        DB.uSER.create({
            data: {
                email: 'patricia.vazquez@gmail.com',
                password: await hashPassword('Client123!'),
                gender: 2,
                type: UserType.Client,
                name: 'Patricia',
                last_name: 'Vázquez',
                url_img: 'https://i.pravatar.cc/300?img=31',
                phone: '55558015',
                created_at: randomDate(new Date('2026-01-24'), new Date('2026-01-29'))
            }
        }),
        DB.uSER.create({
            data: {
                email: 'alberto.serrano@gmail.com',
                password: await hashPassword('Client123!'),
                gender: 1,
                type: UserType.Client,
                name: 'Alberto',
                last_name: 'Serrano',
                url_img: 'https://i.pravatar.cc/300?img=70',
                phone: '55558016',
                created_at: randomDate(new Date('2026-01-25'), new Date('2026-01-30'))
            }
        }),
        DB.uSER.create({
            data: {
                email: 'monica.blanco@gmail.com',
                password: await hashPassword('Client123!'),
                gender: 2,
                type: UserType.Client,
                name: 'Mónica',
                last_name: 'Blanco',
                url_img: 'https://i.pravatar.cc/300?img=38',
                phone: '55558017',
                created_at: randomDate(new Date('2026-01-26'), new Date('2026-01-31'))
            }
        }),
        DB.uSER.create({
            data: {
                email: 'daniel.suarez@gmail.com',
                password: await hashPassword('Client123!'),
                gender: 1,
                type: UserType.Client,
                name: 'Daniel',
                last_name: 'Suárez',
                url_img: 'https://i.pravatar.cc/300?img=67',
                phone: '55558018',
                created_at: randomDate(new Date('2026-01-27'), new Date('2026-02-01'))
            }
        }),
        DB.uSER.create({
            data: {
                email: 'cristina.ramos@gmail.com',
                password: await hashPassword('Client123!'),
                gender: 2,
                type: UserType.Client,
                name: 'Cristina',
                last_name: 'Ramos',
                url_img: 'https://i.pravatar.cc/300?img=23',
                phone: '55558019',
                created_at: randomDate(new Date('2026-01-28'), new Date('2026-02-02'))
            }
        }),
        DB.uSER.create({
            data: {
                email: 'pablo.vega@gmail.com',
                password: await hashPassword('Client123!'),
                gender: 1,
                type: UserType.Client,
                name: 'Pablo',
                last_name: 'Vega',
                url_img: 'https://i.pravatar.cc/300?img=69',
                phone: '55558020',
                created_at: randomDate(new Date('2026-01-29'), new Date('2026-02-03'))
            }
        })
    ]);

    console.log(`✅ Created ${agents.length} agents and ${clients.length} clients`);

    // Crear propiedades
    console.log('🏠 Creating properties...');

    const propertyData = [
        // Propiedades de María López (Agent 1)
        {
            title: 'Casa moderna en zona residencial',
            type: PropertyType.House,
            address: 'Calle Principal #123, Zona 1, Ciudad',
            price: 3500000.00,
            description: 'Hermosa casa de 3 niveles con acabados de lujo, jardín amplio y cochera para 3 vehículos. Excelente ubicación en zona segura.',
            num_rooms: 5,
            num_bathrooms: 3,
            square_meters: 350.50,
            state: PropertyState.Available,
            zone: 1,
            id_agent: agents[0].id_user,
            images: [
                'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
                'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'
            ]
        },
        {
            title: 'Apartamento céntrico amueblado',
            type: PropertyType.Apartment,
            address: 'Avenida Central #456, Zona 10, Ciudad',
            price: 1800000.00,
            description: 'Apartamento completamente amueblado en el corazón de la ciudad. 2 habitaciones, balcón con vista panorámica.',
            num_rooms: 2,
            num_bathrooms: 2,
            square_meters: 120.00,
            state: PropertyState.Available,
            zone: 10,
            id_agent: agents[0].id_user,
            images: [
                'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
                'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'
            ]
        },
        {
            title: 'Terreno comercial esquinero',
            type: PropertyType.Land,
            address: 'Boulevard Libertad esquina 5ta Avenida, Zona 9',
            price: 2500000.00,
            description: 'Terreno comercial en esquina estratégica, ideal para desarrollos comerciales o residenciales.',
            num_rooms: 0,
            num_bathrooms: 0,
            square_meters: 500.00,
            state: PropertyState.Sold,
            zone: 9,
            id_agent: agents[0].id_user,
            images: [
                'https://images.unsplash.com/photo-1500382017468-9049fed747ef'
            ]
        },

        // Propiedades de Juan Pérez (Agent 2)
        {
            title: 'Local comercial en plaza',
            type: PropertyType.RetailSpace,
            address: 'Plaza Las Américas, Local 15, Zona 13',
            price: 950000.00,
            description: 'Local comercial en plaza de alto tráfico. Ideal para restaurante, boutique o servicios.',
            num_rooms: 0,
            num_bathrooms: 2,
            square_meters: 85.00,
            state: PropertyState.Available,
            zone: 13,
            id_agent: agents[1].id_user,
            images: [
                'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
                'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a'
            ]
        },
        {
            title: 'Casa colonial restaurada',
            type: PropertyType.House,
            address: 'Calle de los Arcos #789, Zona 1, Centro Histórico',
            price: 4200000.00,
            description: 'Casa colonial completamente restaurada conservando detalles originales. Patio central, fuente colonial.',
            num_rooms: 6,
            num_bathrooms: 4,
            square_meters: 420.00,
            state: PropertyState.Available,
            zone: 1,
            id_agent: agents[1].id_user,
            images: [
                'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
                'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
                'https://images.unsplash.com/photo-1613490493576-7fde63acd811'
            ]
        },
        {
            title: 'Apartamento de lujo con amenidades',
            type: PropertyType.Apartment,
            address: 'Torre Diamante, Piso 18, Zona 14',
            price: 2850000.00,
            description: 'Apartamento de lujo con gimnasio, piscina, salón de eventos. Seguridad 24/7.',
            num_rooms: 3,
            num_bathrooms: 2,
            square_meters: 180.00,
            state: PropertyState.NotAvailable,
            zone: 14,
            id_agent: agents[1].id_user,
            images: [
                'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2'
            ]
        },

        // Propiedades de Ana Martínez (Agent 3)
        {
            title: 'Casa campestre con piscina',
            type: PropertyType.House,
            address: 'Km 25 Carretera a El Salvador, Zona Rural',
            price: 5500000.00,
            description: 'Casa de campo con amplio terreno, piscina olímpica, rancho para eventos, caballerizas.',
            num_rooms: 7,
            num_bathrooms: 5,
            square_meters: 650.00,
            state: PropertyState.Available,
            zone: 20,
            id_agent: agents[2].id_user,
            images: [
                'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde',
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750'
            ]
        },
        {
            title: 'Apartamento estudio amueblado',
            type: PropertyType.Apartment,
            address: 'Edificio Universitario, Zona 12',
            price: 850000.00,
            description: 'Estudio ideal para estudiantes o profesionales. Completamente amueblado, internet incluido.',
            num_rooms: 1,
            num_bathrooms: 1,
            square_meters: 45.00,
            state: PropertyState.Available,
            zone: 12,
            id_agent: agents[2].id_user,
            images: [
                'https://images.unsplash.com/photo-1554995207-c18c203602cb'
            ]
        },
        {
            title: 'Terreno residencial en condominio',
            type: PropertyType.Land,
            address: 'Condominio Las Colinas, Lote 25, Zona 16',
            price: 1200000.00,
            description: 'Terreno plano en exclusivo condominio. Servicios básicos disponibles, seguridad privada.',
            num_rooms: 0,
            num_bathrooms: 0,
            square_meters: 300.00,
            state: PropertyState.Available,
            zone: 16,
            id_agent: agents[2].id_user,
            images: [
                'https://images.unsplash.com/photo-1500382017468-9049fed747ef'
            ]
        },
        {
            title: 'Local en centro comercial',
            type: PropertyType.RetailSpace,
            address: 'Centro Comercial Pradera, Nivel 2, Local 210',
            price: 1100000.00,
            description: 'Local comercial en centro comercial de alta afluencia. Baños privados, bodega.',
            num_rooms: 0,
            num_bathrooms: 1,
            square_meters: 95.00,
            state: PropertyState.Sold,
            zone: 15,
            id_agent: agents[2].id_user,
            images: [
                'https://images.unsplash.com/photo-1567449303183-e26e1b3ffed8'
            ]
        },

        // Propiedades de Roberto García (Agent 4)
        {
            title: 'Casa minimalista nueva',
            type: PropertyType.House,
            address: 'Residenciales del Valle, Casa 45, Zona 15',
            price: 4800000.00,
            description: 'Casa de diseño minimalista contemporáneo. Sistema de domótica, paneles solares, jardín zen.',
            num_rooms: 4,
            num_bathrooms: 3,
            square_meters: 380.00,
            state: PropertyState.Available,
            zone: 15,
            id_agent: agents[3].id_user,
            images: [
                'https://images.unsplash.com/photo-1600607687644-c7171b42498b',
                'https://images.unsplash.com/photo-1600585154526-990dced4db0d',
                'https://images.unsplash.com/photo-1600573472592-401b489a3cdc'
            ]
        },
        {
            title: 'Penthouse exclusivo',
            type: PropertyType.Apartment,
            address: 'Torre Ejecutiva, Penthouse, Zona 10',
            price: 6500000.00,
            description: 'Penthouse de dos niveles con terraza privada, jacuzzi, vista 360°. Acabados premium.',
            num_rooms: 4,
            num_bathrooms: 4,
            square_meters: 450.00,
            state: PropertyState.Available,
            zone: 10,
            id_agent: agents[3].id_user,
            images: [
                'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3',
                'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d'
            ]
        },
        {
            title: 'Terreno industrial',
            type: PropertyType.Land,
            address: 'Parque Industrial del Norte, Lote 8, Zona 6',
            price: 3800000.00,
            description: 'Terreno industrial con acceso a carga pesada. Ideal para bodega o fábrica.',
            num_rooms: 0,
            num_bathrooms: 0,
            square_meters: 1200.00,
            state: PropertyState.Available,
            zone: 6,
            id_agent: agents[3].id_user,
            images: [
                'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d'
            ]
        },
        {
            title: 'Oficinas corporativas',
            type: PropertyType.RetailSpace,
            address: 'Edificio Empresarial, Piso 5, Zona 10',
            price: 2200000.00,
            description: 'Oficinas corporativas listas para ocupar. 8 cubículos, sala de juntas, recepción.',
            num_rooms: 0,
            num_bathrooms: 3,
            square_meters: 250.00,
            state: PropertyState.Available,
            zone: 10,
            id_agent: agents[3].id_user,
            images: [
                'https://images.unsplash.com/photo-1497366216548-37526070297c',
                'https://images.unsplash.com/photo-1497366811353-6870744d04b2'
            ]
        },

        // Propiedades de Laura Fernández (Agent 5)
        {
            title: 'Casa de playa frente al mar',
            type: PropertyType.House,
            address: 'Playa Dorada, Km 105, Escuintla',
            price: 7200000.00,
            description: 'Casa de playa con acceso directo al mar. Diseño tropical, terraza con vista al océano, piscina infinita.',
            num_rooms: 5,
            num_bathrooms: 4,
            square_meters: 480.00,
            state: PropertyState.Available,
            zone: 25,
            id_agent: agents[4].id_user,
            images: [
                'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2',
                'https://images.unsplash.com/photo-1520763185298-1b434c919102',
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750'
            ]
        },
        {
            title: 'Apartamento con balcón amplio',
            type: PropertyType.Apartment,
            address: 'Residencial Los Álamos, Torre B, Apto 302',
            price: 1650000.00,
            description: 'Apartamento con balcón espacioso, vista a las montañas. Seguridad 24/7, parqueo techado.',
            num_rooms: 3,
            num_bathrooms: 2,
            square_meters: 145.00,
            state: PropertyState.Available,
            zone: 16,
            id_agent: agents[4].id_user,
            images: [
                'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
                'https://images.unsplash.com/photo-1493809842364-78817add7ffb'
            ]
        },
        {
            title: 'Terreno para desarrollo habitacional',
            type: PropertyType.Land,
            address: 'Carretera a San José Pinula, Km 18',
            price: 8500000.00,
            description: 'Amplio terreno ideal para desarrollo de condominios o fraccionamiento. Zona en crecimiento.',
            num_rooms: 0,
            num_bathrooms: 0,
            square_meters: 5000.00,
            state: PropertyState.Available,
            zone: 18,
            id_agent: agents[4].id_user,
            images: [
                'https://images.unsplash.com/photo-1500382017468-9049fed747ef'
            ]
        },
        {
            title: 'Local esquinero céntrico',
            type: PropertyType.RetailSpace,
            address: '6ta Avenida esquina 12 Calle, Zona 1',
            price: 3200000.00,
            description: 'Local comercial esquinero en pleno centro. Alto flujo peatonal. Ideal para farmacia o restaurante.',
            num_rooms: 0,
            num_bathrooms: 2,
            square_meters: 180.00,
            state: PropertyState.Available,
            zone: 1,
            id_agent: agents[4].id_user,
            images: [
                'https://images.unsplash.com/photo-1556912173-46c336c7fd55'
            ]
        },

        // Propiedades de Diego Rodríguez (Agent 6)
        {
            title: 'Casa en condominio cerrado',
            type: PropertyType.House,
            address: 'Condominio Vista Hermosa, Casa 12, Zona 16',
            price: 3200000.00,
            description: 'Casa en exclusivo condominio. Áreas verdes, canchas deportivas, seguridad 24/7.',
            num_rooms: 4,
            num_bathrooms: 3,
            square_meters: 280.00,
            state: PropertyState.Available,
            zone: 16,
            id_agent: agents[5].id_user,
            images: [
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
                'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea'
            ]
        },
        {
            title: 'Loft moderno en zona rosa',
            type: PropertyType.Apartment,
            address: 'Edificio SoHo, Loft 205, Zona 10',
            price: 2100000.00,
            description: 'Loft de concepto abierto con techos altos. Ubicado en zona de restaurantes y vida nocturna.',
            num_rooms: 1,
            num_bathrooms: 1,
            square_meters: 110.00,
            state: PropertyState.Available,
            zone: 10,
            id_agent: agents[5].id_user,
            images: [
                'https://images.unsplash.com/photo-1536376072261-38c75010e6c9'
            ]
        },
        {
            title: 'Terreno con vista panorámica',
            type: PropertyType.Land,
            address: 'Carretera a Las Nubes, Km 12, Santa Catarina Pinula',
            price: 1850000.00,
            description: 'Terreno con espectacular vista panorámica de la ciudad. Clima fresco, zona exclusiva.',
            num_rooms: 0,
            num_bathrooms: 0,
            square_meters: 400.00,
            state: PropertyState.Sold,
            zone: 17,
            id_agent: agents[5].id_user,
            images: [
                'https://images.unsplash.com/photo-1500382017468-9049fed747ef'
            ]
        },

        // Más propiedades distribuyendo entre agentes...
        {
            title: 'Casa familiar en zona tranquila',
            type: PropertyType.House,
            address: 'Colonia Las Rosas, Casa 78, Zona 11',
            price: 2100000.00,
            description: 'Casa ideal para familia. Cerca de escuelas y supermercados. Cochera, patio trasero.',
            num_rooms: 3,
            num_bathrooms: 2,
            square_meters: 200.00,
            state: PropertyState.Available,
            zone: 11,
            id_agent: agents[0].id_user,
            images: [
                'https://images.unsplash.com/photo-1580587771525-78b9dba3b914'
            ]
        },
        {
            title: 'Apartamento de 1 habitación',
            type: PropertyType.Apartment,
            address: 'Edificio Santa María, Apto 105, Zona 9',
            price: 980000.00,
            description: 'Apartamento pequeño pero funcional. Ideal para solteros o parejas jóvenes.',
            num_rooms: 1,
            num_bathrooms: 1,
            square_meters: 55.00,
            state: PropertyState.Available,
            zone: 9,
            id_agent: agents[1].id_user,
            images: [
                'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'
            ]
        },
        {
            title: 'Bodega comercial',
            type: PropertyType.RetailSpace,
            address: 'Zona Industrial, Bodega 45, Zona 12',
            price: 1500000.00,
            description: 'Bodega amplia con rampa de carga. Techo alto, oficinas administrativas incluidas.',
            num_rooms: 0,
            num_bathrooms: 2,
            square_meters: 350.00,
            state: PropertyState.Available,
            zone: 12,
            id_agent: agents[2].id_user,
            images: [
                'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d'
            ]
        },
        {
            title: 'Casa remodelada lista para habitar',
            type: PropertyType.House,
            address: 'Colonia El Maestro, Casa 23, Zona 5',
            price: 1750000.00,
            description: 'Casa completamente remodelada. Nuevas instalaciones eléctricas y sanitarias.',
            num_rooms: 3,
            num_bathrooms: 2,
            square_meters: 180.00,
            state: PropertyState.Available,
            zone: 5,
            id_agent: agents[3].id_user,
            images: [
                'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099'
            ]
        },
        {
            title: 'Apartamento con vista al parque',
            type: PropertyType.Apartment,
            address: 'Edificio Park View, Apto 801, Zona 14',
            price: 2450000.00,
            description: 'Apartamento con hermosa vista al parque central. Balcón amplio, cocina moderna.',
            num_rooms: 3,
            num_bathrooms: 2,
            square_meters: 165.00,
            state: PropertyState.NotAvailable,
            zone: 14,
            id_agent: agents[4].id_user,
            images: [
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
                'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'
            ]
        },
        {
            title: 'Terreno plano urbano',
            type: PropertyType.Land,
            address: 'Avenida Petapa, Zona 12',
            price: 950000.00,
            description: 'Terreno plano en zona urbana. Servicios básicos disponibles. Buena inversión.',
            num_rooms: 0,
            num_bathrooms: 0,
            square_meters: 250.00,
            state: PropertyState.Available,
            zone: 12,
            id_agent: agents[5].id_user,
            images: [
                'https://images.unsplash.com/photo-1500382017468-9049fed747ef'
            ]
        },
        {
            title: 'Local para restaurante equipado',
            type: PropertyType.RetailSpace,
            address: 'Zona Viva, Local 8, Zona 10',
            price: 2800000.00,
            description: 'Local equipado para restaurante. Cocina industrial, campana, mesas y sillas.',
            num_rooms: 0,
            num_bathrooms: 3,
            square_meters: 200.00,
            state: PropertyState.Available,
            zone: 10,
            id_agent: agents[0].id_user,
            images: [
                'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'
            ]
        },
        {
            title: 'Casa de montaña',
            type: PropertyType.House,
            address: 'Km 30 Carretera a Antigua, San Lucas',
            price: 3900000.00,
            description: 'Casa de montaña con chimenea. Ambiente acogedor, ideal para descanso.',
            num_rooms: 4,
            num_bathrooms: 3,
            square_meters: 320.00,
            state: PropertyState.Available,
            zone: 22,
            id_agent: agents[1].id_user,
            images: [
                'https://images.unsplash.com/photo-1518780664697-55e3ad937233',
                'https://images.unsplash.com/photo-1542718610-a1d656d1884c'
            ]
        },
        {
            title: 'Apartamento duplex',
            type: PropertyType.Apartment,
            address: 'Torre Los Arcos, Duplex 1502-1503, Zona 15',
            price: 3800000.00,
            description: 'Apartamento duplex de lujo. Doble altura en sala, escaleras internas de mármol.',
            num_rooms: 4,
            num_bathrooms: 3,
            square_meters: 280.00,
            state: PropertyState.Available,
            zone: 15,
            id_agent: agents[2].id_user,
            images: [
                'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3',
                'https://images.unsplash.com/photo-1600573472592-401b489a3cdc'
            ]
        },
        {
            title: 'Terreno agrícola productivo',
            type: PropertyType.Land,
            address: 'Aldea El Horizonte, Jutiapa',
            price: 1200000.00,
            description: 'Terreno agrícola con pozo de agua. Producción de maíz y frijol. Acceso por camino rural.',
            num_rooms: 0,
            num_bathrooms: 0,
            square_meters: 2500.00,
            state: PropertyState.Available,
            zone: 30,
            id_agent: agents[3].id_user,
            images: [
                'https://images.unsplash.com/photo-1500382017468-9049fed747ef'
            ]
        },
        {
            title: 'Consultorio médico equipado',
            type: PropertyType.RetailSpace,
            address: 'Centro Médico Reforma, Consultorio 310, Zona 10',
            price: 1350000.00,
            description: 'Consultorio médico completamente equipado. Sala de espera, consultorio, baño privado.',
            num_rooms: 0,
            num_bathrooms: 1,
            square_meters: 65.00,
            state: PropertyState.Available,
            zone: 10,
            id_agent: agents[4].id_user,
            images: [
                'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d'
            ]
        },
        {
            title: 'Casa con piscina en residencial',
            type: PropertyType.House,
            address: 'Villas del Sol, Casa 56, Zona 16',
            price: 4500000.00,
            description: 'Casa con piscina privada. Jardín con árboles frutales, rancho para BBQ.',
            num_rooms: 5,
            num_bathrooms: 4,
            square_meters: 400.00,
            state: PropertyState.Available,
            zone: 16,
            id_agent: agents[5].id_user,
            images: [
                'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde',
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'
            ]
        },
        {
            title: 'Apartamento económico',
            type: PropertyType.Apartment,
            address: 'Edificio Popular, Apto 205, Zona 7',
            price: 650000.00,
            description: 'Apartamento económico en buenas condiciones. Ideal para primera vivienda.',
            num_rooms: 2,
            num_bathrooms: 1,
            square_meters: 60.00,
            state: PropertyState.Available,
            zone: 7,
            id_agent: agents[0].id_user,
            images: [
                'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'
            ]
        },
        {
            title: 'Terreno en lago',
            type: PropertyType.Land,
            address: 'Orilla Lago Atitlán, Sololá',
            price: 6800000.00,
            description: 'Terreno con acceso al lago. Vista espectacular a volcanes. Zona turística exclusiva.',
            num_rooms: 0,
            num_bathrooms: 0,
            square_meters: 800.00,
            state: PropertyState.Available,
            zone: 35,
            id_agent: agents[1].id_user,
            images: [
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'
            ]
        },
        {
            title: 'Oficina corporativa pequeña',
            type: PropertyType.RetailSpace,
            address: 'Edificio Ejecutivo, Oficina 405, Zona 9',
            price: 850000.00,
            description: 'Oficina compacta ideal para startups o freelancers. Servicios básicos incluidos.',
            num_rooms: 0,
            num_bathrooms: 1,
            square_meters: 40.00,
            state: PropertyState.Available,
            zone: 9,
            id_agent: agents[2].id_user,
            images: [
                'https://images.unsplash.com/photo-1497366754035-f200968a6e72'
            ]
        },
        {
            title: 'Casa contemporánea de lujo',
            type: PropertyType.House,
            address: 'Condominio Las Luces, Villa 3, Zona 16',
            price: 8900000.00,
            description: 'Casa de diseño contemporáneo. Home theater, gimnasio privado, wine cellar, domótica completa.',
            num_rooms: 6,
            num_bathrooms: 5,
            square_meters: 750.00,
            state: PropertyState.Available,
            zone: 16,
            id_agent: agents[3].id_user,
            images: [
                'https://images.unsplash.com/photo-1613977257363-707ba9348227',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
                'https://images.unsplash.com/photo-1600573472592-401b489a3cdc'
            ]
        }
    ];

    const properties = [];
    for (const propData of propertyData) {
        const { images, ...propertyFields } = propData;
        const property = await DB.property.create({
            data: {
                ...propertyFields,
                created_at: randomDate(new Date('2026-01-10'), new Date('2026-02-05'))
            }
        });
        properties.push(property);

        // Crear imágenes para esta propiedad
        for (let i = 0; i < images.length; i++) {
            const imageUrl = images[i];
            if (imageUrl) {
                await DB.image.create({
                    data: {
                        correlative: i + 1,
                        url_img: imageUrl,
                        id_property: property.id_property
                    }
                });
            }
        }
    }

    console.log(`✅ Created ${properties.length} properties with images`);

    // Crear favoritos - Mayormente Pedro marcando propiedades de María
    console.log('⭐ Creating favorites...');
    const favorites: any[] = [];
    
    // Pedro (cliente principal) marca muchas propiedades de María como favoritas
    const mariaProperties = properties.filter(p => p.id_agent === agents[0].id_user && p.state === PropertyState.Available);
    const pedro = clients[1]; // Pedro Sánchez
    
    // Pedro marca 8 propiedades de María como favoritas
    for (let i = 0; i < Math.min(8, mariaProperties.length); i++) {
        const mariaProp = mariaProperties[i];
        if (!mariaProp) continue;
        
        const favorite = await DB.favorite.create({
            data: {
                id_client: pedro.id_user,
                id_property: mariaProp.id_property,
                created_at: randomDate(new Date('2026-01-20'), new Date('2026-02-07'))
            }
        });
        favorites.push(favorite);
    }
    
    // Otros clientes también marcan propiedades como favoritas (menos cantidad)
    for (let i = 0; i < 25; i++) {
        const randomClient = clients[Math.floor(Math.random() * clients.length)];
        const randomProperty = properties[Math.floor(Math.random() * properties.length)];
        
        if (!randomClient || !randomProperty) continue;
        
        // Evitar duplicados
        const existing = favorites.find(f => 
            f.id_client === randomClient.id_user && 
            f.id_property === randomProperty.id_property
        );
        
        if (!existing) {
            const favorite = await DB.favorite.create({
                data: {
                    id_client: randomClient.id_user,
                    id_property: randomProperty.id_property,
                    created_at: randomDate(new Date('2026-01-15'), new Date('2026-02-07'))
                }
            });
            favorites.push(favorite);
        }
    }

    console.log(`✅ Created ${favorites.length} favorites`);

    // Crear historial de visitas (records) - Pedro visitando propiedades de María principalmente
    console.log('📜 Creating visit records...');
    const records = [];
    
    // Pedro tiene un historial extenso visitando propiedades de María
    const allMariaProperties = properties.filter(p => p.id_agent === agents[0].id_user);
    for (let i = 0; i < Math.min(15, allMariaProperties.length); i++) {
        const mariaProp = allMariaProperties[i];
        if (!mariaProp) continue;
        
        const record = await DB.record.create({
            data: {
                id_client: pedro.id_user,
                id_property: mariaProp.id_property,
                created_at: randomDate(new Date('2026-01-18'), new Date('2026-02-07'))
            }
        });
        records.push(record);
    }
    
    // Pedro también visita algunas propiedades de otros agentes
    for (let i = 0; i < 10; i++) {
        const randomProperty = properties[Math.floor(Math.random() * properties.length)];
        if (randomProperty && randomProperty.id_agent !== agents[0].id_user) {
            const record = await DB.record.create({
                data: {
                    id_client: pedro.id_user,
                    id_property: randomProperty.id_property,
                    created_at: randomDate(new Date('2026-01-20'), new Date('2026-02-06'))
                }
            });
            records.push(record);
        }
    }
    
    // Otros clientes también tienen visitas
    for (let i = 0; i < 60; i++) {
        const randomClient = clients[Math.floor(Math.random() * clients.length)];
        const randomProperty = properties[Math.floor(Math.random() * properties.length)];
        
        if (!randomClient || !randomProperty) continue;
        
        const record = await DB.record.create({
            data: {
                id_client: randomClient.id_user,
                id_property: randomProperty.id_property,
                created_at: randomDate(new Date('2026-01-15'), new Date('2026-02-06'))
            }
        });
        records.push(record);
    }

    console.log(`✅ Created ${records.length} visit records`);

    // Crear invitaciones - Principalmente entre Pedro y propiedades de María
    console.log('📅 Creating invitations...');
    const invitations = [];
    
    // Razones comunes para rechazar una invitación
    const rejectionReasons = [
        'Cambio de planes',
        'Conflicto de horarios',
        'Propiedad no cumple requisitos',
        'Presupuesto insuficiente',
        'Ubicación no conveniente',
        'Ya encontré otra propiedad'
    ];

    // Pedro tiene muchas invitaciones con propiedades de María (15 invitaciones)
    const availableMariaProps = properties.filter(p => p.id_agent === agents[0].id_user && p.state === PropertyState.Available);
    
    for (let i = 0; i < Math.min(15, availableMariaProps.length); i++) {
        const property = availableMariaProps[i];
        if (!property) continue;
        
        let status: InvitationState;
        
        // Distribuir los estados
        const statusDistribution = i % 4;
        if (statusDistribution === 0) {
            status = InvitationState.Pending;
        } else if (statusDistribution === 1) {
            status = InvitationState.Acknowledge;
        } else if (statusDistribution === 2) {
            status = InvitationState.Accepted;
        } else {
            status = InvitationState.Rejected;
        }
        
        // Fechas actuales y futuras (a partir del 8 de febrero 2026)
        const createdAt = randomDate(new Date('2026-02-01'), new Date('2026-02-08'));
        const updatedAt = randomDate(createdAt, new Date('2026-02-08'));
        
        const invitationData: any = {
            id_client: pedro.id_user,
            id_property: property.id_property,
            status: status,
            created_at: createdAt,
            updated_at: updatedAt
        };

        // Agregar campos según el estado del flujo de invitación
        if (status === InvitationState.Pending) {
            invitationData.description = null;
            invitationData.expected_date = null;
            invitationData.is_accepted = null;
            invitationData.justification = null;
        } else if (status === InvitationState.Acknowledge) {
            invitationData.description = `Solicitud de visita para ${property.title}`;
            invitationData.expected_date = randomDate(new Date('2026-02-09'), new Date('2026-02-28'));
            invitationData.is_accepted = null;
            invitationData.justification = null;
        } else if (status === InvitationState.Accepted) {
            invitationData.description = `Solicitud de visita para ${property.title}`;
            invitationData.expected_date = randomDate(new Date('2026-02-10'), new Date('2026-03-05'));
            invitationData.is_accepted = 1;
            invitationData.justification = null;
        } else if (status === InvitationState.Rejected) {
            invitationData.description = `Solicitud de visita para ${property.title}`;
            invitationData.expected_date = randomDate(new Date('2026-02-09'), new Date('2026-02-20'));
            invitationData.is_accepted = 0;
            invitationData.justification = rejectionReasons[Math.floor(Math.random() * rejectionReasons.length)];
        }

        const invitation = await DB.invitation.create({
            data: invitationData
        });
        invitations.push(invitation);
    }
    
    // Otros clientes también tienen invitaciones (25 adicionales)
    for (let i = 0; i < 25; i++) {
        const randomClient = clients[Math.floor(Math.random() * clients.length)];
        const availableProperties = properties.filter(p => p.state === PropertyState.Available);
        const randomProperty = availableProperties[Math.floor(Math.random() * availableProperties.length)];
        
        if (!randomClient || !randomProperty) continue;
        
        const statusDistribution = i % 4;
        let status: InvitationState;
        
        if (statusDistribution === 0) {
            status = InvitationState.Pending;
        } else if (statusDistribution === 1) {
            status = InvitationState.Acknowledge;
        } else if (statusDistribution === 2) {
            status = InvitationState.Accepted;
        } else {
            status = InvitationState.Rejected;
        }
        
        const createdAt = randomDate(new Date('2026-01-20'), new Date('2026-02-07'));
        const updatedAt = randomDate(createdAt, new Date('2026-02-08'));
        
        const invitationData: any = {
            id_client: randomClient.id_user,
            id_property: randomProperty.id_property,
            status: status,
            created_at: createdAt,
            updated_at: updatedAt
        };

        if (status === InvitationState.Pending) {
            invitationData.description = null;
            invitationData.expected_date = null;
            invitationData.is_accepted = null;
            invitationData.justification = null;
        } else if (status === InvitationState.Acknowledge) {
            invitationData.description = `Solicitud de visita para ${randomProperty.title}`;
            invitationData.expected_date = randomDate(new Date('2026-02-09'), new Date('2026-02-25'));
            invitationData.is_accepted = null;
            invitationData.justification = null;
        } else if (status === InvitationState.Accepted) {
            invitationData.description = `Solicitud de visita para ${randomProperty.title}`;
            invitationData.expected_date = randomDate(new Date('2026-02-10'), new Date('2026-02-28'));
            invitationData.is_accepted = 1;
            invitationData.justification = null;
        } else if (status === InvitationState.Rejected) {
            invitationData.description = `Solicitud de visita para ${randomProperty.title}`;
            invitationData.expected_date = randomDate(new Date('2026-02-09'), new Date('2026-02-20'));
            invitationData.is_accepted = 0;
            invitationData.justification = rejectionReasons[Math.floor(Math.random() * rejectionReasons.length)];
        }

        const invitation = await DB.invitation.create({
            data: invitationData
        });
        invitations.push(invitation);
    }

    console.log(`✅ Created ${invitations.length} invitations`);

    console.log('🎉 Database seeding completed successfully!');
    console.log(`
    Summary:
    - 1 Admin
    - ${agents.length} Agents
    - ${clients.length} Clients
    - ${properties.length} Properties
    - ${favorites.length} Favorites
    - ${records.length} Visit Records
    - ${invitations.length} Invitations
    `);
}

main()
    .then(async () => {
        await DB.$disconnect();
    })
    .catch(async (e) => {
        console.error('❌ Error during seeding:', e);
        await DB.$disconnect();
        process.exit(1);
    });