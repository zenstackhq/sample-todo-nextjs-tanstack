import { ZodObjectOrWrapped } from '../auto-form/utils';

export type CommonFormTable<SchemaType extends ZodObjectOrWrapped> = {
    formSchema: SchemaType;
};
