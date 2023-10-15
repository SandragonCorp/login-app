interface Property {
    placeholder: string
};

export function TextField({placeholder}: Property) {
    return <input type="text" placeholder={placeholder}></input>
}