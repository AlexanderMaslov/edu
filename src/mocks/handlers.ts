import { http, HttpResponse } from 'msw';
import type { Bug } from '@/store/bugs';

export const handlers = [
  http.get('/api/bugs', () => {
    return HttpResponse.json<Bug[]>([
      {
        id: 1,
        description: 'bug1',
        userId: 1,
        resolved: true,
      },
      {
        id: 2,
        description: 'bug2',
        userId: 1,
      },
      {
        id: 3,
        description: 'bug3',
        userId: 2,
      },
      {
        id: 4,
        description: 'bug4',
      },
    ]);
  }),
];
