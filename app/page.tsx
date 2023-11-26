import { Pagination } from './components/Pagination';

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
