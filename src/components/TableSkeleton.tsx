import { Skeleton } from "@mantine/core";

interface Props {
  width?: number | string;
}

export default function TableSkeleton({ width }: Props) {
  if (!width) {
    return <Skeleton height={18} width="20" />;
  }
  return <Skeleton height={18} width={width} />;
}
