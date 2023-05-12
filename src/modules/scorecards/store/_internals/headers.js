import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
  {
    value: 'name',
    locale: 'reusable.name',
    show: true,
    field: 'name',
    sort: SortSymbols.NONE,
  },
  {
    value: 'description',
    locale: 'vocabulary.description',
    show: true,
    field: 'description',
    sort: SortSymbols.NONE,
  },
  {
    value: 'createdAt',
    locale: 'reusable.createdAt',
    show: true,
    field: 'created_at',
    sort: SortSymbols.NONE,
  },
  {
    value: 'createdBy',
    locale: 'reusable.createdBy',
    show: true,
    field: 'created_by',
    sort: SortSymbols.NONE,
  },
  {
    value: 'modifiedAt',
    locale: 'reusable.modifiedAt',
    show: true,
    field: 'updated_at',
    sort: SortSymbols.NONE,
  },
  {
    value: 'modifiedBy',
    locale: 'reusable.modifiedBy',
    show: true,
    field: 'updated_by',
    sort: SortSymbols.NONE,
  },
  {
    value: 'state',
    locale: 'reusable.state',
    width: '100px',
    show: true,
    field: 'enabled',
    sort: SortSymbols.NONE,
  },
];
