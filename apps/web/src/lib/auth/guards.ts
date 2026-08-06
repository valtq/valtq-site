import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    return {
      session: null,
      error: NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Sign in required' } },
        { status: 401 },
      ),
    };
  }
  return { session, error: null };
}

export function jsonSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function jsonError(code: string, message: string, status: number) {
  return NextResponse.json({ success: false, error: { code, message } }, { status });
}
