import { useState, useEffect, memo } from 'react'
import { Input, Button } from 'semantic-ui-react'

interface ProductsSearchInputProps {
  onSearch: (query: string) => void
}

const ProductsSearchInput = ({ onSearch }: ProductsSearchInputProps) => {
  const [query, setQuery] = useState<string>('')

  useEffect(() => {
    if (query === '') {
      onSearch(query)
    } else {
      const timeout = setTimeout(() => onSearch(query), 500)

      return () => clearTimeout(timeout)
    }
  }, [query])

  return (
    <Input
      fluid
      icon='search'
      iconPosition='left'
      value={query}
      onChange={e => setQuery(e.target.value)}
      action={<Button basic icon='delete' onClick={() => setQuery('')} />}
    />
  )
}

export default memo(ProductsSearchInput)
