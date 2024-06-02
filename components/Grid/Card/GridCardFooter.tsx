import { CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Prisma } from '@prisma/client';

export const GridCardFooterInclude = {
    include: {
        button: true,
        progress: true,
    },
};

export function GridCardFooter({ footer }: { footer: Prisma.GridCardFooterGetPayload<typeof GridCardFooterInclude> }) {
    return (
        <CardFooter>
            {footer.type === 'Button' && <Button>{footer.button?.text}</Button>}
            {footer.type === 'Progress' && <Progress value={footer.progress?.value} />}
        </CardFooter>
    );
}
