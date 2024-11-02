export type PdfResultProps = {
  success: boolean;
  path?: string;
  error?: string;
  canceled?: boolean;
};

export type PdfDataProps = {
  template: string;
  config?: any;
};
