import { google } from 'googleapis';

// 환경 변수에서 서비스 계정 키 읽기 (Vercel 배포용)
const getServiceAccountCredentials = () => {
  const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS;
  
  if (credentialsJson) {
    // 환경 변수에서 JSON 문자열을 파싱
    try {
      return JSON.parse(credentialsJson);
    } catch (error) {
      console.error('Failed to parse GOOGLE_SERVICE_ACCOUNT_CREDENTIALS:', error);
      throw new Error('Invalid service account credentials format');
    }
  }
  
  throw new Error('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS environment variable is not set');
};

const auth = new google.auth.GoogleAuth({
  credentials: getServiceAccountCredentials(),
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

