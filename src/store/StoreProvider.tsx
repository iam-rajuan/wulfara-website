'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchMe } from './slices/authSlice';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      store.dispatch(fetchMe());
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
