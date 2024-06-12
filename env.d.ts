/// <reference types="vite/client" />

import type {ImportMetaEnv} from "vite/types/importMeta";

interface ImportMeta {
    readonly env: ImportMetaEnv
}