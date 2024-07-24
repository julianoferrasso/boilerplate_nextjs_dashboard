// adicionar forma de escolher outra foto no modal
// desabilitar botoes no isUploading
// tratar tamanho da foto, ela fica maior do que o arquivo original

import Modal from 'react-modal';
import { useState, useRef, useContext } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { api } from '@/lib/utils';
import { toast } from 'react-toastify';
import { AuthContext } from '@/contexts/AuthContext';

// Esquema de validação
const schema = z.object({
    profilePicture: z.instanceof(File).optional(),
});

export default function ChangePictureProfileModal({ isOpen, onRequestClose, user }: any) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const editorRef = useRef<AvatarEditor | null>(null);
    const [scaleAVatar, setScaleAvatar] = useState(1)
    const [isUploading, setIsUploading] = useState(false)

    const { updateUser } = useContext(AuthContext)

    const { handleSubmit, control, setValue, reset } = useForm({
        resolver: zodResolver(schema),
    });

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            setValue('profilePicture', event.target.files[0]);
        }
    };

    function handleSacale(event: React.ChangeEvent<HTMLInputElement>) {
        const scale = parseFloat(event.target.value)
        setScaleAvatar(scale)
    };

    function handleClose() {
        reset();
        setSelectedFile(null);
        onRequestClose();
    };

    async function handleUpdateProfilePhoto(photoBlob: Blob) {
        setIsUploading(true)
        try {
            console.log("isUploading true = ", isUploading)
            const formData = new FormData();
            formData.append('profilePicture', photoBlob, 'profilePicture.jpg');
            formData.append('userId', user.id);

            const response = await api.put('/user/updateprofilepicture', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            updateUser({ avatarUrl: response.data.avatarUrl })

        } catch (error: any) {
            console.error('Erro:', error.response.data.message);
        } finally {
            setIsUploading(false)
            console.log("isUploading false = ", isUploading)
        }
    }

    async function onSubmit() {
        setIsUploading(true)
        try {
            if (editorRef.current) {
                // Converte o canvas para Blob
                // Obtem a imagem com a resolucao do canvas (200px X 200px)
                // const canvas = editorRef.current.getImageScaledToCanvas();

                // Pega o canvas original do AvatarEditor
                const canvas = editorRef.current.getImage();
                canvas.toBlob(async (blob: Blob | null) => {

                    if (blob) {
                        await handleUpdateProfilePhoto(blob);
                        handleClose();
                    }
                }, 'image/jpg', 0.1);
            }
        } catch (error) {
            console.log("Algo deu errado.", error);
        }
    };

    const showToast = () => {
        toast.success('A foto foi clicada!', {
            position: "top-center",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    };

    function handleClickFileInputDiv() {
        const fileInput = document.getElementById('inputFile');
        if (fileInput) {
            fileInput.click(); // Aciona o clique no input de arquivo
        }
    };
    const handleOpenGalleryAgain = () => {
        setSelectedFile(null);
        handleClickFileInputDiv()
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            className="flex items-center justify-center h-screen"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <div className="bg-bg-tertiary border-2 ring-2 ring-zinc-500 rounded-sm shadow-lg p-4 h-[450px] w-[350px] sm:w-[450px] md:w-[590px] flex items-center justify-center flex-col">
                {/* Header - Titulo de Alterar foto */}
                {/* <div className='flex items-center justify-center'>
                    <span className="text-2xl mb-4 text-text-primary">Foto de perfil</span>
                </div> */}
                {/* Corpo - Avatar Editor */}
                <div className='bg-bg-primary flex flex-col items-center justify-center h-[400px] w-[350px] sm:w-[450px] md:w-[590px] border-t-1 border-b-1 border-zinc-500 dark:border-zinc-200'>
                    {selectedFile ? (
                        <div className='flex flex-col'>
                            <AvatarEditor
                                ref={editorRef}
                                image={selectedFile}
                                width={200}
                                height={200}
                                border={50}
                                borderRadius={100} // Tornar o recorte em círculo
                                color={[155, 155, 155, 0.6]}
                                scale={scaleAVatar}
                            />
                            <div className='flex flex-row items-center justify-between mt-2'>
                                <input
                                    type="range"
                                    name="sacle"
                                    defaultValue={1}
                                    step={0.01}
                                    min={0.5}
                                    max={2}
                                    onChange={handleSacale}
                                    className='w-44'
                                />
                                <div className='border-2 border-blue-600 rounded-2xl px-2 py-1 cursor-pointer'
                                    onClick={handleOpenGalleryAgain}
                                >
                                    <span>Abrir galeria</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-[450px] w-[350px] sm:w-[450px] md:w-[590px]  cursor-pointer"
                            onClick={handleClickFileInputDiv}
                        >
                            <input
                                type="file"
                                accept="image/jpeg, image/jpg, image/png"
                                onChange={handleFileChange}
                                className="hidden"
                                id="inputFile"
                            />
                            <div className='border-2 border-blue-600 rounded-2xl p-3'>
                                <span className="text-text-primary">Abrir galeria</span>
                            </div>
                        </div>
                    )}

                </div>
                {/* Footer - botoes de Cancelar e Alterar foto */}
                <div className='flex items-center justify-center gap-4 mt-4'>
                    <button
                        onClick={handleClose}
                        className="bg-zinc-500 text-white py-2 px-4 rounded"
                        disabled={isUploading}
                    >
                        <span className='text-white text-md'>Cancelar</span>
                    </button>
                    <button
                        onClick={handleSubmit(onSubmit)}
                        className=" bg-blue-500 py-2 px-4 rounded text-text-primary"
                        disabled={isUploading}
                    >
                        <span className='text-white text-md'>Alterar</span>
                    </button>
                </div>
            </div>
        </Modal>
    );
};