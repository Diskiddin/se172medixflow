import React from 'react';
import bem from 'b_';
import './LearnMore.scss';

const b = bem.with('LearnMore');

function LearnMore() {
  const g = 40; // grid size
  const g2 = g * 2;
  const g3 = g * 3;

  return (
    <div className={b()}>
      <svg width={g3} height={g2}>
        <path
          className={b('path')}
          d={`
            M ${g3} 0
            Q ${g3} ${g} ${g2} ${g}
            Q 0 ${g} 0 ${g2}
            L ${g3} ${g2}
            L ${g3} 0
          `}
        />
      </svg>
      <div className={b('inner')}>
        Learn<br />
        more
      </div>
      <svg width={g3} height={g2}>
        <path
          className={b('path')}
          d={`
            M ${g3} ${g2}
            Q ${g3} ${g} ${g2} ${g}
            Q 0 ${g} 0 0
            L 0 ${g2}
            L ${g3} ${g2}
          `}
        />
      </svg>
    </div>
  );
}

export default LearnMore;
