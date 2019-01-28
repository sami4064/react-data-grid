import NumericFilter from './NumericFilter';
import DateRangeFilter from './DateRangeFilter';
import AutoCompleteFilter from './AutoCompleteFilter';
import MultiSelectFilter from './MultiSelectFilter';
import SingleSelectFilter from './SingleSelectFilter';

const Filters = {
  NumericFilter: NumericFilter,
  DateRangeFilter: DateRangeFilter,
  AutoCompleteFilter: AutoCompleteFilter,
  MultiSelectFilter: MultiSelectFilter,
  SingleSelectFilter: SingleSelectFilter
};

module.exports = Filters;
