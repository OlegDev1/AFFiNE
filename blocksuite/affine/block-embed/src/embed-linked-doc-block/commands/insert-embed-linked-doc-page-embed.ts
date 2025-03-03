import { cloneReferenceInfoWithoutAliases } from '@blocksuite/affine-shared/utils';
import {
  BlockSelection,
  type BlockStdScope,
  SurfaceSelection,
  TextSelection,
} from '@blocksuite/block-std';

import type { EmbedCardProperties } from '../../common/insert-embed-card';

export function insertEmbedLinkedDocPageEmbed(
  std: BlockStdScope,
  properties: Pick<EmbedCardProperties, 'props'>
) {
  const { host } = std;
  const { props } = properties;

  const selectionManager = host.selection;

  let blockId: string | undefined;
  const textSelection = selectionManager.find(TextSelection);
  const blockSelection = selectionManager.find(BlockSelection);
  const surfaceSelection = selectionManager.find(SurfaceSelection);
  if (textSelection) {
    blockId = textSelection.blockId;
  } else if (blockSelection) {
    blockId = blockSelection.blockId;
  } else if (surfaceSelection && surfaceSelection.editing) {
    blockId = surfaceSelection.blockId;
  }

  if (blockId) {
    const block = host.view.getBlock(blockId);
    if (!block) return;
    const parent = host.doc.getParent(block.model);
    if (!parent) return;
    const index = parent.children.indexOf(block.model);

    // TODO: do not create block in embed view if it is not available

    host.doc.addBlock(
      'affine:embed-synced-doc',
      { ...cloneReferenceInfoWithoutAliases(props as never) },
      parent,
      index + 1
    );

    host.doc.deleteBlock(block.model);
  }
}
