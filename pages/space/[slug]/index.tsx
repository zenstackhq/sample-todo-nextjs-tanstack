import { SpaceHome, SpaceHomeProps } from "components/Space/SpaceHome";
import { GetServerSideProps } from "next";
import { getEnhancedPrisma } from "server/enhanced-db";

export default function SpaceHomeWrapper(props: SpaceHomeProps) {

	return <SpaceHome {...props}/>;
}

export const getServerSideProps: GetServerSideProps<SpaceHomeProps> = async ({ req, res, params }) => {
	const db = await getEnhancedPrisma({ req, res });

	const space = await db.space.findUnique({
		where: { slug: params!.slug as string }
	});
	if (!space) {
		return {
			notFound: true
		};
	}
	return {
		props: { space }
	};
};
