import { useState, useCallback } from 'react'
import Fuse from 'fuse.js'

type runQuery = (query: string) => void

export default function useSearch<T>(fuse?: Fuse<T>): [T[] | undefined, runQuery] {
  const [filtered, setFiltered] = useState<T[]>()

  const runQuery: runQuery = query => setFiltered(query === '' ? undefined : fuse?.search(query)?.map(r => r.item))

  return [filtered, useCallback(runQuery, [fuse])]
}
