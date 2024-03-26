import { ChangeEvent, FC, useEffect, useState } from 'react';
import AccommodationCard from '@/components/AccommodationCard';
import accommodtionData from '../../public/accommodation.json';
import Modal from '@/components/Modal';
import RoomAvailability from '@/components/RoomAvailability';

/**
 * outside FC for rendering efficiency
 * @param filter
 * @param accommodations
 * @returns an array of filtered accomodations
 */
const filterByName = (
	filter: String,
	accommodations: Accommodation[]
): Accommodation[] => {
	return [...accommodations].filter((accommodation) => {
		return accommodation.name.toLowerCase().includes(filter.toLowerCase());
	});
};

const AccommodationSearch: FC = () => {
	// keep an unsorted, unfiltered copy of the original data
	const [accommodations, setAccommodations] = useState<Accommodation[]>([]);

	// have a separate store for filtered/sorted results
	const [filteredAccommodations, setFilteredAccommodations] = useState<
		Accommodation[]
	>([]);

	const [modalOpen, setModalOpen] = useState<boolean>(false);

	// store the selected accommodation when clicked
	const [selectedAccommodation, setSelectedAccomodation] = useState<
		Accommodation | undefined
	>();

	const handleModalClose = () => {
		setModalOpen(false);

		// enable background scrolling when modal closed
		document.body.setAttribute('style', 'overflow: auto');
	};

	const handleModalOpen = (accommodation: Accommodation) => {
		setModalOpen(true);
		setSelectedAccomodation(accommodation);

		// prevent background scrolling when in modal
		document.body.setAttribute('style', 'overflow: hidden');
	};

	const handleFilter = (event: ChangeEvent<HTMLInputElement>): void => {
		const filteredAccommodations = [
			...filterByName(event.target.value, accommodations),
		];
		setFilteredAccommodations([...filteredAccommodations]);
	};

	useEffect(() => {
		// map data to match front end structure
		const mappedAccommodations: Accommodation[] =
			accommodtionData.accommodations.map((accommodation) => {
				return {
					name: accommodation.name,
					description: accommodation.description,
					type: accommodation.type.name,
					facilities: accommodation.facilities.map(
						(facility) => facility.label
					),
					images: accommodation.images,
					rooms: accommodation.rooms.map((room) => {
						let price: Price;

						if ('price' in room) {
							price = room.price as Price;
						} else {
							price = {
								value: 0,
								currency_id: 0,
								currency_iso_code: 'not available',
								currency_exponent: 0,
								price: 'not available',
							};
						}
						return {
							id: room.id,
							sort_order: room.sort_order,
							type_id: room.type_id,
							max_occupancy: room.max_occupancy,
							min_occupancy: room.min_occupancy,
							number_of_nights: room.number_of_nights,
							type: room.type,
							name: room.name,
							price,
						};
					}),

					// creates an array of stars for the rating
					rating: Array.from(
						{ length: accommodation.rating.id },
						() => '★'
					),
				};
			});

		setAccommodations([...mappedAccommodations]);
		setFilteredAccommodations([...mappedAccommodations]);
	}, []);

	return (
		<div
			className={`w-screen flex flex-col content-center m-auto bg-white ${
				modalOpen ? 'overflow-hidden h-screen' : ''
			}`}
		>
			<Modal
				isOpen={modalOpen}
				onClose={handleModalClose}
				content={
					<RoomAvailability accommodation={selectedAccommodation} />
				}
			/>
			<input
				className={inputStyles}
				id='filter'
				type='text'
				name='name'
				placeholder='filter by name'
				onChange={handleFilter}
			/>
			{filteredAccommodations.length ? (
				filteredAccommodations.map((accommodation, i) => {
					return (
						<AccommodationCard
							key={i}
							accommodation={accommodation}
							handleModalOpen={handleModalOpen}
						/>
					);
				})
			) : (
				<p className='text-black m-auto my-10'>no results</p>
			)}
		</div>
	);
};

const inputStyles = `
	w-full
	md:w-1/2 
	rounded-md 
	py-2
	pl-8
	focus:outline-none focus:ring focus:border-rose-500
	text-black
	m-auto
	mt-8
	bg-rose-100
`;

export default AccommodationSearch;
