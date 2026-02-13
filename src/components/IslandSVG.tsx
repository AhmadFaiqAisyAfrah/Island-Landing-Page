export default function IslandSVG({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 500 450"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                {/* Grass gradient */}
                <linearGradient id="grassGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7BC67E" />
                    <stop offset="100%" stopColor="#4DA652" />
                </linearGradient>
                {/* Island rock gradient */}
                <linearGradient id="rockGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B7355" />
                    <stop offset="40%" stopColor="#7A8BA0" />
                    <stop offset="100%" stopColor="#9BB0C8" />
                </linearGradient>
                {/* Sky glow under island */}
                <radialGradient id="glowGrad" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0%" stopColor="#B8DFF0" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#B8DFF0" stopOpacity="0" />
                </radialGradient>
                {/* House roof gradient */}
                <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5E3C" />
                    <stop offset="100%" stopColor="#6B4226" />
                </linearGradient>
                {/* Tree canopy gradients */}
                <radialGradient id="tree1Grad" cx="0.4" cy="0.3" r="0.7">
                    <stop offset="0%" stopColor="#A8E06C" />
                    <stop offset="60%" stopColor="#6BBF3A" />
                    <stop offset="100%" stopColor="#4A9E28" />
                </radialGradient>
                <radialGradient id="tree2Grad" cx="0.4" cy="0.3" r="0.7">
                    <stop offset="0%" stopColor="#8ED860" />
                    <stop offset="60%" stopColor="#5DAF30" />
                    <stop offset="100%" stopColor="#3D8E18" />
                </radialGradient>
                {/* Door glow */}
                <radialGradient id="doorGlow" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0%" stopColor="#FFE4A0" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#FFD06B" stopOpacity="0.2" />
                </radialGradient>
            </defs>

            {/* ===== Glow under the island ===== */}
            <ellipse cx="250" cy="370" rx="130" ry="40" fill="url(#glowGrad)" />

            {/* ===== Island rock underside ===== */}
            <path
                d="M110 270 Q140 380 250 370 Q360 380 390 270"
                fill="url(#rockGrad)"
            />
            {/* Rock highlight */}
            <path
                d="M130 275 Q155 345 250 338 Q345 345 370 275"
                fill="#A0B8CE"
                opacity="0.35"
            />
            {/* Rock bottom tip details */}
            <path
                d="M180 310 Q210 370 250 365 Q290 370 320 310"
                fill="#8BA5BC"
                opacity="0.25"
            />

            {/* ===== Island grass top ===== */}
            <ellipse cx="250" cy="270" rx="150" ry="38" fill="url(#grassGrad)" />
            {/* Lighter grass highlight */}
            <ellipse cx="235" cy="262" rx="120" ry="26" fill="#8AD47E" opacity="0.6" />
            {/* Grass edge detail */}
            <ellipse cx="250" cy="266" rx="140" ry="30" fill="#6FC565" opacity="0.3" />

            {/* ===== Small flowers scattered ===== */}
            {/* White daisy cluster left */}
            <circle cx="155" cy="260" r="3.5" fill="#FFF" opacity="0.9" />
            <circle cx="148" cy="264" r="2.5" fill="#FFF" opacity="0.7" />
            <circle cx="162" cy="263" r="2" fill="#FFEEF0" opacity="0.8" />
            {/* Yellow flowers center-left */}
            <circle cx="200" cy="268" r="3" fill="#FFE066" />
            <circle cx="207" cy="265" r="2.5" fill="#FFD700" />
            <circle cx="195" cy="271" r="2" fill="#FFE066" opacity="0.7" />
            {/* Pink flowers right */}
            <circle cx="310" cy="262" r="3" fill="#FFB6C1" />
            <circle cx="318" cy="265" r="2.5" fill="#FF9FB1" />
            <circle cx="305" cy="266" r="2" fill="#FFD1DC" opacity="0.8" />
            {/* Blue tiny flowers */}
            <circle cx="270" cy="270" r="2" fill="#A8D5F0" />
            <circle cx="340" cy="266" r="2.5" fill="#A8D5F0" opacity="0.7" />

            {/* ===== Grass tufts ===== */}
            <path d="M140 262 Q143 252 146 262" stroke="#5DAF30" strokeWidth="1.5" fill="none" />
            <path d="M170 258 Q173 248 176 258" stroke="#5DAF30" strokeWidth="1.5" fill="none" />
            <path d="M330 260 Q333 250 336 260" stroke="#5DAF30" strokeWidth="1.5" fill="none" />
            <path d="M360 264 Q363 255 366 264" stroke="#5DAF30" strokeWidth="1.2" fill="none" />

            {/* ===== HOUSE ===== */}
            {/* House body - round cottage style */}
            <path
                d="M190 265 L190 210 Q190 195 210 195 L260 195 Q280 195 280 210 L280 265"
                fill="#FFF5E6"
            />
            {/* House wall shadow */}
            <path
                d="M190 265 L190 220 Q190 210 200 210 L210 210 L210 265"
                fill="#F0E0C8"
                opacity="0.4"
            />
            {/* House right shadow */}
            <path
                d="M265 210 Q275 210 278 220 L278 265 L265 265 Z"
                fill="#E8D5B8"
                opacity="0.3"
            />

            {/* Roof - round/dome shape */}
            <path
                d="M180 215 Q180 165 235 155 Q290 165 290 215"
                fill="url(#roofGrad)"
            />
            {/* Roof highlight */}
            <path
                d="M192 210 Q195 175 235 167 Q250 170 260 180"
                fill="#9E6E48"
                opacity="0.4"
            />
            {/* Roof edge line */}
            <path
                d="M178 215 Q178 163 235 153 Q292 163 292 215"
                stroke="#5C3A1E"
                strokeWidth="1.5"
                fill="none"
                opacity="0.3"
            />

            {/* Door */}
            <rect x="224" y="230" width="22" height="35" rx="11" fill="#5C3A1E" />
            {/* Door glow light */}
            <rect x="226" y="232" width="18" height="31" rx="9" fill="url(#doorGlow)" />
            {/* Door frame */}
            <rect x="224" y="230" width="22" height="35" rx="11" stroke="#4A2E15" strokeWidth="1" fill="none" />

            {/* Window left */}
            <circle cx="207" cy="228" r="8" fill="#B8DFF0" stroke="#5C3A1E" strokeWidth="1.5" />
            <line x1="207" y1="220" x2="207" y2="236" stroke="#5C3A1E" strokeWidth="0.8" />
            <line x1="199" y1="228" x2="215" y2="228" stroke="#5C3A1E" strokeWidth="0.8" />
            {/* Window light reflection */}
            <circle cx="204" cy="225" r="2" fill="#FFF" opacity="0.5" />

            {/* Window right */}
            <circle cx="263" cy="228" r="8" fill="#B8DFF0" stroke="#5C3A1E" strokeWidth="1.5" />
            <line x1="263" y1="220" x2="263" y2="236" stroke="#5C3A1E" strokeWidth="0.8" />
            <line x1="255" y1="228" x2="271" y2="228" stroke="#5C3A1E" strokeWidth="0.8" />
            <circle cx="260" cy="225" r="2" fill="#FFF" opacity="0.5" />

            {/* ===== TREE 1 (right, taller) ===== */}
            {/* Trunk */}
            <rect x="335" y="210" width="10" height="55" rx="4" fill="#7A5C3C" />
            <rect x="337" y="215" width="6" height="45" rx="3" fill="#8B6E4E" />
            {/* Canopy layers */}
            <ellipse cx="340" cy="195" rx="38" ry="35" fill="url(#tree1Grad)" />
            <ellipse cx="340" cy="185" rx="32" ry="28" fill="#7ECB4A" opacity="0.8" />
            <ellipse cx="335" cy="178" rx="24" ry="22" fill="#9ADB6C" opacity="0.6" />
            {/* Canopy highlight */}
            <ellipse cx="328" cy="175" rx="14" ry="12" fill="#B8E88C" opacity="0.5" />

            {/* ===== TREE 2 (right back, slightly shorter) ===== */}
            <rect x="365" y="225" width="8" height="40" rx="3" fill="#6B4E32" />
            <rect x="367" y="228" width="5" height="34" rx="2" fill="#7A5C3C" />
            <ellipse cx="369" cy="215" rx="28" ry="26" fill="url(#tree2Grad)" />
            <ellipse cx="369" cy="207" rx="22" ry="20" fill="#6FC540" opacity="0.7" />
            <ellipse cx="365" cy="202" rx="16" ry="14" fill="#8AD860" opacity="0.5" />

            {/* ===== CHARACTER (girl mascot) ===== */}
            <g transform="translate(155, 218)">
                {/* Shadow on ground */}
                <ellipse cx="12" cy="47" rx="10" ry="3" fill="#3A7A3A" opacity="0.2" />

                {/* Dress / body */}
                <path
                    d="M5 22 Q4 32 2 42 Q7 47 12 47 Q17 47 22 42 Q20 32 19 22 Z"
                    fill="#E85A7A"
                />
                {/* Dress highlight */}
                <path
                    d="M7 24 Q6 33 5 40 Q8 43 12 43 Q13 40 13 33 Q13 26 12 24 Z"
                    fill="#F07090"
                    opacity="0.5"
                />
                {/* Dress ribbon/bow */}
                <ellipse cx="12" cy="23" rx="4" ry="1.5" fill="#D04060" />

                {/* Arms */}
                <path d="M5 25 Q1 30 3 35" stroke="#FDDCB5" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M19 25 Q23 30 21 35" stroke="#FDDCB5" strokeWidth="3" strokeLinecap="round" fill="none" />

                {/* Head */}
                <ellipse cx="12" cy="13" rx="10" ry="11" fill="#FDDCB5" />

                {/* Hair - long flowing */}
                <path
                    d="M2 10 Q2 0 12 -2 Q22 0 22 10 Q23 18 22 28 Q20 30 18 28 Q19 18 18 12 L18 8 Q14 4 12 4 Q10 4 6 8 L6 12 Q5 18 6 28 Q4 30 2 28 Q1 18 2 10 Z"
                    fill="#5C3420"
                />
                {/* Hair highlight */}
                <path
                    d="M5 6 Q8 2 12 1 Q14 2 15 5"
                    stroke="#7A4E30"
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.6"
                />
                {/* Bangs */}
                <path
                    d="M4 10 Q6 5 12 3 Q18 5 20 10 Q18 12 16 10 Q14 7 12 7 Q10 7 8 10 Q6 12 4 10 Z"
                    fill="#5C3420"
                />

                {/* Eyes */}
                <ellipse cx="8" cy="14" rx="2" ry="2.5" fill="#3A2820" />
                <ellipse cx="16" cy="14" rx="2" ry="2.5" fill="#3A2820" />
                {/* Eye shine */}
                <circle cx="9" cy="13" r="0.8" fill="#FFF" />
                <circle cx="17" cy="13" r="0.8" fill="#FFF" />

                {/* Blush */}
                <ellipse cx="6" cy="17" rx="2.5" ry="1.5" fill="#FFB0B0" opacity="0.5" />
                <ellipse cx="18" cy="17" rx="2.5" ry="1.5" fill="#FFB0B0" opacity="0.5" />

                {/* Small smile */}
                <path d="M10 18 Q12 20 14 18" stroke="#C07060" strokeWidth="0.8" fill="none" strokeLinecap="round" />

                {/* Legs/feet */}
                <line x1="8" y1="47" x2="8" y2="44" stroke="#FDDCB5" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="16" y1="47" x2="16" y2="44" stroke="#FDDCB5" strokeWidth="2.5" strokeLinecap="round" />
                {/* Shoes */}
                <ellipse cx="8" cy="48" rx="3" ry="1.5" fill="#5C3A1E" />
                <ellipse cx="16" cy="48" rx="3" ry="1.5" fill="#5C3A1E" />
            </g>

            {/* ===== Small bush/shrub left ===== */}
            <ellipse cx="130" cy="265" rx="16" ry="10" fill="#5DAF30" />
            <ellipse cx="130" cy="260" rx="12" ry="8" fill="#7ECB4A" opacity="0.7" />

            {/* ===== Sparkle / firefly effects ===== */}
            <circle cx="170" cy="200" r="2.5" fill="#FFE680" opacity="0.7">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="310" cy="185" r="2" fill="#FFE680" opacity="0.5">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="380" cy="170" r="1.8" fill="#FFF" opacity="0.6">
                <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="140" cy="230" r="1.5" fill="#FFF" opacity="0.4">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="3.5s" repeatCount="indefinite" />
            </circle>
            {/* Star sparkles */}
            <g opacity="0.6">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite" />
                <path d="M120 190 L122 186 L124 190 L120 188 L124 188 Z" fill="#FFE680" />
            </g>
            <g opacity="0.5">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                <path d="M390 200 L391.5 196 L393 200 L390 198.5 L393 198.5 Z" fill="#FFF" />
            </g>

            {/* ===== Tiny path/stepping stones to house ===== */}
            <ellipse cx="235" cy="272" rx="5" ry="2" fill="#E0D0B0" opacity="0.5" />
            <ellipse cx="228" cy="276" rx="4" ry="1.5" fill="#E0D0B0" opacity="0.4" />
            <ellipse cx="220" cy="278" rx="3.5" ry="1.5" fill="#E0D0B0" opacity="0.35" />
        </svg>
    );
}
