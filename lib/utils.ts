import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// GPT4o
type AnyObject = { [key: string]: any };

export function replaceArraysWithFirstObject(obj: AnyObject): AnyObject {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];

            // Check if the value is an array and the first element is an object
            if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && !Array.isArray(value[0])) {
                // Replace the array with its first element
                obj[key] = replaceArraysWithFirstObject(value[0]);
            } else if (typeof value === 'object' && value !== null) {
                // If the value is an object, recursively process it
                obj[key] = replaceArraysWithFirstObject(value);
            }
        }
    }
    return obj;
}
