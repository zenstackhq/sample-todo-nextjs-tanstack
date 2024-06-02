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
import { ColumnDef } from '@tanstack/react-table';
import { replaceArraysWithFirstObject } from '@/lib/utils';

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

    function getAccessor(objectFormSchema: z.AnyZodObject, prefix = ''): ColumnDef<z.infer<SchemaType>>[] {
        const { shape } = getBaseSchema(objectFormSchema) || {};

        if (!shape) {
            return [];
        }

        return Object.keys(shape).flatMap((name) => {
            if (['id', 'createdAt'].includes(name)) {
                return [];
            }

            let item = shape[name] as z.ZodAny;
            item = handleIfZodNumber(item);
            const zodBaseType = getBaseType(item);
            const currentPrefix = `${prefix}${prefix ? '.' : ''}${name}`;

            if (zodBaseType === 'ZodObject') {
                return getAccessor(item as unknown as z.AnyZodObject, currentPrefix);
            } else if (zodBaseType === 'ZodArray') {
                const arrayItemType = getBaseType((item as unknown as z.ZodArray<z.ZodAny>)._def.type);
                if (arrayItemType === 'ZodObject') {
                    try {
                        const recurse = item._def.type;
                        return getAccessor(recurse, currentPrefix);
                    } catch {}
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

    console.log(getAccessor(objectFormSchema));
    console.log(replaceArraysWithFirstObject(data));
    return <DataTable columns={getAccessor(objectFormSchema)} data={replaceArraysWithFirstObject(data)} />;
}
