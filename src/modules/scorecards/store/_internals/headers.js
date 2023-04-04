import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export default [
  {
    value: 'name',
    locale: 'objects.name',
    show: true,
    field: 'name',
    sort: SortSymbols.NONE,
  },
  {
    value: 'description',
    locale: 'objects.description',
    show: true,
    field: 'description',
    sort: SortSymbols.NONE,
  },
  {
    value: 'createdAt',
    locale: 'objects.createdAt',
    show: true,
    field: 'created_at',
    sort: SortSymbols.NONE,
  },
  {
    value: 'createdBy',
    locale: 'objects.createdBy',
    show: true,
    field: 'created_by',
    sort: SortSymbols.NONE,
  },
  {
    value: 'modifiedAt',
    locale: 'objects.modifiedAt',
    show: true,
    field: 'updated_at',
    sort: SortSymbols.NONE,
  },
  {
    value: 'modifiedBy',
    locale: 'objects.modifiedBy',
    show: true,
    field: 'updated_by',
    sort: SortSymbols.NONE,
  },
  {
    value: 'state',
    locale: 'objects.state',
    show: true,
    field: 'enabled',
    sort: SortSymbols.NONE,
  },
];
