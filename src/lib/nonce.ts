'use server';

import { headers } from 'next/headers';

export const getNonce = async () => headers().get('x-nonce') || undefined;
