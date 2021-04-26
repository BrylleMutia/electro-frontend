import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useHeaders = () => {
  interface HeadersInterface {
    headers: {
      "Content-Type": string,
      "x-auth-token"?: string
    }
  }

  const config: HeadersInterface = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  // check for token
  const token = localStorage.getItem('token');
  if(token) config.headers['x-auth-token'] = token;

  return config;
}