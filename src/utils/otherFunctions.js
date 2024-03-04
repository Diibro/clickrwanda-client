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

export const formatPriceV1 = (price) => {
     if (price < 1000) {
       return price.toString(); 
     } else {
       if (price >= 1000 && price < 100000) {
         return (price / 1000).toFixed(1) + 'K'; 
       } else if (price >= 100000 && price < 1000000) {
         return (price / 1000).toFixed(0) + 'K'; 
       } else if (price >= 1000000 && price < 1000000000) {
         return (price / 1000000).toFixed(1) + 'M'; 
       } else if (price >= 1000000000) {
         return (price / 1000000000).toFixed(1) + 'B'; 
       }
     }
   };


export const formatPrice = (price) => {
     const priceString = price.toString();

     const [integerPart, decimalPart] = priceString.split('.');

     const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

     const formattedPrice = decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;

     return formattedPrice;
} 

export const getArrayOfNums = (num) => {
  const arr = [];
  for(let i = 0; i < num; i++) {
    arr[i] = i;
  }

  return arr;
}

export const openNewTab = (url) => {
  window.open(url, "_blank", "noopener, noreferrer")
}

export const getParagraphs = (text, wordsPerParagraph) => {
  let words = text.split(/\s+/);

  let paragraphs = [];
  let currentParagraph = '';

  words.forEach(word => {
    if (currentParagraph.split(/\s+/).length >= wordsPerParagraph) {
      paragraphs.push(currentParagraph.trim());
      currentParagraph = ''; 
    }

    currentParagraph += word + ' ';
  });

  if (currentParagraph.trim() !== '') {
    paragraphs.push(currentParagraph.trim());
  }

  return paragraphs;
}