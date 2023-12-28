import { charAdder, charRemover, dashReplacer } from "./otherFunctions";

export const getItemUrl = (name, id) => {
     const newName = dashReplacer(name);
     return charAdder([newName, id], '?=');
}

export const getItemUrlId = (url) => {
     const names = charRemover(url, '?=');
     return names[1];
}

export const getItemUrlName = (url) => {
     const names = charRemover(url, '?=');
     return names[1];
}