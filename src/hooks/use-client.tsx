import React, { createContext, useContext, useState } from 'react';
import { Client } from '../shared/client/client';

interface ClientContextType {
  client: Client;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [client] = useState(() => new Client());

  return (
    <ClientContext.Provider value={{ client }}>
      {children}
    </ClientContext.Provider>
  );
};

const useClient = (): ClientContextType => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
};

export { ClientProvider, useClient };
