import { useNavItems } from '@/hooks/useNavItems';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, LineChart, Package, Package2, PanelLeft, ShoppingCart, Users2 } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export const MobileSideNav = () => {
    const items = useNavItems();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelLeft className="size-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                    <Link
                        href="/"
                        className="bg-primary text-primary-foreground group flex size-10 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:text-base"
                    >
                        <Package2 className="size-5 transition-all group-hover:scale-110" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    <Link
                        href="/"
                        className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
                    >
                        <Home className="size-5" />
                        Dashboard
                    </Link>
                    {items.map((item, index) => (
                        <Link
                            key={index}
                            href="/"
                            className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
                        >
                            <ShoppingCart className="size-5" />
                            {item.title}
                        </Link>
                    ))}
                    <Link href="/" className="text-foreground flex items-center gap-4 px-2.5">
                        <ShoppingCart className="size-5" />
                        Orders
                    </Link>
                    <Link
                        href="/"
                        className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
                    >
                        <Package className="size-5" />
                        Products
                    </Link>
                    <Link
                        href="/"
                        className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
                    >
                        <Users2 className="size-5" />
                        Customers
                    </Link>
                    <Link
                        href="/"
                        className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
                    >
                        <LineChart className="size-5" />
                        Settings
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>
    );
};
