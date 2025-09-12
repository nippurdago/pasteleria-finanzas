// Fix for "Cannot find type definition file for 'vite/client'" and "Property 'env' does not exist on type 'ImportMeta'".
// Manually defining the environment variables for `import.meta.env`
// ensures TypeScript recognizes them without relying on the vite/client types that are not being found.
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
