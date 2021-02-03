import { useState } from 'react'
import Fuse from 'fuse.js'

type setter<T> = (items: T[]) => void

type runQuery = (query: string) => void

function useSearch<T>(): [T[] | undefined, setter<T>, string, runQuery] {
  const [query, setQuery] = useState<string>('')

  const [filtered, setFiltered] = useState<T[]>()

  const [fuse, setFuse] = useState<Fuse<T>>()

  const setter: setter<T> = items => {
    setFuse(new Fuse(items))

    setFiltered(undefined)
  }

  const runQuery: runQuery = (query: string) => {
    setQuery(query)

    setFiltered(query === '' ? undefined : fuse?.search(query)?.map(r => r.item))
  }

  return [filtered, setter, query, runQuery]
}

export default useSearch
