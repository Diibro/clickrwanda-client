import { charAdder, charRemover, dashRemover, dashReplacer } from "./otherFunctions";

export const getItemUrl = (name, id) => {
     const newName = dashReplacer(name);
     return charAdder([newName, id], '?=');
}

export const getSearchUrl = (name) => {
     return dashReplacer(name);
}

export const getItemUrlId = (url) => {
     const names = charRemover(url, '?=');
     return names[1];
}

export const getItemUrlName = (url) => {
     const names = charRemover(url, '?=');
     const name = names[1];
     return dashRemover(name);
}