/**
 * How to use this?
 * - add .observable class to the element you want to be animated
 * - add also the effect class (observable-animate-...)
 */
let observer: IntersectionObserver;
export const initInteractionObserver = () => {
    observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) { // entry is visible in the viewport
                // remove observable animation classes so they animate "in"
                entry.target.classList.remove('observable-animate-opacity');
                entry.target.classList.remove('observable-animate-translateFromLeft');
                entry.target.classList.remove('observable-animate-translateFromRight');
                entry.target.classList.remove('observable-animate-translateFromBottom');
                entry.target.classList.remove('observable-animate-blur');
            } else { // entry is not visible in the viewport 
                // add observable animation classes so they animate "out"
                entry.target.getAttribute('data-observable-animate-class-names')?.split(' ').forEach((observableAnimatieClassName) => {
                    entry.target.classList.add(observableAnimatieClassName);
                });
            }
        })
    });
    
    const observableElements = document.querySelectorAll('.observable');
    observableElements.forEach((observableElement) => {
        // add the observable animate classes to a data attribute so we can bring them back later
        const observableAnimateClassNames = observableElement.className.split(' ').filter((className) => {
            return className.startsWith('observable-animate-');
        });
        observableElement.setAttribute('data-observable-animate-class-names', observableAnimateClassNames.join(' '));

        observer.observe(observableElement);
    });
}

// @todo create a function that removes initInteractionObserver
export const destroyInteractionObserver = () => {
    observer.disconnect();
};