import { prisma } from '$lib/server/prisma/prismaConnection';

export const load = async ({ parent }) => {
	const parentData = await parent();

	const participants = await prisma.projectUser.findMany({
		where: {
			project: {
				projectTemplateId: parentData.projectTemplate.id
			}
		},
		include: {
			user: {
				select: {
					firstName: true,
					lastName: true,
					pfp: true
				}
			},
			project: {
				include: {
					projectTemplate: true
				}
			}
		}
	});

	return {
		participants
	};
};
