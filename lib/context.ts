import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useFindUniqueSpace } from "./hooks";


export function useCurrentUser() {
	const { data: session } = useSession();
	return session?.user;
}


export function useCurrentSpace() {
	const router = useRouter();
	const { data: space } = useFindUniqueSpace(
		{
			where: {
				slug: router.query.slug as string
			}
		},
		{
			enabled: !!router.query.slug
		}
	);

	return space;
}


