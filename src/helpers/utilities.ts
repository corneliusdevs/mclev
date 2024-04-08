export const removeCharactersFromString = (str:string, charactersToRemove:string[]) => {
    const regexPattern = new RegExp(`[${charactersToRemove.join('')}]`, 'g');
    return str.replace(regexPattern, '');
  }