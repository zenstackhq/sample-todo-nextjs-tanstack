import { test } from 'vitest';
import { screen } from '@testing-library/react';
import { renderProvide } from './create-wrapper';
import { SpaceHomeComponent } from 'pages/s/[slug]';

test('Page', () => {
    renderProvide(
        <SpaceHomeComponent
            space={{
                id: 'a',
                createdAt: new Date(),
                name: 'mySpace',
                slug: 'space',
                updatedAt: new Date(),
                components: [],
            }}
        />,
    );
    screen.getByText('Components');
});
