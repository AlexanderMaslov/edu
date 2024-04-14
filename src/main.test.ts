import { db } from '../mocks/db';

describe('group', () => {
  it('should', async () => {
    const product = db.product.create({ name: 'apple' });
    console.log('product: ', product);
    console.log(db.product.getAll());
  });
});
