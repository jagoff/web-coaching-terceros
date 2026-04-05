/**
 * Utilidades para generar IDs únicos y estables
 * Evita usar index como key en React
 */

/**
 * Genera un ID único basado en un prefijo y un identificador
 */
export function generateId(prefix: string, identifier: string | number): string {
  return `${prefix}-${identifier}`
}

/**
 * Genera un ID único para items de lista
 */
export function generateListItemId(listName: string, index: number, item?: unknown): string {
  // Si el item tiene un ID propio, usarlo
  if (item && typeof item === 'object' && 'id' in item) {
    return String((item as Record<string, unknown>).id)
  }

  // Si el item tiene un nombre o título, usarlo
  if (item && typeof item === 'object') {
    const obj = item as Record<string, unknown>
    if ('name' in obj)
      return generateId(listName, String(obj.name).toLowerCase().replace(/\s+/g, '-'))
    if ('title' in obj)
      return generateId(listName, String(obj.title).toLowerCase().replace(/\s+/g, '-'))
  }

  // Fallback: usar index pero con prefijo único
  return generateId(listName, index)
}

/**
 * Agrega IDs únicos a un array de objetos
 */
export function addIdsToArray<T extends Record<string, unknown>>(
  array: T[],
  prefix: string,
  idField: string = 'id'
): (T & Record<string, unknown>)[] {
  return array.map((item, index) => ({
    ...item,
    [idField]: item[idField] || generateListItemId(prefix, index, item),
  }))
}

/**
 * Genera un UUID simple (no criptográficamente seguro)
 * Para uso en keys de React donde no se necesita seguridad
 */
export function generateSimpleUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Genera un ID estable basado en el contenido
 * Útil para items que no tienen ID pero tienen contenido único
 */
export function generateContentBasedId(content: string): string {
  // Simple hash function
  let hash = 0
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36)
}
