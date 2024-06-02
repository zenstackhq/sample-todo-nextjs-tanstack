import { test } from 'vitest';
import { screen } from '@testing-library/react';
import { renderProvide } from '../create-wrapper';
import { Applications } from '@/components/Application/Applications';

test('Should display loader when no data', async () => {
    renderProvide(<Applications />);
    screen.getByText('Loading...');
});
