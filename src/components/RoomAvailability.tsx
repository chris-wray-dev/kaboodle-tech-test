import { FC, useEffect, useState } from 'react';
import RoomCard from './RoomCard';
import availabilityData from '../../public/accommodation_availability.json';

interface RoomAvailabilityProps {
	accommodation: Accommodation | undefined;
}

const RoomAvailability: FC<RoomAvailabilityProps> = ({ accommodation }) => {
	const [rooms, setRooms] = useState<Room[]>([]);

	useEffect(() => {
		if (!accommodation) {
			return;
		}

		// map/merge availability data with rooms data
		const rooms =
			[...accommodation.rooms].map((room) => {
				const availability =
					availabilityData.rooms.find(
						(available) => room.id === available.id
					)?.available || 0;
				return {
					...room,
					availability,
				};
			}) || null;

		setRooms(rooms);
	}, [accommodation]);

	return accommodation ? (
		<div className='w-full flex flex-col justify-center mb-8'>
			<h2>
				<strong>{accommodation.name}</strong>
			</h2>

			{rooms.map((room, i) => {
				return <RoomCard key={i} room={room} />;
			})}
		</div>
	) : (
		<p>loading...</p>
	);
};

export default RoomAvailability;
