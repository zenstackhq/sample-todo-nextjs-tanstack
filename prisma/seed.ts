import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const slug = "core";
	const application = await prisma.application.findUnique({
		where: {
			slug
		}
	});
	if (application) {
		return;
	}
	await prisma.application.create({
		data: {
			slug
		}
	});

}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		// eslint-disable-next-line no-console
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
