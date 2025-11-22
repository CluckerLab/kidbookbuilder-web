"use client";

import { Amplify } from 'aws-amplify';
import config from '@/amplify_outputs.json';
import { useEffect } from 'react';

export function AmplifyProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    Amplify.configure(config, {
      ssr: true
    });
  }, []);

  return <>{children}</>;
}
