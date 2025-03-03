import type { EmbedCardStyle, ReferenceParams } from '@blocksuite/affine-model';
import { DocModeProvider } from '@blocksuite/affine-shared/services';
import type { Command } from '@blocksuite/block-std';

import { insertEmbedCard } from '../../common/insert-embed-card.js';
import { insertEmbedLinkedDocEdgelessEmbed } from './insert-embed-linked-doc-edgeless-embed.js';
import { insertEmbedLinkedDocPageEmbed } from './insert-embed-linked-doc-page-embed.js';
import { insertEmbedLinkedDocPageInline } from './insert-embed-linked-doc-page-inline.js';

export type InsertedLinkType = {
  flavour?: 'affine:bookmark' | 'affine:embed-linked-doc';
} | null;

export const insertEmbedLinkedDocCommand: Command<{
  docId: string;
  params?: ReferenceParams;
}> = (ctx, next) => {
  const { docId, params, std } = ctx;
  const flavour = 'affine:embed-linked-doc';
  const targetStyle: EmbedCardStyle = 'vertical';
  const props: Record<string, unknown> = { pageId: docId };
  if (params) props.params = params;
  insertEmbedCard(std, { flavour, targetStyle, props });
  next();
};
