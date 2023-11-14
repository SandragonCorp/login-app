"use client"

import { FullContainer } from "@/app/components/_full_container";
import style from "./about.module.css";
import { DeveloperCard } from "@/app/components/_developer_card";
import { ServicesCard } from "@/app/components/_services_card";
import { ExpectFromUs } from "@/app/components/_expect_from_us_card";
import { destroyInteractionObserver, initInteractionObserver } from "@/app/scripts/interaction_observer";
import { useEffect } from 'react'

export default function Page() {
    useEffect(() => {
        initInteractionObserver();

        return () => {
            destroyInteractionObserver();
        };
    }, []);

    return (
        <>
            <FullContainer bgImageSrc='/images/sunset.jpg' className="text-center">
                <div className={`page-title-xl pt-24 pb-8 observable observable-animate-opacity`}>Kamikami</div>
                <div className={`observable observable-animate-opacity observable-animate-translateFromBottom`}>
                    <div className="page-title-brief-description">" Where the beat go? "</div>
                    <div className="page-title-brief-description">" &lt;Insert 808 here&gt; "</div>
                    <div className="page-title-brief-description">" Oh, ain't that somethin'? "</div>
                    <div className="page-title-brief-description">" Drums came in, you ain't see that comin' "</div>
                </div>
            </FullContainer>
            <FullContainer className="text-center bg-blue-100">
                <div className={`page-title-lg pt-10 pb-8 observable observable-animate-opacity observable-animate-translateFromBottom`}>Our Services</div>
                <div className={`flex justify-center left-0 right-0 mx-auto max-w-screen-lg`}>
                    <ServicesCard className='observable observable-animate-opacity observable-animate-translateFromLeft' title="Software Development">
                        'Til the roof comes off, 'til the lights go out
                        'Til my legs give out, can't shut my mouth
                        'Til the smoke clears out, am I high? Perhaps
                        I'ma rip this shit 'til my bones collapse
                        'Til the roof comes off, 'til the lights go out
                        (Until the roof, until   the roof)
                        'Til my legs give out, can't shut my mouth
                        (The roof comes off, the roof comes off)
                        'Til the smoke clears out, am I high? Perhaps
                        (Until my legs, until my legs)
                        I'ma rip this shit 'til my bones collapse
                        (Give out from underneath me)
                    </ServicesCard>
                    <ServicesCard className='observable observable-animate-opacity observable-animate-translateFromRight' title="Website Design and Development">
                        "Fools" said I, "You do not know
                        Silence like a cancer grows
                        Hear my words that I might teach you
                        Take my arms that I might reach you"
                        But my words like silent raindrops fell
                        And echoed in the wells of silence
                        And the people bowed and prayed
                        To the neon god they made
                        And the sign flashed out its warning
                        In the words that it was forming
                        And the sign said, "The words of the prophets
                        Are written on the subway walls
                        And tenement halls
                        And whispered in the sounds of silence"
                    </ServicesCard>
                </div>
            </FullContainer>
            <FullContainer className="bg-red-100">
                <div className={`text-5xl mt-24 mb-24 text-center observable observable-animate-opacity observable-animate-translateFromBottom`}>What can you expect from us?</div>
                <div className={`left-0 right-0 mx-auto max-w-screen-lg`}>
                    <ExpectFromUs className='observable observable-animate-opacity observable-animate-translateFromBottom' title="Customer Satisfaction">
                        Magdamag naggigitara, ang bagal ng gabi
                        Ang daming iniisip ngunit wala namang masabi
                        Nagsawa ka na ba? Subukan mong tumawa
                        Tigilan ang pag-iisip, ipagpatuloy ang pananaginip
                    </ExpectFromUs>
                    <ExpectFromUs className='observable observable-animate-opacity observable-animate-translateFromBottom' title="Professionalism">
                        Hindi ko maalala ang lyrics ng kanta
                        Kahit ako ang gumawa, iba naman ang nagsalita
                        Mahirap talaga kapag inaasahan ka
                        Awitin ang mga tula na nagmumula sa pera
                    </ExpectFromUs>
                    <ExpectFromUs className='observable observable-animate-opacity observable-animate-translateFromBottom' title="Approachable">
                        Hindi ko inakala na magkakaganito
                        Wala namang nagsabi na malabo ang mundo
                        Hindi na rin namin inaasahang maintindihan
                        Alam naman nilang wala kaming pakialam
                        Kung saan man tutungo at kung kailan kami hihinto
                        Kung bukas man o bukas pa, tuluyan nang tapusin ang kanta
                    </ExpectFromUs>
                    <ExpectFromUs className='observable observable-animate-opacity observable-animate-translateFromBottom' title="Quality Product">
                        Gising hanggang umaga, hindi mapakali
                        Pinipiga ang utak ngunit wala pa ring masabi
                        Kapag pinilit mo at hindi na totoo
                        Ang awit na natapos mo ay mawawalan ng tono
                    </ExpectFromUs>
                </div>
            </FullContainer>
            <FullContainer className="text-center bg-slate-100 pb-40">
                <div className={`page-title-lg pt-10 pb-8 observable observable-animate-opacity observable-animate-translateFromBottom`}>Who Are We?</div>
                <div className={`flex justify-around left-0 right-0 mx-auto ${ style.developersWrapper }`}>
                    <DeveloperCard className='observable observable-animate-opacity observable-animate-translateFromLeft' image="/images/lean.png" name="Lean Viktor A. Fucio" position="Software Developer" quote="Kung sa sakin ka nag umpisa, 'di sana wala nang iba" />
                    <DeveloperCard className='observable observable-animate-opacity observable-animate-translateFromBottom' image="/images/sandro.png" name="Sandro P. Mendoza" position="Software Developer" quote="Ibibigay ko ang chicken skin ko para sa'yo" />
                    <DeveloperCard className='observable observable-animate-opacity observable-animate-translateFromRight' image="/images/ken.png" name="Ken M. Moreno" position="Software Developer" quote="Kung mahal mo, ipuputok mo sa loob" />
                </div>
            </FullContainer>
        </>
    )
}