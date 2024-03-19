'use client';

import { clsx } from 'clsx';
import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { Project } from '@/app/lib/pocketbase/types';

import GithubIcon from '../../icons/github';
import { ProjectBadge } from './badge';

export const NavProject: React.FC<{
	project: Project;
	index: number;
}> = ({ project, index }) => {
	const ref = useRef(null);
	const isInView = useInView(ref);
	const [played, setPlayed] = useState(false);

	useEffect(() => {
		if (!isInView) {
			// setPlayed(false);
			return;
		}

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
			<div className="flex flex-col flex-1 sm:pl-2 p-2 pl-0">
				<span className="text-xl">{project.name}</span>
				<span className="text-sm">{project.description}</span>
			</div>
			{project.repo && (
				<a
					href={String(project.repo)}
					className="cursor h-full transition-all lg:w-0 lg:mr-0 mr-2 lg:group-hover:w-14 sm:group-hover:ml-2 flex justify-center items-center overflow-hidden"
				>
					<GithubIcon className="h-full aspect-square fill-foreground" />
				</a>
			)}
		</div>
	);
};
