import TagsModel from '../../models/tags/model.js'
import { GraphQLError } from 'graphql'

const ALLOWED = ['organizations', 'persons']

export async function Tags(area) {
  if (ALLOWED.indexOf(area) < 0) {
    throw new GraphQLError('Unsupported tag area', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    })
  }

  return await TagsModel.find({ area })
}

export async function ComputeTags(parent) {
  return await TagsModel.find({"key": { $in: parent.tag } })
}