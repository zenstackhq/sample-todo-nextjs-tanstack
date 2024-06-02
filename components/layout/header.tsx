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
import { signOut } from 'next-auth/react';
import { MobileSideNav } from './MobileSideNav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCurrentUser } from '@/lib/context';
import { ModeToggle } from './ModeToggle';

export default function Header() {
    const user = useCurrentUser();
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
                    <Button variant="ghost" className="relative size-8 rounded-full focus-visible:ring-0">
                        <Avatar className="size-8">
                            <AvatarImage src={user?.image ?? ''} alt={user?.name ?? ''} />
                            <AvatarFallback>{user?.email?.[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-3 mt-2 w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <User className="mr-2 size-4" />
                            <span>Profile</span>
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <CreditCard className="mr-2 size-4" />
                            <span>Billing</span>
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="mr-2 size-4" />
                            <span>Settings</span>
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Keyboard className="mr-2 size-4" />
                            <span>Keyboard shortcuts</span>
                            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Users className="mr-2 size-4" />
                            <span>Team</span>
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <UserPlus className="mr-2 size-4" />
                                <span>Invite users</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem>
                                        <Mail className="mr-2 size-4" />
                                        <span>Email</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <MessageSquare className="mr-2 size-4" />
                                        <span>Message</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <PlusCircle className="mr-2 size-4" />
                                        <span>More...</span>
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuItem>
                            <Plus className="mr-2 size-4" />
                            <span>New Team</span>
                            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <LifeBuoy className="mr-2 size-4" />
                        <span>Support</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                        <Cloud className="mr-2 size-4" />
                        <span>API</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                        <LogOut className="mr-2 size-4" />
                        <span>Log out</span>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <ModeToggle />
        </header>
    );
}
