import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function SalesChartSkeleton() {
  return (
    <Card>
      <CardContent className="h-[clamp(240px,42.5vh,420px)] w-full">
        <div className="h-full flex items-end justify-around px-12 pb-8">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton
              key={i}
              className="w-full bg-gray-200 rounded-t"
              style={{
                height: `${Math.random() * 50 + 30}%`,
                maxWidth: '52px',
              }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
