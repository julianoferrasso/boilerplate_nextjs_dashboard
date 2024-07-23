import Modal from 'react-modal';
import { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { api } from '@/lib/utils';

// Esquema de validação
const schema = z.object({
    profilePicture: z.instanceof(File).optional(),
});


export default function ChangePictureProfileModal({ isOpen, onRequestClose, onPhotoUpload }: any) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const editorRef = useRef<AvatarEditor | null>(null);
    const [scaleAVatar, setScaleAvatar] = useState(1)

    const { handleSubmit, control, setValue, reset } = useForm({
        resolver: zodResolver(schema),
    });

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            setValue('profilePicture', event.target.files[0]);
        }
    };

    function handleClose() {
        reset();
        setSelectedFile(null);
        onRequestClose();
    };

    function handleSacale(event: React.ChangeEvent<HTMLInputElement>) {
        const scale = parseFloat(event.target.value)
        setScaleAvatar(scale)
        console.log(scale)
    };

    async function handleUpdateProfilePhoto(photoData: string) {
        try {
            //https://www.youtube.com/watch?v=6dxngWXxgb4

            // - quero que adapte o meu codigo para continuar usando o react-hook-form e 
            // - inclua o zod para fazer o schema e que tenha dois submits independente um do outro, 
            // - um que seja para a alteração de nome email e celular e 
            // - outro para o upload da foto e 
            // - quero tambem que ao selecionar uma foto seja exibido um modal para o usuario posicionar a 
            // foto num quadrado que ira recortar somente a parte selecionada
            // set isLoading
            const response = await api.post('/user/updateuseravatar', { avatar: photoData });

            // pegar a nova url e setar no avatar e atualizar o avatar do estado
            // https://www.youtube.com/watch?v=NZElg91l_ms
            if (response.status !== 200) {
                throw new Error('Erro ao atualizar a foto de perfil');
            }

            console.log('Foto de perfil atualizada com sucesso');
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const onSubmit = () => {
        if (editorRef.current) {
            const canvas = editorRef.current.getImageScaledToCanvas().toDataURL();
            onPhotoUpload(canvas);
            handleUpdateProfilePhoto(canvas);
            handleClose();
        }
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
                        <div>
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

                            <input
                                type="range"
                                name="sacle"
                                defaultValue={1}
                                step={0.01}
                                min={0.5}
                                max={2}
                                onChange={handleSacale}
                                className='w-full mt-4'
                            />
                        </div>
                    ) : (
                        <div>
                            <input type="file" onChange={handleFileChange} />
                        </div>
                    )}
                </div>
                {/* Footer - botoes de Cancelar e Alterar foto */}
                <div className='flex items-center justify-center gap-4 mt-4'>
                    <button
                        onClick={handleClose}
                        className="bg-zinc-500 text-white py-2 px-4 rounded"
                    >
                        <span className='text-white text-md'>Cancelar</span>
                    </button>
                    <button
                        onClick={handleSubmit(onSubmit)}
                        className=" bg-blue-500 py-2 px-4 rounded text-text-primary"
                    >
                        <span className='text-white text-md'>Alterar</span>
                    </button>

                </div>
            </div>
        </Modal>
    );
};