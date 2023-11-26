'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';

const statuses: { label: string; value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: Status.OPEN },
  { label: 'In Progress', value: Status.IN_PROGRESS },
  { label: 'Closed', value: Status.CLOSED },
];

export const IssueStatusFilter = () => {
  const defaultValue = statuses[0].value;

  return (
    <Select.Root defaultValue={defaultValue}>
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
