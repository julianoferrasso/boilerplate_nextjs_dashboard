"use client"

import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";

import ChangePictureProfileModal from './components/ChangePictureProfileModal';
import { UserForm } from "./components/UserForm";
import { AvatarProfile } from "./components/AvatarProfile";

export default function Profile() {
    const { user } = useContext(AuthContext)
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleOpenModalChangePicture() {
        setIsModalOpen(true);
    };

    function handleCloseModalChangePicture() {
        setIsModalOpen(false);
    };


    return (
        <div className="bg-bg-primary w-full h-full">
            <ChangePictureProfileModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModalChangePicture}
            />

            {/* Header */}
            <div className="bg-indigo-400 dark:bg-indigo-700 h-32 flex items-center justify-center">

                {/* Profile picture */}
                <AvatarProfile
                    user={user}
                    handleOpenModalChangePicture={handleOpenModalChangePicture}
                />
            </div>

            {/* Form de update perfil */}
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 ml-4 text-text-primary">Meu perfil</h1>
                <UserForm />
            </div>

        </div >
    )
}