import { render, screen } from '@testing-library/react';
import {MockedProvider} from '@apollo/react-testing';
import FilterBar from '../../components/FilterBar';


describe('It loads the filter bar', () => {
    it('loads filter state with Best and expects best to have an active class', () => {
        const { container, debug } = render(
            <MockedProvider >
              <FilterBar filterState="Best" setFilterState={() => {console.log('here')}}/>
            </MockedProvider>
          );

          //expect best to have the active class and an aria-disabled

          let identifier = screen.getByTestId('best-filter-bar');
          expect(identifier).toHaveAttribute('aria-disabled')
          expect(container).toMatchSnapshot();



    });

    it('loads a different filter state and expects changes', () => {
        const { container, debug } = render(
            <MockedProvider >
              <FilterBar filterState="Top" setFilterState={() => {console.log('here')}}/>
            </MockedProvider>
          );

          let identifier = screen.getByTestId('best-filter-bar');
          expect(identifier).not.toBeDisabled();

          let identifier2 = screen.getByTestId('top-filter-bar');
          expect(identifier2).toHaveAttribute('aria-disabled');
    })
})