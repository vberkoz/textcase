/**
 * Collection of utility functions for text case conversions
 */

export function toUpperCase(text: string): string {
  return text.toUpperCase();
}

export function toLowerCase(text: string): string {
  return text.toLowerCase();
}

export function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function toSentenceCase(text: string): string {
  if (!text) return '';
  
  // Split the text into sentences
  const sentences = text.split(/(?<=[.!?])\s+/);
  
  return sentences
    .map(sentence => {
      if (!sentence) return '';
      return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
    })
    .join(' ');
}

export function toToggleCase(text: string): string {
  return text
    .split('')
    .map((char, index) => index % 2 === 0 ? char.toUpperCase() : char.toLowerCase())
    .join('');
}

export function toInvertCase(text: string): string {
  return text
    .split('')
    .map(char => {
      if (char === char.toUpperCase()) {
        return char.toLowerCase();
      }
      return char.toUpperCase();
    })
    .join('');
}

export function toCamelCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .map((word, index) => {
      return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}

export function toPascalCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

export function toSnakeCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .trim()
    .replace(/\s+/g, '_');
}

export function toUpperSnakeCase(text: string): string {
  return toSnakeCase(text).toUpperCase();
}

export function toKebabCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function toTrainCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('-');
}

export function toFlatCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '');
}