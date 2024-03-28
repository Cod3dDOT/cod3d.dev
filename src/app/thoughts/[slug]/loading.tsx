import { Loader } from '@/components/loader';

export default function Loading() {
	return (
		<div className="w-full h-screen flex justify-center items-center">
			<Loader />
		</div>
	);
}
