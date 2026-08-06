import { Schema, models, model, type InferSchemaType, type Model } from 'mongoose';

const LocalizedTextSchema = new Schema(
  {
    en: { type: String, required: true, trim: true },
    ar: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const ProjectSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    title: { type: LocalizedTextSchema, required: true },
    category: { type: LocalizedTextSchema, required: true },
    description: { type: LocalizedTextSchema, required: true },
    image: { type: String, required: true, trim: true },
    imageAlt: { type: LocalizedTextSchema, required: true },
    techStack: { type: [String], required: true, default: [] },
    highlight: {
      value: { type: String, required: true, trim: true },
      label: { type: LocalizedTextSchema, required: true },
    },
    links: {
      live: { type: String, trim: true, default: '' },
      github: { type: String, trim: true, default: '' },
      caseStudy: { type: String, trim: true, default: '' },
    },
    featured: { type: Boolean, default: false },
    year: { type: Number, required: true },
    published: { type: Boolean, default: true, index: true },
    sortOrder: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type ProjectDocument = InferSchemaType<typeof ProjectSchema> & {
  _id: { toString(): string };
  createdAt: Date;
  updatedAt: Date;
};

export type PortfolioProjectModel = Model<ProjectDocument>;

export const PortfolioProject: PortfolioProjectModel =
  (models.PortfolioProject as PortfolioProjectModel | undefined) ??
  model<ProjectDocument>('PortfolioProject', ProjectSchema);
