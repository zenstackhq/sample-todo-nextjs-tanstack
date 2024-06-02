import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { TopBreadCrumb } from './BreadCrumb';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { MobileSideNav } from './MobileSideNav';

export default function Header() {
    return (
        <header className="bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileSideNav />
            <TopBreadCrumb />
            <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="text-muted-foreground absolute left-2.5 top-2.5 size-4" />
                <Input
                    type="search"
                    placeholder="Search..."
                    className="bg-background w-full rounded-lg pl-8 md:w-[200px] lg:w-[320px]"
                />
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                        <Image
                            src="/placeholder-user.jpg"
                            width={36}
                            height={36}
                            alt="Avatar"
                            className="overflow-hidden rounded-full"
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
}
