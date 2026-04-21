// ============================================================
//  CONSTANTES
// ============================================================
const GUIDES_KEY   = 'aestheticProgressGuides';
const EXAMS_KEY    = 'upcomingExams';
const USER_KEY     = 'sap_user';
const SUPABASE_URL = 'https://lziimnaqourkkshfieze.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6aWltbmFxb3Vya2tzaGZpZXplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MjM4MDIsImV4cCI6MjA5MjI5OTgwMn0.n-sE953Ds3qYGUZBgk_doBSiYqksV8jwt9UOHN91kEQ';

// ============================================================
//  ESTADO GLOBAL
// ============================================================
let guides         = [];
let exams          = [];
let currentFilter  = 'all';
let currentUser    = null;   // { email, id } cuando está conectado
let sb             = null;   // instancia Supabase (lazy)
let currentAuthTab = 'login';
