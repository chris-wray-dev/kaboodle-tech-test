import React, { useState, FC, useEffect, ReactElement } from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	content?: ReactElement;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, content }) => {
	const [modalOpen, setModalOpen] = useState<boolean>(isOpen);

	useEffect(() => {
		setModalOpen(isOpen);
	}, [isOpen]);

	return (
		<>
			{modalOpen && (
				<div className={modalContainerStyles}>
					<div
						className={modalStyles}
						onClick={(e) => e.stopPropagation()}
					>
						{content}

						<div className='w-full flex justify-center my-8'>
							<button
								className='bg-rose-500 text-white px-4 py-2 w-96 rounded hover:bg-rose-600'
								onClick={onClose}
							>
								{`Close`}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

const modalContainerStyles = `
    fixed 
    inset-0 
    z-50 
    overflow-auto 
    bg-black 
    bg-opacity-50 
    flex 
    items-center 
    justify-center
	w-full
	text-slate-900
`;

const modalStyles = `
    bg-white 
    p-8 
    rounded-lg 
    w-full
    max-w-6xl
	text
	max-h-full
	overflow-auto
`;

export default Modal;
