import { FC } from 'react';

interface RoomCardProps {
	room: Room;
}

const RoomCard: FC<RoomCardProps> = ({ room }) => {
	const cardStyles = `
        flex
        flex-col
        bg-white
        text-slate-900
        w-full
        px-4
        lg:px-8
        py-8
        mt-8
        mx-auto
        rounded-lg
        bg-rose-50 hover:bg-rose-100 
        border border-slate-500
        max-w-6xl
        ${room.availability === 0 ? 'grayscale hover:bg-rose-50' : ''}
    `;

	return (
		<>
			<div className={cardStyles}>
				<div className='m-auto lg:w-full'>
					<div className='flex flex-col lg:flex-row justify-between'>
						<p className={roomPropertyStyle}>
							<strong>Name: </strong>
							<br />
							{room.name}
						</p>
						<p className={roomPropertyStyle}>
							<strong>Type: </strong>
							<br />
							{room.type}
						</p>
						<p className={roomPropertyStyle}>
							<strong>Max Occupancy: </strong>
							<br />
							{room.max_occupancy}
						</p>
						<p className={roomPropertyStyle}>
							<strong>Min Occupancy: </strong>
							<br />
							{room.min_occupancy}
						</p>
						<p className={roomPropertyStyle}>
							<strong>Availability: </strong>
							<br />
							{room.availability ? room.availability : 'sold out'}
						</p>
						<p className={roomPropertyStyle}>
							<strong>Price: </strong>
							<br />
							{room.price?.price}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

const roomPropertyStyle = `mb-4 lg:w-1/6 lg:mb-0`;

export default RoomCard;
