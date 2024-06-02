import { ListFilter } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { GridTabContent, GridTabContentInclude } from './GridTabContent';

import { Prisma } from '@prisma/client';

export type GridTabsInclude = {
    include: {
        tabsContent: GridTabContentInclude;
    };
};

export function GridTabs({ tabs }: { tabs: Prisma.GridTabsGetPayload<GridTabsInclude> }) {
    const tabsContent = tabs.tabsContent;
    if (!tabsContent.length) {
        throw 'Not tabsContent lenght';
    }
    return (
        <Tabs defaultValue={tabsContent[0].name} className="col-span-4">
            <div className="flex items-center">
                <TabsList>
                    {tabsContent.map((tabContent, key) => (
                        <TabsTrigger key={key} value={tabContent.name}>
                            {tabContent.name}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                                <ListFilter className="size-3.5" />
                                <span className="sr-only sm:not-sr-only">Filter</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem checked>Fulfilled</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                        <span className="sr-only sm:not-sr-only">Export</span>
                    </Button>
                </div>
            </div>
            {tabsContent.map((tabContent) => (
                <GridTabContent key={tabContent.id} tabContent={tabContent} />
            ))}
        </Tabs>
    );
}
