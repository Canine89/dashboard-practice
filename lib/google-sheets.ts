import { google } from 'googleapis';
import path from 'path';

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(process.cwd(), 'dashboard-study-f4d1a77606c1.json'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

export const sheets = google.sheets({ version: 'v4', auth });

export const SPREADSHEET_ID = '1U0q4DXjBNetg51Fp3XyZaFoRTWn4yEsPMjiRw-kbkXc';
export const SHEET_GID = '951142470';

export async function getSheetData(range?: string) {
  try {
    // 범위가 지정되지 않으면 첫 번째 시트의 전체 데이터 가져오기
    const sheetRange = range || `'설문지 응답 시트1'!A1:M1000`;
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: sheetRange,
    });
    return response.data.values || [];
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    throw error;
  }
}

