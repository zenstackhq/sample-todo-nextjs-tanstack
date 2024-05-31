import { useFindUniqueSpace, useFindUniqueSpaceComponent } from "@/zmodel/lib/hooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


export function useCurrentUser() {
	const { data: session } = useSession();
	return session?.user;
}


export function useCurrentSpace() {
	const router = useRouter();
	const { data } = useFindUniqueSpace(
		{
			where: {
				slug: router.query.slug as string
			}
		},
		{
			enabled: !!router.query.slug
		}
	);

	return data;
}


export function useCurrentSpaceComponent() {
	const router = useRouter();
	const { data } = useFindUniqueSpaceComponent(
		{
			where: {
				id: router.query.componentId as string
			}
		},
		{
			enabled: !!router.query.componentId
		}
	);

	return data;
}


