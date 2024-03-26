interface Availability {
	id: number;
	available: number;
	total: number;
}

interface Price {
	value: number;
	currency_id: number;
	currency_iso_code: string;
	currency_exponent: number;
	price: string;
}

interface Room {
	id: number;
	sort_order: number;
	type_id: number;
	max_occupancy: number;
	min_occupancy: number;
	number_of_nights: number;
	type: string;
	name: string;
	facilities?: string[];
	availability?: number;
	price?: Price;
}
