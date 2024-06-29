import { RedirectOnTouch } from '@/components/pages/hello/redirectOnTouch';
import dynamic from 'next/dynamic';

const DynamicSmile = dynamic(
	() => import('@/components/pages/hello/smile').then((mod) => mod.Smile),
	{
		ssr: false
	}
);

export default function Page() {
	return (
		<>
			<RedirectOnTouch />
			<DynamicSmile />
		</>
	);
}
