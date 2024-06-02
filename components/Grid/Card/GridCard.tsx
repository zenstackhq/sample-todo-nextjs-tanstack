import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { CardTableComponent } from '../Table/CardTableComponent';
import { paddingBottoms, textXl } from '../utils';
import { Prisma } from '@prisma/client';
import { GridCardFooterInclude, GridCardFooter } from './GridCardFooter';

export type GridCardInclude = {
    include: {
        table: true;
        footer: GridCardFooterInclude;
    };
};

export function GridCard({ card }: { card: Prisma.GridCardGetPayload<GridCardInclude> }) {
    const title = <CardTitle className={card.titleXl ? textXl[card.titleXl] : ''}>{card.title}</CardTitle>;
    const description = (
        <CardDescription className="max-w-lg text-balance leading-relaxed">{card.description}</CardDescription>
    );
    return (
        <Card key={card.id}>
            <CardHeader className={paddingBottoms[card.headerPb]}>
                {card.invertTitleDescription ? (
                    <>
                        {description}
                        {title}
                    </>
                ) : (
                    <>
                        {title}
                        {description}
                    </>
                )}
            </CardHeader>
            {card.content && (
                <CardContent>
                    <div className="text-muted-foreground text-xs">{card.content}</div>
                </CardContent>
            )}
            {card.table && <CardTableComponent table={card.table} />}
            {card.footer && <GridCardFooter footer={card.footer} />}
        </Card>
    );
}
