import React from 'react';
import { FluteFingering } from '@/types/flute';

interface RealisticFluteSvgProps {
  fingering: FluteFingering;
  activeKeyHover?: string | null;
  onKeyHover?: (keyName: string | null) => void;
}

export const RealisticFluteSvg: React.FC<RealisticFluteSvgProps> = ({
  fingering,
  activeKeyHover,
  onKeyHover,
}) => {
  const { keys } = fingering;

  // Key coordinate mapping across the authentic flute
  const keyCoords: Record<string, { cx: number; cy: number; r: number; active: boolean; label: string }> = {
    thumbB: { cx: 358, cy: 37, r: 7.5, active: Boolean(keys.thumbB), label: '左拇指 B' },
    thumbBb: { cx: 378, cy: 37, r: 6.5, active: Boolean(keys.thumbBb), label: '左拇指 Bb' },
    lh1: { cx: 382, cy: 60, r: 7.5, active: Boolean(keys.lh1), label: '左 1 (食)' },
    lh2: { cx: 442, cy: 60, r: 7.5, active: Boolean(keys.lh2), label: '左 2 (中)' },
    lh3: { cx: 476, cy: 60, r: 7.5, active: Boolean(keys.lh3), label: '左 3 (无名)' },
    lhGSharp: { cx: 502, cy: 36, r: 7, active: Boolean(keys.lhGSharp), label: '左小指 G#' },
    trill1: { cx: 532, cy: 46, r: 5, active: Boolean(keys.trill1), label: '颤音 1' },
    trill2: { cx: 554, cy: 46, r: 5, active: Boolean(keys.trill2), label: '颤音 2' },
    rh1: { cx: 574, cy: 60, r: 7.5, active: Boolean(keys.rh1), label: '右 1 (食)' },
    rh2: { cx: 636, cy: 60, r: 7.5, active: Boolean(keys.rh2), label: '右 2 (中)' },
    rh3: { cx: 670, cy: 60, r: 7.5, active: Boolean(keys.rh3), label: '右 3 (无名)' },
    rhEb: { cx: 825, cy: 60, r: 7.5, active: Boolean(keys.rhEb), label: '右小指 Eb' },
    rhLowCs: { cx: 870, cy: 60, r: 7.2, active: Boolean(keys.rhLowCs), label: '低音 C#' },
    rhLowC: { cx: 914, cy: 60, r: 7.2, active: Boolean(keys.rhLowC), label: '低音 C' },
  };

  return (
    <div className="w-full overflow-hidden py-1">
      <svg
        viewBox="0 0 1000 130"
        className="w-full h-auto select-none filter drop-shadow-sm"
        style={{ maxHeight: '150px' }}
      >
        <defs>
          {/* Photorealistic Silver Tube Cylinder Gradient */}
          <linearGradient id="realSilverTube" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="8%" stopColor="#e2e8f0" />
            <stop offset="22%" stopColor="#ffffff" />
            <stop offset="42%" stopColor="#f1f5f9" />
            <stop offset="68%" stopColor="#cbd5e1" />
            <stop offset="86%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Lip Plate Specular Silver Gradient */}
          <linearGradient id="realLipPlate" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="16%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#e2e8f0" />
            <stop offset="78%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Deep Acoustic Embouchure Hole */}
          <radialGradient id="realHoleCavity" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="60%" stopColor="#020617" />
            <stop offset="90%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#475569" />
          </radialGradient>

          {/* Open-hole Key Cup 3D Silver Rim */}
          <radialGradient id="realKeyRim" cx="35%" cy="28%" r="72%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#f8fafc" />
            <stop offset="75%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </radialGradient>

          {/* Active Key Jewel Emerald Fill */}
          <radialGradient id="activeKeyJewel" cx="35%" cy="28%" r="72%">
            <stop offset="0%" stopColor="#a7f3d0" />
            <stop offset="25%" stopColor="#34d399" />
            <stop offset="65%" stopColor="#059669" />
            <stop offset="100%" stopColor="#064e3b" />
          </radialGradient>

          {/* Glow filter for active key */}
          <filter id="softActiveGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="var(--brand)" floodOpacity="0.8" />
          </filter>

          {/* Steel Rod Axle Gradient */}
          <linearGradient id="realSteelAxle" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#cbd5e1" />
            <stop offset="75%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          {/* Ferrule / Ring Joint Gradient */}
          <linearGradient id="realRingJoint" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="85%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>

        {/* ======================================================== */}
        {/* CAST SHADOW OF ENTIRE FLUTE TUBE ON STUDIO SURFACE       */}
        {/* ======================================================== */}
        <rect x="22" y="68" width="950" height="7" rx="3.5" fill="#000000" opacity="0.12" filter="blur(2.5px)" />

        {/* ======================================================== */}
        {/* 1. HEADJOINT (笛头) - X: 22 to 285                      */}
        {/* ======================================================== */}
        {/* Crown (笛冠螺帽) */}
        <g id="crown">
          <ellipse cx="25" cy="60" rx="3" ry="6.2" fill="url(#realRingJoint)" stroke="#334155" strokeWidth="0.5" />
          <path d="M 25,54 C 20,54 18,57 18,60 C 18,63 20,66 25,66 Z" fill="url(#realRingJoint)" stroke="#334155" strokeWidth="0.5" />
          <rect x="25" y="53.5" width="4" height="13" rx="0.8" fill="url(#realRingJoint)" stroke="#1e293b" strokeWidth="0.5" />
          <line x1="27" y1="53.8" x2="27" y2="66.2" stroke="#ffffff" strokeWidth="0.5" />
        </g>

        {/* Headjoint Tube (笛头主管) */}
        <rect
          x="29"
          y="54"
          width="248"
          height="12"
          fill="url(#realSilverTube)"
          stroke="#475569"
          strokeWidth="0.6"
        />

        {/* Lip Plate & Embouchure Hole (吹孔唇托与椭圆吹孔) */}
        <g id="lipPlate">
          {/* Subtle riser shadow */}
          <rect x="85" y="47" width="50" height="26" rx="10" fill="#000000" opacity="0.18" filter="blur(1px)" />
          
          {/* Raised curved lip plate (符合照片真实轮廓的圆角弧形银质唇托) */}
          <path
            d="M 85,60 C 85,48.5 94,47 110,47 C 126,47 135,48.5 135,60 C 135,71.5 126,73 110,73 C 94,73 85,71.5 85,60 Z"
            fill="url(#realLipPlate)"
            stroke="#475569"
            strokeWidth="0.8"
          />

          {/* Specular curved reflection on lip plate */}
          <path
            d="M 89,58 C 89,49.5 97,48 110,48 C 123,48 131,49.5 131,58"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.8"
            opacity="0.9"
          />

          {/* Embouchure Chimney wall */}
          <ellipse cx="110" cy="60" rx="9" ry="5.8" fill="#1e293b" stroke="#334155" strokeWidth="0.6" />

          {/* Embouchure Blow Hole (深邃椭圆吹孔) */}
          <ellipse
            cx="110"
            cy="60"
            rx="7.5"
            ry="4.6"
            fill="url(#realHoleCavity)"
            stroke="#090d16"
            strokeWidth="0.8"
          />

          {/* Acoustic Splitting Edge (劈气刃高光反光) */}
          <path
            d="M 104,56.8 Q 110,58.2 116,56.8"
            stroke="#ffffff"
            strokeWidth="0.9"
            strokeLinecap="round"
            fill="none"
            opacity="0.95"
          />
        </g>

        {/* Headjoint Tenon Joint Ring (笛头套合环) */}
        <rect x="274" y="53" width="6" height="14" rx="0.8" fill="url(#realRingJoint)" stroke="#1e293b" strokeWidth="0.6" />
        <line x1="280" y1="54" x2="280" y2="66" stroke="#0f172a" strokeWidth="0.8" />

        {/* ======================================================== */}
        {/* 2. BODY JOINT (笛身) - X: 280 to 765                     */}
        {/* ======================================================== */}
        {/* Barrel (商标管箍) */}
        <rect x="280" y="53" width="24" height="14" rx="1" fill="url(#realRingJoint)" stroke="#1e293b" strokeWidth="0.6" />
        <line x1="284" y1="53.5" x2="284" y2="66.5" stroke="#ffffff" strokeWidth="0.5" />
        <line x1="300" y1="53.5" x2="300" y2="66.5" stroke="#ffffff" strokeWidth="0.5" />
        <text
          x="292"
          y="62.5"
          textAnchor="middle"
          fontSize="4.8"
          fontFamily="serif"
          fontWeight="bold"
          fill="#1e293b"
          letterSpacing="0.4"
        >
          BOEHM
        </text>

        {/* Main Body Tube (笛身主管) */}
        <rect
          x="304"
          y="54"
          width="460"
          height="12"
          fill="url(#realSilverTube)"
          stroke="#475569"
          strokeWidth="0.6"
        />

        {/* Continuous Steel Axle Rod along bottom edge (下侧主钢连杆轴) */}
        <rect x="340" y="71" width="420" height="1.8" rx="0.6" fill="url(#realSteelAxle)" stroke="#1e293b" strokeWidth="0.3" />
        {/* Mounting Posts & Screws (支架柱螺柱) */}
        {[345, 410, 490, 560, 620, 680, 755].map(px => (
          <g key={`body-post-${px}`}>
            <rect x={px - 1.2} y="68.5" width="2.4" height="7" rx="0.6" fill="url(#realSteelAxle)" stroke="#0f172a" strokeWidth="0.4" />
            <circle cx={px} cy="69.5" r="0.8" fill="#ffffff" />
          </g>
        ))}

        {/* ======================================================== */}
        {/* 3. KEYWORK ON BODY (笛身键群，完全依照照片位置与开孔细节) */}
        {/* ======================================================== */}

        {/* [LH THUMB B KEY] - Positioned above tube */}
        <g
          className="cursor-pointer transition-transform"
          onMouseEnter={() => onKeyHover?.('thumbB')}
          onMouseLeave={() => onKeyHover?.(null)}
        >
          <path d="M 345,54 L 345,41 L 354,39" stroke="url(#realSteelAxle)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <ellipse
            cx="358"
            cy="37"
            rx="9"
            ry="6.5"
            fill={keys.thumbB ? 'url(#activeKeyJewel)' : 'url(#realKeyRim)'}
            stroke={keys.thumbB ? '#047857' : '#475569'}
            strokeWidth={keys.thumbB ? 1.6 : 0.9}
            filter={keys.thumbB || activeKeyHover === 'thumbB' ? 'url(#softActiveGlow)' : undefined}
          />
          <circle cx="358" cy="37" r="2.2" fill={keys.thumbB ? '#ffffff' : '#64748b'} />
        </g>

        {/* [LH THUMB Bb LEVER] - Briccialdi lever next to Thumb B */}
        <g
          className="cursor-pointer transition-transform"
          onMouseEnter={() => onKeyHover?.('thumbBb')}
          onMouseLeave={() => onKeyHover?.(null)}
        >
          <path d="M 367,38 L 376,38" stroke="url(#realSteelAxle)" strokeWidth="1.5" fill="none" />
          <rect
            x="374"
            y="33"
            width="11"
            height="8.5"
            rx="2.2"
            fill={keys.thumbBb ? 'url(#activeKeyJewel)' : 'url(#realKeyRim)'}
            stroke={keys.thumbBb ? '#047857' : '#475569'}
            strokeWidth={keys.thumbBb ? 1.6 : 0.9}
            filter={keys.thumbBb || activeKeyHover === 'thumbBb' ? 'url(#softActiveGlow)' : undefined}
          />
        </g>

        {/* French Pointed Arms from rod (Y=71) up to each key center (Y=60) */}
        {[382, 408, 442, 476, 574, 604, 636, 670].map(ax => (
          <path
            key={`arm-${ax}`}
            d={`M ${ax},71 L ${ax},63 L ${ax},60`}
            stroke="url(#realSteelAxle)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        ))}

        {/* [LH 1 KEY - 食指] - X: 382 */}
        <g
          className="cursor-pointer"
          onMouseEnter={() => onKeyHover?.('lh1')}
          onMouseLeave={() => onKeyHover?.(null)}
        >
          <circle cx="382" cy="60" r="7.5" fill={keys.lh1 ? 'url(#activeKeyJewel)' : 'url(#realKeyRim)'} stroke={keys.lh1 ? '#047857' : '#475569'} strokeWidth={keys.lh1 ? 1.6 : 0.9} filter={keys.lh1 || activeKeyHover === 'lh1' ? 'url(#softActiveGlow)' : undefined} />
          {keys.lh1 ? <circle cx="382" cy="60" r="2.8" fill="#ffffff" /> : <circle cx="382" cy="60" r="2.8" fill="url(#realHoleCavity)" stroke="#334155" strokeWidth="0.5" />}
        </g>

        {/* Bb Helper tone hole & cup (半音降B辅助键) - X: 408 */}
        <g opacity="0.85">
          <circle cx="408" cy="60" r="6.2" fill="url(#realKeyRim)" stroke="#475569" strokeWidth="0.8" />
          <circle cx="408" cy="60" r="2.2" fill="url(#realHoleCavity)" stroke="#334155" strokeWidth="0.4" />
        </g>

        {/* [LH 2 KEY - 中指] - X: 442 */}
        <g
          className="cursor-pointer"
          onMouseEnter={() => onKeyHover?.('lh2')}
          onMouseLeave={() => onKeyHover?.(null)}
        >
          <circle cx="442" cy="60" r="7.5" fill={keys.lh2 ? 'url(#activeKeyJewel)' : 'url(#realKeyRim)'} stroke={keys.lh2 ? '#047857' : '#475569'} strokeWidth={keys.lh2 ? 1.6 : 0.9} filter={keys.lh2 || activeKeyHover === 'lh2' ? 'url(#softActiveGlow)' : undefined} />
          {keys.lh2 ? <circle cx="442" cy="60" r="2.8" fill="#ffffff" /> : <circle cx="442" cy="60" r="2.8" fill="url(#realHoleCavity)" stroke="#334155" strokeWidth="0.5" />}
        </g>

        {/* [LH 3 KEY - 无名指] - X: 476 */}
        <g
          className="cursor-pointer"
          onMouseEnter={() => onKeyHover?.('lh3')}
          onMouseLeave={() => onKeyHover?.(null)}
        >
          <circle cx="476" cy="60" r="7.5" fill={keys.lh3 ? 'url(#activeKeyJewel)' : 'url(#realKeyRim)'} stroke={keys.lh3 ? '#047857' : '#475569'} strokeWidth={keys.lh3 ? 1.6 : 0.9} filter={keys.lh3 || activeKeyHover === 'lh3' ? 'url(#softActiveGlow)' : undefined} />
          {keys.lh3 ? <circle cx="476" cy="60" r="2.8" fill="#ffffff" /> : <circle cx="476" cy="60" r="2.8" fill="url(#realHoleCavity)" stroke="#334155" strokeWidth="0.5" />}
        </g>

        {/* G Helper tone hole & cup - X: 504 */}
        <g opacity="0.85">
          <circle cx="504" cy="60" r="6.5" fill="url(#realKeyRim)" stroke="#475569" strokeWidth="0.8" />
          <circle cx="504" cy="60" r="2.3" fill="url(#realHoleCavity)" stroke="#334155" strokeWidth="0.4" />
        </g>

        {/* [LH PINKY G# KEY - 照片中向上凸起的勺状小指键] */}
        <g
          className="cursor-pointer"
          onMouseEnter={() => onKeyHover?.('lhGSharp')}
          onMouseLeave={() => onKeyHover?.(null)}
        >
          {/* Curved steel rod reaching up */}
          <path d="M 504,54 L 507,43 L 512,38" stroke="url(#realSteelAxle)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          {/* Elegant curved silver spoon spatula paddle */}
          <path
            d="M 510,40 C 510,33 517,31 525,32 C 528,33 530,36 527,40 C 524,44 517,45 512,43 Z"
            fill={keys.lhGSharp ? 'url(#activeKeyJewel)' : 'url(#realKeyRim)'}
            stroke={keys.lhGSharp ? '#047857' : '#334155'}
            strokeWidth={keys.lhGSharp ? 1.6 : 0.9}
            filter={keys.lhGSharp || activeKeyHover === 'lhGSharp' ? 'url(#softActiveGlow)' : undefined}
          />
        </g>

        {/* Trill key levers (颤音杠杆) between hands */}
        {/* Trill 1 (D Trill) */}
        <g
          className="cursor-pointer"
          onMouseEnter={() => onKeyHover?.('trill1')}
          onMouseLeave={() => onKeyHover?.(null)}
        >
          <path d="M 526,71 L 526,49 L 535,46" stroke="url(#realSteelAxle)" strokeWidth="1.4" fill="none" />
          <ellipse
            cx="538"
            cy="45"
            rx="5.5"
            ry="4"
            fill={keys.trill1 ? 'url(#activeKeyJewel)' : 'url(#realKeyRim)'}
            stroke={keys.trill1 ? '#047857' : '#475569'}
            strokeWidth={keys.trill1 ? 1.4 : 0.7}
            filter={keys.trill1 || activeKeyHover === 'trill1' ? 'url(#softActiveGlow)' : undefined}
          />
        </g>

        {/* Trill 2 (D# Trill) */}
        <g
          className="cursor-pointer"
          onMouseEnter={() => onKeyHover?.('trill2')}
          onMouseLeave={() => onKeyHover?.(null)}
        >
          <path d="M 548,71 L 548,49 L 557,46" stroke="url(#realSteelAxle)" strokeWidth="1.4" fill="none" />
          <ellipse
            cx="560"
            cy="45"
            rx="5.5"
            ry="4"
            fill={keys.trill2 ? 'url(#activeKeyJewel)' : 'url(#realKeyRim)'}
            stroke={keys.trill2 ? '#047857' : '#475569'}
            strokeWidth={keys.trill2 ? 1.4 : 0.7}
            filter={keys.trill2 || activeKeyHover === 'trill2' ? 'url(#softActiveGlow)' : undefined}
          />
        </g>

        {/* [RH 1 KEY - 食指] - X: 574 */}
        <g
          className="cursor-pointer"
          onMouseEnter={() => onKeyHover?.('rh1')}
          onMouseLeave={() => onKeyHover?.(null)}
        >
          <circle cx="574" cy="60" r="7.5" fill={keys.rh1 ? 'url(#activeKeyJewel)' : 'url(#realKeyRim)'} stroke={keys.rh1 ? '#047857' : '#475569'} strokeWidth={keys.rh1 ? 1.6 : 0.9} filter={keys.rh1 || activeKeyHover === 'rh1' ? 'url(#softActiveGlow)' : undefined} />
          {keys.rh1 ? <circle cx="574" cy="60" r="2.8" fill="#ffffff" /> : <circle cx="574" cy="60" r="2.8" fill="url(#realHoleCavity)" stroke="#334155" strokeWidth="0.5" />}
        </g>

        {/* F# Linked Helper Cup - X: 604 */}
        <g opacity="0.85">
          <circle cx="604" cy="60" r="6.5" fill="url(#realKeyRim)" stroke="#475569" strokeWidth="0.8" />
          <circle cx="604" cy="60" r="2.3" fill="url(#realHoleCavity)" stroke="#334155" strokeWidth="0.4" />
        </g>

        {/* [RH 2 KEY - 中指] - X: 636 */}
        <g
          className="cursor-pointer"
          onMouseEnter={() => onKeyHover?.('rh2')}
          onMouseLeave={() => onKeyHover?.(null)}
        >
          <circle cx="636" cy="60" r="7.5" fill={keys.rh2 ? 'url(#activeKeyJewel)' : 'url(#realKeyRim)'} stroke={keys.rh2 ? '#047857' : '#475569'} strokeWidth={keys.rh2 ? 1.6 : 0.9} filter={keys.rh2 || activeKeyHover === 'rh2' ? 'url(#softActiveGlow)' : undefined} />
          {keys.rh2 ? <circle cx="636" cy="60" r="2.8" fill="#ffffff" /> : <circle cx="636" cy="60" r="2.8" fill="url(#realHoleCavity)" stroke="#334155" strokeWidth="0.5" />}
        </g>

        {/* [RH 3 KEY - 无名指] - X: 670 */}
        <g
          className="cursor-pointer"
          onMouseEnter={() => onKeyHover?.('rh3')}
          onMouseLeave={() => onKeyHover?.(null)}
        >
          <circle cx="670" cy="60" r="7.5" fill={keys.rh3 ? 'url(#activeKeyJewel)' : 'url(#realKeyRim)'} stroke={keys.rh3 ? '#047857' : '#475569'} strokeWidth={keys.rh3 ? 1.6 : 0.9} filter={keys.rh3 || activeKeyHover === 'rh3' ? 'url(#softActiveGlow)' : undefined} />
          {keys.rh3 ? <circle cx="670" cy="60" r="2.8" fill="#ffffff" /> : <circle cx="670" cy="60" r="2.8" fill="url(#realHoleCavity)" stroke="#334155" strokeWidth="0.5" />}
        </g>

        {/* Body End Tenon Ring (尾管套合环) */}
        <rect x="760" y="53" width="5" height="14" rx="0.8" fill="url(#realRingJoint)" stroke="#1e293b" strokeWidth="0.6" />
        <line x1="765" y1="54" x2="765" y2="66" stroke="#0f172a" strokeWidth="0.8" />

        {/* ======================================================== */}
        {/* 4. FOOTJOINT (尾管) - X: 765 to 975                      */}
        {/* ======================================================== */}
        {/* Footjoint Tenon Ring */}
        <rect x="765" y="53" width="7" height="14" rx="0.8" fill="url(#realRingJoint)" stroke="#1e293b" strokeWidth="0.6" />

        {/* Footjoint Tube (尾管主管) */}
        <rect
          x="772"
          y="54"
          width="196"
          height="12"
          fill="url(#realSilverTube)"
          stroke="#475569"
          strokeWidth="0.6"
        />

        {/* Footjoint Steel Axle Rod */}
        <rect x="770" y="71" width="190" height="1.8" rx="0.6" fill="url(#realSteelAxle)" stroke="#1e293b" strokeWidth="0.3" />
        {/* Footjoint Posts */}
        {[775, 840, 895, 955].map(px => (
          <g key={`fpost-${px}`}>
            <rect x={px - 1.2} y="68.5" width="2.4" height="7" rx="0.6" fill="url(#realSteelAxle)" stroke="#0f172a" strokeWidth="0.4" />
            <circle cx={px} cy="69.5" r="0.8" fill="#ffffff" />
          </g>
        ))}

        {/* [FOOTJOINT Eb KEY - 右手小指支撑键] - X: 825 */}
        <g
          className="cursor-pointer"
          onMouseEnter={() => onKeyHover?.('rhEb')}
          onMouseLeave={() => onKeyHover?.(null)}
        >
          <path d="M 825,71 L 825,60" stroke="url(#realSteelAxle)" strokeWidth="1.8" />
          <circle cx="825" cy="60" r="7.5" fill={keys.rhEb ? 'url(#activeKeyJewel)' : 'url(#realKeyRim)'} stroke={keys.rhEb ? '#047857' : '#475569'} strokeWidth={keys.rhEb ? 1.6 : 0.9} filter={keys.rhEb || activeKeyHover === 'rhEb' ? 'url(#softActiveGlow)' : undefined} />
          {keys.rhEb ? <circle cx="825" cy="60" r="2.8" fill="#ffffff" /> : <circle cx="825" cy="60" r="2.8" fill="url(#realHoleCavity)" stroke="#334155" strokeWidth="0.5" />}
        </g>

        {/* [FOOTJOINT LOW C# KEY] - X: 870 */}
        <g
          className="cursor-pointer"
          onMouseEnter={() => onKeyHover?.('rhLowCs')}
          onMouseLeave={() => onKeyHover?.(null)}
        >
          <path d="M 870,71 L 870,60" stroke="url(#realSteelAxle)" strokeWidth="1.8" />
          <circle cx="870" cy="60" r="7.2" fill={keys.rhLowCs ? 'url(#activeKeyJewel)' : 'url(#realKeyRim)'} stroke={keys.rhLowCs ? '#047857' : '#475569'} strokeWidth={keys.rhLowCs ? 1.6 : 0.9} filter={keys.rhLowCs || activeKeyHover === 'rhLowCs' ? 'url(#softActiveGlow)' : undefined} />
          {keys.rhLowCs ? <circle cx="870" cy="60" r="2.5" fill="#ffffff" /> : <circle cx="870" cy="60" r="2.5" fill="url(#realHoleCavity)" stroke="#334155" strokeWidth="0.5" />}
        </g>

        {/* [FOOTJOINT LOW C KEY] - X: 914 */}
        <g
          className="cursor-pointer"
          onMouseEnter={() => onKeyHover?.('rhLowC')}
          onMouseLeave={() => onKeyHover?.(null)}
        >
          <path d="M 914,71 L 914,60" stroke="url(#realSteelAxle)" strokeWidth="1.8" />
          <circle cx="914" cy="60" r="7.2" fill={keys.rhLowC ? 'url(#activeKeyJewel)' : 'url(#realKeyRim)'} stroke={keys.rhLowC ? '#047857' : '#475569'} strokeWidth={keys.rhLowC ? 1.6 : 0.9} filter={keys.rhLowC || activeKeyHover === 'rhLowC' ? 'url(#softActiveGlow)' : undefined} />
          {keys.rhLowC ? <circle cx="914" cy="60" r="2.5" fill="#ffffff" /> : <circle cx="914" cy="60" r="2.5" fill="url(#realHoleCavity)" stroke="#334155" strokeWidth="0.5" />}
        </g>

        {/* Rollers on footjoint (低音滚轮连动) */}
        <g transform="translate(886, 73)">
          <rect x="0" y="0" width="6.5" height="3" rx="0.8" fill="url(#realRingJoint)" stroke="#1e293b" strokeWidth="0.3" />
          <rect x="9" y="0" width="6.5" height="3" rx="0.8" fill="url(#realRingJoint)" stroke="#1e293b" strokeWidth="0.3" />
        </g>

        {/* Footjoint Open End Bevel (尾管管口倒角出音腔) */}
        <ellipse cx="968" cy="60" rx="2.5" ry="6" fill="url(#realHoleCavity)" stroke="#1e293b" strokeWidth="0.6" />
        <ellipse cx="967" cy="60" rx="1.2" ry="5" fill="#000000" />

        {/* ======================================================== */}
        {/* 5. ELEGANT DOWNWARD POINTERS LINKING TO GUIDE BELOW      */}
        {/* ======================================================== */}
        {/* Render clean vertical alignment indicator markers below active keys */}
        {Object.entries(keyCoords).map(([id, info]) => {
          if (!info.active && activeKeyHover !== id) return null;
          return (
            <g key={`guide-line-${id}`}>
              <line
                x1={info.cx}
                y1={info.cy + info.r + 3}
                x2={info.cx}
                y2={95}
                stroke="var(--brand)"
                strokeWidth="1"
                strokeDasharray="2,2"
                opacity="0.85"
              />
              <circle cx={info.cx} cy={95} r="2" fill="var(--brand)" />
            </g>
          );
        })}

        {/* Section Brackets on Bottom (笛头 / 笛身左手 / 笛身右手 / 尾管) */}
        <g fontSize="7.5" fill="#94a3b8" fontWeight="600" fontFamily="sans-serif">
          <text x="140" y="112" textAnchor="middle" fill="#64748b">① 笛头 (Headjoint)</text>
          <text x="445" y="112" textAnchor="middle" fill="var(--brand-strong)">② 笛身 · 左手键区</text>
          <text x="635" y="112" textAnchor="middle" fill="var(--brand-strong)">③ 笛身 · 右手键区</text>
          <text x="870" y="112" textAnchor="middle" fill="#64748b">④ 尾管 (Footjoint)</text>
        </g>
      </svg>
    </div>
  );
};
