// FIX: The original `/// <reference types="vite/client" />` was removed to fix a
// "Cannot find type definition file" error. This is likely due to a project setup issue.
// The interfaces below manually provide the necessary types for `import.meta.env`,
// which resolves the TypeScript error and correctly types the environment variables.

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
