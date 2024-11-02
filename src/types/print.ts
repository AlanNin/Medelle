export type PrinterProps = {
  name: string;
  displayName: string;
  description: string;
  isDefault: boolean;
  status: number;
  options: any;
};

export type PrintersListProps = PrinterProps[];

export type PrintConfigProps = {
  margins?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
};

export type PrintSilentProps = {
  printer: string;
  template: string;
  config?: PrintConfigProps;
};

export type PrintNotSilentProps = {
  template: string;
  config?: PrintConfigProps;
};
