'use client';
import type { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    void (async function () {
      const res = await fetch('/api/users');
      const data = (await res.json()) as User[];
      setUsers(data);
    })();
  }, []);

  const handleChange = async (userId: string) => {
    const assignedToUserId = userId === 'unassigned' ? null : userId;
    const res = await fetch(`/api/issues/${issue.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ assignedToUserId }),
    });
    if (!res.ok) toast.error('Changes could not be saved');
  };

  return (
    <>
      <Select.Root
        defaultValue={issue?.assignedToUserId ?? 'unassigned'}
        onValueChange={handleChange}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
