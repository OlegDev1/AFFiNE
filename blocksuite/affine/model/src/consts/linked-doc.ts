import { z } from 'zod';

export enum PageView {
  Inline = 'inline',
  CardView = 'card',
  EmbedView = 'embed',
}
export const DEFAULT_LINKED_DOC_PAGE_VIEW = PageView.CardView;
export const PageViewSchema = z.nativeEnum(PageView);

export enum PageStyle {
  LargeHorizontal = 'horizontal',
  SmallHorizontal = 'list',
}
export const DEFAULT_LINKED_DOC_PAGE_STYLE = PageStyle.LargeHorizontal;
export const PageStyleSchema = z.nativeEnum(PageStyle);

export enum EdgelessView {
  CardView = 'card',
  EmbedView = 'embed',
}
export const DEFAULT_LINKED_DOC_EDGELESS_VIEW = EdgelessView.CardView;
export const EdgelessViewSchema = z.nativeEnum(EdgelessView);

export enum EdgelessStyle {
  LargeHorizontal = 'horizontal',
  SmallHorizontal = 'list',
  LargeVertical = 'vertical',
  SmallVertical = 'cube',
}
export const DEFAULT_LINKED_DOC_EDGELESS_STYLE = EdgelessStyle.LargeVertical;
export const EdgelessStyleSchema = z.nativeEnum(EdgelessStyle);
