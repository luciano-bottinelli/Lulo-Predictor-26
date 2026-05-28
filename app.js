/* ==========================================
   LULO PREDICTOR - MOTOR DE SIMULACIÓN Y CRUCES MUNDIAL 2026 (app.js)
   ========================================== */

// ================= CONFIGURACIÓN Y ESTADO INICIAL =================

const DEFAULT_AVATAR = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%23888888' style='background:%23222222'><circle cx='50' cy='35' r='20'/><path d='M50 60c-25 0-35 15-35 25v5h70v-5c0-10-10-25-35-25z'/></svg>`;

const CONFIG = {
    // Definición de las 48 selecciones oficiales
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
        KSA: { name: "Arabia S.", colors: { green: "#006c35", white: "#ffffff" } },
        // Nuevas selecciones con colores primarios y secundarios para bandera genérica
        RSA: { name: "Sudáfrica", colors: { primary: "#007749", secondary: "#ffb81c" } },
        COD: { name: "R.D. Congo", colors: { primary: "#007fff", secondary: "#ce1021" } },
        BIH: { name: "Bosnia", colors: { primary: "#002395", secondary: "#ffffff" } },
        QAT: { name: "Qatar", colors: { primary: "#8a1538", secondary: "#ffffff" } },
        HAI: { name: "Haití", colors: { primary: "#00205b", secondary: "#d21034" } },
        SCO: { name: "Escocia", colors: { primary: "#004B84", secondary: "#ffffff" } },
        AUS: { name: "Australia", colors: { primary: "#ffcd00", secondary: "#008751" } },
        CZE: { name: "Chequia", colors: { primary: "#d7141a", secondary: "#11457e" } },
        CUW: { name: "Curazao", colors: { primary: "#002b7f", secondary: "#f9e814" } },
        CIV: { name: "C. Marfil", colors: { primary: "#ff8200", secondary: "#ffffff" } },
        IRN: { name: "Irán", colors: { primary: "#ffffff", secondary: "#da0000" } },
        NZL: { name: "N. Zelanda", colors: { primary: "#ffffff", secondary: "#000000" } },
        CPV: { name: "Cabo Verde", colors: { primary: "#003893", secondary: "#cf2027" } },
        IRQ: { name: "Irak", colors: { primary: "#007a3d", secondary: "#ffffff" } },
        NOR: { name: "Noruega", colors: { primary: "#ef2b2d", secondary: "#002868" } },
        ALG: { name: "Argelia", colors: { primary: "#ffffff", secondary: "#006233" } },
        AUT: { name: "Austria", colors: { primary: "#ed2939", secondary: "#ffffff" } },
        JOR: { name: "Jordania", colors: { primary: "#ce1126", secondary: "#ffffff" } },
        TUR: { name: "Turquía", colors: { primary: "#e30a17", secondary: "#ffffff" } },
        UZB: { name: "Uzbekistán", colors: { primary: "#009eb6", secondary: "#ffffff" } },
        PAN: { name: "Panamá", colors: { primary: "#da291c", secondary: "#ffffff" } }
    },
    // Definición oficial de los 12 grupos de 4 selecciones (48 equipos en total)
    GROUPS: {
        GROUP_A: ["MEX", "RSA", "KOR", "COD"],
        GROUP_B: ["CAN", "BIH", "QAT", "SUI"],
        GROUP_C: ["BRA", "MAR", "HAI", "SCO"],
        GROUP_D: ["USA", "PAR", "AUS", "CZE"],
        GROUP_E: ["GER", "CUW", "CIV", "ECU"],
        GROUP_F: ["NED", "JPN", "SWE", "TUN"],
        GROUP_G: ["BEL", "EGY", "IRN", "NZL"],
        GROUP_H: ["ESP", "CPV", "KSA", "URU"],
        GROUP_I: ["FRA", "SEN", "IRQ", "NOR"],
        GROUP_J: ["ARG", "ALG", "AUT", "JOR"],
        GROUP_K: ["POR", "TUR", "UZB", "COL"],
        GROUP_L: ["ENG", "CRO", "GHA", "PAN"]
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

let supabaseDb = null;
if (DATABASE_CONFIG.SUPABASE_URL && DATABASE_CONFIG.SUPABASE_ANON_KEY) {
    try {
        if (window.supabase && typeof window.supabase.createClient === 'function') {
            supabaseDb = window.supabase.createClient(DATABASE_CONFIG.SUPABASE_URL, DATABASE_CONFIG.SUPABASE_ANON_KEY);
            console.log("Supabase Cloud Sync Engine initialized successfully!");
        } else {
            console.warn("Supabase SDK not loaded yet or blocked.");
        }
    } catch (e) {
        console.error("Error al iniciar Supabase client:", e);
    }
}

// Mánagers Simulados (CPU) que competirán con el usuario
const CPU_PLAYERS = [
    { email: "bilardo@cyber96.com", username: "Bilardo Master", teamName: "Narigón F.C.", avatar: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=100", avatarType: "custom", isCPU: true, predictions: {}, points: 0, exactMatches: 0, outcomeMatches: 0, strategy: "defensive", joinedDate: "2026/05/28" },
    { email: "basile@coco90.com", username: "Basile Coco", teamName: "La Voz F.C.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", avatarType: "custom", isCPU: true, predictions: {}, points: 0, exactMatches: 0, outcomeMatches: 0, strategy: "offensive", joinedDate: "2026/05/28" },
    { email: "caruso@humo.com", username: "Caruso Salvador", teamName: "Vende Humo C.F.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100", avatarType: "custom", isCPU: true, predictions: {}, points: 0, exactMatches: 0, outcomeMatches: 0, strategy: "draws", joinedDate: "2026/05/28" },
    { email: "tronco@futbol.com", username: "El Tronco", teamName: "Troncos Unidos", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100", avatarType: "custom", isCPU: true, predictions: {}, points: 0, exactMatches: 0, outcomeMatches: 0, strategy: "random", joinedDate: "2026/05/28" },
    { email: "gold@predictor.com", username: "Mánager IA Gold", teamName: "Cyber Fútbol 96", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100", avatarType: "custom", isCPU: true, predictions: {}, points: 0, exactMatches: 0, outcomeMatches: 0, strategy: "logical", joinedDate: "2026/05/28" }
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
    avatarSource: "none", 
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
    
    playVictory() {
        if (!state.soundEnabled) return;
        this.init();
        if (!audioCtx) return;
        
        // Acorde mayor de victoria (arpegio rápido)
        const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
        let time = audioCtx.currentTime;
        
        notes.forEach((freq, idx) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            
            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, time);
            
            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(0.08, time + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
            
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            
            osc.start(time);
            osc.stop(time + 0.3);
            
            time += 0.1; // Siguiente nota arpegiada
        });
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
        case 'RSA': innerContent = `<rect width="100" height="100" fill="#007749"/><polygon points="0,0 40,50 0,100" fill="#000"/><polygon points="0,10 35,50 0,90" fill="#ffb81c"/><polygon points="100,0 50,50 100,100" fill="#e03c31"/><polygon points="100,20 60,50 100,80" fill="#001489"/>`; break;
        case 'COD': innerContent = `<rect width="100" height="100" fill="#007fff"/><polygon points="0,100 100,0 100,20 0,120" fill="#fcd116"/><polygon points="0,100 100,0 100,15 0,115" fill="#ce1021"/><circle cx="20" cy="20" r="10" fill="#fcd116"/>`; break;
        case 'BIH': innerContent = `<rect width="100" height="100" fill="#002395"/><polygon points="25,0 75,50 25,100" fill="#fcd116"/>`; break;
        case 'QAT': innerContent = `<rect width="100" height="100" fill="#8a1538"/><polygon points="0,0 30,0 30,100 0,100" fill="#fff"/>`; break;
        case 'HAI': innerContent = `<rect width="100" height="50" fill="#00205b"/><rect y="50" width="100" height="50" fill="#d21034"/><rect x="40" y="40" width="20" height="20" fill="#fff"/>`; break;
        case 'SCO': innerContent = `<rect width="100" height="100" fill="#004B84"/><polygon points="0,0 10,0 100,90 100,100 90,100 0,10" fill="#fff"/><polygon points="100,0 90,0 0,90 0,100 10,100 100,10" fill="#fff"/>`; break;
        case 'AUS': innerContent = `<rect width="100" height="100" fill="#00008b"/><rect width="40" height="40" fill="#fff"/><rect x="10" y="10" width="20" height="20" fill="#ff0000"/><circle cx="20" cy="70" r="8" fill="#fff"/><circle cx="75" cy="50" r="15" fill="#fff"/>`; break;
        case 'CZE': innerContent = `<rect width="100" height="50" fill="#fff"/><rect y="50" width="100" height="50" fill="#d7141a"/><polygon points="0,0 50,50 0,100" fill="#11457e"/>`; break;
        case 'CUW': innerContent = `<rect width="100" height="100" fill="#002b7f"/><rect y="65" width="100" height="15" fill="#f9e814"/><circle cx="20" cy="25" r="4" fill="#fff"/><circle cx="35" cy="40" r="6" fill="#fff"/>`; break;
        case 'CIV': innerContent = `<rect width="33.3" height="100" fill="#ff8200"/><rect x="33.3" width="33.4" height="100" fill="#fff"/><rect x="66.7" width="33.3" height="100" fill="#009e60"/>`; break;
        case 'IRN': innerContent = `<rect width="100" height="33.3" fill="#239f40"/><rect y="33.3" width="100" height="33.4" fill="#fff"/><rect y="66.7" width="100" height="33.3" fill="#da0000"/><circle cx="50" cy="50" r="10" fill="#da0000"/>`; break;
        case 'NZL': innerContent = `<rect width="100" height="100" fill="#00247d"/><rect width="40" height="40" fill="#fff"/><rect x="10" y="10" width="20" height="20" fill="#cc142b"/><circle cx="75" cy="50" r="10" fill="#cc142b" stroke="#fff" stroke-width="2"/>`; break;
        case 'CPV': innerContent = `<rect width="100" height="100" fill="#003893"/><rect y="50" width="100" height="25" fill="#fff"/><rect y="55" width="100" height="15" fill="#cf2027"/><circle cx="35" cy="62.5" r="20" fill="none" stroke="#fcd116" stroke-width="4" stroke-dasharray="2,4"/>`; break;
        case 'IRQ': innerContent = `<rect width="100" height="33.3" fill="#ce1126"/><rect y="33.3" width="100" height="33.4" fill="#fff"/><rect y="66.7" width="100" height="33.3" fill="#000"/><circle cx="50" cy="50" r="8" fill="#007a3d"/>`; break;
        case 'NOR': innerContent = `<rect width="100" height="100" fill="#ba0c2f"/><rect x="25" width="20" height="100" fill="#fff"/><rect y="40" width="100" height="20" fill="#fff"/><rect x="30" width="10" height="100" fill="#00205b"/><rect y="45" width="100" height="10" fill="#00205b"/>`; break;
        case 'ALG': innerContent = `<rect width="50" height="100" fill="#006233"/><rect x="50" width="50" height="100" fill="#fff"/><circle cx="50" cy="50" r="20" fill="#d21034"/><circle cx="55" cy="50" r="16" fill="#fff"/><polygon points="60,45 65,55 55,55" fill="#d21034"/>`; break;
        case 'AUT': innerContent = `<rect width="100" height="33.3" fill="#ed2939"/><rect y="33.3" width="100" height="33.4" fill="#fff"/><rect y="66.7" width="100" height="33.3" fill="#ed2939"/>`; break;
        case 'JOR': innerContent = `<rect width="100" height="33.3" fill="#000"/><rect y="33.3" width="100" height="33.4" fill="#fff"/><rect y="66.7" width="100" height="33.3" fill="#007a3d"/><polygon points="0,0 50,50 0,100" fill="#ce1126"/><circle cx="15" cy="50" r="5" fill="#fff"/>`; break;
        case 'TUR': innerContent = `<rect width="100" height="100" fill="#e30a17"/><circle cx="40" cy="50" r="25" fill="#fff"/><circle cx="48" cy="50" r="20" fill="#e30a17"/><polygon points="70,45 75,55 65,55" fill="#fff"/>`; break;
        case 'UZB': innerContent = `<rect width="100" height="33.3" fill="#009eb6"/><rect y="33.3" width="100" height="33.4" fill="#fff"/><rect y="66.7" width="100" height="33.3" fill="#1eb53a"/><rect y="31" width="100" height="2" fill="#ce1126"/><rect y="67" width="100" height="2" fill="#ce1126"/><circle cx="20" cy="16" r="8" fill="#fff"/><circle cx="24" cy="16" r="7" fill="#009eb6"/>`; break;
        case 'PAN': innerContent = `<rect width="50" height="50" fill="#fff"/><rect x="50" width="50" height="50" fill="#da291c"/><rect y="50" width="50" height="50" fill="#002b7f"/><rect x="50" y="50" width="50" height="50" fill="#fff"/><circle cx="25" cy="25" r="10" fill="#002b7f"/><circle cx="75" cy="75" r="10" fill="#da291c"/>`; break;
        default:
            if (props.colors && props.colors.primary && props.colors.secondary) {
                innerContent = `<rect width="100" height="50" fill="${props.colors.primary}"/><rect y="50" width="100" height="50" fill="${props.colors.secondary}"/>`;
            } else {
                innerContent = `<rect width="100" height="100" fill="#777"/>`;
            }
    }
    return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none">
            ${innerContent}
        </svg>
    `;
}
const ISO_FLAGS = {
    ARG: 'ar', VEN: 've', BRA: 'br', FRA: 'fr', GER: 'de', ESP: 'es', URU: 'uy', ENG: 'gb-eng',
    MEX: 'mx', USA: 'us', ITA: 'it', JPN: 'jp', CAN: 'ca', COL: 'co', SEN: 'sn', BEL: 'be',
    KOR: 'kr', CRO: 'hr', MAR: 'ma', SWE: 'se', CMR: 'cm', PAR: 'py', TUN: 'tn', NED: 'nl',
    POR: 'pt', EGY: 'eg', ECU: 'ec', SUI: 'ch', POL: 'pl', NGA: 'ng', GHA: 'gh', KSA: 'sa',
    RSA: 'za', COD: 'cd', BIH: 'ba', QAT: 'qa', HAI: 'ht', SCO: 'gb-sct', AUS: 'au', CZE: 'cz',
    CUW: 'cw', CIV: 'ci', IRN: 'ir', NZL: 'nz', CPV: 'cv', IRQ: 'iq', NOR: 'no', ALG: 'dz',
    AUT: 'at', JOR: 'jo', TUR: 'tr', UZB: 'uz', PAN: 'pa'
};

function createCircularFlagHTML(countryCode) {
    const iso = ISO_FLAGS[countryCode];
    const flagContent = iso 
        ? `<img src="https://flagcdn.com/w160/${iso}.png" style="width: 100%; height: 100%; object-fit: cover;" />`
        : getFlagSVG(countryCode); // Fallback al viejo SVG si no encuentra

    return `
        <div class="retro-flag-container" title="${CONFIG.COUNTRIES[countryCode]?.name || countryCode}">
            <div class="retro-flag">
                ${flagContent}
                <div class="flag-inner-shadow"></div>
                <div class="flag-pixel-mesh"></div>
                <div class="flag-glossy-overlay"></div>
            </div>
        </div>
    `;
}
// ================= NOTIFICACIONES Y TOASTS RETRO =================

let toastTimeout = null;
function showToast(message) {
    const toast = document.getElementById('retro-toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;
    
    toastMsg.innerText = message;
    toast.className = 'retro-toast-visible';
    
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.className = 'retro-toast-hidden';
    }, 3000);
}

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
    
    // 4. Token API (Mantener solo por compatibilidad de guardado si se requiere)
    const storedApiToken = localStorage.getItem('predictor_lulo_api_token');
    if (storedApiToken) {
        state.apiToken = storedApiToken;
        const apiInput = document.getElementById('api-token-input');
        if (apiInput) apiInput.value = storedApiToken;
    }
    
    // 5. Sesión activa
    const activeSessionEmail = localStorage.getItem('predictor_lulo_session');
    if (activeSessionEmail) {
        state.currentUser = state.users.find(u => u.email === activeSessionEmail && !u.isCPU);
        
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
    if (supabaseDb) {
        syncWithSupabase();
    }
}

function saveDatabaseLocally() {
    localStorage.setItem('predictor_lulo_matches', JSON.stringify(state.matches));
    localStorage.setItem('predictor_lulo_users', JSON.stringify(state.users));
    localStorage.setItem('predictor_lulo_clans', JSON.stringify(state.clans));
    localStorage.setItem('predictor_lulo_api_token', state.apiToken);
    
    if (state.currentUser) {
        localStorage.setItem('predictor_lulo_session', state.currentUser.email);
    } else {
        localStorage.removeItem('predictor_lulo_session');
    }
}

function saveDatabase() {
    saveDatabaseLocally();
    
    // Guardar cambios de predicciones en la nube asincrónicamente si Supabase está activo
    if (supabaseDb && state.currentUser) {
        supabaseDb.from('users').update({
            username: state.currentUser.username,
            predictions: state.currentUser.predictions,
            bracket_predictions: state.currentUser.bracketPredictions,
            special_predictions: state.currentUser.specialPredictions,
            points: state.currentUser.points,
            exact_matches: state.currentUser.exactMatches,
            outcome_matches: state.currentUser.outcomeMatches,
            team_name: state.currentUser.teamName,
            avatar: String(state.currentUser.avatar),
            avatar_type: state.currentUser.avatarType
        }).eq('email', state.currentUser.email)
        .then(({ error }) => {
            if (error) console.error("Error al guardar predicciones del usuario en Supabase:", error);
            else console.log("Datos de usuario guardados en la nube asincrónicamente.");
        });
    }
}

// ================= MOTOR DE SINCRONIZACIÓN SUPABASE CLOUD =================

async function syncWithSupabase() {
    if (!supabaseDb) return;
    try {
        console.log("Comenzando sincronización con Supabase Cloud...");
        
        // 1. Obtener partidos oficiales de la nube
        const { data: cloudMatches, error: matchesErr } = await supabaseDb
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
        const { data: cloudUsers, error: usersErr } = await supabaseDb
            .from('users')
            .select('*');
            
        if (!usersErr && cloudUsers && cloudUsers.length > 0) {
            console.log(`Sincronizados ${cloudUsers.length} mánagers desde la nube.`);
            
            const newUsersList = [];
            
            // Cargar usuarios de la nube
            cloudUsers.forEach(cu => {
                const isCurrentUser = state.currentUser && state.currentUser.email === cu.email;
                const userObj = {
                    email: cu.email,
                    username: cu.username || "",
                    password: cu.password,
                    teamName: cu.team_name || "",
                    avatar: isNaN(Number(cu.avatar)) ? cu.avatar : Number(cu.avatar),
                    avatarType: cu.avatar_type || "none",
                    predictions: isCurrentUser ? state.currentUser.predictions : (cu.predictions || {}),
                    bracketPredictions: isCurrentUser ? state.currentUser.bracketPredictions : (cu.bracket_predictions || {}),
                    specialPredictions: isCurrentUser ? state.currentUser.specialPredictions : (cu.special_predictions || { finalist1: "", finalist2: "", champion: "", scorer: "", assister: "" }),
                    points: cu.points || 0,
                    exactMatches: cu.exact_matches || 0,
                    outcomeMatches: cu.outcome_matches || 0,
                    joinedDate: cu.joined_date || "2026/05/28",
                    isCPU: cu.is_cpu || false
                };
                newUsersList.push(userObj);
                
                // Actualizar la referencia del currentUser al nuevo objeto para no romper el estado
                if (isCurrentUser) {
                    state.currentUser = userObj;
                }
            });
            
            // Si el usuario actual u otros usuarios locales no están en la nube (falló inserción), preservarlos
            state.users.forEach(localU => {
                if (!newUsersList.some(u => u.email === localU.email) && !localU.isCPU) {
                    newUsersList.push(localU);
                }
            });
            
            // Si falta alguna CPU por defecto, la agregamos
            CPU_PLAYERS.forEach(cpu => {
                if (!newUsersList.some(u => u.email === cpu.email)) {
                    newUsersList.push(JSON.parse(JSON.stringify(cpu)));
                }
            });
            
            state.users = newUsersList;
        }
        
        // 3. Obtener clanes de la nube
        const { data: cloudClans, error: clansErr } = await supabaseDb
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
        const activeSessionEmail = localStorage.getItem('predictor_lulo_session');
        if (activeSessionEmail) {
            state.currentUser = state.users.find(u => u.email === activeSessionEmail && !u.isCPU);
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
            }
        }
        updateManagerUIStats();
        console.log("¡Sincronización con la nube de Supabase completada!");
        
    } catch (err) {
        console.error("Fallo general en la sincronización con la nube:", err);
    }
}

// ================= GENERADOR DE PREDICCIONES CPU =================

function generateCPUPredictions() {
    state.users.forEach(user => {
        if (!user.isCPU) return;
        // Solo generar si no tiene predicciones todavía
        if (Object.keys(user.predictions).length > 0) return;
        
        state.matches.forEach(match => {
            if (!match.stage.startsWith('GROUP_')) return;
            
            let h, a;
            switch (user.strategy) {
                case 'defensive':
                    h = Math.floor(Math.random() * 2);
                    a = Math.floor(Math.random() * 2);
                    break;
                case 'offensive':
                    h = 1 + Math.floor(Math.random() * 3);
                    a = Math.floor(Math.random() * 3);
                    break;
                case 'draws':
                    h = Math.floor(Math.random() * 3);
                    a = h;
                    break;
                case 'logical':
                    h = Math.floor(Math.random() * 3);
                    a = Math.floor(Math.random() * 3);
                    break;
                case 'random':
                default:
                    h = Math.floor(Math.random() * 5);
                    a = Math.floor(Math.random() * 5);
                    break;
            }
            
            user.predictions[match.id] = { homeScore: h, awayScore: a, saved: true };
        });
    });
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
    for (let i = 73; i <= 88; i++) ids.push(`M${i}`);
    for (let i = 89; i <= 96; i++) ids.push(`M${i}`);
    for (let i = 97; i <= 100; i++) ids.push(`M${i}`);
    for (let i = 101; i <= 102; i++) ids.push(`M${i}`);
    ids.push('M104');
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
    // Usaremos el formato proyectado para Mundial de 48 equipos:
    // 8 primeros de grupo juegan contra los 8 mejores terceros (Grupos A a H)
    // 4 primeros de grupo (I, J, K, L) juegan contra 4 segundos (A, B, C, D)
    // 8 segundos restantes juegan entre sí (E vs F, G vs H, I vs J, K vs L)
    
    const pairings = [];
    const getWinner = (id, def) => state.currentUser.bracketPredictions[id]?.winner ?? def;
    const getScore = (id, side) => state.currentUser.bracketPredictions[id]?.[side] ?? 0;
    
    const createPairing = (id, hTeam, aTeam) => ({
        id, home: hTeam, away: aTeam,
        homeScore: getScore(id, 'homeScore'),
        awayScore: getScore(id, 'awayScore'),
        winner: getWinner(id, hTeam)
    });
    
    const groupWinner = (idx) => firsts[idx]?.team || "TBD";
    const groupSecond = (idx) => seconds[idx]?.team || "TBD";
    const bestThird = (idx) => bestThirds[idx]?.team || "TBD";
    
    // Asignación de 8 mejores terceros a los 8 partidos que requieren uno
    const thirdAssignments = {};
    const thirdMatches = [74, 77, 79, 80, 81, 82, 85, 87];
    for (let i = 0; i < 8; i++) thirdAssignments[thirdMatches[i]] = bestThirds[i]?.team || "TBD";
    const getThird = (mId) => thirdAssignments[mId] || "TBD";

    pairings.push(createPairing(`M73`, groupSecond(0), groupSecond(1)));
    pairings.push(createPairing(`M74`, groupWinner(4), getThird(74)));
    pairings.push(createPairing(`M75`, groupWinner(5), groupSecond(2)));
    pairings.push(createPairing(`M76`, groupWinner(2), groupSecond(5))); // 1C vs 2F
    pairings.push(createPairing(`M77`, groupWinner(8), getThird(77)));
    pairings.push(createPairing(`M78`, groupSecond(4), groupSecond(8)));
    pairings.push(createPairing(`M79`, groupWinner(0), getThird(79)));
    pairings.push(createPairing(`M80`, groupWinner(11), getThird(80)));
    pairings.push(createPairing(`M81`, groupWinner(3), getThird(81)));
    pairings.push(createPairing(`M82`, groupWinner(6), getThird(82)));
    pairings.push(createPairing(`M83`, groupSecond(10), groupSecond(11)));
    pairings.push(createPairing(`M84`, groupWinner(7), groupSecond(9)));
    pairings.push(createPairing(`M85`, groupWinner(1), getThird(85)));
    pairings.push(createPairing(`M86`, groupWinner(9), groupSecond(7)));
    pairings.push(createPairing(`M87`, groupWinner(10), getThird(87)));
    pairings.push(createPairing(`M88`, groupSecond(3), groupSecond(6)));
    
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
    
    const createKnockoutMatch = (id, tHome, tAway) => ({
        id,
        home: tHome,
        away: tAway,
        homeScore: state.currentUser.bracketPredictions[id]?.homeScore ?? 0,
        awayScore: state.currentUser.bracketPredictions[id]?.awayScore ?? 0,
        winner: state.currentUser.bracketPredictions[id]?.winner ?? tHome
    });
    
    // 1. Ronda de 16 (8avos) - 8 partidos
    const r16 = [];
    r16.push(createKnockoutMatch(`M89`, getWinnerOf(`M74`, r32Pairings.find(m => m.id === `M74`)?.home), getWinnerOf(`M77`, r32Pairings.find(m => m.id === `M77`)?.home)));
    r16.push(createKnockoutMatch(`M90`, getWinnerOf(`M73`, r32Pairings.find(m => m.id === `M73`)?.home), getWinnerOf(`M75`, r32Pairings.find(m => m.id === `M75`)?.home)));
    r16.push(createKnockoutMatch(`M91`, getWinnerOf(`M76`, r32Pairings.find(m => m.id === `M76`)?.home), getWinnerOf(`M78`, r32Pairings.find(m => m.id === `M78`)?.home)));
    r16.push(createKnockoutMatch(`M92`, getWinnerOf(`M79`, r32Pairings.find(m => m.id === `M79`)?.home), getWinnerOf(`M80`, r32Pairings.find(m => m.id === `M80`)?.home)));
    r16.push(createKnockoutMatch(`M93`, getWinnerOf(`M83`, r32Pairings.find(m => m.id === `M83`)?.home), getWinnerOf(`M84`, r32Pairings.find(m => m.id === `M84`)?.home)));
    r16.push(createKnockoutMatch(`M94`, getWinnerOf(`M81`, r32Pairings.find(m => m.id === `M81`)?.home), getWinnerOf(`M82`, r32Pairings.find(m => m.id === `M82`)?.home)));
    r16.push(createKnockoutMatch(`M95`, getWinnerOf(`M86`, r32Pairings.find(m => m.id === `M86`)?.home), getWinnerOf(`M88`, r32Pairings.find(m => m.id === `M88`)?.home)));
    r16.push(createKnockoutMatch(`M96`, getWinnerOf(`M85`, r32Pairings.find(m => m.id === `M85`)?.home), getWinnerOf(`M87`, r32Pairings.find(m => m.id === `M87`)?.home)));

    // 2. Cuartos de Final - 4 partidos
    const r8 = [];
    r8.push(createKnockoutMatch(`M97`, getWinnerOf(`M89`, r16.find(m => m.id === `M89`)?.home), getWinnerOf(`M90`, r16.find(m => m.id === `M90`)?.home)));
    r8.push(createKnockoutMatch(`M98`, getWinnerOf(`M93`, r16.find(m => m.id === `M93`)?.home), getWinnerOf(`M94`, r16.find(m => m.id === `M94`)?.home)));
    r8.push(createKnockoutMatch(`M99`, getWinnerOf(`M91`, r16.find(m => m.id === `M91`)?.home), getWinnerOf(`M92`, r16.find(m => m.id === `M92`)?.home)));
    r8.push(createKnockoutMatch(`M100`, getWinnerOf(`M95`, r16.find(m => m.id === `M95`)?.home), getWinnerOf(`M96`, r16.find(m => m.id === `M96`)?.home)));

    // 3. Semifinales - 2 partidos
    const r4 = [];
    r4.push(createKnockoutMatch(`M101`, getWinnerOf(`M97`, r8.find(m => m.id === `M97`)?.home), getWinnerOf(`M98`, r8.find(m => m.id === `M98`)?.home)));
    r4.push(createKnockoutMatch(`M102`, getWinnerOf(`M99`, r8.find(m => m.id === `M99`)?.home), getWinnerOf(`M100`, r8.find(m => m.id === `M100`)?.home)));

    // 4. Final - 1 partido
    const r2 = [];
    r2.push(createKnockoutMatch(`M104`, getWinnerOf(`M101`, r4.find(m => m.id === `M101`)?.home), getWinnerOf(`M102`, r4.find(m => m.id === `M102`)?.home)));
    
    return { r32: r32Pairings, r16, r8, r4, r2 };
}

// ================= MOTOR DE SINCRONIZACIÓN EN TIEMPO REAL (API) =================

let _espnSyncInterval = null;

async function syncRealWorldMatches(silent = false) {
    if (!silent) {
        showToast("Sincronizando con ESPN Scoreboard API...");
        Sound.playDisk();
    }
    
    try {
        const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard');
        if (!response.ok) {
            throw new Error(`Error de servidor ESPN: ${response.status}`);
        }
        
        const data = await response.json();
        const events = data.events;
        
        if (!events || events.length === 0) {
            showToast("No hay partidos en juego hoy en ESPN");
            return;
        }
        
        let updatedCount = 0;
        
        events.forEach(evt => {
            const isCompleted = evt.status?.type?.completed;
            if (!isCompleted) return; // Solo sincronizar partidos finalizados
            
            const comp = evt.competitions?.[0];
            if (!comp) return;
            
            const homeCompetitor = comp.competitors?.find(c => c.homeAway === 'home');
            const awayCompetitor = comp.competitors?.find(c => c.homeAway === 'away');
            
            if (!homeCompetitor || !awayCompetitor) return;
            
            const homeCode = homeCompetitor.team?.abbreviation?.toUpperCase();
            const awayCode = awayCompetitor.team?.abbreviation?.toUpperCase();
            
            const homeScore = parseInt(homeCompetitor.score);
            const awayScore = parseInt(awayCompetitor.score);
            
            if (isNaN(homeScore) || isNaN(awayScore)) return;
            
            // Buscar partido correspondiente por selecciones
            const localMatch = state.matches.find(m => 
                !m.played && 
                m.home === homeCode && 
                m.away === awayCode
            );
            
            if (localMatch) {
                localMatch.homeScore = homeScore;
                localMatch.awayScore = awayScore;
                localMatch.played = true;
                updatedCount++;
            }
        });
        
        calculateAllPoints();
        saveDatabase();
        
        // Recargar vista activa sin sonido
        refreshActiveTab();
        if (updatedCount > 0) {
            showToast(`Sincronizado: ${updatedCount} partidos actualizados`);
        }
        
    } catch(err) {
        console.error("Fallo al sincronizar con ESPN API: ", err);
    }
}

// Auto-sincronización en tiempo real con la API de ESPN (cada 60 segundos)
function startAutoSync() {
    if (_espnSyncInterval) clearInterval(_espnSyncInterval);
    // Sincronizar inmediatamente al entrar al dashboard
    syncRealWorldMatches(true);
    // Luego cada 60 segundos en silencio
    _espnSyncInterval = setInterval(() => syncRealWorldMatches(true), 60000);
    console.log('ESPN Auto-Sync activado (cada 60s)');
}

// ================= ASISTENTE DE AUTOPREDICCIÓN RÁPIDA DE GRUPOS =================


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
    
    // Función auxiliar para verificar si una ronda está 100% pronosticada
    const isRoundComplete = (rndMatches) => rndMatches && rndMatches.every(m => {
        const pred = state.currentUser.bracketPredictions[m.id];
        // Tiene que tener un winner que no sea TBD, y que ese winner esté entre los dos equipos
        return pred && pred.winner && pred.winner !== "TBD" && pred.winner !== "" && (pred.winner === m.home || pred.winner === m.away);
    });

    let lockedMessage = "";
    if (state.bracketRound === 'r16' && !isRoundComplete(bracketData['r32'])) lockedMessage = "COMPLETA TODOS LOS PARTIDOS DE 16° DE FINAL PRIMERO";
    else if (state.bracketRound === 'r8' && (!isRoundComplete(bracketData['r32']) || !isRoundComplete(bracketData['r16']))) lockedMessage = "COMPLETA TODOS LOS PARTIDOS DE 8° DE FINAL PRIMERO";
    else if (state.bracketRound === 'r4' && (!isRoundComplete(bracketData['r32']) || !isRoundComplete(bracketData['r16']) || !isRoundComplete(bracketData['r8']))) lockedMessage = "COMPLETA TODOS LOS PARTIDOS DE CUARTOS PRIMERO";
    else if (state.bracketRound === 'r2' && (!isRoundComplete(bracketData['r32']) || !isRoundComplete(bracketData['r16']) || !isRoundComplete(bracketData['r8']) || !isRoundComplete(bracketData['r4']))) lockedMessage = "COMPLETA TODOS LOS PARTIDOS DE SEMIFINAL PRIMERO";

    if (lockedMessage !== "") {
        deck.innerHTML = `<div class="retro-panel text-center" style="grid-column: 1/-1;"><p style="font-family: var(--font-pixel-heading); font-size: 10px; padding: 24px; color: var(--yellow);">🔒 ${lockedMessage}</p></div>`;
        return;
    }
    
    const roundMatches = bracketData[state.bracketRound];
    
    if (!roundMatches || roundMatches.length === 0) return;
    
    if (state.bracketRound === 'r4' || state.bracketRound === 'r2') {
        deck.classList.add('centered-layout');
    } else {
        deck.classList.remove('centered-layout');
    }
    
    roundMatches.forEach((match) => {
        const card = document.createElement('div');
        card.className = 'bracket-match-card' + (state.bracketRound === 'r2' ? ' final-match-card' : '');
        
        let labelText = '';
        switch(state.bracketRound) {
            case 'r32': labelText = `16° DE FINAL`; break;
            case 'r16': labelText = `8° DE FINAL`; break;
            case 'r8': labelText = `CUARTOS DE FINAL`; break;
            case 'r4': labelText = `SEMIFINAL`; break;
            case 'r2': labelText = `GRAN FINAL - 🏆 MUNDIAL 2026`; break;
        }
        
        const isWinnerHome = match.winner === match.home;
        const isWinnerAway = match.winner === match.away;
        
        card.innerHTML = `
            <div class="bracket-match-label" style="justify-content: center;">
                <span>${labelText}</span>
            </div>
            <div class="match-card-body" style="padding:4px 0;">
                <!-- Local -->
                <div class="match-team btn-adv-toggle ${isWinnerHome ? 'winner-glow' : ''}" style="cursor:pointer;" data-match-id="${match.id}" data-team="${match.home}">
                    ${createCircularFlagHTML(match.home)}
                    <span class="team-name ${isWinnerHome ? 'text-yellow font-bold' : ''}" style="font-size:14px; margin-top:2px;">${CONFIG.COUNTRIES[match.home]?.name || match.home}</span>
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
                <div class="match-team btn-adv-toggle ${isWinnerAway ? 'winner-glow' : ''}" style="cursor:pointer;" data-match-id="${match.id}" data-team="${match.away}">
                    ${createCircularFlagHTML(match.away)}
                    <span class="team-name ${isWinnerAway ? 'text-yellow font-bold' : ''}" style="font-size:14px; margin-top:2px;">${CONFIG.COUNTRIES[match.away]?.name || match.away}</span>
                </div>
            </div>
        `;
        
        // Hacer que hacer clic en los equipos seleccione al ganador que avanza (especialmente en empates)
        card.querySelectorAll('.match-team').forEach(teamDiv => {
            teamDiv.addEventListener('click', () => {
                const teamCode = teamDiv.querySelector('.team-name').innerText;
                const countryCode = Object.keys(CONFIG.COUNTRIES).find(k => CONFIG.COUNTRIES[k].name === teamCode) || match.home;
                
                const predObj = state.currentUser.bracketPredictions[match.id] || { homeScore: 0, awayScore: 0, winner: countryCode };
                
                // Solo permitir selección manual si hay empate en goles
                if (predObj.homeScore === predObj.awayScore) {
                    predObj.winner = countryCode;
                    state.currentUser.bracketPredictions[match.id] = predObj;
                } else {
                    return; // No hacer nada si alguien ya ganó por goles
                }
                
                saveDatabase();
                renderBracketRound();
                Sound.playClick();
            });
        });
        
        deck.appendChild(card);
    });
    
    // Añadir el botón "GUARDAR FASE"
    const savePhaseContainer = document.createElement('div');
    savePhaseContainer.style.gridColumn = "1 / -1";
    savePhaseContainer.style.textAlign = "center";
    savePhaseContainer.style.marginTop = "16px";
    
    const isRoundCompleteCheck = isRoundComplete(roundMatches);
    savePhaseContainer.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; gap: 8px;">
            <span class="disk-indicator ${isRoundCompleteCheck ? 'saved' : 'pending'}">💾</span>
            <button class="retro-btn btn-save-bracket-phase" style="padding: 12px 32px; font-size: 14px; cursor: pointer;">
                ${isRoundCompleteCheck ? 'FASE COMPLETADA' : 'GUARDAR FASE'}
            </button>
        </div>
    `;
    deck.appendChild(savePhaseContainer);
    
    // Panel final extra (MVP y Botón de Subir Predicciones)
    if (state.bracketRound === 'r2') {
        const extraPanel = document.createElement('div');
        extraPanel.style.gridColumn = "1 / -1";
        extraPanel.style.marginTop = "30px";
        extraPanel.innerHTML = `
            <div class="retro-panel" style="max-width: 600px; margin: 0 auto; text-align: center; padding: 20px;">
                <h3 style="color: var(--yellow); font-family: var(--font-pixel-heading); font-size: 14px; margin-bottom: 15px;">PREMIOS EXTRA DEL MUNDIAL</h3>
                
                <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 25px;">
                    <button class="retro-btn btn-disabled" style="cursor: not-allowed; opacity: 0.7;" disabled>🏅 MÁXIMO GOLEADOR (Próximamente)</button>
                    <button class="retro-btn btn-disabled" style="cursor: not-allowed; opacity: 0.7;" disabled>🎯 MEJOR ASISTIDOR (Próximamente)</button>
                    <button class="retro-btn btn-disabled" style="cursor: not-allowed; opacity: 0.7;" disabled>⭐ MVP DEL TORNEO (Próximamente)</button>
                </div>
                
                <hr style="border: 1px dashed #555; margin-bottom: 20px;">
                
                <p style="font-family: var(--font-pixel-heading); font-size: 10px; color: #aaa; margin-bottom: 15px;">Al subir tus predicciones, estas quedarán fijadas en tu perfil para sumar puntos reales cuando comience el mundial.</p>
                <button id="btn-submit-predictions" class="retro-btn primary pulse" style="width: 100%; font-size: 16px; padding: 15px;">🚀 SUBIR PREDICCIONES 🚀</button>
            </div>
        `;
        deck.appendChild(extraPanel);
        
        // Funcionalidad de Subir Predicciones
        const btnSubmit = extraPanel.querySelector('#btn-submit-predictions');
        if (btnSubmit) {
            btnSubmit.addEventListener('click', () => {
                // Verificar si todo está completo antes de subir
                if (isRoundCompleteCheck) {
                    Sound.playVictory();
                    if (!window.confetti) {
                        const script = document.createElement('script');
                        script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
                        script.onload = () => window.confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 } });
                        document.head.appendChild(script);
                    } else {
                        window.confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 } });
                    }
                    showToast("¡Predicciones del Mundial Subidas con Éxito!");
                    saveDatabase();
                } else {
                    showToast("⚠️ Debes guardar el resultado de la final primero");
                    Sound.playClick();
                }
            });
        }
    }
    
    // Funcionalidad del botón GUARDAR FASE
    const btnSavePhase = savePhaseContainer.querySelector('.btn-save-bracket-phase');
    if (btnSavePhase) {
        btnSavePhase.addEventListener('click', () => {
            let savedCount = 0;
            roundMatches.forEach(m => {
                if (!state.currentUser.bracketPredictions[m.id]) {
                    state.currentUser.bracketPredictions[m.id] = { homeScore: 0, awayScore: 0, winner: m.home };
                    savedCount++;
                }
            });
            
            if (savedCount > 0 || !isRoundCompleteCheck) {
                saveDatabase();
                renderBracketRound();
                checkBracketUnlockState();
                showToast("Cambios Guardados");
                Sound.playBeep();
            }
        });
    }
    
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
    
    // Mostrar el panel de premios si la fase es "premios", sino ocultarlo
    const rewardsPanel = document.getElementById('championship-rewards-panel');
    const deckPanel = document.getElementById('bracket-round-deck');
    
    if (state.bracketRound === 'premios') {
        rewardsPanel.classList.remove('hidden-panel');
        deckPanel.style.display = 'none';
        populateSpecialPredictionsForm();
    } else {
        rewardsPanel.classList.add('hidden-panel');
        deckPanel.style.display = '';
    }
}

// Rellenar los dropdowns del formulario de campeonato
function populateSpecialPredictionsForm() {
    const spec = state.currentUser.specialPredictions || { scorer: "", assister: "" };
    
    // Cargar goleador y asistidor
    document.getElementById('predict-scorer').value = spec.scorer || "";
    document.getElementById('predict-assister').value = spec.assister || "";
}

function refreshActiveTab() {
    const activeTabBtn = document.querySelector('.tab-btn.active');
    if (!activeTabBtn) return;
    const tabId = activeTabBtn.dataset.tab;
    
    if (tabId === 'matches-tab') {
        updateGroupProgressBar();
        renderMatches();
    }
    else if (tabId === 'bracket-tab') {
        const unlocked = checkBracketUnlockState();
        if (unlocked) renderBracketRound();
    }
    else if (tabId === 'standings-tab') {
        const subTab = document.querySelector('.sub-tab-btn.active');
        if (subTab) subTab.click();
        else document.querySelector('[data-subtab="global-standings-view"]')?.click();
    }
    else if (tabId === 'profile-tab') renderProfileStats();
    else if (tabId === 'config-tab') {
        if (state.currentUser) {
            document.getElementById('config-team-name').value = state.currentUser.teamName || "";
        }
    }
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
            
            refreshActiveTab();
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
    
    // Autopredicción

    
    // Guardar apuestas especiales de campeonato
    document.getElementById('special-predictions-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const scorer = document.getElementById('predict-scorer').value;
        const assister = document.getElementById('predict-assister').value;
        
        // Preserve other properties just in case, but overwrite scorer and assister
        state.currentUser.specialPredictions = { ...state.currentUser.specialPredictions, scorer, assister };
        
        calculateAllPoints();
        saveDatabase();
        updateManagerUIStats();
        
        showToast("Premios Individuales Guardados");
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
        
        const inputVal = document.getElementById('auth-username').value.trim();
        const password = document.getElementById('auth-password').value;
        
        if (!inputVal || !password) return;
        
        // Bloquear UI mientras carga (opcional, para feedback de red)
        const submitBtn = document.getElementById('btn-submit-auth');
        const originalBtnText = document.getElementById('submit-auth-text').innerText;
        document.getElementById('submit-auth-text').innerText = "PROCESANDO...";
        submitBtn.disabled = true;
        
        try {
            if (state.authMode === "login") {
                // LOGIN: Verificar directamente contra Supabase si está disponible
                let userObj = null;
                
                if (supabaseDb) {
                    try {
                        const { data, error } = await supabaseDb
                            .from('users')
                            .select('*')
                            .ilike('username', inputVal)
                            .eq('is_cpu', false)
                            .maybeSingle();
                            
                        if (data) {
                            userObj = {
                                email: data.email,
                                username: data.username,
                                password: data.password,
                                teamName: data.team_name || "",
                                avatar: isNaN(Number(data.avatar)) ? data.avatar : Number(data.avatar),
                                avatarType: data.avatar_type || "none",
                                predictions: {}, // Wiped
                                bracketPredictions: data.bracket_predictions || {},
                                specialPredictions: data.special_predictions || { finalist1: "", finalist2: "", champion: "", scorer: "", assister: "" },
                                points: data.points || 0,
                                exactMatches: data.exact_matches || 0,
                                outcomeMatches: data.outcome_matches || 0,
                                joinedDate: data.joined_date || "2026/05/28",
                                isCPU: false
                            };
                        }
                    } catch (e) {
                        console.error("Fallo al contactar Supabase para login:", e);
                    }
                } else {
                    // Fallback local
                    userObj = state.users.find(u => u.username && u.username.toLowerCase() === inputVal.toLowerCase() && !u.isCPU);
                }
                
                // Mensaje genérico para no filtrar si el usuario existe
                if (!userObj || userObj.password !== password) {
                    showToast("Nombre o contraseña incorrectos");
                    Sound.playError();
                    return;
                }
                
                state.currentUser = userObj;
                if (!state.currentUser.bracketPredictions) state.currentUser.bracketPredictions = {};
                if (!state.currentUser.specialPredictions) state.currentUser.specialPredictions = { finalist1: "", finalist2: "", champion: "", scorer: "", assister: "" };
                
                saveDatabase();
                showToast("Acceso Concedido");
                Sound.playFanfare();
                
                transitionToDashboard();
                
            } else {
                // REGISTRO
                const usernameInput = inputVal;
                let userExists = false;
                
                if (supabaseDb) {
                    try {
                        const { data } = await supabaseDb
                            .from('users')
                            .select('username')
                            .ilike('username', usernameInput)
                            .maybeSingle();
                        if (data) userExists = true;
                    } catch (e) {
                        console.error("Fallo al verificar usuario en Supabase:", e);
                    }
                } else {
                    userExists = !!state.users.find(u => u.username && u.username.toLowerCase() === usernameInput.toLowerCase() && !u.isCPU);
                }
                
                if (userExists) {
                    showToast("El mánager ya está registrado");
                    Sound.playError();
                    return;
                }
                
                const now = new Date();
                const dateStr = `${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')}`;
                
                let userObj = {
                    email: usernameInput, // Establecemos email igual a username
                    username: usernameInput,
                    password: password,
                    teamName: "",
                    avatar: "",
                    avatarType: "none",
                    predictions: {},
                    bracketPredictions: {},
                    specialPredictions: { finalist1: "", finalist2: "", champion: "", scorer: "", assister: "" },
                    points: 0,
                    exactMatches: 0,
                    outcomeMatches: 0,
                    joinedDate: dateStr,
                    isCPU: false
                };
                
                // Si Supabase está activo, registrar el usuario en el servidor en la nube ANTES de proceder
                if (supabaseDb) {
                    try {
                        const { error } = await supabaseDb.from('users').insert({
                            email: userObj.email,
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
                        
                        if (error) {
                            console.error("Error registrando usuario en Supabase:", error);
                            showToast("Error en el servidor al registrar cuenta");
                            Sound.playError();
                            return; // No avanzar si falla la DB real
                        }
                    } catch (e) {
                        console.error("Fallo al insertar en Supabase:", e);
                        showToast("Error de conexión al registrar cuenta");
                        Sound.playError();
                        return;
                    }
                }
                
                state.users.push(userObj);
                state.currentUser = userObj;
                
                saveDatabase();
                showToast("Cuenta Creada!");
                Sound.playFanfare();
                transitionToOnboarding();
            }
        } finally {
            // Restaurar botón
            document.getElementById('submit-auth-text').innerText = originalBtnText;
            submitBtn.disabled = false;
        }
    });
    
    // Autenticación con Google (Simulación Retro)
    document.getElementById('btn-google-auth').addEventListener('click', () => {
        Sound.playClick();
        showToast("Conectando con Google API...");
        setTimeout(async () => {
            const googleEmail = "manager.google@gmail.com";
            const googleUser = "GoogleManager";
            let userObj = state.users.find(u => u.email && u.email.toLowerCase() === googleEmail && !u.isCPU);
            const now = new Date();
            const dateStr = `${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')}`;
            
            if (!userObj) {
                userObj = {
                    email: googleEmail,
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
                
                if (supabaseDb) {
                    try {
                        await supabaseDb.from('users').insert({
                            email: userObj.email,
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
    
    // Manejar Quitar Foto / Sin Foto en Onboarding
    document.getElementById('btn-remove-avatar').addEventListener('click', () => {
        Sound.playClick();
        if (state.currentUser) {
            state.currentUser.avatar = '';
            state.currentUser.avatarType = 'none';
        }
        state.tempCustomAvatarBase64 = null;
        document.getElementById('onboard-avatar-preview').src = DEFAULT_AVATAR;
        showToast("Foto Removida");
    });
    
    document.getElementById('custom-avatar-file').addEventListener('change', handleCustomAvatarUpload);
    
    // Envío del Formulario de Onboarding
    document.getElementById('onboarding-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const chosenUsername = document.getElementById('onboard-username').value.trim();
        const teamName = document.getElementById('onboard-team-name').value.trim();
        
        if (!chosenUsername || !teamName) return;
        
        // Validar que el nombre de usuario no esté tomado por otro usuario
        const usernameTaken = state.users.some(u => u.username && u.username.toLowerCase() === chosenUsername.toLowerCase() && u.email !== state.currentUser.email);
        if (usernameTaken) {
            showToast("Mánager ya registrado. Elige otro nombre.");
            Sound.playError();
            return;
        }
        
        state.currentUser.username = chosenUsername;
        state.currentUser.teamName = teamName;
        
        if (state.tempCustomAvatarBase64) {
            state.currentUser.avatar = state.tempCustomAvatarBase64;
            state.currentUser.avatarType = 'custom';
        } else if (state.currentUser.avatarType !== 'custom') {
            state.currentUser.avatar = '';
            state.currentUser.avatarType = 'none';
        }
        
        generateCPUPredictions();
        calculateAllPoints();
        
        // Guardar local y remotamente
        saveDatabaseLocally();
        
        if (supabaseDb) {
            try {
                await supabaseDb.from('users').update({
                    username: state.currentUser.username,
                    team_name: state.currentUser.teamName,
                    avatar: String(state.currentUser.avatar),
                    avatar_type: state.currentUser.avatarType,
                    points: state.currentUser.points,
                    exact_matches: state.currentUser.exactMatches,
                    outcome_matches: state.currentUser.outcomeMatches
                }).eq('email', state.currentUser.email);
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
    const handleLogout = () => {
        state.currentUser = null;
        localStorage.removeItem('predictor_lulo_session');
        Sound.playClick();
        
        document.getElementById('dashboard-screen').classList.remove('active-screen');
        document.getElementById('dashboard-screen').classList.add('inactive-screen');
        document.getElementById('login-screen').classList.remove('inactive-screen');
        document.getElementById('login-screen').classList.add('active-screen');
        
        // Reset inputs
        document.getElementById('auth-input').value = '';
        document.getElementById('auth-username').value = '';
        document.getElementById('auth-password').value = '';
        state.authMode = "login";
        document.getElementById('submit-auth-text').innerText = "INICIAR SESIÓN";
        document.getElementById('btn-toggle-auth-mode').innerText = "¿No tienes cuenta? REGÍSTRATE AQUÍ";
        document.getElementById('login-window-title').innerHTML = `<span class="icon-disk">💾</span> INICIAR SISTEMA PREDICTOR`;
    }; // Fin de handleLogout

    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) btnLogout.addEventListener('click', handleLogout);
    const btnConfigLogout = document.getElementById('btn-config-logout');
    if (btnConfigLogout) btnConfigLogout.addEventListener('click', handleLogout);
    
    // Guardar Configuración
    const btnSaveConfig = document.getElementById('btn-save-config');
    if (btnSaveConfig) {
        btnSaveConfig.addEventListener('click', async () => {
            if (!state.currentUser) return;
            const newTeamName = document.getElementById('config-team-name').value.trim();
            if (newTeamName) {
                state.currentUser.teamName = newTeamName;
                saveDatabaseLocally();
                
                if (supabaseDb) {
                    try {
                        await supabaseDb.from('users').update({ team_name: newTeamName }).eq('email', state.currentUser.email);
                    } catch (e) {
                        console.error("Fallo al actualizar nombre de equipo en Supabase:", e);
                    }
                }
                
                updateManagerUIStats();
                showToast("Configuración Guardada");
                Sound.playDisk();
            }
        });
    }
    
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
    
    // Admin panel removed — admin operations done from developer tools only
}

// ================= SYNC COMPLEMENTARIO DE ADMINISTRACIÓN =================

async function pushAdminResultsToSupabase() {
    if (!supabaseDb) return;
    try {
        console.log("Subiendo marcadores oficiales del torneo y recalculando puntos en Supabase...");
        
        // 1. Sincronizar todos los partidos que se jugaron
        const playedMatches = state.matches.filter(m => m.played);
        for (const m of playedMatches) {
            await supabaseDb.from('matches').upsert({
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
                await supabaseDb.from('users').update({
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
    if (!supabaseDb) return;
    try {
        console.log("Limpiando marcadores oficiales en la nube de Supabase...");
        
        // Eliminar registros de partidos de la tabla para reiniciar el fixture real en la nube
        const { error } = await supabaseDb.from('matches').delete().neq('id', 0);
        if (error) console.error("Error al borrar partidos en Supabase:", error);
        
        // Resetear puntos de todos los usuarios a 0
        for (const u of state.users) {
            if (!u.isCPU) {
                await supabaseDb.from('users').update({
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
        document.getElementById('onboard-avatar-preview').src = evt.target.result;
        if (state.currentUser) {
            state.currentUser.avatar = evt.target.result;
            state.currentUser.avatarType = 'custom';
        }
        showToast("Foto de Galería Cargada");
    };
    reader.readAsDataURL(file);
}

function transitionToOnboarding() {
    document.getElementById('login-screen').classList.add('inactive-screen');
    document.getElementById('login-screen').classList.remove('active-screen');
    document.getElementById('onboarding-screen').classList.remove('inactive-screen');
    document.getElementById('onboarding-screen').classList.add('active-screen');
    
    const uName = (state.currentUser && state.currentUser.username) ? state.currentUser.username : '';
    document.getElementById('onboard-username').value = uName;
    document.getElementById('onboard-username').readOnly = uName ? true : false; 
    document.getElementById('onboard-team-name').value = '';
    
    // Reset avatar preview to silhouette by default
    document.getElementById('onboard-avatar-preview').src = DEFAULT_AVATAR;
    if (state.currentUser) {
        state.currentUser.avatar = '';
        state.currentUser.avatarType = 'none';
    }
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
    
    // Arrancar auto-sincronización con ESPN
    if (typeof startAutoSync === 'function') startAutoSync();
}

function updateManagerUIStats() {
    if (!state.currentUser) return;
    
    // 1. Avatar
    const avatarEl = document.getElementById('manager-profile-avatar');
    if (avatarEl) {
        avatarEl.src = state.currentUser.avatarType === 'custom' ? state.currentUser.avatar : DEFAULT_AVATAR;
    }
    
    // 2. Team Name
    const teamEl = document.getElementById('manager-profile-team');
    if (teamEl) {
        teamEl.innerText = state.currentUser.teamName ? state.currentUser.teamName.toUpperCase() : `C.A. ${state.currentUser.username.toUpperCase()}`;
    }
    
    // 3. Manager Name
    const nameEl = document.getElementById('manager-profile-name');
    if (nameEl) {
        nameEl.innerText = state.currentUser.username;
    }
    
    // 4. Total Points
    const pointsEl = document.getElementById('manager-total-points');
    if (pointsEl) {
        pointsEl.innerText = String(state.currentUser.points).padStart(3, '0');
    }
    
    // 5. Rank / Position
    const rankEl = document.getElementById('manager-rank-val');
    if (rankEl) {
        const sortedUsers = [...state.users].sort((a,b) => b.points - a.points || b.exactMatches - a.exactMatches);
        const rank = sortedUsers.findIndex(u => u.username === state.currentUser.username) + 1;
        rankEl.innerText = rank > 0 ? `${rank}º` : "1º";
    }
    
    // 6. Exact Matches
    const exactsEl = document.getElementById('manager-exacts-val');
    if (exactsEl) {
        exactsEl.innerText = state.currentUser.exactMatches;
    }
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
        
        let avatarImg = (user.avatarType === 'custom' && user.avatar) ? user.avatar : DEFAULT_AVATAR;
        const matchesPlayed = state.matches.filter(m => m.played && user.predictions[m.id]?.saved).length;
        
        tr.innerHTML = `
            <td class="text-center table-rank">${index + 1}º</td>
            <td>
                <div class="row-manager-info">
                    <img src="${avatarImg}" alt="${user.username}" class="row-avatar">
                    <div>
                        <div style="font-family: var(--font-pixel-heading); font-size: 9px; color: var(--win-blue);">${user.teamName.toUpperCase()}</div>
                        <div style="font-size: 11px; color: #333;">Mánager: <span style="color: #000; font-weight: bold;">${user.username}</span> ${user.isCPU ? '<span style="color: #666; font-size:9px;">(CPU)</span>' : ''}</div>
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
    
    if (supabaseDb) {
        try {
            await supabaseDb.from('clans').insert({
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
    
    if (supabaseDb) {
        try {
            await supabaseDb.from('clans').update({
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
    avatarEl.src = state.currentUser.avatarType === 'custom' ? state.currentUser.avatar : DEFAULT_AVATAR;
    
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
        
        let avatarImg = (user.avatarType === 'custom' && user.avatar) ? user.avatar : DEFAULT_AVATAR;
        const matchesPlayed = state.matches.filter(m => m.played && user.predictions[m.id]?.saved).length;
        
        tr.innerHTML = `
            <td class="text-center table-rank">${index + 1}º</td>
            <td>
                <div class="row-manager-info">
                    <img src="${avatarImg}" alt="${user.username}" class="row-avatar">
                    <div>
                        <div style="font-family: var(--font-pixel-heading); font-size: 9px; color: var(--win-blue);">${user.teamName.toUpperCase()}</div>
                        <div style="font-size: 11px; color: #333;">Mánager: <span style="color: #000; font-weight: bold;">${user.username}</span> ${user.isCPU ? '<span style="color: #666; font-size:9px;">(CPU)</span>' : ''}</div>
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

// Admin panel removed — renderAdminGrid no longer needed

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
        grid.innerHTML = `<div class="retro-panel text-center" style="grid-column: 1/-1;"><p style="font-family: var(--font-pixel-heading); font-size: 10px; padding: 24px;">NO HAY PARTIDOS EN ESTA JORNADA</p></div>`;
        return;
    }
    
    const groupsToRender = filter === 'ALL' ? Object.keys(CONFIG.GROUPS) : [filter];
    
    groupsToRender.forEach(groupName => {
        const groupMatches = state.matches.filter(m => m.stage === groupName);
        if (!groupMatches || groupMatches.length === 0) return;
        
        // Contenedor principal del grupo
        const groupContainer = document.createElement('div');
        groupContainer.style.gridColumn = "1 / -1";
        groupContainer.style.display = "flex";
        groupContainer.style.flexDirection = "column";
        groupContainer.style.gap = "16px";
        groupContainer.style.marginBottom = "32px";
        groupContainer.style.padding = "16px";
        groupContainer.style.border = "2px solid #333";
        groupContainer.style.backgroundColor = "rgba(0,0,0,0.2)";
        
        // Título del Grupo
        const groupTitle = document.createElement('h2');
        groupTitle.innerText = groupName.replace('GROUP_','GRUPO ');
        groupTitle.style.color = "var(--yellow)";
        groupTitle.style.fontFamily = "var(--font-pixel-heading)";
        groupTitle.style.textAlign = "center";
        groupTitle.style.margin = "0 0 8px 0";
        groupContainer.appendChild(groupTitle);
        
        // Grilla de partidos del grupo
        const groupMatchesGrid = document.createElement('div');
        groupMatchesGrid.style.display = "flex";
        groupMatchesGrid.style.flexWrap = "wrap";
        groupMatchesGrid.style.gap = "16px";
        groupMatchesGrid.style.justifyContent = "center";
        
        // Calcular estado de guardado del grupo entero (si hay pendientes)
        let anyUnsaved = false;
        
        groupMatches.forEach(match => {
            const card = document.createElement('div');
            card.className = 'match-card';
            const pred = state.currentUser.predictions[match.id] || { homeScore: 0, awayScore: 0, saved: false };
            
            if (!pred.saved && !match.played) anyUnsaved = true;
            
            const stadiums = ["Azteca", "MetLife", "SoFi", "Hard Rock", "AT&T", "Lumen", "BMO", "BC Place"];
            const stadium = stadiums[match.id % stadiums.length];
            const dateStr = match.date.replace(/^GRUPO\s+[A-L]\s*-\s*/i, '').replace(/ de Junio/i, ' Jun').replace(/,\s*2026/g, '').replace(/\s*-\s*/, ' ');
            
            card.innerHTML = `
            <div class="match-card-header" style="justify-content: center; gap: 4px; white-space: nowrap; overflow: hidden; padding-bottom: 8px; font-size: 8px;">
                <span style="color: #ddd;">${dateStr}</span>
                <span style="color: #555;">|</span>
                <span style="color: #aaa; text-overflow: ellipsis; overflow: hidden;">${stadium}</span>
            </div>
            <div class="match-card-body" style="padding-bottom: 8px;">
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
            `;
            
            // Si ya se jugó, agregar footer con puntos en vez de botón guardar
            if (match.played) {
                let badgeClass = 'zero-points';
                let badgeText = '0 PTS';
                if (match.homeScore === pred.homeScore && match.awayScore === pred.awayScore) {
                    badgeClass = 'exact-score'; badgeText = '🎯 +15 PTS';
                } else if ((match.homeScore > match.awayScore && pred.homeScore > pred.awayScore) || (match.homeScore < match.awayScore && pred.homeScore < pred.awayScore) || (match.homeScore === match.awayScore && pred.homeScore === pred.awayScore)) {
                    badgeClass = 'outcome-only'; badgeText = '⚽ +5 PTS';
                }
                card.innerHTML += `<div class="match-card-footer"><div class="match-status-text text-green">OFICIAL: ${match.homeScore} - ${match.awayScore}</div><div class="points-badge ${badgeClass}">${badgeText}</div></div>`;
            }
            
            groupMatchesGrid.appendChild(card);
        });
        
        groupContainer.appendChild(groupMatchesGrid);
        
        // ==========================================
        // Calcular y Mostrar Tabla del Grupo
        // ==========================================
        const standings = CONFIG.GROUPS[groupName].map(t => ({ team: t, points: 0, gd: 0, gf: 0 }));
        groupMatches.forEach(match => {
            const pred = state.currentUser.predictions[match.id];
            if (!pred) return;
            const h = pred.homeScore; const a = pred.awayScore;
            const homeTeam = standings.find(t => t.team === match.home);
            const awayTeam = standings.find(t => t.team === match.away);
            if (!homeTeam || !awayTeam) return;
            homeTeam.gf += h; homeTeam.gd += (h - a); awayTeam.gf += a; awayTeam.gd += (a - h);
            if (h > a) { homeTeam.points += 3; } else if (h < a) { awayTeam.points += 3; } else { homeTeam.points += 1; awayTeam.points += 1; }
        });
        
        standings.sort((a, b) => b.points - a.points || b.gd - a.gd || b.gf - a.gf);
        
        let tableRows = '';
        standings.forEach((t, idx) => {
            let rowClass = idx < 2 ? 'bg-green text-white' : (idx === 2 ? 'bg-yellow text-black' : 'bg-dark text-white');
            tableRows += `
                <tr class="${rowClass}" style="border-bottom: 1px solid #333;">
                    <td style="padding:4px; font-size:10px;">${idx + 1}º</td>
                    <td style="padding:4px; font-size:10px;">${createCircularFlagHTML(t.team)} ${CONFIG.COUNTRIES[t.team]?.name || t.team}</td>
                    <td style="padding:4px; font-size:10px; font-weight:bold; text-align:center;">${t.points}</td>
                    <td style="padding:4px; font-size:10px; text-align:center;">${t.gd > 0 ? '+'+t.gd : t.gd}</td>
                    <td style="padding:4px; font-size:10px; text-align:center;">${t.gf}</td>
                </tr>`;
        });
        
        const tableDiv = document.createElement('div');
        tableDiv.className = "retro-panel";
        tableDiv.style.margin = "16px auto";
        tableDiv.style.width = "100%";
        tableDiv.style.maxWidth = "500px";
        tableDiv.style.padding = "8px";
        tableDiv.innerHTML = `
            <table style="width:100%; border-collapse: collapse;">
                <thead>
                    <tr style="border-bottom: 2px solid #fff; font-family: var(--font-pixel-heading); font-size: 10px;">
                        <th style="text-align:left; padding:4px;">POS</th>
                        <th style="text-align:left; padding:4px;">EQUIPO</th>
                        <th style="text-align:center; padding:4px;">PTS</th>
                        <th style="text-align:center; padding:4px;">DIF</th>
                        <th style="text-align:center; padding:4px;">GF</th>
                    </tr>
                </thead>
                <tbody>${tableRows}</tbody>
            </table>
        `;
        
        groupContainer.appendChild(tableDiv);
        
        // Botón GUARDAR GRUPO
        const saveGroupBtnContainer = document.createElement('div');
        saveGroupBtnContainer.style.textAlign = "center";
        saveGroupBtnContainer.style.marginTop = "8px";
        
        const isGroupPlayed = groupMatches.every(m => m.played);
        
        if (!isGroupPlayed) {
            saveGroupBtnContainer.innerHTML = `
                <div style="display: flex; justify-content: center; align-items: center; gap: 8px;">
                    <span class="disk-indicator ${!anyUnsaved ? 'saved' : 'pending'}">💾</span>
                    <button class="retro-btn btn-save-group" data-group-name="${groupName}" style="padding: 12px 32px; font-size: 14px; cursor: pointer;">
                        ${!anyUnsaved ? 'CAMBIOS GUARDADOS' : 'GUARDAR CAMBIOS'}
                    </button>
                </div>
            `;
            groupContainer.appendChild(saveGroupBtnContainer);
        }
        
        grid.appendChild(groupContainer);
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
            
            // Si estaba vacío, iniciarlo en 0 antes de sumar/restar
            if (pred.homeScore === "" || pred.homeScore === undefined) pred.homeScore = 0;
            if (pred.awayScore === "" || pred.awayScore === undefined) pred.awayScore = 0;
            
            if (target === 'home') {
                pred.homeScore = action === 'inc' ? Math.min(9, pred.homeScore + 1) : Math.max(0, pred.homeScore - 1);
                document.getElementById(`disp-home-${matchId}`).innerText = pred.homeScore;
            } else {
                pred.awayScore = action === 'inc' ? Math.min(9, pred.awayScore + 1) : Math.max(0, pred.awayScore - 1);
                document.getElementById(`disp-away-${matchId}`).innerText = pred.awayScore;
            }
            
            pred.saved = false;
            
            // Actualizar el botón de Guardar Grupo correspondiente
            const matchObj = state.matches.find(m => m.id === matchId);
            if (matchObj) {
                const groupBtn = document.querySelector(`.btn-save-group[data-group-name="${matchObj.stage}"]`);
                if (groupBtn) {
                    groupBtn.innerText = 'GUARDAR CAMBIOS';
                    const indicator = groupBtn.previousElementSibling;
                    if (indicator && indicator.classList.contains('disk-indicator')) {
                        indicator.className = 'disk-indicator pending';
                    }
                }
            }
            
            Sound.playBloop();
        });
    });
    
    // Guardar pronósticos por grupo
    document.querySelectorAll('.btn-save-group').forEach(btn => {
        btn.addEventListener('click', () => {
            const groupName = btn.dataset.groupName;
            const groupMatches = state.matches.filter(m => m.stage === groupName);
            let savedCount = 0;
            
            groupMatches.forEach(m => {
                if (!state.currentUser.predictions[m.id]) {
                    state.currentUser.predictions[m.id] = { homeScore: 0, awayScore: 0, saved: false };
                }
                const pred = state.currentUser.predictions[m.id];
                pred.saved = true;
                savedCount++;
            });
            
            if (savedCount > 0) {
                saveDatabase();
                
                // Actualizar progreso
                updateGroupProgressBar();
                renderMatches();
                
                checkBracketUnlockState();
                showToast("Cambios Guardados");
                Sound.playBeep();
            }
        });
    });
}

// ================= INICIALIZACIÓN GENERAL DE LA APP =================

window.addEventListener('DOMContentLoaded', () => {
    loadDatabase();
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
    
    // Lógica del botón de Volver Arriba
    const btnScrollTop = document.getElementById('btn-scroll-top');
    if (btnScrollTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btnScrollTop.style.display = 'block';
            } else {
                btnScrollTop.style.display = 'none';
            }
        });
        
        btnScrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            Sound.playClick();
        });
    }
});

