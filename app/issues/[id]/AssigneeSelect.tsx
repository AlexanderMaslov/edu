'use client';
import type { User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    void (async function () {
      const res = await fetch('/api/users');
      const data = (await res.json()) as User[];
      setUsers(data);
    })();
  }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;