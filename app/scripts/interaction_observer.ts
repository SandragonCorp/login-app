/**
 * How to use this?
 * - add .observable class to the element you want to be animated
 * - 
 */
export const initInteractionObserver = () => {
    let observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) { // entry is visible in the viewport
                entry.target.classList.remove('observable-animate-opacity');
                entry.target.classList.remove('observable-animate-translateFromLeft');
                entry.target.classList.remove('observable-animate-translateFromRight');
                entry.target.classList.remove('observable-animate-translateFromBottom');
            } else { // entry is not visible in the viewport 
                // entry.target.getAttributeNames().forEach((attribute) => {
                //     if (attribute.startsWith('observable-animate-')) {
                //         console.log(attribute)
                //         entry.target.classList.add(attribute);
                //     }
                // })
                entry.target.getAttribute('data-observable-animate-class-names')?.split(' ').forEach((observableAnimatieClassName) => {
                    entry.target.classList.add(observableAnimatieClassName);
                });
            }
        })
    });
    
    const observableElements = document.querySelectorAll('.observable');
    observableElements.forEach((observableElement) => {
        const observableAnimatieClassNames = observableElement.className.split(' ').filter((className) => {
            return className.startsWith('observable-animate-');
        });

        observableElement.setAttribute('data-observable-animate-class-names', observableAnimatieClassNames.join(' '));

        observer.observe(observableElement);
    });
}