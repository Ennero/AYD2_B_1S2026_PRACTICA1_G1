import DB from '../../db/db.ts'
import { hashPassword } from '../../lib/security.ts'
import { normalizeEmail } from '../../utils/strings.ts'
import { UserType } from '../../store/enums.ts'

export type UpdateClientInput = {
	id_user?: number
	name?: string
	last_name?: string,
    gender?: string,
	phone?: string
	email?: string
	url_img?: string | null
	password?: string
}

export class ClientService {
	// =============================== DAVID ===============================
	async getprofile(id_user : number) {
        console.log('Getting profile for user id:', id_user)  
        // Casteo de sting a numero, por si acaso
        id_user = Number(id_user)
        const user = await DB.uSER.findUnique({
            where: { id_user: id_user },
            select: { id_user: true, name: true, last_name: true, gender: true, phone: true, email: true, url_img: true, password: true },
        })

        if (!user){
            throw new Error('User not found')
        }
		return {
            id_user: user.id_user,
            name: user.name,
            last_name: user.last_name,
            gender: (Number(user.gender) === 1)? 'Male' : 'Female',
            phone: user.phone, 
            email: user.email,
            url_img: user.url_img,
            password: user.password
        }
	}

    async updateProfile(clientid: number, input: UpdateClientInput) {
		if (input.id_user !== undefined && Number(input.id_user) !== clientid) {
			throw new Error('id_user in body does not match :id param')
		}

		const existingClient = await DB.uSER.findUnique({
			where: { id_user: clientid },
			select: { id_user: true, name: true, last_name:true, gender: true, phone:true, email: true, url_img: true, password: true, type: true },
		})

		if (!existingClient) throw new Error('Client not found')

		let normalizedEmail = "";
		if (input.email !== undefined) {
			normalizedEmail = normalizeEmail(input.email)

			const emailOwner = await DB.uSER.findUnique({
				where: { email: normalizedEmail },
				select: { id_user: true },
			})

			if (emailOwner && emailOwner.id_user !== clientid) {
				throw new Error('Email already registered')
			}
		}

		const updated = await DB.uSER.update({
			where: { id_user: clientid },
			data: {
				...(input.name !== undefined ? { name: input.name } : {}),
				...(input.last_name !== undefined ? { last_name: input.last_name } : {}),
                ...(input.gender !== undefined ? { gender: (input.gender.toLowerCase() === 'male' ? 1 : 2) } : {}),
				...(input.phone !== undefined ? { phone: String(input.phone) } : {}),
                ...(input.email !== undefined ? { email: normalizedEmail } : {}),
				...(input.url_img !== undefined ? { url_img: input.url_img } : {}),
                ...(input.password !== undefined ? { password: await hashPassword(input.password) } : {}),
				type: UserType.Client,
			},
			select: { id_user: true },
		})

		return {
			message: 'Cliente editado con exito',
			id_user: updated.id_user,
		}
	}

	async propertiesfavorite(id_user: number) {
		console.log('Getting profile for user id:', id_user);  
		id_user = Number(id_user);

		const properties = await DB.favorite.findMany({
			where: { id_client: id_user },
			include: { property: true}
		})

		if (!properties){
			throw new Error('No favorite properties found for this user')
		}

		return properties.map(fav => ({
			id_favorite: fav.id_favorite,
			title: fav.property.title,
			price: fav.property.price,
			num_rooms: fav.property.num_rooms,
			num_bathrooms: fav.property.num_bathrooms,
			square_meters: fav.property.square_meters,
			address: fav.property.address,
			id_property: fav.id_property
		}))

	}

	async deletepropertiesfavorites(id_user: number, id_favorite: number) {
		id_user = Number(id_user);
		id_favorite = Number(id_favorite);

		const deleteFavorite = await DB.favorite.deleteMany({
			where: { id_favorite: id_favorite, id_client: id_user }
		})

		if (deleteFavorite.count === 0) {
			throw new Error('Favorite property not found for this user')
		}

		return {
			message: 'Favorite property deleted successfully',
			id_favorite: id_favorite
		}
	}

	async getpropertybyid(id_user: number, id_property: number) {
		id_user = Number(id_user);
		id_property = Number(id_property);

		const property = await DB.property.findUnique({
			where: { id_property: id_property },
			include: {
				image: true,
				// Traemos al agente directamente (asumiendo que la relación se llama USER)
				USER: true, 
				// Traemos el favorito solo si coincide con este usuario
				favorite: {
					where: { id_client: id_user }
				}
			}
		});

		if (!property) throw new Error('Property not found');

		return {
			id_property: property.id_property,
			title: property.title,
			address: property.address,
			price: property.price,
			description: property.description,
			zone: property.zone,
			num_rooms: property.num_rooms,
			num_bathrooms: property.num_bathrooms,
			square_meters: property.square_meters,
			type: property.type,
			image: property.image.map(img => img.url_img),
			already_in_favorite: property.favorite.length > 0,
			estate_agent: property.USER.name,
		}
	}

	async addpropertytofavorite(id_user: number, id_property: number) {
		id_user = Number(id_user);
		id_property = Number(id_property);

		const existingFavorite = await DB.favorite.findFirst({
			where: { id_client: id_user, id_property: id_property }
		})

		if (existingFavorite) {
			throw new Error('Property already in favorites')
		}

		// Anadimos creando la tabla de favoritos
		const newFavorite = await DB.favorite.create({
			data: {
				created_at: new Date().toISOString(),
				id_client: id_user,
				id_property: id_property
			}
		})

		return {
			message: 'Propiedad añadida a favoritos',
			id_favorite: newFavorite.id_favorite
		}
	}
	// =============================== DAVID ===============================
}