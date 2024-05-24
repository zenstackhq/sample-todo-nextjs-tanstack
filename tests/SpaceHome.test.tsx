import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Space } from '@zenstackhq/runtime/models'
import { SpaceHome } from 'components/Space/SpaceHome'
import { createWrapper } from './create-wrapper'

test('Page', () => {
  const space: Space = {
    id: "a",
    createdAt: new Date(),
    name: "mySpace",
    slug: "space",
    updatedAt: new Date() 
  }
  render(<SpaceHome space={space}/>, { wrapper: createWrapper() })
  screen.getByText('Create a property');
})
