import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// GPT4o

export function transformWithParentDetails(entities, parentDetails = {}, parentKey = null) {
    if (!Array.isArray(entities)) return [];

    return entities.flatMap((entity) => {
        // Extract related keys (those that are arrays)
        const relatedKeys = Object.keys(entity).filter((key) => Array.isArray(entity[key]));

        // Create an object with the current entity's own details
        const currentEntityDetails = { ...entity };
        relatedKeys.forEach((key) => delete currentEntityDetails[key]);

        // Process each related entity
        return relatedKeys
            .flatMap((key) => transformWithParentDetails(entity[key], currentEntityDetails, key))
            .concat(
                parentKey
                    ? [
                          {
                              [parentKey]: currentEntityDetails,
                              details: parentDetails,
                          },
                      ]
                    : []
            );
    });
}

/*
export function transformWithParentDetails(entities?: any[], parentDetails = {}) {
    if (!Array.isArray(entities)) return null;

    // @ts-ignore
    return entities.flatMap((entity) => {
        // Extract related keys (excluding primitive fields)
        const relatedKeys = Object.keys(entity).filter((key) => Array.isArray(entity[key]));

        // Create an object with the current entity's details
        const currentEntityDetails = { ...entity };
        relatedKeys.forEach((key) => delete currentEntityDetails[key]);

        // Combine the current entity's details with the parent's details
        const combinedDetails = { ...parentDetails, ...currentEntityDetails };

        // Process each related entity
        return (
            relatedKeys
                // @ts-ignore
                .flatMap((key) => transformWithParentDetails(entity[key], combinedDetails))
                .concat([
                    {
                        ...combinedDetails,
                        ...Object.fromEntries(relatedKeys.map((key) => [key, entity[key]])),
                    },
                ])
        );
    });
}*/
