"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './_footer.module.css';
import { faFacebook, faTwitter, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

export function Footer() {
    return (
        <>
            <nav className={`w-full py-10 bg-indigo-600 top-0 left-0 right-0 z-10 text-white text-sm`}>
                <div className='max-w-5xl mx-auto'>
                    <div className="grid grid-cols-3 gap-4">
                        <div className='text-center'>
                            <div>
                                <a href="#" className='mx-1'><FontAwesomeIcon icon={faFacebook} size="lg" /></a>
                                <a href="#" className='mx-1'><FontAwesomeIcon icon={faTwitter} size="lg" /></a>
                                <a href="#" className='mx-1'><FontAwesomeIcon icon={faYoutube} size="lg" /></a>
                                <a href="#" className='mx-1'><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
                            </div>
                            <div><span className='cursor-pointer'>Terms and Conditions</span></div>
                            <div><span>LoginApp 1.0.0</span></div>
                            <div className='text-sm italic'><FontAwesomeIcon icon={faCopyright} /> Copyright Kamikami 2023</div>
                        </div>
                        <div className='text-center'>
                            <div className='font-bold'>Products</div>
                            <div><Link href="#">Item 1</Link></div>
                            <div><Link href="#">Item 2</Link></div>
                            <div><Link href="#">Item 3</Link></div>
                        </div>
                        <div className='text-center'>
                            <div>+63 9XX XXX XXXX</div>
                            <Link href="/contactus">support@kamikami.com</Link>
                            <div className='italic'>1234 Hidden Leaf Soul Society City, Skypiea, 0000</div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}