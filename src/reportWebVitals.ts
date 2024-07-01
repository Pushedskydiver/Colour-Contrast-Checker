import { onLCP, onINP, onCLS, onFCP, onTTFB  } from 'web-vitals';

const reportWebVitals = () => {
  onLCP(console.log, { reportAllChanges: true });
  onINP(console.log, { reportAllChanges: true });
  onCLS(console.log, { reportAllChanges: true });
  onFCP(console.log, { reportAllChanges: true });
  onTTFB(console.log, { reportAllChanges: true });
};

export default reportWebVitals;
