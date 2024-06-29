'use client';

import useIsTouchdevice from '@/lib/hooks/useIsTouchDevice';
import { useRouter } from 'next/navigation';

export const RedirectOnTouch: React.FC = () => {
	const router = useRouter();
	const isTouchDevice = useIsTouchdevice();
	if (isTouchDevice) router.push('/404');
	return <></>;
};
