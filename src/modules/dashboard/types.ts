export interface MajorIndicesSectionConfig {
  /**
   * Heading text for the major indices section.
   * @default "Major Index Performance"
   */
  title?: string;
}

export interface DashboardConfig {
  /**
   * Main page title (h1).
   * @default "Your FMP Financial Dashboard"
   */
  title?: string;

  /**
   * Configuration for the major indices section.
   * @default true
   */
  majorIndices?: MajorIndicesSectionConfig | boolean;
}
