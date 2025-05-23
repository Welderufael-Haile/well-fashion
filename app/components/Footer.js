import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTelegram, FaLinkedin } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';

// Removed duplicate Footer component

const Footer = () => {
    return (
        <footer className="flex flex-col justify-around p-5 bg-gray-800 text-white">
            <div className="flex flex-col md:flex-row justify-around p-5 bg-gray-800 text-white"  >
            <div className="flex-1 text-center mb-5 md:mb-0">
                <h3 className="text-lg font-semibold">Contact Us</h3>
                <p>Email: <Link href="mailto:rufaelhail14@gmail.com" className=" hover:underline">rufaelhail14@gmail.com</Link></p>
                <p>Phone: <Link href="tel:+215984999493" className=" hover:underline">+215 984 999 493</Link></p>
            </div>
            <div className="flex-1 text-center mb-5 md:mb-0">
                <h3 className="text-lg font-semibold">Quick Navigation</h3>
                <ul className="list-none p-0">
                    <li className="mb-2 hover:underline"><Link href="/">Home</Link></li>
                    <li className="mb-2 hover:underline"><Link href="/about">AboutUs</Link></li>
                    <li className="mb-2 hover:underline"><Link href="/contact">Contact</Link></li>
                </ul>
            </div>
            <div className="flex-1 text-center">
                <h3 className="text-lg font-semibold pb-5">Follow Us</h3>
                <div className="flex justify-center gap-4">
                    <Link href="https://facebook.com"target="_blank" rel="noopener noreferrer"><FaFacebook size={30} /></Link>
                    <Link href="https://telegram.org" target="_blank" rel="noopener noreferrer"><FaTelegram size={30} /></Link>
                    <Link href="https://linkedin.com"target="_blank" rel="noopener noreferrer"><FaLinkedin size={30} /></Link>
                </div>
            </div>
        </div>
            <div className='border-t mx-10'>
                <h1 className='pt-3 text-center'>Developed By Welderufael haile </h1>
            </div>
        </footer>
    );
};

export default Footer;