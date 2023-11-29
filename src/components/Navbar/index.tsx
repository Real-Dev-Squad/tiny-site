import Link from 'next/link';
import React, { useState } from 'react';

import LoginModal from '@/components/LoginModal';
import NavbarMenuItems from '@/components/Navbar/NavbarMenuItems';
import UserProfileButton from '@/components/Navbar/UserProfileButton';
import UserLoginShimmer from '@/components/ShimmerEffect/UserLoginShimmer';
import useAuthenticated from '@/hooks/useAuthenticated';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const { isLoggedIn, isLoading, userData } = useAuthenticated();

    const userName = userData?.data?.userName || 'User';
    const [firstName, lastName] = userName.split(' ');

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    };

    const renderUserProfile = () => {
        if (isLoading) {
            return <UserLoginShimmer />;
        }

        return (
            <UserProfileButton
                isLoggedIn={isLoggedIn}
                firstName={firstName}
                lastName={lastName}
                handleMenuClick={handleMenuClick}
                setShowLoginModal={setShowLoginModal}
            />
        );
    };

    return (
        <>
            <nav className="bg-gray-900 p-4 h-[8vh]">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-white text-2xl font-bold">
                        URL Shortener
                    </Link>

                    <ul className="lg:flex space-x-4">
                        <li className="relative group">{renderUserProfile()}</li>
                        <NavbarMenuItems menuOpen={menuOpen} />
                    </ul>
                </div>
            </nav>
            {showLoginModal && (
                <LoginModal
                    onClose={() => setShowLoginModal(false)}
                    children={<p className="text-white text-center mb-4">Sign to your account</p>}
                />
            )}
        </>
    );
};

export default Navbar;
