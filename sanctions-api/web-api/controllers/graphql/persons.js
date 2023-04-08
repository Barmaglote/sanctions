import dotenv from 'dotenv'
dotenv.config()
import PersonsModel from '../../models/persons/model.js'
import { databaseResponseTimeHistogram } from '../../utils/metrics.js'
import { createLogger } from '../../helpers/logger.js'

const logger = createLogger(process.env.SEQ_LOG_ADDR, process.env.SEQ_LOG_KEY);

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

  const metricsLabel = { operation: 'GetPersons' }
  const timer = databaseResponseTimeHistogram.startTimer()

  try {
    const result = await PersonsModel.find(filter).sort(sorting).skip(first).limit(rows)
    timer({...metricsLabel, success: "true"})
    return result;
  } catch(e) {
    timer({...metricsLabel, success: "false"})
    logger.error(e);
    return null;
  }
}

export async function GetPerson(_id) {
  const metricsLabel = { operation: 'GetPerson' }
  const timer = databaseResponseTimeHistogram.startTimer()

  try {
    let person = await PersonsModel.findOne({ _id })
    timer({...metricsLabel, success: "true"})
    person.viewed++
    person.save()
    return person
  } catch(e) {
    timer({...metricsLabel, success: "false"})
    logger.error(e);
    return null;
  }
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
