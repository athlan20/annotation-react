// import { composeStory } from '@storybook/react';
import { screen } from '@testing-library/react';
import { expect, it, test } from 'vitest';

// const NormalAnnotation = composeStory(NormalStory, Meta);

test('something truthy and falsy', () => {
  // render(<NormalAnnotation />);
  it('true to be true', () => {
    expect(screen.getByText('This is an annotation'));
  });

  // it('false to be false', () => {
  //   expect(false).toBe(false);
  // });
});
