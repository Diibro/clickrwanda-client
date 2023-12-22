export const dashReplacer = (name) =>{
     return name.replace(/ /g, "-");
}

export const dashRemover = (name) => {
     return name.split("-").join(' ');
} 

export const charRemover = (name,char) => {
     return name.split(char);
}

export const charAdder = (names, char) => {
     return names.join(char);
}

export const capitalizeString =(text) => {
     const words = text.split(' ');
     const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
     const result = capitalizedWords.join(' ');
     return result;
}

export const formatPrice = (price) => {
     const priceString = price.toString();

     const [integerPart, decimalPart] = priceString.split('.');

     const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

     const formattedPrice = decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;

     return formattedPrice;
} 