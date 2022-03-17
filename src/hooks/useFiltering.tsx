import { useState, Dispatch, SetStateAction } from "react";
import {
  ListedMovie,
  MovieT,
  FilteringConfig,
  FilterValue,
  FilterCondition,
} from "../types";

function useFiltering<T extends ListedMovie | MovieT> (data: T[], filters: FilteringConfig<T>[]) 

 :
  {
    filterValues: FilterValue<T>[];
    setFilterValues: Dispatch<SetStateAction<FilterValue<T>[]>>;
    filterFunction: ( g: T[]) => T[];
  } { 
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

  const filteringConditions: FilterCondition<T>[] = filters.map(
    (f) => f.condition
  );
  const filterFunction: (c: T[]) => T[] = (collection) =>
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
