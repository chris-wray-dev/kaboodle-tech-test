import Image from 'next/image';
import { FC } from 'react';

interface AccommodationCardProps {
	accommodation: Accommodation;
	handleModalOpen(accommodation: Accommodation): void;
}

const AccommodationCard: FC<AccommodationCardProps> = ({
	accommodation,
	handleModalOpen,
}) => {
	// opens modal when availability button clicked
	const handleClick = () => {
		handleModalOpen(accommodation);
	};

	return (
		<>
			<div className={cardStyles}>
				<div className='flex flex-col lg:flex-row justify-between'>
					<div className='lg:w-2/6 lg:mr-8'>
						<Image
							src={accommodation.images[0].filename}
							alt={accommodation.images[0].alt}
							width={500}
							height={500}
							className='my-4 rounded-lg'
						/>
					</div>
					<div className='flex flex-col lg:w-4/6 py-4 rounded-lg bg-white p-4'>
						<h2>
							<strong>{accommodation.name}</strong>
						</h2>
						<div className='flex flex-row'>
							{accommodation.rating.map((star, i) => {
								return (
									<p className='text-rose-600' key={i}>
										{star}
									</p>
								);
							})}
						</div>

						<p
							className='my-4'
							dangerouslySetInnerHTML={{
								__html: accommodation.description,
							}}
						></p>
					</div>
				</div>
				<div className='w-full flex justify-center my-8'>
					<button
						className='bg-rose-500 text-white px-4 py-2 w-96 rounded hover:bg-rose-600'
						onClick={handleClick}
					>
						{`See availability >`}
					</button>
				</div>

				<ul className='flex flex-row flex-wrap justify-center'>
					{accommodation.facilities.map((facility, i) => {
						return (
							<li key={i} className='flex flex-row'>
								{facility}
								{i < accommodation.facilities.length - 1 ? (
									<p className='mx-2'>
										<strong>{' | '}</strong>
									</p>
								) : null}
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
};

const cardStyles = `
	flex
	flex-col
	bg-white
	text-slate-900
	w-5/6
	px-4
	lg:px-8
	py-8
	mt-8
	mx-auto
	max-w-6xl
	rounded-lg
	bg-rose-50 hover:bg-rose-100 
	border border-slate-500
`;

export default AccommodationCard;
