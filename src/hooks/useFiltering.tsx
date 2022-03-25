import { useState, Dispatch, SetStateAction } from "react";
import {
  Filters,
  FilterValues,
  MovieModels,
  FilterCondition,
} from "../types";

function useFiltering<T extends MovieModels, A extends string>(
  data: T[],
  filters: Filters<T, A>
): {
  filterValues: FilterValues<A>;
  setFilterValues: Dispatch<SetStateAction<FilterValues<A>>>;
  filterFunction: (g: T[]) => T[];
} {
  const [filterValues, setFilterValues] = useState<FilterValues<A>>(() => {
    let filterInitialValues = {} as FilterValues<A>;
    Object.keys(filters).forEach((k) => {
      const key: A = k as A;
      filterInitialValues[key] = filters[key].value;
    });
    return filterInitialValues;
  });
  let filteringConditions: FilterCondition<T>[] = [];
  let rawfilterValues: string[] = [];
  Object.keys(filters).forEach((k) => {
    const key: A = k as A;
    filteringConditions.push(filters[key].condition);
    rawfilterValues.push(filterValues[key]);
  });
  const filterFunction: (c: T[]) => T[] = (collection) => {
    return filteringConditions.reduce((data, conditionFn, index) => {
      return data.filter((item) => {
        return conditionFn(item, rawfilterValues[index]);
      });
    }, collection);
  };

  return {
    filterValues,
    setFilterValues,
    filterFunction,
  };
}

export default useFiltering;
