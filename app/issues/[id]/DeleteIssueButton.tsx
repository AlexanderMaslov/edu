'use client';

import { Spinner } from '@/app/components';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await fetch(`/api/issues/${issueId}`, {
        method: 'DELETE',
      });
      router.push('/issues');
      router.refresh();
    } catch (error) {
      setIsError(true);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            Delete Issue
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deleteion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure want to delete this issue? This action cannot be
            undone.
          </AlertDialog.Description>
          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button color="gray" variant="soft">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={handleDelete}>
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={isError}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted
          </AlertDialog.Description>
          <Button
            color="gray"
            variant="soft"
            mt="2"
            onClick={() => setIsError(false)}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};
