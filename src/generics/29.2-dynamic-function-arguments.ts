interface Events {
  click: {
    x: number;
    y: number;
  };
  focus: undefined;
}

const sendEvent = <TEventKey extends keyof Events>(
  event: TEventKey,
  ...args: Events[TEventKey] extends undefined
    ? []
    : [payload: Events[TEventKey]]
) => {
  //
};

sendEvent('click', { x: 1, y: 1 });
sendEvent('focus');
