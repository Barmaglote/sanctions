import mongoose from 'mongoose'
import { countries } from '../countries.js';

const NICKNAME = /^[a-z]{1}[a-z\d]{3,25}$/i
const INFO = /^[\w\s\d]{0,250}$/i
const MAX_SUBSCRIBTIONS = 200;

const profileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    minlength: 5,
    unique: true
  },
  birthday: {
    type : Date, 
    default: null
  },
  education: {
    type: String,
    required: false,
    enum: ['non', 'prm', 'snd', 'ged', 'voc', 'bcs', 'msc', 'phd'],
    default: null    
  },
  marital: {
    type: String,
    required: false,
    enum: ['s', 'm', 'd', 'w', 'c'],
    default: null
  },
  children: {
    type: String,
    required: false,
    enum: ['c0', 'c1', 'c2'],
    default: null
  },
  workposition: {
    type: String,
    required: false,
    enum: ['int', 'spc', 'led', 'man', 'top', 'own'],
    default: null
  },  
  work: {
    type: String,
    required: false,
    enum: ['non', 'prt', 'ful'],
    default: null
  },
  place: {
    type: String,
    required: false,
    enum: ['p0', 'p1', 'p2', 'p3', 'p4', 'p5'],
    default: null
  },
  income: {
    type: String,
    required: false,
    enum: ['i0', 'i1', 'i2', 'i3', 'i4'],
    default: null
  },
  race: {
    type: String,
    required: false,
    enum: ['asn', 'blk', 'wht', 'red', 'lat', 'met'],
    default: null
  },  
  citizenship: {
    type: String,
    required: false,
    enum: countries,
    default: null
  },    
  location: {
    type: String,
    required: false,
    enum: countries,
    default: null
  },    
  gender: {
    type: String,
    required: false,
    enum: [],
    default: null
  },    
  orientation: {
    type: String,
    required: false,
    enum: ['srt', 'lgb'],
    default: null
  },    
  religion: {
    type: String,
    required: false,
    enum: ['ath','agn','mus','chr','bud','oth'],
    default: null
  },
  politicalstand: {
    type: String,
    required: false,
    enum: ['fl','lf','ct','rt','fr'],
    default: null
  },        
  interests: {
    type: [String],
    validator: (tag) => tag && tag.length >= 2 && tag.length <= 30,
    maxlength: 30
  },
  nickname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25,
    unique: true,
    validate: {
      validator: v => NICKNAME.test(v),
      message: props => `${props.value} is not correct nickname`
    }
  },
  info: {
    type: String,
    required: false,
    maxlength: 250,
    validate: {
      validator: v => INFO.test(v),
      message: props => `${props.value} is not correct info`
    }
  },
  subscribtions: {    
    type: [{
      objectId: String,
      objectType: String
    }],
    required: false,
    maxlength: MAX_SUBSCRIBTIONS,
    validate: {
      validator: v => v.length <= MAX_SUBSCRIBTIONS,
      message: props => `Too many subscribtions`
    }
  }
})

export default profileSchema
