'use server';

import { headers } from 'next/headers';

export const nonce = async () => headers().get('x-nonce') || undefined;
