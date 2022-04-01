import { useEffect, useState } from 'react'

const PREFIX = 'whatsapp-clone-'

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey)
    if (jsonValue !== null) return JSON.parse(jsonValue)
    if (typeof initialValue === 'function') {
      return initialValue()
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(prefixedKey, JSON.stringify(value))
    }
  }, [prefixedKey, value])

  return [value, setValue]
}
