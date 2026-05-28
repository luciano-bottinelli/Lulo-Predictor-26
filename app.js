/* ==========================================
   LULO PREDICTOR - MOTOR DE SIMULACIÓN Y CRUCES MUNDIAL 2026 (app.js)
   ========================================== */

// ================= CONFIGURACIÓN Y ESTADO INICIAL =================

const CONFIG = {
    AVATARS: [
        { id: 0, name: "El Bilardo Retro", img: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" }, 
        { id: 1, name: "Mánager de Traje", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
        { id: 2, name: "El Coco Táctico", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
        { id: 3, name: "Mánager Joven", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" }
    ],
    COUNTRIES: {
        ARG: { name: "Argentina", colors: { bg: "#74acdf", stripe: "#ffffff", sun: "#f9d149" } },
        VEN: { name: "Venezuela", colors: { yellow: "#fcd116", blue: "#003893", red: "#cf142b" } },
        BRA: { name: "Brasil", colors: { green: "#009c3b", yellow: "#ffe000", blue: "#002776" } },
        FRA: { name: "Francia", colors: { blue: "#002395", white: "#ffffff", red: "#ed2939" } },
        GER: { name: "Alemania", colors: { black: "#000000", red: "#dd0000", gold: "#ffcf00" } },
        ESP: { name: "España", colors: { red: "#c60b1e", gold: "#ffc400" } },
        URU: { name: "Uruguay", colors: { blue: "#0081c8", white: "#ffffff", sun: "#f9d149" } },
        ENG: { name: "Inglaterra", colors: { white: "#ffffff", red: "#cf081f" } },
        MEX: { name: "México", colors: { green: "#006847", white: "#ffffff", red: "#c8102e" } },
        USA: { name: "EE.UU.", colors: { blue: "#002868", red: "#bf0a30", white: "#ffffff" } },
        ITA: { name: "Italia", colors: { green: "#009246", white: "#ffffff", red: "#ce2b37" } },
        JPN: { name: "Japón", colors: { white: "#ffffff", red: "#bc002d" } },
        CAN: { name: "Canadá", colors: { red: "#ff0000", white: "#ffffff" } },
        COL: { name: "Colombia", colors: { yellow: "#fcd116", blue: "#003893", red: "#ce1126" } },
        SEN: { name: "Senegal", colors: { green: "#00853f", yellow: "#fdef42", red: "#e31b23" } },
        BEL: { name: "Bélgica", colors: { black: "#000000", red: "#fdda24", gold: "#ef3340" } },
        KOR: { name: "Corea Sur", colors: { white: "#ffffff", red: "#cd2e3a", blue: "#0047a0" } },
        CRO: { name: "Croacia", colors: { red: "#ff0000", white: "#ffffff" } },
        MAR: { name: "Marruecos", colors: { red: "#c1272d", green: "#006233" } },
        SWE: { name: "Suecia", colors: { blue: "#006aa7", yellow: "#fecc00" } },
        CMR: { name: "Camerún", colors: { green: "#007a5e", red: "#ce1126", yellow: "#fcd116" } },
        PAR: { name: "Paraguay", colors: { red: "#d52b1e", white: "#ffffff", blue: "#0038a8" } },
        TUN: { name: "Túnez", colors: { red: "#e2011a", white: "#ffffff" } },
        NED: { name: "P. Bajos", colors: { orange: "#ff4f00", white: "#ffffff" } },
        POR: { name: "Portugal", colors: { green: "#006600", red: "#ff0000" } },
        EGY: { name: "Egipto", colors: { red: "#c09300", black: "#000000" } },
        ECU: { name: "Ecuador", colors: { yellow: "#ffdd00", blue: "#034ea2", red: "#da291c" } },
        SUI: { name: "Suiza", colors: { red: "#da291c", white: "#ffffff" } },
        POL: { name: "Polonia", colors: { white: "#ffffff", red: "#eb3323" } },
        NGA: { name: "Nigeria", colors: { green: "#008751", white: "#ffffff" } },
        GHA: { name: "Ghana", colors: { red: "#e2011a", yellow: "#fdef42", green: "#00853f" } },
        KSA: { name: "Arabia S.", colors: { green: "#006c35", white: "#ffffff" } }
    },
    // Definición oficial de los 12 grupos de 4 selecciones (48 equipos en total)
    GROUPS: {
        GROUP_A: ["MEX", "VEN", "CAN", "GHA"],
        GROUP_B: ["FRA", "SEN", "JPN", "ECU"],
        GROUP_C: ["USA", "COL", "BEL", "KOR"],
        GROUP_D: ["ARG", "SUI", "CRO", "MAR"],
        GROUP_E: ["BRA", "GER", "SWE", "CMR"],
        GROUP_F: ["ESP", "ENG", "PAR", "TUN"],
        GROUP_G: ["URU", "NED", "POR", "EGY"],
        GROUP_H: ["ITA", "NGA", "POL", "KSA"],
        GROUP_I: ["ARG", "JPN", "ECU", "SEN"],
        GROUP_J: ["BRA", "FRA", "CRO", "TUN"],
        GROUP_K: ["ENG", "MEX", "COL", "BEL"],
        GROUP_L: ["USA", "VEN", "FRA", "NED"]
    }
};

// ================= CONFIGURACIÓN DE BASE DE DATOS SUPABASE =================
// Si deseas habilitar el juego multijugador online en la nube para jugar con amigos y familia (como tu abuelo),
// crea un proyecto gratuito en https://supabase.com, copia y pega tus claves aquí y ejecuta el script SQL provisto.
// De lo contrario, deja estos campos en blanco y la aplicación funcionará perfectamente en modo local (localStorage).
const DATABASE_CONFIG = {
    SUPABASE_URL: "https://zhajrdugcfrbozluikeg.supabase.co",
    SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpoYWpyZHVnY2ZyYm96bHVpa2VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NzQ1NTYsImV4cCI6MjA5NTU1MDU1Nn0.Jkx4ercMgJt21BqZsscLeXl1xylNYiiOl6bxR_oMWi0"
};

let supabase = null;
if (DATABASE_CONFIG.SUPABASE_URL && DATABASE_CONFIG.SUPABASE_ANON_KEY) {
    try {
        supabase = window.supabase.createClient(DATABASE_CONFIG.SUPABASE_URL, DATABASE_CONFIG.SUPABASE_ANON_KEY);
        console.log("Supabase Cloud Sync Engine initialized successfully!");
    } catch (e) {
        console.error("Error al iniciar Supabase client:", e);
    }
}

// Mánagers Simulados (CPU) que competirán con el usuario
const CPU_PLAYERS = [
    { username: "Bilardo Master", teamName: "Narigón F.C.", avatar: 0, avatarType: "predefined", isCPU: true, predictions: {}, points: 0, exactMatches: 0, outcomeMatches: 0, strategy: "defensive", joinedDate: "2026/05/28" },
    { username: "Basile Coco", teamName: "La Voz F.C.", avatar: 2, avatarType: "predefined", isCPU: true, predictions: {}, points: 0, exactMatches: 0, outcomeMatches: 0, strategy: "offensive", joinedDate: "2026/05/28" },
    { username: "Caruso Salvador", teamName: "Vende Humo C.F.", avatar: 3, avatarType: "predefined", isCPU: true, predictions: {}, points: 0, exactMatches: 0, outcomeMatches: 0, strategy: "draws", joinedDate: "2026/05/28" },
    { username: "El Tronco", teamName: "Troncos Unidos", avatar: 1, avatarType: "predefined", isCPU: true, predictions: {}, points: 0, exactMatches: 0, outcomeMatches: 0, strategy: "random", joinedDate: "2026/05/28" },
    { username: "Mánager IA Gold", teamName: "Cyber Fútbol 96", avatar: 1, avatarType: "predefined", isCPU: true, predictions: {}, points: 0, exactMatches: 0, outcomeMatches: 0, strategy: "logical", joinedDate: "2026/05/28" }
];

// Estado global de la aplicación
let state = {
    currentUser: null,  
    matches: [],        // Fase de grupos (72 partidos generados dinámicamente)
    users: [],          
    clans: [],          
    activeClan: null,   
    crtEnabled: true,
    soundEnabled: true,
    authMode: "login",  
    avatarSource: "predefined", 
    tempCustomAvatarBase64: null,
    apiToken: "",
    bracketRound: "r32"  // Ronda activa del bracket: 'r32', 'r16', 'r8', 'r4', 'r2'
};

// ================= GENERACIÓN COMPLETA DE PARTIDOS DE GRUPOS (72 PARTIDOS) =================

function generateGroupStageMatches() {
    const matches = [];
    let matchId = 1;
    const dates = [
        "11 de Junio, 2026 - 15:00",
        "12 de Junio, 2026 - 18:00",
        "13 de Junio, 2026 - 13:00",
        "14 de Junio, 2026 - 16:00",
        "15 de Junio, 2026 - 14:00",
        "16 de Junio, 2026 - 17:00"
    ];
    
    for (const [groupName, teams] of Object.entries(CONFIG.GROUPS)) {
        // Formato round-robin para 4 selecciones (6 partidos)
        const pairings = [
            [teams[0], teams[1], dates[0]],
            [teams[2], teams[3], dates[1]],
            [teams[0], teams[2], dates[2]],
            [teams[1], teams[3], dates[3]],
            [teams[0], teams[3], dates[4]],
            [teams[1], teams[2], dates[5]]
        ];
        
        pairings.forEach((pair) => {
            matches.push({
                id: matchId++,
                stage: groupName,
                home: pair[0],
                away: pair[1],
                date: `${groupName.replace('GROUP_','GRUPO ')} - ${pair[2]}`,
                homeScore: null,
                awayScore: null,
                played: false
            });
        });
    }
    return matches;
}

// ================= MOTOR DE AUDIO RETRO (Web Audio API) =================

let audioCtx = null;

const Sound = {
    init() {
        if (!audioCtx) {
            try {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            } catch (err) {
                console.warn("Web Audio API is not supported or blocked in this browser:", err);
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    },
    
    playClick() {
        if (!state.soundEnabled) return;
        this.init();
        if (!audioCtx) return;
        
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05);
        
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.05);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
    },
    
    playBloop() {
        if (!state.soundEnabled) return;
        this.init();
        if (!audioCtx) return;
        
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.08);
        
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.08);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
    },

    playBeep() {
        if (!state.soundEnabled) return;
        this.init();
        if (!audioCtx) return;
        
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1100, audioCtx.currentTime);
        
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.04);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.04);
    },
    
    playDisk() {
        if (!state.soundEnabled) return;
        this.init();
        if (!audioCtx) return;
        
        const now = audioCtx.currentTime;
        for (let i = 0; i < 4; i++) {
            const timeOffset = i * 0.1;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(60, now + timeOffset);
            osc.frequency.linearRampToValueAtTime(10, now + timeOffset + 0.03);
            gain.gain.setValueAtTime(0.15, now + timeOffset);
            gain.gain.linearRampToValueAtTime(0, now + timeOffset + 0.03);
            
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now + timeOffset);
            osc.stop(now + timeOffset + 0.03);
        }
    },
    
    playFanfare() {
        if (!state.soundEnabled) return;
        this.init();
        if (!audioCtx) return;
        
        const now = audioCtx.currentTime;
        const notes = [
            { note: 523.25, duration: 0.1 },  // C5
            { note: 659.25, duration: 0.1 },  // E5
            { note: 783.99, duration: 0.1 },  // G5
            { note: 1046.50, duration: 0.3 }  // C6
        ];
        
        let start = now;
        notes.forEach(item => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            
            osc.type = 'square';
            osc.frequency.setValueAtTime(item.note, start);
            
            gain.gain.setValueAtTime(0.08, start);
            gain.gain.linearRampToValueAtTime(0, start + item.duration);
            
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            
            osc.start(start);
            osc.stop(start + item.duration);
            
            start += item.duration;
        });
    },

    playError() {
        if (!state.soundEnabled) return;
        this.init();
        if (!audioCtx) return;
        
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, audioCtx.currentTime);
        osc.frequency.setValueAtTime(90, audioCtx.currentTime + 0.15);
        
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.25);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
    }
};

// ================= GENERADOR DINÁMICO DE BANDERAS RETRO =================

function getFlagSVG(code) {
    const props = CONFIG.COUNTRIES[code];
    if (!props) return ''; 
    return getFlagSVGContent(code, props);
}

function getFlagSVGContent(code, props) {
    let innerContent = '';
    switch(code) {
        case 'ARG':
            innerContent = `<rect width="100" height="33.3" fill="${props.colors.bg}"/><rect y="33.3" width="100" height="33.3" fill="${props.colors.stripe}"/><rect y="66.6" width="100" height="33.4" fill="${props.colors.bg}"/><circle cx="50" cy="50" r="8" fill="${props.colors.sun}"/><circle cx="50" cy="50" r="11" fill="none" stroke="${props.colors.sun}" stroke-width="1.5" stroke-dasharray="3,3"/>`;
            break;
        case 'VEN':
            innerContent = `<rect width="100" height="33.3" fill="${props.colors.yellow}"/><rect y="33.3" width="100" height="33.3" fill="${props.colors.blue}"/><rect y="66.6" width="100" height="33.4" fill="${props.colors.red}"/><path d="M 32,54 A 20,20 0 0,1 68,54" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="1,4"/>`;
            break;
        case 'BRA':
            innerContent = `<rect width="100" height="100" fill="${props.colors.green}"/><polygon points="50,10 90,50 50,90 10,50" fill="${props.colors.yellow}"/><circle cx="50" cy="50" r="18" fill="${props.colors.blue}"/><path d="M 33,52 Q 50,44 67,48" fill="none" stroke="#ffffff" stroke-width="2"/>`;
            break;
        case 'FRA':
            innerContent = `<rect width="33.3" height="100" fill="${props.colors.blue}"/><rect x="33.3" width="33.4" height="100" fill="${props.colors.white}"/><rect x="66.7" width="33.3" height="100" fill="${props.colors.red}"/>`;
            break;
        case 'GER':
            innerContent = `<rect width="100" height="33.3" fill="${props.colors.black}"/><rect y="33.3" width="100" height="33.3" fill="${props.colors.red}"/><rect y="66.6" width="100" height="33.4" fill="${props.colors.gold}"/>`;
            break;
        case 'ESP':
            innerContent = `<rect width="100" height="25" fill="${props.colors.red}"/><rect y="25" width="100" height="50" fill="${props.colors.gold}"/><rect y="75" width="100" height="25" fill="${props.colors.red}"/><circle cx="30" cy="50" r="6" fill="#800000" stroke="#ffffff" stroke-width="1.5"/>`;
            break;
        case 'URU':
            innerContent = `<rect width="100" height="100" fill="${props.colors.white}"/><rect y="11.1" width="100" height="11.1" fill="${props.colors.blue}"/><rect y="33.3" width="100" height="11.1" fill="${props.colors.blue}"/><rect y="55.5" width="100" height="11.1" fill="${props.colors.blue}"/><rect y="77.7" width="100" height="11.1" fill="${props.colors.blue}"/><circle cx="50" cy="50" r="10" fill="${props.colors.sun}" stroke="#000" stroke-width="1"/><circle cx="50" cy="50" r="14" fill="none" stroke="${props.colors.sun}" stroke-width="2" stroke-dasharray="4,2"/>`;
            break;
        case 'ENG':
            innerContent = `<rect width="100" height="100" fill="${props.colors.white}"/><rect y="40" width="100" height="20" fill="${props.colors.red}"/><rect x="40" width="20" height="100" fill="${props.colors.red}"/>`;
            break;
        case 'MEX':
            innerContent = `<rect width="33.3" height="100" fill="${props.colors.green}"/><rect x="33.3" width="33.4" height="100" fill="${props.colors.white}"/><rect x="66.7" width="33.3" height="100" fill="${props.colors.red}"/><circle cx="50" cy="50" r="5" fill="#a05a2c" stroke="#5a3d28" stroke-width="1"/>`;
            break;
        case 'USA':
            innerContent = `<rect width="100" height="100" fill="${props.colors.white}"/><rect y="0" width="100" height="14.3" fill="${props.colors.red}"/><rect y="28.6" width="100" height="14.3" fill="${props.colors.red}"/><rect y="57.1" width="100" height="14.3" fill="${props.colors.red}"/><rect y="85.7" width="100" height="14.3" fill="${props.colors.red}"/><rect width="45" height="50" fill="${props.colors.blue}"/><circle cx="15" cy="15" r="2" fill="#fff"/><circle cx="30" cy="15" r="2" fill="#fff"/><circle cx="15" cy="35" r="2" fill="#fff"/><circle cx="30" cy="35" r="2" fill="#fff"/>`;
            break;
        case 'ITA':
            innerContent = `<rect width="33.3" height="100" fill="${props.colors.green}"/><rect x="33.3" width="33.4" height="100" fill="${props.colors.white}"/><rect x="66.7" width="33.3" height="100" fill="${props.colors.red}"/>`;
            break;
        case 'JPN':
            innerContent = `<rect width="100" height="100" fill="${props.colors.white}"/><circle cx="50" cy="50" r="22" fill="${props.colors.red}"/>`;
            break;
        case 'CAN':
            innerContent = `<rect width="25" height="100" fill="${props.colors.red}"/><rect x="25" width="50" height="100" fill="${props.colors.white}"/><rect x="75" width="25" height="100" fill="${props.colors.red}"/><polygon points="50,25 56,38 70,38 58,48 64,62 50,52 36,62 42,48 30,38 44,38" fill="${props.colors.red}"/>`;
            break;
        case 'COL':
            innerContent = `<rect width="100" height="50" fill="${props.colors.yellow}"/><rect y="50" width="100" height="25" fill="${props.colors.blue}"/><rect y="75" width="100" height="25" fill="${props.colors.red}"/>`;
            break;
        case 'SEN':
            innerContent = `<rect width="33.3" height="100" fill="${props.colors.green}"/><rect x="33.3" width="33.4" height="100" fill="${props.colors.yellow}"/><rect x="66.7" width="33.3" height="100" fill="${props.colors.red}"/><polygon points="50,38 53,46 62,46 55,52 57,60 50,55 43,60 45,52 38,46 47,46" fill="#000000"/>`;
            break;
        case 'BEL':
            innerContent = `<rect width="33.3" height="100" fill="${props.colors.black}"/><rect x="33.3" width="33.4" height="100" fill="${props.colors.red}"/><rect x="66.7" width="33.3" height="100" fill="${props.colors.gold}"/>`;
            break;
        case 'ECU':
            innerContent = `<rect width="100" height="50" fill="${props.colors.yellow}"/><rect y="50" width="100" height="25" fill="${props.colors.blue}"/><rect y="75" width="100" height="25" fill="${props.colors.red}"/><circle cx="50" cy="58" r="8" fill="#8b5a2b" stroke="#fff" stroke-width="1"/>`;
            break;
        case 'SUI':
            innerContent = `<rect width="100" height="100" fill="${props.colors.red}"/><rect x="40" y="20" width="20" height="60" fill="${props.colors.white}"/><rect x="20" y="40" width="60" height="20" fill="${props.colors.white}"/>`;
            break;
        case 'CRO':
            innerContent = `<rect width="100" height="33.3" fill="${props.colors.red}"/><rect y="33.3" width="100" height="33.3" fill="${props.colors.white}"/><rect y="66.6" width="100" height="33.4" fill="${props.colors.white}"/><rect x="40" y="25" width="20" height="20" fill="#cc0000" stroke="#fff" stroke-width="1"/>`;
            break;
        case 'MAR':
            innerContent = `<rect width="100" height="100" fill="${props.colors.red}"/><polygon points="50,25 55,42 70,42 58,52 62,68 50,58 38,68 42,52 30,42 45,42" fill="none" stroke="${props.colors.green}" stroke-width="3"/>`;
            break;
        case 'POR':
            innerContent = `<rect width="40" height="100" fill="${props.colors.green}"/><rect x="40" width="60" height="100" fill="${props.colors.red}"/><circle cx="40" cy="50" r="10" fill="#ffff00" stroke="#000" stroke-width="1"/>`;
            break;
        default:
            innerContent = `<rect width="100" height="100" fill="#777"/>`;
    }
    return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none">
            ${innerContent}
        </svg>
    `;
}

function createCircularFlagHTML(countryCode) {
    return `
        <div class="retro-flag-container" title="${CONFIG.COUNTRIES[countryCode]?.name || countryCode}">
            <div class="retro-flag">
                ${getFlagSVG(countryCode)}
                <div class="flag-inner-shadow"></div>
                <div class="flag-pixel-mesh"></div>
                <div class="flag-glossy-overlay"></div>
            </div>
        </div>
    `;
}

// ================= GESTIÓN DE LA BASE DE DATOS LOCAL Y MOTOR DE JUEGO =================

// ================= GESTIÓN DE LA BASE DE DATOS LOCAL Y MOTOR DE JUEGO =================

function loadDatabase() {
    // 1. Partidos Fase de Grupos (con protección try-catch)
    const storedMatches = localStorage.getItem('predictor_lulo_matches');
    if (storedMatches) {
        try {
            state.matches = JSON.parse(storedMatches);
        } catch (e) {
            console.error("Error parsing predictor_lulo_matches, generating default ones...", e);
            state.matches = generateGroupStageMatches();
            localStorage.setItem('predictor_lulo_matches', JSON.stringify(state.matches));
        }
    } else {
        state.matches = generateGroupStageMatches();
        localStorage.setItem('predictor_lulo_matches', JSON.stringify(state.matches));
    }
    
    // 2. Usuarios
    const storedUsers = localStorage.getItem('predictor_lulo_users');
    if (storedUsers) {
        try {
            state.users = JSON.parse(storedUsers);
        } catch (e) {
            console.error("Error parsing predictor_lulo_users, restoring default CPU players...", e);
            state.users = JSON.parse(JSON.stringify(CPU_PLAYERS));
            localStorage.setItem('predictor_lulo_users', JSON.stringify(state.users));
        }
    } else {
        state.users = JSON.parse(JSON.stringify(CPU_PLAYERS));
        localStorage.setItem('predictor_lulo_users', JSON.stringify(state.users));
    }
    
    // 3. Clanes
    const storedClans = localStorage.getItem('predictor_lulo_clans');
    if (storedClans) {
        try {
            state.clans = JSON.parse(storedClans);
        } catch (e) {
            console.error("Error parsing predictor_lulo_clans, resetting to empty...", e);
            state.clans = [];
            localStorage.setItem('predictor_lulo_clans', JSON.stringify(state.clans));
        }
    } else {
        state.clans = [];
        localStorage.setItem('predictor_lulo_clans', JSON.stringify(state.clans));
    }
    
    // 4. Token API
    const storedApiToken = localStorage.getItem('predictor_lulo_api_token');
    if (storedApiToken) {
        state.apiToken = storedApiToken;
        document.getElementById('api-token-input').value = storedApiToken;
    }
    
    // 5. Sesión activa (Cambio de email a username)
    const activeSessionUsername = localStorage.getItem('predictor_lulo_session');
    if (activeSessionUsername) {
        state.currentUser = state.users.find(u => u.username === activeSessionUsername && !u.isCPU);
        
        // Inicializar estructura de predicciones avanzadas si no existen
        if (state.currentUser) {
            if (!state.currentUser.bracketPredictions) {
                state.currentUser.bracketPredictions = {};
            }
            if (!state.currentUser.specialPredictions) {
                state.currentUser.specialPredictions = { finalist1: "", finalist2: "", champion: "", scorer: "", assister: "" };
            }
        }
    }
    
    // CPUs también necesitan sus estructuras avanzadas inicializadas
    state.users.forEach(u => {
        if (u.isCPU) {
            if (!u.bracketPredictions) u.bracketPredictions = {};
            if (!u.specialPredictions) u.specialPredictions = { finalist1: "", finalist2: "", champion: "", scorer: "", assister: "" };
        }
    });

    // Iniciar sincronización con la nube de forma asíncrona si Supabase está configurado
    if (supabase) {
        syncWithSupabase();
    }
}

function saveDatabaseLocally() {
    localStorage.setItem('predictor_lulo_matches', JSON.stringify(state.matches));
    localStorage.setItem('predictor_lulo_users', JSON.stringify(state.users));
    localStorage.setItem('predictor_lulo_clans', JSON.stringify(state.clans));
    localStorage.setItem('predictor_lulo_api_token', state.apiToken);
    
    if (state.currentUser) {
        localStorage.setItem('predictor_lulo_session', state.currentUser.username);
    } else {
        localStorage.removeItem('predictor_lulo_session');
    }
}

function saveDatabase() {
    saveDatabaseLocally();
    
    // Guardar cambios de predicciones en la nube asincrónicamente si Supabase está activo
    if (supabase && state.currentUser) {
        supabase.from('users').update({
            predictions: state.currentUser.predictions,
            bracket_predictions: state.currentUser.bracketPredictions,
            special_predictions: state.currentUser.specialPredictions,
            points: state.currentUser.points,
            exact_matches: state.currentUser.exactMatches,
            outcome_matches: state.currentUser.outcomeMatches,
            team_name: state.currentUser.teamName,
            avatar: String(state.currentUser.avatar),
            avatar_type: state.currentUser.avatarType
        }).eq('username', state.currentUser.username)
        .then(({ error }) => {
            if (error) console.error("Error al guardar predicciones del usuario en Supabase:", error);
            else console.log("Datos de usuario guardados en la nube asincrónicamente.");
        });
    }
}

// ================= MOTOR DE SINCRONIZACIÓN SUPABASE CLOUD =================

async function syncWithSupabase() {
    if (!supabase) return;
    try {
        console.log("Comenzando sincronización con Supabase Cloud...");
        
        // 1. Obtener partidos oficiales de la nube
        const { data: cloudMatches, error: matchesErr } = await supabase
            .from('matches')
            .select('*');
            
        if (!matchesErr && cloudMatches && cloudMatches.length > 0) {
            console.log(`Sincronizados ${cloudMatches.length} partidos oficiales desde la nube.`);
            cloudMatches.forEach(cm => {
                const localMatch = state.matches.find(lm => lm.id === cm.id);
                if (localMatch) {
                    localMatch.homeScore = cm.home_score;
                    localMatch.awayScore = cm.away_score;
                    localMatch.played = cm.played;
                }
            });
        }
        
        // 2. Obtener usuarios (mánagers) de la nube
        const { data: cloudUsers, error: usersErr } = await supabase
            .from('users')
            .select('*');
            
        if (!usersErr && cloudUsers && cloudUsers.length > 0) {
            console.log(`Sincronizados ${cloudUsers.length} mánagers desde la nube.`);
            
            const newUsersList = [];
            
            // Cargar usuarios de la nube
            cloudUsers.forEach(cu => {
                const userObj = {
                    username: cu.username,
                    password: cu.password,
                    teamName: cu.team_name || "",
                    avatar: isNaN(Number(cu.avatar)) ? cu.avatar : Number(cu.avatar),
                    avatarType: cu.avatar_type || "predefined",
                    predictions: cu.predictions || {},
                    bracketPredictions: cu.bracket_predictions || {},
                    specialPredictions: cu.special_predictions || { finalist1: "", finalist2: "", champion: "", scorer: "", assister: "" },
                    points: cu.points || 0,
                    exactMatches: cu.exact_matches || 0,
                    outcomeMatches: cu.outcome_matches || 0,
                    joinedDate: cu.joined_date || "2026/05/28",
                    isCPU: cu.is_cpu || false
                };
                newUsersList.push(userObj);
            });
            
            // Si falta alguna CPU por defecto, la agregamos
            CPU_PLAYERS.forEach(cpu => {
                if (!newUsersList.some(u => u.username === cpu.username)) {
                    newUsersList.push(JSON.parse(JSON.stringify(cpu)));
                }
            });
            
            state.users = newUsersList;
        }
        
        // 3. Obtener clanes de la nube
        const { data: cloudClans, error: clansErr } = await supabase
            .from('clans')
            .select('*');
            
        if (!clansErr && cloudClans && cloudClans.length > 0) {
            console.log(`Sincronizados ${cloudClans.length} clanes desde la nube.`);
            state.clans = cloudClans.map(cc => ({
                id: cc.id,
                name: cc.name,
                code: cc.code,
                creator: cc.creator,
                members: Array.isArray(cc.members) ? cc.members : JSON.parse(cc.members || "[]")
            }));
        }
        
        // Recalcular puntos con los marcadores oficiales cargados
        calculateAllPoints();
        
        // Vincular sesión actual
        const activeSessionUsername = localStorage.getItem('predictor_lulo_session');
        if (activeSessionUsername) {
            state.currentUser = state.users.find(u => u.username === activeSessionUsername && !u.isCPU);
            if (state.currentUser) {
                if (!state.currentUser.bracketPredictions) state.currentUser.bracketPredictions = {};
                if (!state.currentUser.specialPredictions) {
                    state.currentUser.specialPredictions = { finalist1: "", finalist2: "", champion: "", scorer: "", assister: "" };
                }
            }
        }
        
        // Guardar base de datos local actualizada
        saveDatabaseLocally();
        
        // Re-renderizar pestaña activa
        const activeTabBtn = document.querySelector('.tab-btn.active');
        if (activeTabBtn) {
            const tabId = activeTabBtn.dataset.tab;
            if (tabId === 'matches-tab') {
                updateGroupProgressBar();
                renderMatches();
            } else if (tabId === 'standings-tab') {
                const activeSubTabBtn = document.querySelector('.sub-tab-btn.active');
                if (activeSubTabBtn) {
                    const subtabId = activeSubTabBtn.dataset.subtab;
                    if (subtabId === 'global-standings-view') renderStandings();
                    else if (subtabId === 'clans-standings-view') renderClans();
                }
            } else if (tabId === 'profile-tab') {
                renderProfileStats();
            } else if (tabId === 'admin-tab') {
                renderAdminGrid();
            }
        }
        updateManagerUIStats();
        console.log("¡Sincronización con la nube de Supabase completada!");
        
    } catch (err) {
        console.error("Fallo general en la sincronización con la nube:", err);
    }
}

// ================= MOTOR DE PUNTOS TOTALES (NUEVO SISTEMA) =================

function calculateAllPoints() {
    state.users.forEach(user => {
        let totalPts = 0;
        let exacts = 0;
        let outcomes = 0;
        
        // 1. Puntos Fase de Grupos
        state.matches.forEach(match => {
            if (!match.played) return; // Solo partidos concluidos en la vida real
            
            const pred = user.predictions[match.id];
            if (!pred || !pred.saved) return;
            
            const realHome = match.homeScore;
            const realAway = match.awayScore;
            const predHome = pred.homeScore;
            const predAway = pred.awayScore;
            
            if (realHome === predHome && realAway === predAway) {
                totalPts += 15; // Exacto = +15 pts
                exacts++;
            } else if (
                (realHome > realAway && predHome > predAway) ||
                (realHome < realAway && predHome < predAway) ||
                (realHome === realAway && predHome === predAway)
            ) {
                totalPts += 5; // Resultado = +5 pts
                outcomes++;
            }
        });
        
        // 2. Puntos Fase Eliminatoria (Sincronizado con resultados de Playoff si están jugados)
        // En este predictor, los partidos de Playoff en la vida real se guardarán con IDs especiales 'R32_X', etc.
        const playoffIds = getPlayoffIds();
        playoffIds.forEach(matchId => {
            const realMatch = state.matches.find(m => m.id === matchId && m.played);
            if (!realMatch) return;
            
            const pred = user.bracketPredictions[matchId];
            if (!pred || pred.homeScore === null || pred.awayScore === null) return;
            
            const realHome = realMatch.homeScore;
            const realAway = realMatch.awayScore;
            const predHome = pred.homeScore;
            const predAway = pred.awayScore;
            
            if (realHome === predHome && realAway === predAway) {
                totalPts += 18; // Exacto Playoff = +18 pts
                exacts++;
            } else if (
                (realHome > realAway && predHome > predAway) ||
                (realHome < realAway && predHome < predAway) ||
                (realHome === realAway && predHome === predAway)
            ) {
                totalPts += 8; // Resultado Playoff = +8 pts
                outcomes++;
            }
        });
        
        // 3. Puntos por Bonificaciones Especiales
        // En una sincronización real de final de torneo, esto se validaría contra el campeón oficial
        // Por ahora, simularemos la adjudicación si las predicciones del usuario coinciden con el Campeón simulado en Admin
        const finalMatch = state.matches.find(m => m.id === 'FINAL');
        if (finalMatch && finalMatch.played) {
            const realChampion = finalMatch.homeScore > finalMatch.awayScore ? finalMatch.home : finalMatch.away;
            const realRunnerUp = finalMatch.homeScore > finalMatch.awayScore ? finalMatch.away : finalMatch.home;
            
            const spec = user.specialPredictions;
            if (spec) {
                // Bono Finalistas (+20 pts si acertó ambos, sin importar orden)
                if (spec.finalist1 && spec.finalist2) {
                    if (
                        (spec.finalist1 === realChampion && spec.finalist2 === realRunnerUp) ||
                        (spec.finalist1 === realRunnerUp && spec.finalist2 === realChampion)
                    ) {
                        totalPts += 20;
                    }
                }
                // Bono Campeón (+35 pts)
                if (spec.champion && spec.champion === realChampion) {
                    totalPts += 35;
                }
                // Bono Goleador (+30 pts)
                if (spec.scorer && spec.scorer === "K. Mbappé") { // Mbappé simulado
                    totalPts += 30;
                }
                // Bono Asistidor (+30 pts)
                if (spec.assister && spec.assister === "L. Messi") { // Messi simulado
                    totalPts += 30;
                }
            }
        }
        
        user.points = totalPts;
        user.exactMatches = exacts;
        user.outcomeMatches = outcomes;
    });
}

function getPlayoffIds() {
    const ids = [];
    for (let i = 1; i <= 16; i++) ids.push(`R32_${i}`);
    for (let i = 1; i <= 8; i++) ids.push(`R16_${i}`);
    for (let i = 1; i <= 4; i++) ids.push(`QF_${i}`);
    for (let i = 1; i <= 2; i++) ids.push(`SF_${i}`);
    ids.push('FINAL');
    return ids;
}

// ================= COMPILADOR DE CRUCES ELIMINATORIOS HIPOTÉTICOS (FIFA 26) =================

function compileUserPlayoffBracket() {
    if (!state.currentUser) return null;
    
    // 1. Compilar tablas de todos los grupos A-L
    const standings = {};
    
    for (const [groupName, teams] of Object.entries(CONFIG.GROUPS)) {
        standings[groupName] = teams.map(t => ({ team: t, points: 0, gd: 0, gf: 0 }));
        
        // Buscar partidos del grupo
        const groupMatches = state.matches.filter(m => m.stage === groupName);
        
        groupMatches.forEach(match => {
            const pred = state.currentUser.predictions[match.id];
            if (!pred) return; // Si no hay predicción, no sumar
            
            const h = pred.homeScore;
            const a = pred.awayScore;
            
            const homeTeam = standings[groupName].find(t => t.team === match.home);
            const awayTeam = standings[groupName].find(t => t.team === match.away);
            
            if (!homeTeam || !awayTeam) return;
            
            homeTeam.gf += h;
            homeTeam.gd += (h - a);
            awayTeam.gf += a;
            awayTeam.gd += (a - h);
            
            if (h > a) {
                homeTeam.points += 3;
            } else if (h < a) {
                awayTeam.points += 3;
            } else {
                homeTeam.points += 1;
                awayTeam.points += 1;
            }
        });
        
        // Ordenar grupo
        standings[groupName].sort((a, b) => b.points - a.points || b.gd - a.gd || b.gf - a.gf);
    }
    
    // 2. Extraer Primeros, Segundos y Terceros
    const firsts = [];
    const seconds = [];
    const thirds = [];
    
    for (const [groupName, list] of Object.entries(standings)) {
        firsts.push({ team: list[0].team, group: groupName });
        seconds.push({ team: list[1].team, group: groupName });
        thirds.push({ team: list[2].team, group: groupName, points: list[2].points, gd: list[2].gd, gf: list[2].gf });
    }
    
    // 3. Obtener 8 Mejores Terceros
    thirds.sort((a, b) => b.points - a.points || b.gd - a.gd || b.gf - a.gf);
    const bestThirds = thirds.slice(0, 8);
    
    // 4. Emparejar Ronda de 32 (16avos de Final)
    // Usaremos un emparejamiento determinista, simétrico y elegante
    const pairings = [];
    
    // 8 Ganadores de grupo vs 8 Mejores terceros
    for (let i = 0; i < 8; i++) {
        pairings.push({
            id: `R32_${i+1}`,
            home: firsts[i].team,
            away: bestThirds[i].team,
            homeScore: state.currentUser.bracketPredictions[`R32_${i+1}`]?.homeScore ?? 0,
            awayScore: state.currentUser.bracketPredictions[`R32_${i+1}`]?.awayScore ?? 0,
            winner: state.currentUser.bracketPredictions[`R32_${i+1}`]?.winner ?? firsts[i].team
        });
    }
    
    // 4 Ganadores de grupo restantes vs 4 Segundos
    for (let i = 0; i < 4; i++) {
        pairings.push({
            id: `R32_${i+9}`,
            home: firsts[i+8].team,
            away: seconds[i].team,
            homeScore: state.currentUser.bracketPredictions[`R32_${i+9}`]?.homeScore ?? 0,
            awayScore: state.currentUser.bracketPredictions[`R32_${i+9}`]?.awayScore ?? 0,
            winner: state.currentUser.bracketPredictions[`R32_${i+9}`]?.winner ?? firsts[i+8].team
        });
    }
    
    // Segundos restantes vs Segundos restantes
    let pairIdx = 13;
    for (let i = 4; i < 12; i += 2) {
        pairings.push({
            id: `R32_${pairIdx}`,
            home: seconds[i].team,
            away: seconds[i+1].team,
            homeScore: state.currentUser.bracketPredictions[`R32_${pairIdx}`]?.homeScore ?? 0,
            awayScore: state.currentUser.bracketPredictions[`R32_${pairIdx}`]?.awayScore ?? 0,
            winner: state.currentUser.bracketPredictions[`R32_${pairIdx}`]?.winner ?? seconds[i].team
        });
        pairIdx++;
    }
    
    return pairings;
}

// Obtener ganadores hipotéticos propagados para cada ronda eliminatoria
function getKnockoutRoundMatches(r32Pairings) {
    if (!r32Pairings) return {};
    
    // Auxiliar para conseguir el ganador de un ID de partido
    const getWinnerOf = (matchId, defaultTeam) => {
        const pred = state.currentUser.bracketPredictions[matchId];
        return pred ? pred.winner : defaultTeam;
    };
    
    // 1. Ronda de 16 (8avos) - 8 partidos
    const r16 = [];
    for (let i = 0; i < 8; i++) {
        const mId = `R16_${i+1}`;
        const tHome = getWinnerOf(`R32_${(i*2)+1}`, r32Pairings[(i*2)].home);
        const tAway = getWinnerOf(`R32_${(i*2)+2}`, r32Pairings[(i*2)+1].home);
        
        r16.push({
            id: mId,
            home: tHome,
            away: tAway,
            homeScore: state.currentUser.bracketPredictions[mId]?.homeScore ?? 0,
            awayScore: state.currentUser.bracketPredictions[mId]?.awayScore ?? 0,
            winner: state.currentUser.bracketPredictions[mId]?.winner ?? tHome
        });
    }
    
    // 2. Cuartos de Final - 4 partidos
    const r8 = [];
    for (let i = 0; i < 4; i++) {
        const mId = `QF_${i+1}`;
        const tHome = getWinnerOf(`R16_${(i*2)+1}`, r16[(i*2)].home);
        const tAway = getWinnerOf(`R16_${(i*2)+2}`, r16[(i*2)+1].home);
        
        r8.push({
            id: mId,
            home: tHome,
            away: tAway,
            homeScore: state.currentUser.bracketPredictions[mId]?.homeScore ?? 0,
            awayScore: state.currentUser.bracketPredictions[mId]?.awayScore ?? 0,
            winner: state.currentUser.bracketPredictions[mId]?.winner ?? tHome
        });
    }
    
    // 3. Semifinales - 2 partidos
    const r4 = [];
    for (let i = 0; i < 2; i++) {
        const mId = `SF_${i+1}`;
        const tHome = getWinnerOf(`QF_${(i*2)+1}`, r8[(i*2)].home);
        const tAway = getWinnerOf(`QF_${(i*2)+2}`, r8[(i*2)+1].home);
        
        r4.push({
            id: mId,
            home: tHome,
            away: tAway,
            homeScore: state.currentUser.bracketPredictions[mId]?.homeScore ?? 0,
            awayScore: state.currentUser.bracketPredictions[mId]?.awayScore ?? 0,
            winner: state.currentUser.bracketPredictions[mId]?.winner ?? tHome
        });
    }
    
    // 4. Gran Final - 1 partido
    const tHomeFinal = getWinnerOf(`SF_1`, r4[0].home);
    const tAwayFinal = getWinnerOf(`SF_2`, r4[1].home);
    const r2 = [{
        id: 'FINAL',
        home: tHomeFinal,
        away: tAwayFinal,
        homeScore: state.currentUser.bracketPredictions['FINAL']?.homeScore ?? 0,
        awayScore: state.currentUser.bracketPredictions['FINAL']?.awayScore ?? 0,
        winner: state.currentUser.bracketPredictions['FINAL']?.winner ?? tHomeFinal
    }];
    
    return { r32: r32Pairings, r16, r8, r4, r2 };
}

// ================= MOTOR DE SINCRONIZACIÓN EN TIEMPO REAL (API) =================

async function syncRealWorldMatches() {
    if (!state.apiToken) {
        showToast("Error: No has configurado tu Token API");
        Sound.playError();
        return;
    }
    
    showToast("Sincronizando con Football-Data.org...");
    Sound.playDisk();
    
    try {
        // Hacemos el fetch oficial a la API de Football-Data v4
        // WC = World Cup.
        const response = await fetch('https://api.football-data.org/v4/competitions/WC/matches', {
            headers: { 'X-Auth-Token': state.apiToken }
        });
        
        if (!response.ok) {
            throw new Error(`Código HTTP de error: ${response.status}`);
        }
        
        const data = await response.json();
        const apiMatches = data.matches;
        
        if (!apiMatches || apiMatches.length === 0) {
            throw new Error("No se encontraron partidos devueltos por la API.");
        }
        
        let updatedCount = 0;
        
        // Mapear partidos concluidos a nuestra base local
        apiMatches.forEach(apiM => {
            if (apiM.status !== 'FINISHED') return; // Solo importar concluidos
            
            const homeCode = apiM.homeTeam.tla;
            const awayCode = apiM.awayTeam.tla;
            
            // Buscar partido correspondiente por selecciones y tipo
            const localMatch = state.matches.find(m => 
                !m.played && 
                m.home === homeCode && 
                m.away === awayCode
            );
            
            if (localMatch) {
                localMatch.homeScore = apiM.score.fullTime.home;
                localMatch.awayScore = apiM.score.fullTime.away;
                localMatch.played = true;
                updatedCount++;
            }
        });
        
        calculateAllPoints();
        saveDatabase();
        
        // Recargar vista activa
        document.querySelector('.tab-btn.active').click();
        
        showToast(`Sincronizado: ${updatedCount} partidos actualizados`);
        Sound.playFanfare();
        
    } catch(err) {
        console.error("Fallo de API: ", err);
        // Mostrar alerta retro y usar simulación
        showToast("Error de conexión CORS o Token inválido");
        Sound.playError();
    }
}

// ================= ASISTENTE DE AUTOPREDICCIÓN RÁPIDA DE GRUPOS =================

function autoPredictAllGroups() {
    if (!state.currentUser) return;
    
    state.matches.forEach(match => {
        // Solo autocompletar fase de grupos no concluidos
        if (match.stage.startsWith('GROUP_')) {
            const r = Math.random();
            let h = 1, a = 0;
            if (r < 0.3) { h = 2; a = 1; }
            else if (r < 0.55) { h = 1; a = 1; }
            else if (r < 0.75) { h = 0; a = 0; }
            else if (r < 0.9) { h = 0; a = 2; }
            else { h = 3; a = 1; }
            
            state.currentUser.predictions[match.id] = { homeScore: h, awayScore: a, saved: true };
        }
    });
    
    saveDatabase();
    
    // Actualizar barras de progreso y vistas
    updateGroupProgressBar();
    renderMatches();
    
    // Chequear si se desbloqueó eliminatoria
    checkBracketUnlockState();
    
    showToast("Autopredicción de Grupos Lista!");
    Sound.playFanfare();
}

function updateGroupProgressBar() {
    if (!state.currentUser) return;
    
    const total = state.matches.filter(m => m.stage.startsWith('GROUP_')).length; // 72 partidos
    const predicted = state.matches.filter(m => m.stage.startsWith('GROUP_') && state.currentUser.predictions[m.id]?.saved).length;
    
    document.getElementById('groups-progress-text').innerText = `${predicted}/${total}`;
    document.getElementById('groups-progress-fill').style.width = `${(predicted / total) * 100}%`;
}

function checkBracketUnlockState() {
    if (!state.currentUser) return;
    
    const total = state.matches.filter(m => m.stage.startsWith('GROUP_')).length;
    const predicted = state.matches.filter(m => m.stage.startsWith('GROUP_') && state.currentUser.predictions[m.id]?.saved).length;
    
    const lockedMsg = document.getElementById('bracket-locked-message');
    const activeCont = document.getElementById('bracket-active-container');
    
    if (predicted >= total) {
        lockedMsg.classList.add('hidden-panel');
        activeCont.classList.remove('hidden-panel');
        return true;
    } else {
        lockedMsg.classList.remove('hidden-panel');
        activeCont.classList.add('hidden-panel');
        return false;
    }
}

// ================= RENDERING DEL ÁRBOL DE CRUCES ELIMINATORIOS =================

function renderBracketRound() {
    const deck = document.getElementById('bracket-round-deck');
    deck.innerHTML = '';
    
    const r32Pairings = compileUserPlayoffBracket();
    if (!r32Pairings) return;
    
    const bracketData = getKnockoutRoundMatches(r32Pairings);
    const roundMatches = bracketData[state.bracketRound];
    
    if (!roundMatches || roundMatches.length === 0) return;
    
    roundMatches.forEach((match) => {
        const card = document.createElement('div');
        card.className = 'bracket-match-card';
        
        let labelText = '';
        switch(state.bracketRound) {
            case 'r32': labelText = `16AVOS DE FINAL - ${match.id}`; break;
            case 'r16': labelText = `8AVOS DE FINAL - ${match.id}`; break;
            case 'r8': labelText = `CUARTOS DE FINAL - ${match.id}`; break;
            case 'r4': labelText = `SEMIFINAL - ${match.id}`; break;
            case 'r2': labelText = `GRAN FINAL - 🏆 MUNDIAL 2026`; break;
        }
        
        const isWinnerHome = match.winner === match.home;
        const isWinnerAway = match.winner === match.away;
        
        card.innerHTML = `
            <div class="bracket-match-label">
                <span>${labelText}</span>
                <span class="text-yellow" style="font-size:7px;">Puntos: +8 / +18</span>
            </div>
            <div class="match-card-body" style="padding:4px 0;">
                <!-- Local -->
                <div class="match-team" style="cursor:pointer;" class="btn-adv-toggle" data-match-id="${match.id}" data-team="${match.home}">
                    ${createCircularFlagHTML(match.home)}
                    <span class="team-name ${isWinnerHome ? 'text-yellow font-bold' : ''}" style="font-size:14px; margin-top:2px;">${CONFIG.COUNTRIES[match.home]?.name || match.home}</span>
                    <span style="font-size:8px; color: #888;">${isWinnerHome ? '(GANADOR)' : 'Haga clic para ganar'}</span>
                </div>
                
                <!-- Inputs de Marcador -->
                <div class="match-score-inputs">
                    <div class="score-control">
                        <button class="retro-btn arrow-btn btn-brk-score" data-match-id="${match.id}" data-target="home" data-action="inc">+</button>
                        <div class="score-display-box" style="width:28px; height:32px; font-size:22px;" id="brk-disp-home-${match.id}">${match.homeScore}</div>
                        <button class="retro-btn arrow-btn btn-brk-score" data-match-id="${match.id}" data-target="home" data-action="dec">-</button>
                    </div>
                    <span class="score-separator">-</span>
                    <div class="score-control">
                        <button class="retro-btn arrow-btn btn-brk-score" data-match-id="${match.id}" data-target="away" data-action="inc">+</button>
                        <div class="score-display-box" style="width:28px; height:32px; font-size:22px;" id="brk-disp-away-${match.id}">${match.awayScore}</div>
                        <button class="retro-btn arrow-btn btn-brk-score" data-match-id="${match.id}" data-target="away" data-action="dec">-</button>
                    </div>
                </div>
                
                <!-- Visitante -->
                <div class="match-team" style="cursor:pointer;" class="btn-adv-toggle" data-match-id="${match.id}" data-team="${match.away}">
                    ${createCircularFlagHTML(match.away)}
                    <span class="team-name ${isWinnerAway ? 'text-yellow font-bold' : ''}" style="font-size:14px; margin-top:2px;">${CONFIG.COUNTRIES[match.away]?.name || match.away}</span>
                    <span style="font-size:8px; color: #888;">${isWinnerAway ? '(GANADOR)' : 'Haga clic para ganar'}</span>
                </div>
            </div>
        `;
        
        // Hacer que hacer clic en los equipos seleccione al ganador que avanza (especialmente en empates)
        card.querySelectorAll('.match-team').forEach(teamDiv => {
            teamDiv.addEventListener('click', () => {
                const teamCode = teamDiv.querySelector('.team-name').innerText;
                const countryCode = Object.keys(CONFIG.COUNTRIES).find(k => CONFIG.COUNTRIES[k].name === teamCode) || match.home;
                
                if (!state.currentUser.bracketPredictions[match.id]) {
                    state.currentUser.bracketPredictions[match.id] = { homeScore: match.homeScore, awayScore: match.awayScore, winner: countryCode };
                } else {
                    state.currentUser.bracketPredictions[match.id].winner = countryCode;
                }
                
                saveDatabase();
                renderBracketRound();
                Sound.playClick();
            });
        });
        
        deck.appendChild(card);
    });
    
    // Controles de botones de goles del bracket
    document.querySelectorAll('.btn-brk-score').forEach(btn => {
        btn.addEventListener('click', () => {
            const matchId = btn.dataset.matchId;
            const target = btn.dataset.target;
            const action = btn.dataset.action;
            
            if (!state.currentUser.bracketPredictions[matchId]) {
                // Conseguir equipos base
                const matchObj = roundMatches.find(m => m.id === matchId);
                state.currentUser.bracketPredictions[matchId] = { homeScore: 0, awayScore: 0, winner: matchObj ? matchObj.home : "" };
            }
            
            const pred = state.currentUser.bracketPredictions[matchId];
            
            if (target === 'home') {
                pred.homeScore = action === 'inc' ? Math.min(9, pred.homeScore + 1) : Math.max(0, pred.homeScore - 1);
                document.getElementById(`brk-disp-home-${matchId}`).innerText = pred.homeScore;
            } else {
                pred.awayScore = action === 'inc' ? Math.min(9, pred.awayScore + 1) : Math.max(0, pred.awayScore - 1);
                document.getElementById(`brk-disp-away-${matchId}`).innerText = pred.awayScore;
            }
            
            // Decidir ganador automáticamente por goles
            if (pred.homeScore > pred.awayScore) {
                const matchObj = roundMatches.find(m => m.id === matchId);
                pred.winner = matchObj ? matchObj.home : "";
            } else if (pred.homeScore < pred.awayScore) {
                const matchObj = roundMatches.find(m => m.id === matchId);
                pred.winner = matchObj ? matchObj.away : "";
            }
            
            saveDatabase();
            renderBracketRound();
            Sound.playBloop();
        });
    });
    
    // Si la ronda es la Final, mostrar las predicciones de campeonato al final
    const rewardsPanel = document.getElementById('championship-rewards-panel');
    if (state.bracketRound === 'r2') {
        rewardsPanel.classList.remove('hidden-panel');
        populateSpecialPredictionsForm(r32Pairings);
    } else {
        rewardsPanel.classList.add('hidden-panel');
    }
}

// Rellenar los dropdowns del formulario de campeonato con todos los clasificados del bracket
function populateSpecialPredictionsForm(r32Pairings) {
    const f1 = document.getElementById('predict-finalist-1');
    const f2 = document.getElementById('predict-finalist-2');
    const champ = document.getElementById('predict-champion');
    
    // Obtener los 32 equipos que clasificaron
    const teams = [...new Set(r32Pairings.flatMap(p => [p.home, p.away]))];
    
    const makeOptions = (selectEl, selectedVal) => {
        selectEl.innerHTML = '<option value="">-- Seleccionar Selección --</option>';
        teams.forEach(tCode => {
            const name = CONFIG.COUNTRIES[tCode]?.name || tCode;
            const opt = document.createElement('option');
            opt.value = tCode;
            opt.innerText = name;
            if (tCode === selectedVal) opt.selected = true;
            selectEl.appendChild(opt);
        });
    };
    
    const spec = state.currentUser.specialPredictions || { finalist1: "", finalist2: "", champion: "", scorer: "", assister: "" };
    
    makeOptions(f1, spec.finalist1);
    makeOptions(f2, spec.finalist2);
    makeOptions(champ, spec.champion);
    
    // Cargar goleador y asistidor
    document.getElementById('predict-scorer').value = spec.scorer || "";
    document.getElementById('predict-assister').value = spec.assister || "";
}

// ================= AUTENTICACIÓN, NAVEGACIÓN Y LOGUEO DE LA APLICACIÓN =================

function setupNavigation() {
    // 1. TABS PRINCIPALES
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            if (!tabId) return;
            
            Sound.playClick();
            
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            document.querySelectorAll('.tab-content').forEach(c => {
                c.classList.remove('active-tab');
                c.classList.add('inactive-tab');
            });
            
            const activeContent = document.getElementById(tabId);
            activeContent.classList.remove('inactive-tab');
            activeContent.classList.add('active-tab');
            
            if (tabId === 'matches-tab') {
                updateGroupProgressBar();
                renderMatches();
            }
            else if (tabId === 'bracket-tab') {
                const unlocked = checkBracketUnlockState();
                if (unlocked) renderBracketRound();
            }
            else if (tabId === 'standings-tab') {
                document.querySelector('[data-subtab="global-standings-view"]').click();
            }
            else if (tabId === 'profile-tab') renderProfileStats();
            else if (tabId === 'admin-tab') renderAdminGrid();
        });
    });
    
    // 2. SUB-TABS CLASIFICACIONES (GLOBAL VS CLANES)
    document.querySelectorAll('.sub-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const subtabId = btn.dataset.subtab;
            if (!subtabId) return;
            
            Sound.playClick();
            
            btn.closest('.tab-content').querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            btn.closest('.tab-content').querySelectorAll('.sub-tab-content').forEach(c => {
                c.classList.remove('active-subtab');
                c.classList.add('inactive-subtab');
            });
            
            document.getElementById(subtabId).classList.remove('inactive-subtab');
            document.getElementById(subtabId).classList.add('active-subtab');
            
            if (subtabId === 'global-standings-view') renderStandings();
            else if (subtabId === 'clans-standings-view') renderClans();
        });
    });
    
    // 3. SELECCIÓN DE FASES DEL BRACKET ELIMINATORIO
    document.querySelectorAll('#bracket-round-selectors .sub-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            state.bracketRound = btn.dataset.round;
            Sound.playClick();
            
            document.querySelectorAll('#bracket-round-selectors .sub-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            renderBracketRound();
        });
    });
    
    // Modales de API Configuración
    document.getElementById('btn-open-api-config').addEventListener('click', () => {
        Sound.playClick();
        document.getElementById('api-config-modal').classList.remove('hidden-panel');
    });
    
    document.getElementById('btn-close-api-config').addEventListener('click', () => {
        Sound.playClick();
        document.getElementById('api-config-modal').classList.add('hidden-panel');
    });
    
    document.getElementById('btn-save-api-token').addEventListener('click', () => {
        const token = document.getElementById('api-token-input').value.trim();
        state.apiToken = token;
        saveDatabase();
        showToast("Token API Guardado");
        document.getElementById('api-config-modal').classList.add('hidden-panel');
    });
    
    document.getElementById('btn-sync-api-now').addEventListener('click', () => {
        syncRealWorldMatches();
    });
    
    // Autopredicción
    document.getElementById('btn-auto-predict-groups').addEventListener('click', autoPredictAllGroups);
    document.getElementById('btn-bracket-unlock-shortcut').addEventListener('click', autoPredictAllGroups);
    
    // Guardar apuestas especiales de campeonato
    document.getElementById('special-predictions-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const f1 = document.getElementById('predict-finalist-1').value;
        const f2 = document.getElementById('predict-finalist-2').value;
        const champ = document.getElementById('predict-champion').value;
        const scorer = document.getElementById('predict-scorer').value;
        const assister = document.getElementById('predict-assister').value;
        
        state.currentUser.specialPredictions = { finalist1: f1, finalist2: f2, champion: champ, scorer, assister };
        
        calculateAllPoints();
        saveDatabase();
        updateManagerUIStats();
        
        showToast("Predicciones Especiales Guardadas");
        Sound.playDisk();
    });
    
    // Filtrar partidos
    document.getElementById('match-stage-filter').addEventListener('change', () => {
        Sound.playClick();
        renderMatches();
    });
    
    // Botones CRT y Sonido
    const crtBtn = document.getElementById('toggle-crt');
    crtBtn.addEventListener('click', () => {
        state.crtEnabled = !state.crtEnabled;
        if (state.crtEnabled) {
            document.body.classList.add('crt-active');
            crtBtn.classList.add('active-state');
            crtBtn.innerText = "CRT: ON";
        } else {
            document.body.classList.remove('crt-active');
            crtBtn.classList.remove('active-state');
            crtBtn.innerText = "CRT: OFF";
        }
        Sound.playClick();
    });
    
    const soundBtn = document.getElementById('toggle-sound');
    soundBtn.addEventListener('click', () => {
        state.soundEnabled = !state.soundEnabled;
        if (state.soundEnabled) {
            soundBtn.classList.add('active-state');
            soundBtn.innerText = "SONIDO: ON";
            Sound.playBeep();
        } else {
            soundBtn.classList.remove('active-state');
            soundBtn.innerText = "SONIDO: OFF";
        }
    });
    
    // Toggle entre Login y Registro
    const authToggleBtn = document.getElementById('btn-toggle-auth-mode');
    authToggleBtn.addEventListener('click', () => {
        Sound.playClick();
        if (state.authMode === "login") {
            state.authMode = "register";
            document.getElementById('submit-auth-text').innerText = "CREAR CUENTA Y CONTINUAR";
            authToggleBtn.innerText = "¿Ya tienes cuenta? INICIA SESIÓN AQUÍ";
            document.getElementById('login-window-title').innerHTML = `<span class="icon-disk">💾</span> REGISTRO EN EL SISTEMA`;
        } else {
            state.authMode = "login";
            document.getElementById('submit-auth-text').innerText = "INICIAR SESIÓN";
            authToggleBtn.innerText = "¿No tienes cuenta? REGÍSTRATE AQUÍ";
            document.getElementById('login-window-title').innerHTML = `<span class="icon-disk">💾</span> INICIAR SISTEMA PREDICTOR`;
        }
    });

    // Envío del Formulario de Autenticación
    document.getElementById('auth-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const usernameInput = document.getElementById('auth-username').value.trim();
        const password = document.getElementById('auth-password').value;
        
        if (!usernameInput || !password) return;
        
        // Búsqueda insensible a mayúsculas
        let userObj = state.users.find(u => u.username && u.username.toLowerCase() === usernameInput.toLowerCase() && !u.isCPU);
        
        if (state.authMode === "login") {
            if (!userObj) {
                showToast("Cuenta no encontrada. Crea una primero.");
                Sound.playError();
                return;
            }
            if (userObj.password !== password) {
                showToast("Contraseña incorrecta");
                Sound.playError();
                return;
            }
            
            state.currentUser = userObj;
            if (!state.currentUser.bracketPredictions) state.currentUser.bracketPredictions = {};
            if (!state.currentUser.specialPredictions) state.currentUser.specialPredictions = { finalist1: "", finalist2: "", champion: "", scorer: "", assister: "" };
            
            saveDatabase();
            showToast("Acceso Concedido");
            Sound.playFanfare();
            
            if (!state.currentUser.teamName) {
                transitionToOnboarding();
            } else {
                transitionToDashboard();
            }
            
        } else {
            // REGISTRO
            if (userObj) {
                showToast("El usuario ya está registrado");
                Sound.playError();
                return;
            }
            
            const now = new Date();
            const dateStr = `${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')}`;
            
            userObj = {
                username: usernameInput,
                password: password,
                teamName: "",
                avatar: 0,
                avatarType: "predefined",
                predictions: {},
                bracketPredictions: {},
                specialPredictions: { finalist1: "", finalist2: "", champion: "", scorer: "", assister: "" },
                points: 0,
                exactMatches: 0,
                outcomeMatches: 0,
                joinedDate: dateStr
            };
            
            state.users.push(userObj);
            state.currentUser = userObj;
            
            // Si Supabase está activo, registrar el usuario en el servidor en la nube
            if (supabase) {
                try {
                    const { error } = await supabase.from('users').insert({
                        username: userObj.username,
                        password: userObj.password,
                        team_name: userObj.teamName,
                        avatar: String(userObj.avatar),
                        avatar_type: userObj.avatarType,
                        predictions: userObj.predictions,
                        bracket_predictions: userObj.bracketPredictions,
                        special_predictions: userObj.specialPredictions,
                        points: userObj.points,
                        exact_matches: userObj.exactMatches,
                        outcome_matches: userObj.outcomeMatches,
                        joined_date: userObj.joinedDate,
                        is_cpu: false
                    });
                    if (error) console.error("Error registrando usuario en Supabase:", error);
                } catch (e) {
                    console.error("Fallo al insertar en Supabase:", e);
                }
            }
            
            saveDatabase();
            showToast("Cuenta Creada!");
            Sound.playFanfare();
            transitionToOnboarding();
        }
    });
    
    // Autenticación con Google (Simulación Retro)
    document.getElementById('btn-google-auth').addEventListener('click', () => {
        Sound.playClick();
        showToast("Conectando con Google API...");
        setTimeout(async () => {
            const googleUser = "GoogleManager";
            let userObj = state.users.find(u => u.username && u.username.toLowerCase() === googleUser.toLowerCase() && !u.isCPU);
            const now = new Date();
            const dateStr = `${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')}`;
            
            if (!userObj) {
                userObj = {
                    username: googleUser,
                    password: "google_account_token_96",
                    teamName: "",
                    avatar: 0,
                    avatarType: "predefined",
                    predictions: {},
                    bracketPredictions: {},
                    specialPredictions: { finalist1: "", finalist2: "", champion: "", scorer: "", assister: "" },
                    points: 0,
                    exactMatches: 0,
                    outcomeMatches: 0,
                    joinedDate: dateStr
                };
                state.users.push(userObj);
                
                if (supabase) {
                    try {
                        await supabase.from('users').insert({
                            username: userObj.username,
                            password: userObj.password,
                            team_name: userObj.teamName,
                            avatar: String(userObj.avatar),
                            avatar_type: userObj.avatarType,
                            predictions: userObj.predictions,
                            bracket_predictions: userObj.bracketPredictions,
                            special_predictions: userObj.specialPredictions,
                            points: userObj.points,
                            exact_matches: userObj.exactMatches,
                            outcome_matches: userObj.outcomeMatches,
                            joined_date: userObj.joinedDate,
                            is_cpu: false
                        });
                    } catch (e) {
                        console.error("Fallo al registrar usuario Google en Supabase:", e);
                    }
                }
            }
            
            state.currentUser = userObj;
            if (!state.currentUser.bracketPredictions) state.currentUser.bracketPredictions = {};
            if (!state.currentUser.specialPredictions) state.currentUser.specialPredictions = { finalist1: "", finalist2: "", champion: "", scorer: "", assister: "" };
            
            saveDatabase();
            showToast("Google Conectado Exitosamente!");
            Sound.playFanfare();
            
            if (!userObj.teamName) transitionToOnboarding();
            else transitionToDashboard();
        }, 1000);
    });
    
    // Manejar Origen de Avatar en Onboarding
    document.getElementById('btn-source-predefined').addEventListener('click', () => {
        state.avatarSource = "predefined";
        Sound.playClick();
        document.getElementById('btn-source-predefined').classList.add('active-state');
        document.getElementById('btn-source-custom').classList.remove('active-state');
        document.getElementById('predefined-avatars-panel').classList.remove('hidden-panel');
        document.getElementById('custom-avatar-panel').classList.add('hidden-panel');
    });
    
    document.getElementById('btn-source-custom').addEventListener('click', () => {
        state.avatarSource = "custom";
        Sound.playClick();
        document.getElementById('btn-source-custom').classList.add('active-state');
        document.getElementById('btn-source-predefined').classList.remove('active-state');
        document.getElementById('custom-avatar-panel').classList.remove('hidden-panel');
        document.getElementById('predefined-avatars-panel').classList.add('hidden-panel');
    });
    
    document.getElementById('custom-avatar-file').addEventListener('change', handleCustomAvatarUpload);
    
    // Envío del Formulario de Onboarding
    document.getElementById('onboarding-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('onboard-username').value.trim();
        const teamName = document.getElementById('onboard-team-name').value.trim();
        
        if (!username || !teamName) return;
        
        state.currentUser.username = username;
        state.currentUser.teamName = teamName;
        
        if (state.avatarSource === 'custom' && state.tempCustomAvatarBase64) {
            state.currentUser.avatar = state.tempCustomAvatarBase64;
            state.currentUser.avatarType = 'custom';
        } else {
            const selectedDiv = document.querySelector('#predefined-avatars-panel .avatar-option.selected');
            const avatarId = selectedDiv ? parseInt(selectedDiv.dataset.avatarId) : 0;
            state.currentUser.avatar = avatarId;
            state.currentUser.avatarType = 'predefined';
        }
        
        generateCPUPredictions();
        calculateAllPoints();
        
        // Guardar local y remotamente
        saveDatabaseLocally();
        
        if (supabase) {
            try {
                await supabase.from('users').update({
                    username: state.currentUser.username,
                    team_name: state.currentUser.teamName,
                    avatar: String(state.currentUser.avatar),
                    avatar_type: state.currentUser.avatarType,
                    points: state.currentUser.points,
                    exact_matches: state.currentUser.exactMatches,
                    outcome_matches: state.currentUser.outcomeMatches
                }).eq('username', state.currentUser.username);
                console.log("Ficha del mánager guardada en Supabase.");
            } catch (e) {
                console.error("Fallo al actualizar ficha de mánager en Supabase:", e);
            }
        }
        
        showToast("Ficha de Mánager Registrada!");
        Sound.playFanfare();
        state.tempCustomAvatarBase64 = null;
        transitionToDashboard();
    });
    
    // Salir (Cerrar Sesión)
    document.getElementById('btn-logout').addEventListener('click', () => {
        state.currentUser = null;
        localStorage.removeItem('predictor_lulo_session');
        Sound.playClick();
        
        document.getElementById('dashboard-screen').classList.remove('active-screen');
        document.getElementById('dashboard-screen').classList.add('inactive-screen');
        document.getElementById('login-screen').classList.remove('inactive-screen');
        document.getElementById('login-screen').classList.add('active-screen');
        
        document.getElementById('auth-email').value = '';
        document.getElementById('auth-password').value = '';
        state.authMode = "login";
        document.getElementById('submit-auth-text').innerText = "INICIAR SESIÓN";
        document.getElementById('btn-toggle-auth-mode').innerText = "¿No tienes cuenta? REGÍSTRATE AQUÍ";
        document.getElementById('login-window-title').innerHTML = `<span class="icon-disk">💾</span> INICIAR SISTEMA PREDICTOR`;
    });
    
    // CLANES: Acciones de botones
    document.getElementById('btn-open-create-clan').addEventListener('click', () => {
        Sound.playClick();
        document.getElementById('clan-create-panel').classList.remove('hidden-panel');
        document.getElementById('clan-join-panel').classList.add('hidden-panel');
    });
    
    document.getElementById('btn-open-join-clan').addEventListener('click', () => {
        Sound.playClick();
        document.getElementById('clan-join-panel').classList.remove('hidden-panel');
        document.getElementById('clan-create-panel').classList.add('hidden-panel');
    });
    
    document.getElementById('btn-close-create-clan').addEventListener('click', () => {
        Sound.playClick();
        document.getElementById('clan-create-panel').classList.add('hidden-panel');
    });
    
    document.getElementById('btn-close-join-clan').addEventListener('click', () => {
        Sound.playClick();
        document.getElementById('clan-join-panel').classList.add('hidden-panel');
    });
    
    document.getElementById('btn-submit-create-clan').addEventListener('click', handleCreateClan);
    document.getElementById('btn-submit-join-clan').addEventListener('click', handleJoinClan);
    
    document.getElementById('btn-copy-clan-code').addEventListener('click', () => {
        if (!state.activeClan) return;
        navigator.clipboard.writeText(state.activeClan.code).then(() => {
            showToast("Código Copiado!");
            Sound.playDisk();
        });
    });
    
    // SIMULAR FASE DE GRUPOS EN ADMIN
    document.getElementById('btn-admin-auto-simulate').addEventListener('click', async () => {
        state.matches.forEach(match => {
            if (match.played) return;
            const r = Math.random();
            let h = 1, a = 0;
            if (r < 0.25) { h = 2; a = 1; }
            else if (r < 0.45) { h = 1; a = 1; }
            else if (r < 0.6) { h = 0; a = 0; }
            else if (r < 0.75) { h = 0; a = 2; }
            else if (r < 0.9) { h = 3; a = 0; }
            else { h = 1; a = 2; }
            match.homeScore = h;
            match.awayScore = a;
            match.played = true;
        });
        
        // Simular también la gran final oficial para adjudicación de bonos
        const finalOfficialIndex = state.matches.findIndex(m => m.id === 'FINAL');
        if (finalOfficialIndex === -1) {
            state.matches.push({
                id: 'FINAL',
                stage: 'PLAYOFFS',
                home: 'ARG',
                away: 'VEN',
                homeScore: 2,
                awayScore: 1,
                played: true
            });
        } else {
            state.matches[finalOfficialIndex].homeScore = 2;
            state.matches[finalOfficialIndex].awayScore = 1;
            state.matches[finalOfficialIndex].played = true;
        }
        
        calculateAllPoints();
        saveDatabaseLocally();
        
        if (supabase) {
            showToast("Simulando en la nube... Espera.");
            await pushAdminResultsToSupabase();
        }
        
        renderAdminGrid();
        updateManagerUIStats();
        showToast("Grupos Simulados y Sincronizados!");
        Sound.playFanfare();
    });
    
    // REINICIAR RESULTADOS
    document.getElementById('btn-admin-reset-results').addEventListener('click', async () => {
        state.matches = generateGroupStageMatches();
        
        // Quitar la final artificial
        const finalIdx = state.matches.findIndex(m => m.id === 'FINAL');
        if (finalIdx !== -1) state.matches.splice(finalIdx, 1);
        
        calculateAllPoints();
        saveDatabaseLocally();
        
        if (supabase) {
            showToast("Limpiando nube... Espera.");
            await resetMatchesInSupabase();
        }
        
        renderAdminGrid();
        updateManagerUIStats();
        showToast("Resultados Oficiales Reiniciados");
        Sound.playError();
    });
}

// ================= SYNC COMPLEMENTARIO DE ADMINISTRACIÓN =================

async function pushAdminResultsToSupabase() {
    if (!supabase) return;
    try {
        console.log("Subiendo marcadores oficiales del torneo y recalculando puntos en Supabase...");
        
        // 1. Sincronizar todos los partidos que se jugaron
        const playedMatches = state.matches.filter(m => m.played);
        for (const m of playedMatches) {
            await supabase.from('matches').upsert({
                id: isNaN(Number(m.id)) ? 99999 : Number(m.id), // ID numérico para final artificial si aplica
                home: m.home,
                away: m.away,
                stage: m.stage,
                date: m.date,
                home_score: m.homeScore,
                away_score: m.awayScore,
                played: m.played
            });
        }
        
        // 2. Actualizar las puntuaciones de todos los usuarios
        for (const u of state.users) {
            if (!u.isCPU) {
                await supabase.from('users').update({
                    points: u.points,
                    exact_matches: u.exactMatches,
                    outcome_matches: u.outcomeMatches
                }).eq('username', u.username);
            }
        }
        console.log("¡Sincronización de administración en la nube completada!");
    } catch (e) {
        console.error("Error al subir cambios de administración a Supabase:", e);
    }
}

async function resetMatchesInSupabase() {
    if (!supabase) return;
    try {
        console.log("Limpiando marcadores oficiales en la nube de Supabase...");
        
        // Eliminar registros de partidos de la tabla para reiniciar el fixture real en la nube
        const { error } = await supabase.from('matches').delete().neq('id', 0);
        if (error) console.error("Error al borrar partidos en Supabase:", error);
        
        // Resetear puntos de todos los usuarios a 0
        for (const u of state.users) {
            if (!u.isCPU) {
                await supabase.from('users').update({
                    points: 0,
                    exact_matches: 0,
                    outcome_matches: 0
                }).eq('username', u.username);
            }
        }
        console.log("¡Limpieza de administración en la nube completada!");
    } catch (e) {
        console.error("Error al resetear administración en Supabase:", e);
    }
}

function handleCustomAvatarUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        state.tempCustomAvatarBase64 = evt.target.result;
        document.getElementById('custom-avatar-preview').src = evt.target.result;
        showToast("Foto de Galería Cargada");
    };
    reader.readAsDataURL(file);
}

function renderPredefinedAvatars() {
    const container = document.getElementById('predefined-avatars-panel');
    container.innerHTML = '';
    CONFIG.AVATARS.forEach((avatar, idx) => {
        const div = document.createElement('div');
        div.className = `avatar-option ${idx === 0 ? 'selected' : ''}`;
        div.dataset.avatarId = avatar.id;
        div.innerHTML = `<img src="${avatar.img}" alt="${avatar.name}">`;
        div.addEventListener('click', () => {
            document.querySelectorAll('#predefined-avatars-panel .avatar-option').forEach(el => el.classList.remove('selected'));
            div.classList.add('selected');
            Sound.playClick();
        });
        container.appendChild(div);
    });
}

function transitionToOnboarding() {
    document.getElementById('login-screen').classList.add('inactive-screen');
    document.getElementById('login-screen').classList.remove('active-screen');
    document.getElementById('onboarding-screen').classList.remove('inactive-screen');
    document.getElementById('onboarding-screen').classList.add('active-screen');
    
    document.getElementById('onboard-username').value = state.currentUser ? state.currentUser.username : '';
    document.getElementById('onboard-username').readOnly = true; // Hacerlo solo lectura para consistencia con el login
    document.getElementById('onboard-team-name').value = '';
    document.getElementById('btn-source-predefined').click();
}

function transitionToDashboard() {
    document.getElementById('login-screen').classList.add('inactive-screen');
    document.getElementById('login-screen').classList.remove('active-screen');
    document.getElementById('onboarding-screen').classList.add('inactive-screen');
    document.getElementById('onboarding-screen').classList.remove('active-screen');
    document.getElementById('dashboard-screen').classList.remove('inactive-screen');
    document.getElementById('dashboard-screen').classList.add('active-screen');
    
    document.querySelector('[data-tab="matches-tab"]').click();
    updateManagerUIStats();
}

// ================= SISTEMA DE CLANES =================

function renderClans() {
    const clansList = document.getElementById('clans-list-container');
    clansList.innerHTML = '';
    const myClans = state.clans.filter(clan => clan.members.includes(state.currentUser.username));
    
    if (myClans.length === 0) {
        clansList.innerHTML = `<p class="text-center" style="font-size: 11px; padding: 12px; color: var(--win-dark-gray); font-weight: bold;">NO ESTÁS EN NINGÚN CLAN</p>`;
        document.getElementById('clan-leaderboard-active').classList.add('hidden-panel');
        document.getElementById('clan-leaderboard-empty').classList.remove('hidden-panel');
        return;
    }
    
    myClans.forEach(clan => {
        const div = document.createElement('div');
        div.className = `clan-item ${state.activeClan && state.activeClan.id === clan.id ? 'active' : ''}`;
        div.innerHTML = `<span class="clan-item-name">${clan.name.toUpperCase()}</span><span class="clan-item-members">${clan.members.length}👤</span>`;
        div.addEventListener('click', () => {
            state.activeClan = clan;
            Sound.playClick();
            renderClans();
        });
        clansList.appendChild(div);
    });
    
    if (state.activeClan && myClans.find(c => c.id === state.activeClan.id)) {
        renderActiveClanLeaderboard();
    } else {
        state.activeClan = null;
        document.getElementById('clan-leaderboard-active').classList.add('hidden-panel');
        document.getElementById('clan-leaderboard-empty').classList.remove('hidden-panel');
    }
}

function renderActiveClanLeaderboard() {
    if (!state.activeClan) return;
    
    document.getElementById('clan-leaderboard-empty').classList.add('hidden-panel');
    document.getElementById('clan-leaderboard-active').classList.remove('hidden-panel');
    
    document.getElementById('active-clan-title').innerText = state.activeClan.name.toUpperCase();
    document.getElementById('active-clan-code').innerText = state.activeClan.code;
    
    const tbody = document.getElementById('clan-standings-table-body');
    tbody.innerHTML = '';
    
    const clanUsers = state.users.filter(u => state.activeClan.members.includes(u.username));
    const sorted = [...clanUsers].sort((a,b) => b.points - a.points || b.exactMatches - a.exactMatches);
    
    sorted.forEach((user, index) => {
        const tr = document.createElement('tr');
        if (state.currentUser && user.username === state.currentUser.username && !user.isCPU) {
            tr.className = 'user-row';
        }
        
        let avatarImg = user.avatarType === 'custom' ? user.avatar : (CONFIG.AVATARS.find(a => a.id === user.avatar)?.img || CONFIG.AVATARS[0].img);
        const matchesPlayed = state.matches.filter(m => m.played && user.predictions[m.id]?.saved).length;
        
        tr.innerHTML = `
            <td class="text-center table-rank">${index + 1}º</td>
            <td>
                <div class="row-manager-info">
                    <img src="${avatarImg}" alt="${user.username}" class="row-avatar">
                    <div>
                        <div style="font-family: var(--font-pixel-heading); font-size: 7px; color: var(--win-blue);">${user.teamName.toUpperCase()}</div>
                        <div style="font-size: 11px;">Mánager: <span class="text-yellow">${user.username}</span> ${user.isCPU ? '<span class="text-gray" style="font-size:9px;">(CPU)</span>' : ''}</div>
                    </div>
                </div>
            </td>
            <td class="text-center">${matchesPlayed}</td>
            <td class="text-center text-cyan">${user.exactMatches}</td>
            <td class="text-center text-yellow points-col">${user.points}</td>
        `;
        tbody.appendChild(tr);
    });
}

async function handleCreateClan() {
    const clanName = document.getElementById('new-clan-name').value.trim();
    if (!clanName) { Sound.playError(); return; }
    
    const code = `LULO-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const randomCPUs = [CPU_PLAYERS[0].username, CPU_PLAYERS[1].username]; // Integración activa
    
    const newClan = {
        id: 'clan_' + Date.now(),
        name: clanName,
        code: code,
        creator: state.currentUser.username,
        members: [state.currentUser.username, ...randomCPUs]
    };
    
    state.clans.push(newClan);
    state.activeClan = newClan;
    saveDatabaseLocally();
    
    if (supabase) {
        try {
            await supabase.from('clans').insert({
                id: newClan.id,
                name: newClan.name,
                code: newClan.code,
                creator: newClan.creator,
                members: newClan.members
            });
        } catch (e) {
            console.error("Error creating clan in Supabase:", e);
        }
    }
    
    document.getElementById('new-clan-name').value = '';
    document.getElementById('clan-create-panel').classList.add('hidden-panel');
    renderClans();
    showToast("Clan Creado!");
    Sound.playFanfare();
}

async function handleJoinClan() {
    const code = document.getElementById('join-clan-code').value.trim().toUpperCase();
    if (!code) { Sound.playError(); return; }
    
    const clan = state.clans.find(c => c.code === code);
    if (!clan) { Sound.playError(); showToast("Código de clan inválido"); return; }
    
    if (clan.members.includes(state.currentUser.username)) {
        showToast("Ya eres miembro de este clan");
        Sound.playError(); return;
    }
    
    clan.members.push(state.currentUser.username);
    state.activeClan = clan;
    saveDatabaseLocally();
    
    if (supabase) {
        try {
            await supabase.from('clans').update({
                members: clan.members
            }).eq('id', clan.id);
        } catch (e) {
            console.error("Error joining clan in Supabase:", e);
        }
    }
    
    document.getElementById('join-clan-code').value = '';
    document.getElementById('clan-join-panel').classList.add('hidden-panel');
    renderClans();
    showToast("Te has unido al clan!");
    Sound.playFanfare();
}

// ================= ESTADÍSTICAS DEL PERFIL =================

function renderProfileStats() {
    if (!state.currentUser) return;
    
    const avatarEl = document.getElementById('profile-large-avatar');
    avatarEl.src = state.currentUser.avatarType === 'custom' ? state.currentUser.avatar : CONFIG.AVATARS.find(a => a.id === state.currentUser.avatar).img;
    
    document.getElementById('profile-large-name').innerText = state.currentUser.username;
    document.getElementById('profile-large-team').innerText = state.currentUser.teamName.toUpperCase();
    document.getElementById('manager-joined-date').innerText = state.currentUser.joinedDate || "2026/05/28";
    
    const totalMatches = state.matches.filter(m => m.stage.startsWith('GROUP_')).length;
    const predictedCount = Object.values(state.currentUser.predictions).filter(p => p.saved).length;
    const exactCount = state.currentUser.exactMatches;
    const outcomeCount = state.currentUser.outcomeMatches;
    
    document.getElementById('stat-matches-predicted').innerText = `${predictedCount} / ${totalMatches}`;
    document.getElementById('bar-predicted').style.width = `${(predictedCount / totalMatches) * 100}%`;
    
    document.getElementById('stat-matches-exact').innerText = exactCount;
    document.getElementById('stat-percent-exact').innerText = `${exactCount} aciertos exactos`;
    document.getElementById('stat-matches-outcome').innerText = outcomeCount;
    document.getElementById('stat-percent-outcome').innerText = `${outcomeCount} aciertos de ganador`;
    
    const playedMatchesCount = state.matches.filter(m => m.played).length;
    const maxPossiblePoints = playedMatchesCount * 15; // 15 pts max en grupos
    const efficiency = maxPossiblePoints > 0 ? ((state.currentUser.points / maxPossiblePoints) * 100).toFixed(1) : "0.0";
    
    document.getElementById('stat-efficiency').innerText = `${efficiency}%`;
    document.getElementById('bar-efficiency').style.width = `${Math.min(100, parseFloat(efficiency))}%`;
    
    renderTrophies(predictedCount, exactCount, outcomeCount);
}

function renderTrophies(predictedCount, exactCount, outcomeCount) {
    const container = document.getElementById('trophies-container');
    container.innerHTML = '';
    
    const trophies = [
        { id: 1, title: "PRIMER FIRMA", icon: "🤝", desc: "Registrar tu primer mánager", condition: true },
        { id: 2, title: "MÁNAGER EXACTO", icon: "🎯", desc: "1 acierto de marcador exacto", condition: exactCount >= 1 },
        { id: 3, title: "NOSTRADAMUS", icon: "🔮", desc: "3 aciertos de marcador exacto", condition: exactCount >= 3 },
        { id: 4, title: "BUEN OJO", icon: "⚽", desc: "5 aciertos de ganadores", condition: outcomeCount >= 5 },
        { id: 5, title: "EXPERTO MUNDIAL", icon: "🏆", desc: "Adivinar toda la fase de grupos", condition: predictedCount >= 72 },
        { id: 6, title: "PUNTUACIÓN ORO", icon: "⭐", desc: "Superar los 40 puntos totales", condition: state.currentUser.points >= 40 }
    ];
    
    trophies.forEach(t => {
        const item = document.createElement('div');
        item.className = `trophy-badge ${t.condition ? 'unlocked' : ''}`;
        item.title = `${t.title}: ${t.desc} (${t.condition ? 'DESBLOQUEADO' : 'BLOQUEADO'})`;
        item.innerHTML = `<div class="trophy-icon">${t.icon}</div><div class="trophy-title">${t.title}</div>`;
        container.appendChild(item);
    });
}

// ================= RENDERIZAR TABLA DE POSICIONES GLOBAL =================

function renderStandings() {
    const tbody = document.getElementById('standings-table-body');
    tbody.innerHTML = '';
    
    const sorted = [...state.users].sort((a, b) => b.points - a.points || b.exactMatches - a.exactMatches);
    sorted.forEach((user, index) => {
        const tr = document.createElement('tr');
        if (state.currentUser && user.username === state.currentUser.username && !user.isCPU) {
            tr.className = 'user-row';
        }
        
        let avatarImg = user.avatarType === 'custom' ? user.avatar : (CONFIG.AVATARS.find(a => a.id === user.avatar)?.img || CONFIG.AVATARS[0].img);
        const matchesPlayed = state.matches.filter(m => m.played && user.predictions[m.id]?.saved).length;
        
        tr.innerHTML = `
            <td class="text-center table-rank">${index + 1}º</td>
            <td>
                <div class="row-manager-info">
                    <img src="${avatarImg}" alt="${user.username}" class="row-avatar">
                    <div>
                        <div style="font-family: var(--font-pixel-heading); font-size: 7px; color: var(--win-blue);">${user.teamName.toUpperCase()}</div>
                        <div style="font-size: 11px;">Mánager: <span class="text-yellow">${user.username}</span> ${user.isCPU ? '<span class="text-gray" style="font-size:9px;">(CPU)</span>' : ''}</div>
                    </div>
                </div>
            </td>
            <td class="text-center">${matchesPlayed}</td>
            <td class="text-center text-cyan">${user.exactMatches}</td>
            <td class="text-center text-green">${user.outcomeMatches}</td>
            <td class="text-center text-yellow points-col">${user.points}</td>
        `;
        tbody.appendChild(tr);
    });
}

// ================= PANEL DE ADMINISTRACIÓN =================

function renderAdminGrid() {
    const grid = document.getElementById('admin-matches-grid');
    grid.innerHTML = '';
    
    // Mostrar partidos de grupo concluidos
    state.matches.forEach(match => {
        const card = document.createElement('div');
        card.className = 'admin-match-card';
        const hScore = match.homeScore !== null ? match.homeScore : 0;
        const aScore = match.awayScore !== null ? match.awayScore : 0;
        
        card.innerHTML = `
            <div class="admin-match-header">
                <span>${match.stage.replace('GROUP_','GRUPO ')}</span>
                <span>${match.date}</span>
            </div>
            <div class="admin-match-body">
                <div class="admin-team">
                    ${createCircularFlagHTML(match.home)}
                    <span class="admin-team-name">${CONFIG.COUNTRIES[match.home]?.name || match.home}</span>
                </div>
                <div class="admin-score-inputs">
                    <input type="number" min="0" max="9" class="admin-input-val adm-h-${match.id}" value="${hScore}">
                    <span style="font-family: var(--font-pixel-display); font-size: 20px;">-</span>
                    <input type="number" min="0" max="9" class="admin-input-val adm-a-${match.id}" value="${aScore}">
                </div>
                <div class="admin-team away">
                    ${createCircularFlagHTML(match.away)}
                    <span class="admin-team-name">${CONFIG.COUNTRIES[match.away]?.name || match.away}</span>
                </div>
            </div>
            <div class="admin-match-footer">
                <span class="admin-status-lbl ${match.played ? 'played' : 'pending'}">${match.played ? 'CONCLUIDO' : 'PENDIENTE'}</span>
                <button class="retro-btn small-btn btn-admin-save" data-match-id="${match.id}">REGISTRAR</button>
            </div>
        `;
        grid.appendChild(card);
    });
    
    document.querySelectorAll('.btn-admin-save').forEach(btn => {
        btn.addEventListener('click', () => {
            const matchId = parseInt(btn.dataset.matchId);
            const match = state.matches.find(m => m.id === matchId);
            const hVal = parseInt(document.querySelector(`.adm-h-${matchId}`).value);
            const aVal = parseInt(document.querySelector(`.adm-a-${matchId}`).value);
            
            if (match && !isNaN(hVal) && !isNaN(aVal)) {
                match.homeScore = hVal;
                match.awayScore = aVal;
                match.played = true;
                
                calculateAllPoints();
                saveDatabase();
                
                renderAdminGrid();
                updateManagerUIStats();
                showToast("Marcador Oficial Registrado");
                Sound.playFanfare();
            }
        });
    });
}

// ================= RENDERING DE PARTIDOS DE GRUPO =================

function renderMatches() {
    const grid = document.getElementById('matches-grid');
    grid.innerHTML = '';
    
    const filter = document.getElementById('match-stage-filter').value;
    const filteredMatches = state.matches.filter(match => {
        if (filter === 'ALL') return match.stage.startsWith('GROUP_');
        return match.stage === filter;
    });
    
    if (filteredMatches.length === 0) {
        grid.innerHTML = `<div class="retro-panel text-center" style="grid-column: 1/-1;"><p style="font-family: var(--font-pixel-heading); font-size: 8px; padding: 24px;">NO HAY PARTIDOS EN ESTA JORNADA</p></div>`;
        return;
    }
    
    filteredMatches.forEach(match => {
        const card = document.createElement('div');
        card.className = 'match-card';
        const pred = state.currentUser.predictions[match.id] || { homeScore: 0, awayScore: 0, saved: false };
        
        let footerHTML = '';
        if (match.played) {
            let badgeClass = 'zero-points';
            let badgeText = '0 PTS';
            
            if (match.homeScore === pred.homeScore && match.awayScore === pred.awayScore) {
                badgeClass = 'exact-score';
                badgeText = '🎯 +15 PTS';
            } else if (
                (match.homeScore > match.awayScore && pred.homeScore > pred.awayScore) ||
                (match.homeScore < match.awayScore && pred.homeScore < pred.awayScore) ||
                (match.homeScore === match.awayScore && pred.homeScore === pred.awayScore)
            ) {
                badgeClass = 'outcome-only';
                badgeText = '⚽ +5 PTS';
            }
            
            footerHTML = `
                <div class="match-status-text text-green">OFICIAL: ${match.homeScore} - ${match.awayScore}</div>
                <div class="points-badge ${badgeClass}">${badgeText}</div>
            `;
        } else {
            footerHTML = `
                <span class="disk-indicator ${pred.saved ? 'saved' : 'pending'}">💾</span>
                <div class="match-save-action">
                    <button class="retro-btn btn-save-pred small-btn" data-match-id="${match.id}">${pred.saved ? 'ACTUALIZAR' : 'PRONOSTICAR'}</button>
                </div>
            `;
        }
        
        card.innerHTML = `
            <div class="match-card-header">
                <span>${match.stage.replace('GROUP_','GRUPO ')}</span>
                <span>${match.date}</span>
            </div>
            <div class="match-card-body">
                <div class="match-team">
                    ${createCircularFlagHTML(match.home)}
                    <span class="team-name">${CONFIG.COUNTRIES[match.home]?.name || match.home}</span>
                </div>
                <div class="match-score-inputs">
                    <div class="score-control">
                        ${!match.played ? `<button class="retro-btn arrow-btn btn-score-change" data-target="home" data-action="inc" data-match-id="${match.id}">+</button>` : ''}
                        <div class="score-display-box" id="disp-home-${match.id}">${pred.homeScore}</div>
                        ${!match.played ? `<button class="retro-btn arrow-btn btn-score-change" data-target="home" data-action="dec" data-match-id="${match.id}">-</button>` : ''}
                    </div>
                    <span class="score-separator">-</span>
                    <div class="score-control">
                        ${!match.played ? `<button class="retro-btn arrow-btn btn-score-change" data-target="away" data-action="inc" data-match-id="${match.id}">+</button>` : ''}
                        <div class="score-display-box" id="disp-away-${match.id}">${pred.awayScore}</div>
                        ${!match.played ? `<button class="retro-btn arrow-btn btn-score-change" data-target="away" data-action="dec" data-match-id="${match.id}">-</button>` : ''}
                    </div>
                </div>
                <div class="match-team">
                    ${createCircularFlagHTML(match.away)}
                    <span class="team-name">${CONFIG.COUNTRIES[match.away]?.name || match.away}</span>
                </div>
            </div>
            <div class="match-card-footer">
                ${footerHTML}
            </div>
        `;
        
        grid.appendChild(card);
    });
    
    // Controles de marcadores
    document.querySelectorAll('.btn-score-change').forEach(btn => {
        btn.addEventListener('click', () => {
            const matchId = parseInt(btn.dataset.matchId);
            const target = btn.dataset.target;
            const action = btn.dataset.action;
            
            if (!state.currentUser.predictions[matchId]) {
                state.currentUser.predictions[matchId] = { homeScore: 0, awayScore: 0, saved: false };
            }
            const pred = state.currentUser.predictions[matchId];
            
            if (target === 'home') {
                pred.homeScore = action === 'inc' ? Math.min(9, pred.homeScore + 1) : Math.max(0, pred.homeScore - 1);
                document.getElementById(`disp-home-${matchId}`).innerText = pred.homeScore;
            } else {
                pred.awayScore = action === 'inc' ? Math.min(9, pred.awayScore + 1) : Math.max(0, pred.awayScore - 1);
                document.getElementById(`disp-away-${matchId}`).innerText = pred.awayScore;
            }
            
            pred.saved = false;
            const indicator = btn.closest('.match-card').querySelector('.disk-indicator');
            if (indicator) indicator.className = 'disk-indicator pending';
            Sound.playBloop();
        });
    });
    
    // Guardar pronósticos
    document.querySelectorAll('.btn-save-pred').forEach(btn => {
        btn.addEventListener('click', () => {
            const matchId = parseInt(btn.dataset.matchId);
            const pred = state.currentUser.predictions[matchId];
            if (pred) {
                pred.saved = true;
                saveDatabase();
                
                // Actualizar progreso
                updateGroupProgressBar();
                renderMatches();
                
                checkBracketUnlockState();
                showToast("Predicción Guardada");
            }
        });
    });
}

// ================= INICIALIZACIÓN GENERAL DE LA APP =================

window.addEventListener('DOMContentLoaded', () => {
    loadDatabase();
    renderPredefinedAvatars();
    setupNavigation();
    
    // Si ya existe sesión activa
    if (state.currentUser) {
        if (!state.currentUser.username) {
            transitionToOnboarding();
        } else {
            generateCPUPredictions();
            calculateAllPoints();
            saveDatabase();
            transitionToDashboard();
        }
    }
});
