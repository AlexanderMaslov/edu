import type { Brand } from '../helpers/Brand';

type Password = Brand<string, 'Password'>;
type Email = Brand<string, 'Email'>;

const password = '123123' as Password;
const email = 'jdoe@example.com' as Email;
