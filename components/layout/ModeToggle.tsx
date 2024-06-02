import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Computer } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ErrorBoundary } from 'react-error-boundary';
import { FallbackError } from '../layout/FallbackError';

export function ModeToggle() {
    const { setTheme } = useTheme();
    return (
        <ErrorBoundary fallback={<FallbackError />}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-9 px-0 focus-visible:ring-0">
                        <SunIcon className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <MoonIcon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-15 mr-3 mt-2">
                    <DropdownMenuLabel>Dark Mode</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => setTheme('light')}>
                            <Sun className="mr-2 size-4" />
                            <span>Light</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme('dark')}>
                            <Moon className="mr-2 size-4" />
                            <span>Dark</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme('system')}>
                            <Computer className="mr-2 size-4" />
                            <span>System</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </ErrorBoundary>
    );
}
