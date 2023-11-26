import type { Metadata } from 'next';
import { Pagination } from './components/Pagination';

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues',
};

interface Props {
  searchParams: { page: string };
}

export default async function Home({ searchParams }: Props) {
  return (
    <Pagination
      itemCount={100}
      pageSize={10}
      currentPage={parseInt(searchParams.page)}
    />
  );
}
