import * as R from 'ramda';

export const updatePropIfSameId = <T>(
  prop: keyof T,
  id: string,
  value: any,
  who: T
): T =>
  R.when<T, T>(
    R.compose(
      R.equals(id),
      R.prop('id')
    ),
    R.evolve({
      [prop]: R.always(value)
    }),
    who
  );

export const hasSameId = <T>(id: string, who: T) =>
  R.compose(
    R.equals(id),
    R.prop('id')
  )(who);
