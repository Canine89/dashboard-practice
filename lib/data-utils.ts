export interface SurveyResponse {
  timestamp: string;
  gender: string;
  age: string;
  visitFrequency: string;
  visitPurpose: string[];
  satisfaction: {
    staffFriendliness: string;
    productVariety: string;
    cleanliness: string;
    facilities: string;
    parking: string;
  };
  satisfiedService?: string;
  improvementNeeded?: string;
  overallRating: number;
}

// 만족도 텍스트를 숫자로 변환
export function satisfactionToNumber(text: string): number {
  const mapping: Record<string, number> = {
    '매우 만족': 5,
    '만족': 4,
    '보통': 3,
    '불만족': 2,
    '매우 불만족': 1,
  };
  return mapping[text] || 0;
}

// CSV 데이터를 파싱하여 SurveyResponse 배열로 변환
export function parseSheetData(rows: string[][]): SurveyResponse[] {
  if (!rows || rows.length < 2) return [];

  const headers = rows[0];
  const dataRows = rows.slice(1);

  return dataRows
    .filter((row) => row.length > 0 && row[0]) // 빈 행 제외
    .map((row) => {
      const visitPurpose = row[4]?.split(',').map((p) => p.trim()) || [];
      
      return {
        timestamp: row[0] || '',
        gender: row[1] || '',
        age: row[2] || '',
        visitFrequency: row[3] || '',
        visitPurpose,
        satisfaction: {
          staffFriendliness: row[5] || '',
          productVariety: row[6] || '',
          cleanliness: row[7] || '',
          facilities: row[8] || '',
          parking: row[9] || '',
        },
        satisfiedService: row[10] || undefined,
        improvementNeeded: row[11] || undefined,
        overallRating: parseInt(row[12]) || 0,
      };
    });
}

// 통계 계산 함수들
export function calculateStats(responses: SurveyResponse[]) {
  const totalResponses = responses.length;
  const avgRating =
    responses.reduce((sum, r) => sum + r.overallRating, 0) / totalResponses;
  const frequentVisitors =
    responses.filter(
      (r) => r.visitFrequency === '주 1회 이상'
    ).length / totalResponses;

  return {
    totalResponses,
    avgRating: Math.round(avgRating * 10) / 10,
    frequentVisitorRate: Math.round(frequentVisitors * 100),
  };
}

// 성별 분포 계산
export function getGenderDistribution(responses: SurveyResponse[]) {
  const distribution: Record<string, number> = {};
  responses.forEach((r) => {
    distribution[r.gender] = (distribution[r.gender] || 0) + 1;
  });
  return Object.entries(distribution).map(([name, value]) => ({
    name,
    value,
  }));
}

// 연령대 분포 계산
export function getAgeDistribution(responses: SurveyResponse[]) {
  const distribution: Record<string, number> = {};
  responses.forEach((r) => {
    distribution[r.age] = (distribution[r.age] || 0) + 1;
  });
  return Object.entries(distribution)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => {
      const ageOrder = ['20대', '30대', '40대', '50대', '60대 이상'];
      return ageOrder.indexOf(a.name) - ageOrder.indexOf(b.name);
    });
}

// 방문 빈도 분포 계산
export function getVisitFrequencyDistribution(responses: SurveyResponse[]) {
  const distribution: Record<string, number> = {};
  responses.forEach((r) => {
    distribution[r.visitFrequency] = (distribution[r.visitFrequency] || 0) + 1;
  });
  return Object.entries(distribution).map(([name, value]) => ({
    name,
    value,
  }));
}

// 방문 목적별 분석 (복수응답)
export function getVisitPurposeDistribution(responses: SurveyResponse[]) {
  const distribution: Record<string, number> = {};
  responses.forEach((r) => {
    r.visitPurpose.forEach((purpose) => {
      distribution[purpose] = (distribution[purpose] || 0) + 1;
    });
  });
  return Object.entries(distribution)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

// 만족도 항목별 평균 계산
export function getSatisfactionAverages(responses: SurveyResponse[]) {
  const items = [
    { key: 'staffFriendliness', label: '직원 친절도' },
    { key: 'productVariety', label: '상품 구색' },
    { key: 'cleanliness', label: '매장 청결' },
    { key: 'facilities', label: '편의시설' },
    { key: 'parking', label: '주차시설' },
  ];

  return items.map((item) => {
    const values = responses
      .map((r) => satisfactionToNumber(r.satisfaction[item.key as keyof typeof r.satisfaction]))
      .filter((v) => v > 0);
    const avg = values.length > 0
      ? values.reduce((sum, v) => sum + v, 0) / values.length
      : 0;
    return {
      label: item.label,
      value: Math.round(avg * 10) / 10,
    };
  });
}

// 만족 서비스 TOP N
export function getTopSatisfiedServices(responses: SurveyResponse[], topN: number = 5) {
  const distribution: Record<string, number> = {};
  responses.forEach((r) => {
    if (r.satisfiedService && r.satisfiedService !== '없음') {
      distribution[r.satisfiedService] = (distribution[r.satisfiedService] || 0) + 1;
    }
  });
  return Object.entries(distribution)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, topN);
}

// 개선 필요 서비스 TOP N
export function getTopImprovementNeeded(responses: SurveyResponse[], topN: number = 5) {
  const distribution: Record<string, number> = {};
  responses.forEach((r) => {
    if (r.improvementNeeded && r.improvementNeeded !== '없음') {
      distribution[r.improvementNeeded] = (distribution[r.improvementNeeded] || 0) + 1;
    }
  });
  return Object.entries(distribution)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, topN);
}

// 별점 분포 계산
export function getRatingDistribution(responses: SurveyResponse[]) {
  const distribution: Record<number, number> = {};
  responses.forEach((r) => {
    distribution[r.overallRating] = (distribution[r.overallRating] || 0) + 1;
  });
  return [1, 2, 3, 4, 5].map((rating) => ({
    rating,
    count: distribution[rating] || 0,
  }));
}

