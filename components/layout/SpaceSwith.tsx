import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
    Cloud,
    CreditCard,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Search,
    Settings,
    User,
    UserPlus,
    Users,
    Moon,
    Sun,
    Computer,
    CrossIcon,
    IceCreamIcon,
    Router,
} from 'lucide-react';
import { TopBreadCrumb } from './BreadCrumb';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ErrorBoundary } from 'react-error-boundary';
import { FallbackError } from '../layout/FallbackError';
import { useFindManySpace } from '@/zmodel/lib/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCurrentSpace } from '@/lib/context';
import { useState } from 'react';
import { Space } from '@zenstackhq/runtime/models';
import { getSpaceUrl } from '@/lib/urls';

export const localStorageSpace = 'currentSpaceSlug';
export function SpaceSwitch() {
    const { data: spaces } = useFindManySpace();

    const currentSpace = useCurrentSpace();

    function switchSpace(space: Space) {
        localStorage.setItem(localStorageSpace, space.slug);
        router.push(getSpaceUrl(space.slug));
    }

    const router = useRouter();
    return (
        <ErrorBoundary fallback={<FallbackError />}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-9 px-0 focus-visible:ring-0">
                        <Cloud className="size-[1.2rem] rotate-0 scale-100" />
                        <span className="sr-only">Select space</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-15 mr-3 mt-2">
                    <DropdownMenuLabel>Switch space</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        {spaces?.map((space) => (
                            <DropdownMenuItem key={space.id} onClick={() => switchSpace(space)}>
                                <IceCreamIcon className="mr-2 size-4" />
                                <span>{space.name}</span>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push('/s/n')}>
                        <PlusCircle className="mr-2 size-4" />
                        <span>Create space</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </ErrorBoundary>
    );
}
