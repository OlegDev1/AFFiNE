import {
  EdgelessCRUDIdentifier,
  SurfaceBlockComponent,
} from '@blocksuite/affine-block-surface';
import {
  EMBED_CARD_HEIGHT,
  EMBED_CARD_WIDTH,
} from '@blocksuite/affine-shared/consts';
import { cloneReferenceInfoWithoutAliases } from '@blocksuite/affine-shared/utils';
import type { BlockStdScope } from '@blocksuite/block-std';
import { GfxControllerIdentifier } from '@blocksuite/block-std/gfx';
import { Bound, Vec } from '@blocksuite/global/utils';

import type { EmbedCardProperties } from '../../common/insert-embed-card';

export function insertEmbedLinkedDocEdgelessEmbed(
  std: BlockStdScope,
  properties: Pick<EmbedCardProperties, 'props' | 'targetStyle'>
) {
  const { props, targetStyle } = properties;

  const rootId = std.store.root?.id;
  if (!rootId) return;
  const edgelessRoot = std.view.getBlock(rootId);
  if (!edgelessRoot) return;

  // TODO: do not create block in embed view if it is not available

  const gfx = std.get(GfxControllerIdentifier);
  const crud = std.get(EdgelessCRUDIdentifier);

  gfx.viewport.smoothZoom(1);
  const surfaceBlock = gfx.surfaceComponent;
  if (!(surfaceBlock instanceof SurfaceBlockComponent)) return;
  const center = Vec.toVec(surfaceBlock.renderer.viewport.center);
  const blockId = crud.addBlock(
    'affine:embed-synced-doc',
    {
      ...cloneReferenceInfoWithoutAliases(props as never),
      xywh: Bound.fromCenter(
        center,
        EMBED_CARD_WIDTH[targetStyle],
        EMBED_CARD_HEIGHT[targetStyle]
      ).serialize(),
    },
    surfaceBlock.model
  );

  gfx.selection.set({ elements: [blockId], editing: false });

  gfx.tool.setTool(
    // @ts-expect-error FIXME: resolve after gfx tool refactor
    'default'
  );
}
