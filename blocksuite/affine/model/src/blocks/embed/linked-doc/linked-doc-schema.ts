import { BlockSchemaExtension } from '@blocksuite/store';
import { z } from 'zod';

import {
  DEFAULT_LINKED_DOC_EDGELESS_STYLE,
  DEFAULT_LINKED_DOC_EDGELESS_VIEW,
  DEFAULT_LINKED_DOC_PAGE_STYLE,
  DEFAULT_LINKED_DOC_PAGE_VIEW,
  EdgelessStyleSchema,
  EdgelessViewSchema,
  PageStyleSchema,
  PageViewSchema,
} from '../../../consts/linked-doc.js';
import { createEmbedBlockSchema } from '../../../utils/index.js';
import {
  type EmbedLinkedDocBlockProps,
  EmbedLinkedDocModel,
  EmbedLinkedDocStyles,
} from './linked-doc-model.js';

const defaultEmbedLinkedDocBlockProps: EmbedLinkedDocBlockProps = {
  pageId: '',
  style: EmbedLinkedDocStyles[1],
  caption: null,
  // title & description aliases
  title: undefined,
  description: undefined,
};

export const EmbedLinkedDocZodSchema = z
  .object({
    page: z.object({ view: PageViewSchema, style: PageStyleSchema }),
    edgeless: z.object({
      view: EdgelessViewSchema,
      style: EdgelessStyleSchema,
    }),
  })
  .default({
    page: {
      view: DEFAULT_LINKED_DOC_PAGE_VIEW,
      style: DEFAULT_LINKED_DOC_PAGE_STYLE,
    },
    edgeless: {
      view: DEFAULT_LINKED_DOC_EDGELESS_VIEW,
      style: DEFAULT_LINKED_DOC_EDGELESS_STYLE,
    },
  });

export const EmbedLinkedDocBlockSchema = createEmbedBlockSchema({
  name: 'linked-doc',
  version: 1,
  toModel: () => new EmbedLinkedDocModel(),
  props: (): EmbedLinkedDocBlockProps => defaultEmbedLinkedDocBlockProps,
});

export const EmbedLinkedDocBlockSchemaExtension = BlockSchemaExtension(
  EmbedLinkedDocBlockSchema
);
