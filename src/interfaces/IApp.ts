import React from 'react'

export interface AppContextType {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
  };
