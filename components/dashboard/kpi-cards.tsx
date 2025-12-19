import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface KPICardsProps {
  totalResponses: number;
  avgRating: number;
  frequentVisitorRate: number;
}

export function KPICards({ totalResponses, avgRating, frequentVisitorRate }: KPICardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">총 응답 수</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalResponses}</div>
          <p className="text-xs text-muted-foreground">설문 참여 고객 수</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">평균 별점</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
          <p className="text-xs text-muted-foreground">5점 만점 기준</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">재방문율</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{frequentVisitorRate}%</div>
          <p className="text-xs text-muted-foreground">주 1회 이상 방문</p>
        </CardContent>
      </Card>
    </div>
  );
}

