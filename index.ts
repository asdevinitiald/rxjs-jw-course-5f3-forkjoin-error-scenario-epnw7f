import { forkJoin, Observable } from 'rxjs';

const a$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.next('A');
    subscriber.complete();
  }, 5000);
  return () => {
    console.log('A teardwon');
  };
});

const b$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.error('Failure!');
  }, 3000);
  return () => {
    console.log('B teardwon');
  };
});

forkJoin([a$, b$]).subscribe({
  next: (value) => console.log(value),
  error: (err) => console.log('Error: ', err),
});
