import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import Button from '@/components/Button';
import { TINY_API_LOGOUT } from '@/constants/url';
import IsAuthenticated from '@/hooks/isAuthenticated';

import DownArrowIcon from '../icons/downArrow';
import LoginModal from '../LoginModal';
import ProfileIcon from '../ProfileIcon/ProfileIcon';

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

    const { isLoggedIn: isAuth, userData } = IsAuthenticated();

    useEffect(() => {
        setIsLoggedIn(isAuth);
        if (userData) {
            const username = userData.Username;
            const [first, last] = username.split(' ');
            setFirstName(first);
            setLastName(last);
        }
    }, [isAuth, userData]);

    return (
        <>
            <nav className="bg-gray-800 p-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-white text-2xl font-bold">
                        URL Shortener
                    </Link>

                    <ul className={'lg:flex space-x-4'}>
                        <li className="relative group">
                            {isLoggedIn ? (
                                <Button
                                    type="button"
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className="text-white focus:outline-none"
                                >
                                    <div className="flex items-center space-x-2">
                                        <ProfileIcon firstName={firstName} lastName={lastName} size={50} />
                                        <span> {firstName}</span>
                                        <DownArrowIcon />
                                    </div>
                                </Button>
                            ) : (
                                <Button
                                    className="flex items-center space-x-2  text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-700"
                                    data-testid="google-login"
                                    onClick={() => setShowLoginModal(true)}
                                >
                                    <span>Sign In</span>
                                </Button>
                            )}
                        </li>
                        <ul
                            className={`${
                                menuOpen ? 'block' : 'hidden'
                            } absolute top-[8vh] right-0 bg-gray-800 p-2 z-10`}
                        >
                            <li>
                                <Link href="#" className="text-white hover:bg-gray-700 block px-4 py-2">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href={TINY_API_LOGOUT} className="text-white hover:bg-gray-700 block px-4 py-2">
                                    Sign Out
                                </Link>
                            </li>
                        </ul>
                    </ul>
                </div>
            </nav>
            {showLoginModal && (
                <LoginModal
                    onClose={() => setShowLoginModal(false)}
                    children={
                        <>
                            <p className="text-white text-center mb-4">Sign to your account</p>
                        </>
                    }
                />
            )}
        </>
    );
};

export default Navbar;
