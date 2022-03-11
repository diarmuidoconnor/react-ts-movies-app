import { useState, Dispatch, SetStateAction } from "react";
import {
  ListedMovie,
  FilteringConfig,
  FilterValue,
  FilterCondition,
} from "../types";

const useFiltering: (
  d: ListedMovie[],
  f: FilteringConfig<ListedMovie>[]
) => {
  filterValues: FilterValue<ListedMovie>[];
  setFilterValues: Dispatch<SetStateAction<FilterValue<ListedMovie>[]>>;
  filterFunction: (g: ListedMovie[]) => ListedMovie[];
} = (data, filters) => {
  const [filterValues, setFilterValues] = useState<FilterValue<ListedMovie>[]>(
    () => {
      const filterInitialValues: FilterValue<ListedMovie>[] = filters.map(
        (f) => ({
          name: f.name,
          value: f.value,
        })
      );
      return filterInitialValues;
    }
  );

  const filteringConditions: FilterCondition<ListedMovie>[] = filters.map(
    (f) => f.condition
  );
  const filterFunction: (c: ListedMovie[]) => ListedMovie[] = (collection) =>
    filteringConditions.reduce((data, conditionFn, index) => {
      return data.filter((item) => {
        return conditionFn(item, filterValues[index].value);
      });
    }, collection);

  return {
    filterValues,
    setFilterValues,
    filterFunction,
  };
};

export default useFiltering;
