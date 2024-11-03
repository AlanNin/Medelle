import { useConfig } from "@/providers/app-config-provider";
import AccountSettingsCardComponent from "./card";

export default function AccountSettingsPage() {
  const config = useConfig();

  console.log(config);

  return (
    <main className="min-h-page bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-6 flex items-center justify-center">
      <AccountSettingsCardComponent />
    </main>
  );
}
