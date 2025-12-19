'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SurveyResponse } from '@/lib/data-utils';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface DataTableProps {
  data: SurveyResponse[];
}

const ITEMS_PER_PAGE = 7;

export function DataTable({ data }: DataTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // 검색 필터링
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return data;
    }

    const query = searchQuery.toLowerCase();
    return data.filter((row) => {
      return (
        row.timestamp.toLowerCase().includes(query) ||
        row.gender.toLowerCase().includes(query) ||
        row.age.toLowerCase().includes(query) ||
        row.visitFrequency.toLowerCase().includes(query) ||
        row.visitPurpose.some((purpose) =>
          purpose.toLowerCase().includes(query)
        ) ||
        row.satisfaction.staffFriendliness.toLowerCase().includes(query) ||
        row.satisfaction.productVariety.toLowerCase().includes(query) ||
        row.satisfaction.cleanliness.toLowerCase().includes(query) ||
        row.satisfaction.facilities.toLowerCase().includes(query) ||
        row.satisfaction.parking.toLowerCase().includes(query) ||
        (row.satisfiedService &&
          row.satisfiedService.toLowerCase().includes(query)) ||
        (row.improvementNeeded &&
          row.improvementNeeded.toLowerCase().includes(query)) ||
        row.overallRating.toString().includes(query)
      );
    });
  }, [data, searchQuery]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // 검색어 변경 시 첫 페이지로 이동
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>설문 응답 데이터</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              총 {filteredData.length}개의 응답 데이터를 표시합니다.
              {searchQuery && (
                <span className="ml-2">
                  (검색 결과: {filteredData.length}개)
                </span>
              )}
            </p>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="검색..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">날짜</TableHead>
                <TableHead className="min-w-[60px]">성별</TableHead>
                <TableHead className="min-w-[80px]">연령대</TableHead>
                <TableHead className="min-w-[100px]">방문빈도</TableHead>
                <TableHead className="min-w-[150px]">방문목적</TableHead>
                <TableHead className="min-w-[80px]">직원친절도</TableHead>
                <TableHead className="min-w-[80px]">상품구색</TableHead>
                <TableHead className="min-w-[80px]">매장청결</TableHead>
                <TableHead className="min-w-[80px]">편의시설</TableHead>
                <TableHead className="min-w-[80px]">주차시설</TableHead>
                <TableHead className="min-w-[100px]">만족서비스</TableHead>
                <TableHead className="min-w-[100px]">개선필요</TableHead>
                <TableHead className="min-w-[60px]">별점</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row, index) => (
                  <TableRow key={startIndex + index}>
                    <TableCell className="font-mono text-xs">
                      {row.timestamp}
                    </TableCell>
                    <TableCell>{row.gender}</TableCell>
                    <TableCell>{row.age}</TableCell>
                    <TableCell>{row.visitFrequency}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {row.visitPurpose.map((purpose, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {purpose}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          row.satisfaction.staffFriendliness === '매우 만족'
                            ? 'default'
                            : row.satisfaction.staffFriendliness === '만족'
                            ? 'secondary'
                            : 'outline'
                        }
                        className="text-xs"
                      >
                        {row.satisfaction.staffFriendliness}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          row.satisfaction.productVariety === '매우 만족'
                            ? 'default'
                            : row.satisfaction.productVariety === '만족'
                            ? 'secondary'
                            : 'outline'
                        }
                        className="text-xs"
                      >
                        {row.satisfaction.productVariety}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          row.satisfaction.cleanliness === '매우 만족'
                            ? 'default'
                            : row.satisfaction.cleanliness === '만족'
                            ? 'secondary'
                            : 'outline'
                        }
                        className="text-xs"
                      >
                        {row.satisfaction.cleanliness}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          row.satisfaction.facilities === '매우 만족'
                            ? 'default'
                            : row.satisfaction.facilities === '만족'
                            ? 'secondary'
                            : 'outline'
                        }
                        className="text-xs"
                      >
                        {row.satisfaction.facilities}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          row.satisfaction.parking === '매우 만족'
                            ? 'default'
                            : row.satisfaction.parking === '만족'
                            ? 'secondary'
                            : 'outline'
                        }
                        className="text-xs"
                      >
                        {row.satisfaction.parking}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {row.satisfiedService || '-'}
                    </TableCell>
                    <TableCell className="text-sm">
                      {row.improvementNeeded || '-'}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          row.overallRating >= 4
                            ? 'default'
                            : row.overallRating >= 3
                            ? 'secondary'
                            : 'destructive'
                        }
                        className="text-xs"
                      >
                        {row.overallRating}점
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={13}
                    className="text-center py-8 text-muted-foreground"
                  >
                    검색 결과가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* 페이지네이션 */}
        {filteredData.length > ITEMS_PER_PAGE && (
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {startIndex + 1} - {Math.min(endIndex, filteredData.length)} /{' '}
              {filteredData.length}개 표시
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Button
                    variant="ghost"
                    size="default"
                    onClick={() => {
                      if (currentPage > 1) {
                        handlePageChange(currentPage - 1);
                      }
                    }}
                    disabled={currentPage === 1}
                    className="pl-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden sm:block">이전</span>
                  </Button>
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
                    // 첫 페이지, 마지막 페이지, 현재 페이지, 현재 페이지 주변 2페이지만 표시
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <Button
                            variant={currentPage === page ? 'outline' : 'ghost'}
                            size="icon"
                            onClick={() => handlePageChange(page)}
                            className={
                              currentPage === page
                                ? 'bg-primary text-primary-foreground'
                                : ''
                            }
                          >
                            {page}
                          </Button>
                        </PaginationItem>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  }
                )}

                <PaginationItem>
                  <Button
                    variant="ghost"
                    size="default"
                    onClick={() => {
                      if (currentPage < totalPages) {
                        handlePageChange(currentPage + 1);
                      }
                    }}
                    disabled={currentPage === totalPages}
                    className="pr-2"
                  >
                    <span className="hidden sm:block">다음</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
