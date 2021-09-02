// eslint-disable-next-line import/named
import { render, screen, waitFor } from '@testing-library/react'

import App from './App'

describe('App', () => {
  it('should show hello vid!', async () => {
    // arrange
    render(<App />)

    // assert
    await waitFor(() =>
      expect(screen.getByRole('heading')).toHaveTextContent(/hello vid!/i)
    )
  })
})
