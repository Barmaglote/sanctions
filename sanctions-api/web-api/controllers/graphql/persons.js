import PersonsModel from '../../models/persons/model.js'

export async function GetPersons(lazyLoadEvent) {

  const { sortField, sortOrder, first, rows } = lazyLoadEvent || { sortField: 'id', sortOrder: '-1', first: 0, rows: 50 }
  const sorting = {}
  sorting[sortField] = sortOrder 

  const filter = {}
  const { filters } = lazyLoadEvent;

  if (filters?.tags) {
    filter.tag = { $in: filters.tags }
  }

  if (filters?.title) {
    filter.$or = [{ titlerus: new RegExp(filters.title, 'i') }, { titleeng: new RegExp(filters.title, 'i') }]
  }

  return await PersonsModel.find(filter).sort(sorting).skip(first).limit(rows)
}

export async function GetPerson(_id) {
  var person = await PersonsModel.findOne({ _id })
  if (!person) {
    return null;
  }
  person.viewed++
  person.save()
  return person
}

export async function GetPersonsTotal(lazyLoadEvent) {

  const { sortField, sortOrder } = lazyLoadEvent || { sortField: 'id', sortOrder: '-1' }
  const sorting = {}
  sorting[sortField] = sortOrder

  const filter = {}
  const { filters } = lazyLoadEvent;

  if (filters?.tags) {
    filter.tag = { $in: filters.tags }
  }

  if (filters?.title) {
    filter.$or = [{ titlerus: new RegExp(filters.title, 'i') }, { titleeng: new RegExp(filters.title, 'i') }]
  }

  return await await PersonsModel.count(filter)
}
