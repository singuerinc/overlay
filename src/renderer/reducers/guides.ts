import * as R from 'ramda';
import { AnyAction } from 'redux';
import {
  ADD_GUIDE,
  GUIDE_SET_COLOR,
  GUIDE_SET_LOCK,
  GUIDE_SET_ORIENTATION,
  REMOVE_GUIDE
} from '../actions/guides';
import { SET_TOOLS_LOCKED } from '../actions/tools';
import {
  DEFAULT_GUIDE_COLOR,
  DEFAULT_GUIDE_ORIENTATION,
  factory
} from '../components/guide/factory';
import { GuideOrientation } from '../components/guide/GuideOrientation';
import { IGuide } from '../components/guide/IGuide';
import { Tool } from '../components/toolbox/Tool';
import { track } from '../utils/analytics';
import { Color } from '../utils/Color';
import { hasSameId, updatePropIfSameId } from '../utils/utils';

let latestColor: Color = DEFAULT_GUIDE_COLOR;
let latestOrientation: GuideOrientation = DEFAULT_GUIDE_ORIENTATION;

const t = track('tool', Tool.GUIDE);
const initialStore: IGuide[] = [];

interface IPayload {
  id: string;
  color: Color;
  locked: boolean;
  orientation: GuideOrientation;
}

export const guides = (
  store = initialStore,
  { type, payload }: AnyAction & { payload: IPayload }
): IGuide[] => {
  switch (type) {
    case ADD_GUIDE:
      t('add');
      const guide = factory({
        color: latestColor,
        orientation: latestOrientation,
        x:
          latestOrientation === GuideOrientation.HORIZONTAL
            ? 0
            : Math.floor(window.screen.availWidth / 2),
        y:
          latestOrientation === GuideOrientation.HORIZONTAL
            ? Math.floor(window.screen.availHeight / 2)
            : 0
      });
      return R.append(guide, store);
    case REMOVE_GUIDE:
      t('remove');
      return R.reject((x) => hasSameId(payload.id, x), store);
    case GUIDE_SET_COLOR:
      t(`color/${payload.color}`);
      latestColor = payload.color;
      return R.map(
        (x: IGuide) =>
          updatePropIfSameId('color', payload.id, payload.color, x),
        store
      );
    case GUIDE_SET_ORIENTATION:
      const { orientation }: { orientation: GuideOrientation } = payload;
      t(`rotate/${orientation}`);
      latestOrientation = orientation;
      return R.map(
        (x) => updatePropIfSameId('orientation', payload.id, orientation, x),
        store
      );
    case GUIDE_SET_LOCK:
      const { id, locked }: { id: string; locked: boolean } = payload;
      t(`locked/${locked}`);
      return R.map((x) => updatePropIfSameId('locked', id, locked, x), store);
    case SET_TOOLS_LOCKED:
      return R.map((x: IGuide) => ({ ...x, locked: payload.locked }), store);
  }
  return store;
};
