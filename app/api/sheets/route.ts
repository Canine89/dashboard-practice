import { NextResponse } from 'next/server';
import { getSheetData } from '@/lib/google-sheets';
import { parseSheetData } from '@/lib/data-utils';

export async function GET() {
  try {
    // 시트의 전체 데이터 가져오기
    const data = await getSheetData();
    
    // 데이터 파싱
    const responses = parseSheetData(data);
    
    return NextResponse.json({ data: responses });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sheet data' },
      { status: 500 }
    );
  }
}

