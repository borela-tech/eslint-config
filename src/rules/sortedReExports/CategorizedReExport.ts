import type {NamedReExport} from './NamedReExport'
import type {ReExportAll} from './ReExportAll'
import type {ReExportNamespace} from './ReExportNamespace'
import type {TypeAll} from './TypeAll'
import type {TypeNamespace} from './TypeNamespace'

export type CategorizedReExport =
  | NamedReExport
  | ReExportAll
  | ReExportNamespace
  | TypeAll
  | TypeNamespace
