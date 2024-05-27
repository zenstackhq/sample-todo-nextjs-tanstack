import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useFindUniqueProperty, useFindUniqueSpace } from "./hooks";


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


export function useCurrentProperty() {
	const router = useRouter();
	const { data } = useFindUniqueProperty(
		{
			where: {
				id: router.query.propertyId as string
			}
		},
		{
			enabled: !!router.query.propertyId
		}
	);

	return data;
}


