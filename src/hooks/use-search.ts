import { useState, useCallback } from 'react'
import Fuse from 'fuse.js'

type setData<T> = (items: T[], options?: Fuse.IFuseOptions<T> | undefined) => void

type runQuery = (query: string) => void

export default function useSearch<T>(): [T[] | undefined, setData<T>, runQuery] {
  const [filtered, setFiltered] = useState<T[]>()

  const [fuse, setFuse] = useState<Fuse<T>>()

  const setData: setData<T> = (items, options) => {
    setFuse(new Fuse(items, options))

    setFiltered(undefined)
  }

  const runQuery: runQuery = query => setFiltered(query === '' ? undefined : fuse?.search(query)?.map(r => r.item))

  return [filtered, setData, useCallback(runQuery, [fuse])]
}
