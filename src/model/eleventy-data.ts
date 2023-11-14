/**
 * Interface describing the main Eleventy data object.
 */
export interface EleventyData<Type> {
  [key: string]: EleventyCollection<Type>|ProjectPackageData;
  pkg: ProjectPackageData;
}

/**
 * Interface describing project.json data.
 */
export interface ProjectPackageData {
  dependencies: {[key: string]: string};
  devDependencies: {[key: string]: string};
}

/**
 * Interface describing the Eleventy page data object.
 */
export interface EleventyPageData {
  fileSlug: string;
  filePathStem: string;
}

/**
 * Interface describing the Eleventy collection object.
 */
export interface EleventyCollection<Type> {
  data: Type;
  page: EleventyPageData;
}

/**
 * Interface describing the Eleventy collection data object.
 */
export interface EleventyCollectionData<Type> {
  eleventyExcludeFromCollections?: boolean;
  pagination: {data: string; size: number; alias: string;};
  permalink: string|((data: Type) => string);
}