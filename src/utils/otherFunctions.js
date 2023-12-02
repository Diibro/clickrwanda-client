export const dashReplacer = (name) =>{
     return name.replace(/ /g, "-");
}

export const dashRemover = (name) => {
     return name.split("-").join(' ');
} 