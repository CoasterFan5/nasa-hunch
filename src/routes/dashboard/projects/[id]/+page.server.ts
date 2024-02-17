import { error } from '@sveltejs/kit';

import { prisma } from '$lib/prismaConnection';

import type { PageServerLoad } from './$types';
//Import { Prisma, Role } from '@prisma/client';

/*Function filterProject(
	role: Role,
	orgId: number | null,
	id: number
): Prisma.ProjectFindFirstArgs['where'] {
	switch (role) {
		case Role.HUNCH_ADMIN:
			return {};
		case Role.SCHOOL_ADMIN:
			if (orgId == null) {
				throw error(500, 'School admin has no orgId');
			}
			return {
				organization: {
					id: orgId
				}
			};
		case Role.TEACHER:
			return {
				owner: {
					id
				}
			};
		default:
			return {
				users: {
					some: {
						userId: id
					}
				}
			};
	}
}*/

export const load: PageServerLoad = async ({ params, parent }) => {
	const id = parseInt(params.id);

	const project = await prisma.project.findFirst({
		where: {
			id
			//...filterProject(user.role, user.orgId, user.id)
		}
	});

	if (!project || project == null) {
		error(404, 'Project not found');
	}

	return {
		project
	};
};
