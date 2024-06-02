import { transformWithParentDetails } from '@/lib/utils';
import { CommonFormTable } from '../auto-common/types';
import { handleIfZodNumber } from '../auto-form/fields/object';
import {
    ZodObjectOrWrapped,
    beautifyObjectName,
    getBaseSchema,
    getBaseType,
    getObjectFormSchema,
} from '../auto-form/utils';
import { DataTable } from '../data-table';
import * as z from 'zod';

export function AutoTable<SchemaType extends ZodObjectOrWrapped>({
    formSchema,
    data,
}: CommonFormTable<SchemaType> & {
    data: z.infer<SchemaType>[];
}) {
    const objectFormSchema = getObjectFormSchema(formSchema);
    if (!objectFormSchema) {
        return null;
    }

    function getAccessor(objectFormSchema, prefix = '') {
        const { shape } = getBaseSchema(objectFormSchema) || {};

        if (!shape) {
            return null;
        }

        return Object.keys(shape).flatMap((name) => {
            if (['id', 'updatedAt'].includes(name)) {
                return [];
            }

            let item = shape[name] as z.ZodAny;
            item = handleIfZodNumber(item);
            const zodBaseType = getBaseType(item);
            const currentPrefix = `${prefix}${prefix ? '.' : ''}${name}`;

            if (zodBaseType === 'ZodObject') {
                return getAccessor(item, currentPrefix);
            } else if (zodBaseType === 'ZodArray') {
                const arrayItemType = getBaseType(item._def.type);
                if (arrayItemType === 'ZodObject') {
                    // Recursively get the accessor for objects within the array
                    return getAccessor(item._def.type, `${currentPrefix}`);
                } else {
                    // For non-object arrays, return the current prefix with array notation
                    return [
                        {
                            accessorKey: `${currentPrefix}`,
                            header: beautifyObjectName(currentPrefix),
                        },
                    ];
                }
            }

            return [
                {
                    accessorKey: currentPrefix,
                    header: beautifyObjectName(currentPrefix),
                },
            ];
        });
    }
    const columns = getAccessor(objectFormSchema);
    console.log(columns);

    const transformedData = transformWithParentDetails(data);
    console.log(transformedData);

    return <DataTable columns={columns} data={transformedData} />;
}
