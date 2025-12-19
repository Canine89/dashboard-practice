import { KPICards } from '@/components/dashboard/kpi-cards';
import { DemographicsChart } from '@/components/dashboard/demographics-chart';
import { VisitPatternChart } from '@/components/dashboard/visit-pattern-chart';
import { SatisfactionChart } from '@/components/dashboard/satisfaction-chart';
import { FeedbackSection } from '@/components/dashboard/feedback-section';
import { DataTable } from '@/components/dashboard/data-table';
import { DashboardHeader } from '@/components/dashboard/header';
import {
  calculateStats,
  getGenderDistribution,
  getAgeDistribution,
  getVisitFrequencyDistribution,
  getVisitPurposeDistribution,
  getSatisfactionAverages,
  getTopSatisfiedServices,
  getTopImprovementNeeded,
  getRatingDistribution,
  parseSheetData,
} from '@/lib/data-utils';
import { getSheetData } from '@/lib/google-sheets';

async function getDashboardData() {
  try {
    const data = await getSheetData();
    const responses = parseSheetData(data);
    
    return {
      responses,
      stats: calculateStats(responses),
      genderData: getGenderDistribution(responses),
      ageData: getAgeDistribution(responses),
      frequencyData: getVisitFrequencyDistribution(responses),
      purposeData: getVisitPurposeDistribution(responses),
      satisfactionData: getSatisfactionAverages(responses),
      satisfiedServices: getTopSatisfiedServices(responses, 5),
      improvementNeeded: getTopImprovementNeeded(responses, 5),
      ratingDistribution: getRatingDistribution(responses),
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
}

export default async function DashboardPage() {
  const dashboardData = await getDashboardData();

  return (
    <>
      <DashboardHeader />
      <div className="container mx-auto py-8 space-y-8">
        <div className="space-y-2">
          <p className="text-muted-foreground">
            Google Sheets에서 실시간으로 데이터를 가져와 고객 만족도를 분석합니다.
          </p>
        </div>

      <KPICards
        totalResponses={dashboardData.stats.totalResponses}
        avgRating={dashboardData.stats.avgRating}
        frequentVisitorRate={dashboardData.stats.frequentVisitorRate}
      />

      <DemographicsChart
        genderData={dashboardData.genderData}
        ageData={dashboardData.ageData}
      />

      <VisitPatternChart
        frequencyData={dashboardData.frequencyData}
        purposeData={dashboardData.purposeData}
      />

      <SatisfactionChart satisfactionData={dashboardData.satisfactionData} />

      <FeedbackSection
        satisfiedServices={dashboardData.satisfiedServices}
        improvementNeeded={dashboardData.improvementNeeded}
        ratingDistribution={dashboardData.ratingDistribution}
      />

      <DataTable data={dashboardData.responses} />
      </div>
    </>
  );
}
