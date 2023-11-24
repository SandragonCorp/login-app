import style from '@/app/components/modals/_terms_and_conditions_modal.module.css'
import { Modal } from './_modal'

interface TermsAndConditionsModalProps {
    id: string
}

export const TermsAndConditionsModal = (config: TermsAndConditionsModalProps) => {
    return (
        <>
            <Modal id={config.id} className='text-center text-black' >
                <h1 className='text-3xl'>Terms and Conditions</h1>
                <hr className='h-px my-2 bg-slate-400 border-0' />
                <div className='lg:max-w-xl md:max-w-xl text-justify indent-6 pb-4'>
                    When the days are cold
                    And the cards all fold
                    And the saints we see are all made of gold
                    When your dreams, they fail
                    And the ones we hail
                    Are the worst of all, and the blood's run stale
                    I wanna hide the truth
                    I wanna shelter you
                    But with the beast inside
                    There's nowhere we can hide
                    No matter what we breed
                    We still are made of greed
                    This is my kingdom come
                    This is my kingdom come
                    When you feel my heat, look into my eyes
                    It's where my demons hide
                    It's where my demons hide
                </div>
                <div className='lg:max-w-xl md:max-w-xl text-justify indent-6 pb-4'>
                    Don't get too close, it's dark inside
                    It's where my demons hide
                    It's where my demons hide
                    When the curtains call
                    It's the last of all
                    When the lights fade out, all the sinners crawl
                    So they dug your grave
                    And the masquerade
                    Will come callin' out at the mess you've made
                    Don't wanna let you down
                    But I am hell-bound
                    Though this is all for you
                    Don't wanna hide the truth
                    No matter what we breed
                    We still are made of greed
                    This is my kingdom come
                    This is my kingdom come
                    When you feel my heat, look into my eyes
                    It's where my demons hide
                    It's where my demons hide
                    Don't get too close, it's dark inside
                    It's where my demons hide
                    It's where my demons hide
                </div>
                <div className='lg:max-w-xl md:max-w-xl text-justify indent-6'>
                    There once was a ship that put to sea
                    The name of the ship was the Billy O' Tea
                    The winds blew up, her bow dipped down
                    Oh blow, my bully boys, blow (huh)
                    Soon may the Wellerman come
                    To bring us sugar and tea and rum
                    One day, when the tonguing is done
                    We'll take our leave and go
                    She'd not been two weeks from shore
                    When down on her a right whale bore
                    The captain called all hands and swore
                    He'd take that whale in tow (huh)
                    Soon may the Wellerman come
                    To bring us sugar and tea and rum
                    One day, when the tonguing is done
                    We'll take our leave and go
                </div>
            </Modal>
        </>
    )
}