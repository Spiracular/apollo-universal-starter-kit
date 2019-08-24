import React from 'react';

import { act, fireEvent, render, waitForElement } from '@testing-library/react';
import { Renderer } from '@gqlapp/testing-client-react';

import ReduxCounter from '../containers/ReduxCounter';

const COUNTER_REDUX_VALUE = 1;

describe('Redux counter example UI works', () => {
  const renderer = new Renderer({}, {});
  let dom: any;

  it('Counter section renders with state data', async () => {
    act(() => {
      dom = render(renderer.withApollo(<ReduxCounter />));
    });
    await waitForElement(() => dom.getByText(RegExp(`The current counter value is ${COUNTER_REDUX_VALUE}.`)));
  });

  it('Clicking on increase counter button shows optimistic response', async () => {
    const reduxButton = dom.getByTestId('redux-button');

    act(() => {
      fireEvent.click(reduxButton);
    });

    await waitForElement(() => dom.getByText(RegExp(`The current counter value is ${COUNTER_REDUX_VALUE + 1}.`)));
  });
});
