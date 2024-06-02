import { useFindManyTable } from '@/zmodel/lib/hooks';
import { beautifyObjectName } from '@/components/ui/auto-form/utils';
import { DataTable } from '@/components/ui/data-table';
import { Prisma } from '@prisma/client';

export const GridCardTableInclude = {};

export function CardTableComponent({ table }: { table: Prisma.GridCardTableGetPayload<typeof GridCardTableInclude> }) {
    const { data } = useFindManyTable({
        where: {
            type: table.type,
        },
        include: {
            // I'm a Genius :)
            [table.type.toLowerCase()]: true,
        },
    });

    const rows = data?.flatMap((lines) => lines[table.type.toLowerCase()]);

    if (!rows) {
        return <></>;
    }

    return (
        <div className="container mx-auto py-10">
            <DataTable
                columns={table.columns.map((column) => ({ accessorKey: column, header: beautifyObjectName(column) }))}
                data={rows}
            />
        </div>
    );
}
