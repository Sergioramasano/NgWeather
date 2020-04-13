import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    group([  // block executes in parallel
      query(':leave', [
        style({transform: 'translateX(0%)'}),
        animate('.5s ease-in-out', style({transform: 'translateX(-120%)'}))
      ], { optional: true }),
    ])
  ])
]);
