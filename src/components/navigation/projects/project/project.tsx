'use client';

import { clsx } from 'clsx';
import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { Project } from '@/lib/pocketbase/types';

import GithubIcon from '../../../icons/github';
import { ProjectBadge } from './badge';
import { MemoProjectGridEffect } from './gridEffect';

export const NavProject: React.FC<{
	project: Project;
	index: number;
}> = ({ project, index }) => {
	const ref = useRef(null);
	const isInView = useInView(ref);
	const [played, setPlayed] = useState(false);

	useEffect(() => {
		if (!isInView) return;

		setTimeout(() => {
			setPlayed(true);
		}, index * 200);
	}, [index, isInView]);

	return (
		<div
			ref={ref}
			className={clsx(
				'relative flex sm:h-16 items-center overflow-hidden group transition-shadow rounded-md shadow-xl hover:!shadow-xl',
				(isInView || played) && '!shadow-none'
			)}
			style={{
				transitionDelay: played ? '0ms' : index * 200 + 'ms',
				transitionDuration: played ? '300ms' : '1000ms'
			}}
		>
			<ProjectBadge status={project.status} />
			<div className="flex flex-col sm:w-fit p-2 flex-1 sm:flex-initial">
				<span className="text-xl">{project.name}</span>
				<span className="text-sm">{project.description}</span>
			</div>
			<div className="sm:block hidden flex-1">
				<MemoProjectGridEffect />
			</div>

			{project.repo && (
				<a
					href={String(project.repo)}
					className="h-full transition-all lg:w-0 lg:mr-0 mr-2 lg:group-hover:w-14 sm:group-hover:ml-2 flex justify-center items-center overflow-hidden"
				>
					<GithubIcon className="h-8 w-8 fill-foreground" />
				</a>
			)}
		</div>
	);
};
