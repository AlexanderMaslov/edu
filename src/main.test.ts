import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

describe('group', () => {
  it('should', async () => {
    console.log({
      name: faker.commerce.productName(),
      price: faker.commerce.price({ min: 1, max: 100 }),
    });
  });
});
