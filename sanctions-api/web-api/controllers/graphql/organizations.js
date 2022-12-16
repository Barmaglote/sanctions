import OrganizationsModel from '../../models/organizations/model.js'

export async function Organizations(lazyLoadEvent) {

  const { sortField, sortOrder, first, rows } = lazyLoadEvent || { sortField: 'id', sortOrder: '-1', first: 0, rows: 50 }
  const sorting = {}
  sorting[sortField] = sortOrder

  const filter = {}
  const { filters } = lazyLoadEvent;

  if (filters?.tags) {
    filter.tag = { $in: filters.tags }
  }

  if (filters?.title) {
    filter.$or = [{ titlerus: new RegExp(filters.title) }, { titleeng: new RegExp(filters.title) }]
  }

  return await OrganizationsModel.find(filter).sort(sorting).skip(first).limit(rows)
}

export async function OrganizationsTotal(lazyLoadEvent) {

  const { sortField, sortOrder } = lazyLoadEvent || { sortField: 'id', sortOrder: '-1' }
  const sorting = {}
  sorting[sortField] = sortOrder

  const filter = {}
  const { filters } = lazyLoadEvent;

  if (filters?.tags) {
    filter.tag = { $in: filters.tags }
  }

  if (filters?.title) {
    filter.$or = [{ titlerus: new RegExp(filters.title) }, { titleeng: new RegExp(filters.title) }]
  }

  return await await OrganizationsModel.count(filter)
}
