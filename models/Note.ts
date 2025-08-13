import mongoose, { Schema, models, model } from 'mongoose'

const NoteSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, default: '' },
    userId: { type: String, required: true }
  },
  { timestamps: true }
)

export type BaseData = {
  _id: string
  createdAt: string
  updatedAt: string
}

export type NoteType = {
  title: string
  content: string
  userId: string
} & BaseData

export default models.Note || model('Note', NoteSchema)
