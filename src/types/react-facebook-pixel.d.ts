declare module 'react-facebook-pixel' {
  interface Options {
    autoConfig?: boolean;
    debug?: boolean;
  }

  interface AdvancedMatching {
    em?: string;
    fn?: string;
    ln?: string;
    ph?: string;
    ge?: string;
    db?: string;
    ct?: string;
    st?: string;
    zp?: string;
    cn?: string;
  }

  interface PurchaseParameters {
    value: number;
    currency: string;
    content_ids?: string[];
    content_type?: string;
    contents?: any[];
  }
  
  interface ViewContentParameters {
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    content_type?: string;
    contents?: any[];
    value?: number;
    currency?: string;
  }

  const ReactPixel: {
    init(pixelId: string, advancedMatching?: AdvancedMatching, options?: Options): void;
    pageView(): void;
    track(event: string, data?: any): void;
    trackSingle(pixelId: string, event: string, data?: any): void;
    trackCustom(event: string, data?: any): void;
    trackSingleCustom(pixelId: string, event: string, data?: any): void;
    fbq(command: string, ...args: any[]): void;
  };

  export default ReactPixel;
} 