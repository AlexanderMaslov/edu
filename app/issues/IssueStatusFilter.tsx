'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

const statuses: { label: string; value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: Status.OPEN },
  { label: 'In Progress', value: Status.IN_PROGRESS },
  { label: 'Closed', value: Status.CLOSED },
];

export const IssueStatusFilter = () => {
  const router = useRouter();

  const defaultValue = statuses[0].value;

  const handleChange = (status: string) => {
    const query = status ? `?status=${status}` : '';
    router.push(`/issues${query}`);
  };

  return (
    <Select.Root defaultValue={defaultValue} onValueChange={handleChange}>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value as string}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};
