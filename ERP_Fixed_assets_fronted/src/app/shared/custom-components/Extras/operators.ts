import { Observable, OperatorFunction, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export function untilDestroyed<T>(component: any): OperatorFunction<T, T> {
  const destroy$ = new Subject<boolean>();

  component.ngOnDestroy = function () {
    destroy$.next(true);
    destroy$.complete();
  };

  return (source: Observable<T>) => source.pipe(takeUntil(destroy$));
}
