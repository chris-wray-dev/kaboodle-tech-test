interface Image {
	alt: string;
	title: string;
	filename: string;
}

interface Accommodation {
	name: string;
	description: string;
	type: string;
	facilities: string[];
	images: Image[];
	rooms: Room[];
	rating: string[];
}
