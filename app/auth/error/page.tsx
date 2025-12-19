import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

// 동적 렌더링 강제
export const dynamic = 'force-dynamic';

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-2xl font-bold">접근 거부</CardTitle>
          </div>
          <CardDescription>
            이 대시보드는 골든래빗 직원만 접근할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            @goldenrabbit.co.kr 도메인의 구글 계정으로만 로그인할 수 있습니다.
            다른 구글 계정으로는 접근이 제한됩니다.
          </p>
          <Button asChild className="w-full">
            <Link href="/auth/signin">다시 로그인 시도</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

