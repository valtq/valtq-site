'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

let clarityInitialized = false;

export function ClarityProvider({ projectId }: { projectId: string }) {
  useEffect(() => {
    if (clarityInitialized) return;
    clarityInitialized = true;
    Clarity.init(projectId);
  }, [projectId]);

  return null;
}
