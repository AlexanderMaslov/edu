function returnWhatIPassInExceptFor1(t: 1): unknown;
function returnWhatIPassInExceptFor1<T>(t: T): T;
function returnWhatIPassInExceptFor1(t: unknown): unknown {
  return t;
}

const a = returnWhatIPassInExceptFor1('a');
const b = returnWhatIPassInExceptFor1('b');
const c = returnWhatIPassInExceptFor1('c');
const result = returnWhatIPassInExceptFor1(1);
