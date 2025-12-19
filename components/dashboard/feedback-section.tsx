'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface FeedbackSectionProps {
  satisfiedServices: { name: string; value: number }[];
  improvementNeeded: { name: string; value: number }[];
  ratingDistribution: { rating: number; count: number }[];
}

// 오렌지색 계열 색상 팔레트
const COLORS = [
  '#ff9500', // 주 오렌지
  '#ff8c00', // 다크 오렌지
  '#ffb84d', // 밝은 오렌지
  '#ff7f00', // 진한 오렌지
  '#cc6600', // 어두운 오렌지
];

export function FeedbackSection({ satisfiedServices, improvementNeeded, ratingDistribution }: FeedbackSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>만족 서비스 TOP 5</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {satisfiedServices.map((service, index) => (
              <div key={service.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{index + 1}</Badge>
                  <span className="text-sm">{service.name}</span>
                </div>
                <span className="text-sm font-medium">{service.value}명</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>개선 필요 서비스 TOP 5</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {improvementNeeded.map((service, index) => (
              <div key={service.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{index + 1}</Badge>
                  <span className="text-sm">{service.name}</span>
                </div>
                <span className="text-sm font-medium">{service.value}명</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>별점 분포</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              count: {
                label: '명',
              },
            }}
            className="h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ratingDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ rating, count }) => `${rating}점: ${count}명`}
                  outerRadius={80}
                  fill="#ff9500"
                  dataKey="count"
                >
                  {ratingDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

