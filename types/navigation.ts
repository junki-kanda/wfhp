import { PageType, ContactTabType } from './index';

export type NavigateFn = (
  page: PageType,
  options?: {
    contactTab?: ContactTabType;
    postId?: string;
  }
) => void;