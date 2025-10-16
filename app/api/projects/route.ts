import { NextRequest, NextResponse } from 'next/server';
import { getPaginatedProjects } from '@/lib/sanity';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '0');
  const pageSize = parseInt(searchParams.get('pageSize') || '9');

  try {
    const data = await getPaginatedProjects(page, pageSize);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
