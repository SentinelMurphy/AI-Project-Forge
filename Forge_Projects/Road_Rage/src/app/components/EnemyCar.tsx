export type EnemyType = 'blue' | 'yellow' | 'police' | 'green' | 'orange';

interface Colors {
   body:  string;
   dark:  string;
   light: string;
   roof:  string;
}

const PALETTE: Record<EnemyType, Colors> = {
   blue:   { body: '#1155cc', dark: '#0a3a99', light: '#4488ee', roof: '#0a3a99' },
   yellow: { body: '#e8b820', dark: '#b89010', light: '#f8d040', roof: '#b89010' },
   police: { body: '#dddddd', dark: '#888888', light: '#eeeeee', roof: '#222222' },
   green:  { body: '#1a7a20', dark: '#0e5214', light: '#2eaa34', roof: '#0e5214' },
   orange: { body: '#dd5500', dark: '#aa3300', light: '#ff7722', roof: '#aa3300' },
};

interface EnemyCarProps {
   type: EnemyType;
}

export function EnemyCar({ type }: EnemyCarProps) {
   const c = PALETTE[type];

   return (
           <svg
                   viewBox="0 0 36 60"
                   width="36"
                   height="60"
                   xmlns="http://www.w3.org/2000/svg"
                   style={{ display: 'block' }}
           >
              {/* Body shadow */}
              <rect x="3" y="6" width="30" height="48" rx="5" fill={c.dark} />
              {/* Main body */}
              <rect x="5" y="8" width="26" height="44" rx="4" fill={c.body} />
              {/* Hood */}
              <rect x="7" y="8" width="22" height="11" rx="3" fill={c.light} />
              {/* Front windshield */}
              <rect x="9" y="11" width="18" height="9" rx="2" fill="#88bbee" opacity="0.85" />
              {/* Windshield glare */}
              <rect x="10" y="12" width="5" height="4" rx="1" fill="#ffffff" opacity="0.3" />
              {/* Roof */}
              <rect x="9" y="20" width="18" height="11" rx="1" fill={c.roof} />
              {/* Rear windshield */}
              <rect x="9" y="31" width="18" height="8" rx="2" fill="#88bbee" opacity="0.8" />
              {/* Trunk */}
              <rect x="7" y="39" width="22" height="12" rx="3" fill={c.light} />
              {/* Front bumper */}
              <rect x="10" y="5" width="16" height="5" rx="2" fill="#555" />
              {/* Rear bumper */}
              <rect x="10" y="51" width="16" height="5" rx="2" fill="#555" />
              {/* Headlights */}
              <rect x="8"  y="5" width="8" height="4" rx="1" fill="#ffee88" />
              <rect x="20" y="5" width="8" height="4" rx="1" fill="#ffee88" />
              {/* Tail lights */}
              <rect x="8"  y="52" width="8" height="4" rx="1" fill="#ff3333" />
              <rect x="20" y="52" width="8" height="4" rx="1" fill="#ff3333" />
              {/* Wheels */}
              <rect x="0"  y="9"  width="5" height="12" rx="2" fill="#111" />
              <rect x="1"  y="10" width="3" height="10" rx="1" fill="#333" />
              <rect x="31" y="9"  width="5" height="12" rx="2" fill="#111" />
              <rect x="32" y="10" width="3" height="10" rx="1" fill="#333" />
              <rect x="0"  y="39" width="5" height="12" rx="2" fill="#111" />
              <rect x="1"  y="40" width="3" height="10" rx="1" fill="#333" />
              <rect x="31" y="39" width="5" height="12" rx="2" fill="#111" />
              <rect x="32" y="40" width="3" height="10" rx="1" fill="#333" />

              {/* ── Police special: light bar + stripe ──────────────────── */}
              {type === 'police' && (
                      <>
                         <rec x="10" y="19" width="16" height="5" rx="1" fill="#111" />
                         <rect x="10" y="20" width="7"  height="3" rx="1" fill="#ff2222" />
                         <rect x="19" y="20" width="7"  height="3" rx="1" fill="#2222ff" />
                         <rect x="5"  y="28" width="26" height="3" fill="#111" />
                      </>
              )}

              {/* ── Taxi special: checker stripe + roof sign ─────────────── */}
              {type === 'yellow' && (
                      <>
                         {/* Checker stripe */}
                         {[0,1,2,3,4,5].map(i => (
                                 <rect key={i} x={5 + i * 4} y="26" width="4" height="4"
                                       fill={i % 2 === 0 ? '#111' : '#e8b820'} />
                         ))}
                         {/* Roof sign */}
                         <rect x="11" y="21" width="14" height="6" rx="1" fill="#ffd700" />
                         <rect x="13" y="22" width="10" height="4" rx="1" fill="#111" />
                      </>
              )}
           </svg>
   );
}

