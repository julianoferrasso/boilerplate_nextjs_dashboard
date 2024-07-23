import Modal from 'react-modal';
import { useState } from 'react';

export default function ProfilePictureModal({ isOpen, onRequestClose, onPhotoUpload, currentPhoto }: any) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event: any) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        onPhotoUpload(selectedFile);
        onRequestClose();
    };



    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="flex items-center justify-center h-screen"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        // contentLabel={contentLabel}
        >
            <div className="bg-bg-tertiary border-2 ring-2 ring-indigo-500 dark:ring-blue-700 rounded-sm shadow-lg p-4 h-96 w-[350px] sm:w-[450px] md:w-[590px] flex items-center justify-center flex-col">
                <div className='flex items-center justify-center'>
                    <span className="text-2xl mb-4 text-text-primary">Foto de perfil</span>
                </div>
                <div className='flex items-center justify-center h-64 w-[330px] sm:w-[430px] md:w-[570px] bg-green-800'>
                    BOX para selecionar foto
                </div>
                <button
                    onClick={onRequestClose}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Alterar
                </button>
            </div>
        </Modal>
    );
};
