import React, { createContext, useContext, useState, useEffect } from "react";

const ConfigContext = createContext<AppConfigProps | undefined>(undefined);

const useConfigState = () => {
  const [config, setConfig] = useState<AppConfigProps | null>(null);

  const loadConfig = async () => {
    const response = await window.ipcRenderer.invoke("config-load");
    setConfig(response);
  };

  useEffect(() => {
    loadConfig();
  }, []);

  return { config, setConfig, loadConfig };
};

export const AppConfigProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { config } = useConfigState();

  return (
    <ConfigContext.Provider value={config ?? {}}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};

export const saveConfig = async (data: AppConfigProps) => {
  const { loadConfig } = useConfigState();
  window.ipcRenderer.invoke("config-save", data);
  await loadConfig();
};
