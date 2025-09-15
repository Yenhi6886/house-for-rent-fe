import { useState, useCallback } from 'react'

// Custom hook để manage API calls
export const useApi = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const call = useCallback(async (apiFunction, ...args) => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiFunction(...args)
      return result
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    loading,
    error,
    call,
    clearError
  }
}

export default useApi
