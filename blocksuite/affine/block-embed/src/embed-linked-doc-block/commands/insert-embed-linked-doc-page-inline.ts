import { REFERENCE_NODE } from '@blocksuite/affine-shared/consts';
import {
  BlockSelection,
  type BlockStdScope,
  SurfaceSelection,
  TextSelection,
} from '@blocksuite/block-std';
import { Text } from '@blocksuite/store';
import * as Y from 'yjs';

import type { EmbedCardProperties } from '../../common/insert-embed-card';

export function insertEmbedLinkedDocPageInline(
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

    const yText = new Y.Text();
    yText.insert(0, REFERENCE_NODE);
    yText.format(0, REFERENCE_NODE.length, {
      reference: {
        type: 'LinkedPage',
        pageId: props.pageId,
      },
    });
    const text = new Text(yText);

    host.doc.addBlock(
      'affine:paragraph',
      { ...props, text },
      parent,
      index + 1
    );

    host.doc.deleteBlock(block.model);
  }
}
