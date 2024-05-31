import { useCurrentSpace } from "@/lib/context";
import { useCreateSpaceApplication, useDeleteSpaceApplication, useFindManyApplication, useFindManySpaceApplication } from "@/zmodel/lib/hooks";

export const Applications = () => {
	const { data: applications } = useFindManyApplication();
	const space = useCurrentSpace();
	const activate = useCreateSpaceApplication();
	const desactivate = useDeleteSpaceApplication();
	const { data: spaceApplications } = useFindManySpaceApplication({ where: { spaceId: space?.id } });
	if (!applications || !space) {
		return <></>;
	}
	return applications.map(application => {

		const activated = spaceApplications?.find(spaceApplication => spaceApplication.applicationId === application.id);
		const onClick = () => {
			if (activated) {
				return desactivate.mutateAsync({ where: { id: activated.id } });
			}
			return activate.mutateAsync({ data: { applicationId: application.id, spaceId: space.id } });
		};
		return <div key={application.id}>
			{
				<div onClick={onClick}>
					{activated ? "Disable" : "Enable"}
				</div>
			}
			{application.slug}
		</div>;
	});
};
