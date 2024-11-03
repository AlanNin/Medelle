import React, { createContext, useContext, useState, useEffect } from "react";

const ConfigContext = createContext<AppConfigProps | undefined>(undefined);

export const AppConfigProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [config, setConfig] = useState<AppConfigProps | undefined>(undefined);

  useEffect(() => {
    const loadConfig = async () => {
      useConfig;
      const response = await window.ipcRenderer.invoke("config-load");
      setConfig(response);
    };

    loadConfig();
  }, []);

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};

export const saveConfig = (data: AppConfigProps) => {
  window.ipcRenderer.invoke("config-save", data);
};
