import { createAction } from '@reduxjs/toolkit';

export const apiCallBegan = createAction<{
  url: string;
  onSuccess?: string;
  onError?: string;
}>('api/CallBegan');
export const apiCallSuccess = createAction('api/CallSuccess');
export const apiCallFailded = createAction<unknown>('api/CallFailded');
