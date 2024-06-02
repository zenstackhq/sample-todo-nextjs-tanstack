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
    data: SchemaType[];
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

    return <DataTable columns={columns} data={transformWithParentDetails(data)} />;
}
