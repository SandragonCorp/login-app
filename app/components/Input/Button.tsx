interface Property {
    text: string,
    className: string
};

export function Button({text, className}: Property) {
    return <button className={`btn ${className}`}>{text}</button>
}