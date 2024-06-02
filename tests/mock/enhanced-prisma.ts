import { createApplications } from "@/zmodel/prisma/applications/createApplications";
import { PrismockClient } from "prismock";
import { beforeAll } from "vitest";

export const prisma = new PrismockClient();

beforeAll(() => {
    createApplications(prisma)
});
